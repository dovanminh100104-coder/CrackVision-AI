"""
CrackVision Pro - Enterprise SQL Database Module
Dual-Engine Support:
  1. Primary: Microsoft SQL Server 2022 (.\\SQLEXPRESS01 / CrackVisionDB) via pyodbc
  2. Fallback: SQLite 3 (crackvision.db)
Ensures seamless connection with SQL Server Management Studio (SSMS) while maintaining 100% offline portability.
"""

import os
import sys
import json
import sqlite3
import threading
import datetime
from typing import List, Dict, Optional, Any

# Try importing pyodbc for Microsoft SQL Server
try:
    import pyodbc
    PYODBC_AVAILABLE = True
except ImportError:
    PYODBC_AVAILABLE = False

backend_dir = os.path.dirname(os.path.abspath(__file__))
SQLITE_DB_FILE = os.path.join(backend_dir, "crackvision.db")
JSON_BACKUP_FILE = os.path.join(backend_dir, "history_records.json")

# Microsoft SQL Server Configuration
MSSQL_SERVER = ".\\SQLEXPRESS01"
MSSQL_DATABASE = "CrackVisionDB"
MSSQL_DRIVER = "ODBC Driver 17 for SQL Server"

MSSQL_MASTER_CONN_STR = (
    f"DRIVER={{{MSSQL_DRIVER}}};"
    f"SERVER={MSSQL_SERVER};"
    f"DATABASE=master;"
    f"Trusted_Connection=yes;"
    f"TrustServerCertificate=yes;"
)

MSSQL_DB_CONN_STR = (
    f"DRIVER={{{MSSQL_DRIVER}}};"
    f"SERVER={MSSQL_SERVER};"
    f"DATABASE={MSSQL_DATABASE};"
    f"Trusted_Connection=yes;"
    f"TrustServerCertificate=yes;"
)

_db_lock = threading.Lock()
_active_engine = "sqlite"  # 'mssql' or 'sqlite'

def _sanitize_row(row: Dict[str, Any]) -> Dict[str, Any]:
    """Convert datetime objects to string for JSON serialization compatibility."""
    sanitized = {}
    for k, v in row.items():
        if isinstance(v, (datetime.datetime, datetime.date)):
            sanitized[k] = v.strftime("%Y-%m-%d %H:%M:%S")
        elif isinstance(v, datetime.timedelta):
            sanitized[k] = str(v)
        else:
            sanitized[k] = v
    return sanitized

def check_mssql_connection() -> bool:
    """Check if Microsoft SQL Server (.SQLEXPRESS01) is reachable."""
    if not PYODBC_AVAILABLE:
        return False
    try:
        conn = pyodbc.connect(MSSQL_MASTER_CONN_STR, timeout=3, autocommit=True)
        conn.close()
        return True
    except Exception:
        return False

def get_mssql_connection():
    """Create a connection to Microsoft SQL Server CrackVisionDB."""
    return pyodbc.connect(MSSQL_DB_CONN_STR, timeout=5, autocommit=True)

def get_sqlite_connection() -> sqlite3.Connection:
    """Create a connection to SQLite database."""
    conn = sqlite3.connect(SQLITE_DB_FILE, check_same_thread=False, timeout=15.0)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL;")
    conn.execute("PRAGMA synchronous=NORMAL;")
    return conn

def init_database() -> None:
    """Initialize database engines (Microsoft SQL Server and/or SQLite)."""
    global _active_engine
    with _db_lock:
        # 1. Initialize SQLite (always maintained as persistent local replica)
        _init_sqlite()

        # 2. Check & initialize Microsoft SQL Server if available
        if check_mssql_connection():
            try:
                _init_mssql()
                _active_engine = "mssql"
                print(f"[SQL DATABASE] Ket noi thanh cong Microsoft SQL Server ({MSSQL_SERVER}) -> Database: [{MSSQL_DATABASE}]")
            except Exception as e:
                print(f"[SQL DATABASE WARNING] Khong the cau hinh MSSQL, su dung SQLite: {e}")
                _active_engine = "sqlite"
        else:
            _active_engine = "sqlite"
            print(f"[SQL DATABASE] Su dung SQLite Engine: {SQLITE_DB_FILE}")

def _init_sqlite() -> None:
    """Initialize SQLite tables and migrate legacy JSON data."""
    conn = get_sqlite_connection()
    try:
        with conn:
            conn.execute("""
                CREATE TABLE IF NOT EXISTS inspection_records (
                    id TEXT PRIMARY KEY,
                    source_type TEXT NOT NULL DEFAULT 'image',
                    timestamp TEXT NOT NULL,
                    model_name TEXT NOT NULL,
                    threshold REAL DEFAULT 0.5,
                    img_size INTEGER DEFAULT 256,
                    crack_ratio REAL NOT NULL DEFAULT 0.0,
                    affected_area REAL DEFAULT 0.0,
                    infer_time REAL DEFAULT 0.0,
                    risk_level TEXT NOT NULL DEFAULT 'AN TOÀN',
                    risk_color TEXT NOT NULL DEFAULT '#10B981',
                    risk_desc TEXT DEFAULT '',
                    recommendation TEXT DEFAULT '',
                    repair_method TEXT DEFAULT '',
                    orig_base64 TEXT DEFAULT '',
                    overlay_base64 TEXT DEFAULT '',
                    mask_base64 TEXT DEFAULT '',
                    fps REAL DEFAULT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            """)
            conn.execute("CREATE INDEX IF NOT EXISTS idx_records_timestamp ON inspection_records(timestamp DESC);")
            conn.execute("CREATE INDEX IF NOT EXISTS idx_records_source_type ON inspection_records(source_type);")
            conn.execute("CREATE INDEX IF NOT EXISTS idx_records_risk_level ON inspection_records(risk_level);")
        
        # Migrate from JSON to SQLite if table empty
        cur = conn.execute("SELECT COUNT(*) FROM inspection_records;")
        if cur.fetchone()[0] == 0 and os.path.exists(JSON_BACKUP_FILE):
            _migrate_json_to_sqlite(conn)
    finally:
        conn.close()

def _init_mssql() -> None:
    """Ensure CrackVisionDB and inspection_records table exist on Microsoft SQL Server."""
    # Step A: Create database if not exists
    conn_master = pyodbc.connect(MSSQL_MASTER_CONN_STR, timeout=4, autocommit=True)
    cur_m = conn_master.cursor()
    cur_m.execute(f"""
        IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'{MSSQL_DATABASE}')
        BEGIN
            CREATE DATABASE [{MSSQL_DATABASE}];
        END
    """)
    conn_master.close()

    # Step B: Create inspection_records table in CrackVisionDB
    conn_db = get_mssql_connection()
    cur = conn_db.cursor()
    cur.execute("""
        IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = N'inspection_records')
        BEGIN
            CREATE TABLE inspection_records (
                id NVARCHAR(64) PRIMARY KEY,
                source_type NVARCHAR(32) NOT NULL DEFAULT 'image',
                timestamp NVARCHAR(32) NOT NULL,
                model_name NVARCHAR(128) NOT NULL,
                threshold FLOAT DEFAULT 0.5,
                img_size INT DEFAULT 256,
                crack_ratio FLOAT NOT NULL DEFAULT 0.0,
                affected_area FLOAT DEFAULT 0.0,
                infer_time FLOAT DEFAULT 0.0,
                risk_level NVARCHAR(64) NOT NULL DEFAULT 'AN TOÀN',
                risk_color NVARCHAR(32) NOT NULL DEFAULT '#10B981',
                risk_desc NVARCHAR(MAX) NULL,
                recommendation NVARCHAR(MAX) NULL,
                repair_method NVARCHAR(MAX) NULL,
                orig_base64 NVARCHAR(MAX) NULL,
                overlay_base64 NVARCHAR(MAX) NULL,
                mask_base64 NVARCHAR(MAX) NULL,
                fps FLOAT NULL,
                created_at DATETIME DEFAULT GETDATE()
            );
            CREATE INDEX idx_mssql_records_timestamp ON inspection_records(timestamp DESC);
            CREATE INDEX idx_mssql_records_source_type ON inspection_records(source_type);
            CREATE INDEX idx_mssql_records_risk_level ON inspection_records(risk_level);
        END
    """)

    # Step C: Migrate existing records from SQLite/JSON to MSSQL if needed
    cur.execute("SELECT COUNT(*) FROM inspection_records;")
    count = cur.fetchone()[0]
    if count == 0:
        _sync_sqlite_to_mssql(cur)

    conn_db.close()

def _migrate_json_to_sqlite(conn: sqlite3.Connection) -> None:
    """Populate SQLite from JSON backup."""
    try:
        with open(JSON_BACKUP_FILE, "r", encoding="utf-8") as f:
            records = json.load(f)
        for r in records:
            _insert_record_sqlite(conn, r)
    except Exception as e:
        print(f"[SQL MIGRATION ERROR] {e}")

def _sync_sqlite_to_mssql(cur_mssql) -> None:
    """Copy all records from SQLite into Microsoft SQL Server."""
    conn_sq = get_sqlite_connection()
    try:
        rows = conn_sq.execute("SELECT * FROM inspection_records;").fetchall()
        for row in rows:
            r = dict(row)
            _insert_record_mssql(cur_mssql, r)
        print(f"[SQL DATABASE] Da sao chep {len(rows)} ban ghi sang Microsoft SQL Server.")
    except Exception as e:
        print(f"[SQL SYNC ERROR] {e}")
    finally:
        conn_sq.close()

def _insert_record_sqlite(conn: sqlite3.Connection, r: Dict[str, Any]) -> None:
    conn.execute("""
        INSERT OR REPLACE INTO inspection_records (
            id, source_type, timestamp, model_name, threshold, img_size,
            crack_ratio, affected_area, infer_time, risk_level, risk_color,
            risk_desc, recommendation, repair_method, orig_base64,
            overlay_base64, mask_base64, fps
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    """, (
        r.get("id"),
        r.get("source_type", "image"),
        r.get("timestamp", ""),
        r.get("model_name", "U-Net ResNet-34"),
        float(r.get("threshold", 0.5)),
        int(r.get("img_size", 256)),
        float(r.get("crack_ratio", 0.0)),
        float(r.get("affected_area", 0.0)),
        float(r.get("infer_time", 25.0)),
        r.get("risk_level", "AN TOÀN"),
        r.get("risk_color", "#10B981"),
        r.get("risk_desc", ""),
        r.get("recommendation", ""),
        r.get("repair_method", ""),
        r.get("orig_base64", ""),
        r.get("overlay_base64", ""),
        r.get("mask_base64", ""),
        r.get("fps")
    ))

def _insert_record_mssql(cur_mssql, r: Dict[str, Any]) -> None:
    audit_id = r.get("id")
    # Delete existing if any, then insert
    cur_mssql.execute("DELETE FROM inspection_records WHERE id = ?;", (audit_id,))
    cur_mssql.execute("""
        INSERT INTO inspection_records (
            id, source_type, timestamp, model_name, threshold, img_size,
            crack_ratio, affected_area, infer_time, risk_level, risk_color,
            risk_desc, recommendation, repair_method, orig_base64,
            overlay_base64, mask_base64, fps
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    """, (
        audit_id,
        r.get("source_type", "image"),
        r.get("timestamp", ""),
        r.get("model_name", "U-Net ResNet-34"),
        float(r.get("threshold", 0.5)),
        int(r.get("img_size", 256)),
        float(r.get("crack_ratio", 0.0)),
        float(r.get("affected_area", 0.0)),
        float(r.get("infer_time", 25.0)),
        r.get("risk_level", "AN TOÀN"),
        r.get("risk_color", "#10B981"),
        r.get("risk_desc", ""),
        r.get("recommendation", ""),
        r.get("repair_method", ""),
        r.get("orig_base64", ""),
        r.get("overlay_base64", ""),
        r.get("mask_base64", ""),
        r.get("fps")
    ))

def save_record(record: Dict[str, Any]) -> bool:
    """Save an inspection record to the active SQL Database (and backup replica)."""
    with _db_lock:
        # Always write to SQLite replica
        conn_sq = get_sqlite_connection()
        try:
            with conn_sq:
                _insert_record_sqlite(conn_sq, record)
        finally:
            conn_sq.close()

        # If Microsoft SQL Server is active, write directly to MSSQL
        if _active_engine == "mssql" and check_mssql_connection():
            try:
                conn_ms = get_mssql_connection()
                cur = conn_ms.cursor()
                _insert_record_mssql(cur, record)
                conn_ms.close()
            except Exception as e:
                print(f"[MSSQL SAVE WARNING] Loi khi luu len SQL Server: {e}")

        # Sync to JSON backup file
        _sync_sqlite_to_json()
        return True

def load_all_records(limit: int = 100, source_type: Optional[str] = None, risk_level: Optional[str] = None) -> List[Dict[str, Any]]:
    """Retrieve inspection records using SQL queries."""
    # Attempt Microsoft SQL Server first if active
    if _active_engine == "mssql" and check_mssql_connection():
        try:
            conn = get_mssql_connection()
            cur = conn.cursor()
            
            query = "SELECT * FROM inspection_records"
            params = []
            conditions = []
            if source_type and source_type.lower() != "all":
                conditions.append("source_type = ?")
                params.append(source_type.lower())
            if risk_level and risk_level.lower() != "all":
                if risk_level.lower() == "safe":
                    conditions.append("risk_level LIKE '%AN TOÀN%'")
                elif risk_level.lower() == "warning":
                    conditions.append("risk_level LIKE '%CẢNH BÁO%'")
                elif risk_level.lower() == "danger":
                    conditions.append("risk_level LIKE '%NGUY HIỂM%'")

            if conditions:
                query += " WHERE " + " AND ".join(conditions)

            query += " ORDER BY timestamp DESC;"
            cur.execute(query, tuple(params))
            
            columns = [column[0] for column in cur.description]
            results = []
            for row in cur.fetchall():
                results.append(_sanitize_row(dict(zip(columns, row))))
                if len(results) >= limit:
                    break
            conn.close()
            return results
        except Exception as e:
            print(f"[MSSQL QUERY WARNING] Loi truy van MSSQL, fallback ve SQLite: {e}")

    # Fallback to SQLite
    conn_sq = get_sqlite_connection()
    try:
        query = "SELECT * FROM inspection_records"
        params = []
        conditions = []
        if source_type and source_type.lower() != "all":
            conditions.append("source_type = ?")
            params.append(source_type.lower())
        if risk_level and risk_level.lower() != "all":
            if risk_level.lower() == "safe":
                conditions.append("risk_level LIKE '%AN TOÀN%'")
            elif risk_level.lower() == "warning":
                conditions.append("risk_level LIKE '%CẢNH BÁO%'")
            elif risk_level.lower() == "danger":
                conditions.append("risk_level LIKE '%NGUY HIỂM%'")

        if conditions:
            query += " WHERE " + " AND ".join(conditions)
        query += " ORDER BY timestamp DESC LIMIT ?;"
        params.append(limit)

        cur = conn_sq.execute(query, tuple(params))
        return [dict(row) for row in cur.fetchall()]
    finally:
        conn_sq.close()

def get_record_by_id(audit_id: str) -> Optional[Dict[str, Any]]:
    """Query a single record by primary key."""
    if _active_engine == "mssql" and check_mssql_connection():
        try:
            conn = get_mssql_connection()
            cur = conn.cursor()
            cur.execute("SELECT * FROM inspection_records WHERE id = ?;", (audit_id,))
            row = cur.fetchone()
            if row:
                cols = [c[0] for c in cur.description]
                res = _sanitize_row(dict(zip(cols, row)))
                conn.close()
                return res
            conn.close()
        except Exception as e:
            print(f"[MSSQL GET ID WARNING] {e}")

    # Fallback SQLite
    conn = get_sqlite_connection()
    try:
        cur = conn.execute("SELECT * FROM inspection_records WHERE id = ?;", (audit_id,))
        row = cur.fetchone()
        return dict(row) if row else None
    finally:
        conn.close()

def delete_record_by_id(audit_id: str) -> bool:
    """Delete a record by primary key across engines."""
    with _db_lock:
        # Delete from SQLite
        conn_sq = get_sqlite_connection()
        try:
            with conn_sq:
                conn_sq.execute("DELETE FROM inspection_records WHERE id = ?;", (audit_id,))
        finally:
            conn_sq.close()

        # Delete from MSSQL
        if check_mssql_connection():
            try:
                conn_ms = get_mssql_connection()
                cur = conn_ms.cursor()
                cur.execute("DELETE FROM inspection_records WHERE id = ?;", (audit_id,))
                conn_ms.close()
            except Exception as e:
                print(f"[MSSQL DELETE WARNING] {e}")

        _sync_sqlite_to_json()
        return True

def clear_all_records() -> bool:
    """Clear all records from database."""
    with _db_lock:
        conn_sq = get_sqlite_connection()
        try:
            with conn_sq:
                conn_sq.execute("DELETE FROM inspection_records;")
        finally:
            conn_sq.close()

        if check_mssql_connection():
            try:
                conn_ms = get_mssql_connection()
                cur = conn_ms.cursor()
                cur.execute("DELETE FROM inspection_records;")
                conn_ms.close()
            except Exception as e:
                print(f"[MSSQL CLEAR WARNING] {e}")

        _sync_sqlite_to_json()
        return True

def get_database_stats() -> Dict[str, Any]:
    """Retrieve full database statistics and connection metadata."""
    is_mssql = (_active_engine == "mssql" and check_mssql_connection())

    if is_mssql:
        try:
            conn = get_mssql_connection()
            cur = conn.cursor()
            
            cur.execute("SELECT COUNT(*) FROM inspection_records;")
            total_count = cur.fetchone()[0]

            cur.execute("SELECT source_type, COUNT(*) FROM inspection_records GROUP BY source_type;")
            source_dist = {r[0]: r[1] for r in cur.fetchall()}

            cur.execute("SELECT risk_level, COUNT(*) FROM inspection_records GROUP BY risk_level;")
            risk_dist = {r[0]: r[1] for r in cur.fetchall()}

            cur.execute("""
                SELECT 
                    COALESCE(AVG(crack_ratio), 0.0),
                    COALESCE(AVG(infer_time), 0.0),
                    COALESCE(MAX(crack_ratio), 0.0),
                    COALESCE(SUM(affected_area), 0.0)
                FROM inspection_records;
            """)
            agg = cur.fetchone()
            conn.close()

            return {
                "status": "online",
                "engine": "Microsoft SQL Server 2022 (SSMS Ready)",
                "server_instance": MSSQL_SERVER,
                "database_name": MSSQL_DATABASE,
                "table_name": "inspection_records",
                "authentication": "Windows Authentication (Trusted)",
                "ssms_status": "San sang ket noi qua SQL Server Management Studio",
                "total_records": total_count,
                "source_distribution": source_dist,
                "risk_distribution": risk_dist,
                "avg_crack_ratio": round(float(agg[0]), 2),
                "avg_infer_time_ms": round(float(agg[1]), 1),
                "max_crack_ratio": round(float(agg[2]), 2),
                "total_affected_area_m2": round(float(agg[3]), 3)
            }
        except Exception as e:
            print(f"[MSSQL STATS ERROR] {e}")

    # SQLite Stats
    conn_sq = get_sqlite_connection()
    try:
        total_count = conn_sq.execute("SELECT COUNT(*) FROM inspection_records;").fetchone()[0]
        cur_src = conn_sq.execute("SELECT source_type, COUNT(*) FROM inspection_records GROUP BY source_type;")
        source_dist = {r[0]: r[1] for r in cur_src.fetchall()}
        cur_risk = conn_sq.execute("SELECT risk_level, COUNT(*) FROM inspection_records GROUP BY risk_level;")
        risk_dist = {r[0]: r[1] for r in cur_risk.fetchall()}
        agg = conn_sq.execute("""
            SELECT 
                COALESCE(AVG(crack_ratio), 0.0),
                COALESCE(AVG(infer_time), 0.0),
                COALESCE(MAX(crack_ratio), 0.0),
                COALESCE(SUM(affected_area), 0.0)
            FROM inspection_records;
        """).fetchone()

        db_size_kb = round(os.path.getsize(SQLITE_DB_FILE) / 1024, 2) if os.path.exists(SQLITE_DB_FILE) else 0

        return {
            "status": "online",
            "engine": "SQLite 3 Relational SQL",
            "database_name": os.path.basename(SQLITE_DB_FILE),
            "table_name": "inspection_records",
            "db_size_kb": db_size_kb,
            "total_records": total_count,
            "source_distribution": source_dist,
            "risk_distribution": risk_dist,
            "avg_crack_ratio": round(float(agg[0]), 2),
            "avg_infer_time_ms": round(float(agg[1]), 1),
            "max_crack_ratio": round(float(agg[2]), 2),
            "total_affected_area_m2": round(float(agg[3]), 3)
        }
    finally:
        conn_sq.close()

def _sync_sqlite_to_json() -> None:
    """Sync recent records to JSON backup."""
    conn = get_sqlite_connection()
    try:
        cur = conn.execute("SELECT * FROM inspection_records ORDER BY timestamp DESC LIMIT 100;")
        rows = [dict(row) for row in cur.fetchall()]
        with open(JSON_BACKUP_FILE, "w", encoding="utf-8") as f:
            json.dump(rows, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f"[JSON BACKUP WARNING] {e}")
    finally:
        conn.close()

# Alias for compatibility
DB_FILE = SQLITE_DB_FILE
