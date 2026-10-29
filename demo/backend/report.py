import io
import time
import base64
from PIL import Image
import tempfile
import os

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image as RLImage, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# Register TrueType Unicode font for full Vietnamese character rendering
_FONTS_INITIALIZED = False
FONT_REGULAR = 'Helvetica'
FONT_BOLD = 'Helvetica-Bold'
FONT_ITALIC = 'Helvetica-Oblique'

def _setup_vietnamese_fonts():
    global _FONTS_INITIALIZED, FONT_REGULAR, FONT_BOLD, FONT_ITALIC
    if _FONTS_INITIALIZED:
        return
    
    font_candidates = [
        # Windows system fonts
        (
            "C:/Windows/Fonts/arial.ttf",
            "C:/Windows/Fonts/arialbd.ttf",
            "C:/Windows/Fonts/ariali.ttf",
            "C:/Windows/Fonts/arialbi.ttf"
        ),
        (
            "C:/Windows/Fonts/segoeui.ttf",
            "C:/Windows/Fonts/segoeuib.ttf",
            "C:/Windows/Fonts/segoeuii.ttf",
            "C:/Windows/Fonts/segoeuiz.ttf"
        ),
        (
            "C:/Windows/Fonts/times.ttf",
            "C:/Windows/Fonts/timesbd.ttf",
            "C:/Windows/Fonts/timesi.ttf",
            "C:/Windows/Fonts/timesbi.ttf"
        ),
        # Linux / Unix fallbacks
        (
            "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Oblique.ttf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-BoldOblique.ttf"
        )
    ]
    
    for regular, bold, italic, bold_italic in font_candidates:
        if os.path.exists(regular):
            try:
                pdfmetrics.registerFont(TTFont('VietUnicode', regular))
                pdfmetrics.registerFont(TTFont('VietUnicode-Bold', bold if os.path.exists(bold) else regular))
                pdfmetrics.registerFont(TTFont('VietUnicode-Italic', italic if os.path.exists(italic) else regular))
                pdfmetrics.registerFont(TTFont('VietUnicode-BoldItalic', bold_italic if os.path.exists(bold_italic) else regular))
                
                pdfmetrics.registerFontFamily(
                    'VietUnicode',
                    normal='VietUnicode',
                    bold='VietUnicode-Bold',
                    italic='VietUnicode-Italic',
                    boldItalic='VietUnicode-BoldItalic'
                )
                FONT_REGULAR = 'VietUnicode'
                FONT_BOLD = 'VietUnicode-Bold'
                FONT_ITALIC = 'VietUnicode-Italic'
                _FONTS_INITIALIZED = True
                return
            except Exception:
                continue

_setup_vietnamese_fonts()

def generate_pdf_bytes(orig_base64_str, overlay_base64_str, metrics, lang="vi"):
    _setup_vietnamese_fonts()
    is_en = (lang == "en")
    
    # Decode base64 to PIL Images
    if orig_base64_str.startswith("data:image"):
        orig_base64_str = orig_base64_str.split(",")[1]
    if overlay_base64_str.startswith("data:image"):
        overlay_base64_str = overlay_base64_str.split(",")[1]
        
    orig_bytes = base64.b64decode(orig_base64_str)
    overlay_bytes = base64.b64decode(overlay_base64_str)
    
    img_orig = Image.open(io.BytesIO(orig_bytes))
    img_overlay = Image.open(io.BytesIO(overlay_bytes))

    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4, rightMargin=36, leftMargin=36, topMargin=36, bottomMargin=36)
    story = []
    
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName=FONT_BOLD,
        fontSize=16,
        leading=21,
        textColor=colors.HexColor('#1E293B'),
        spaceAfter=12
    )
    h2_style = ParagraphStyle(
        'SectionHeader',
        parent=styles['Heading2'],
        fontName=FONT_BOLD,
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#2563EB'),
        spaceBefore=10,
        spaceAfter=8
    )
    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName=FONT_REGULAR,
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor('#334155')
    )
    
    table_header_style = ParagraphStyle(
        'TableHeaderCustom',
        parent=body_style,
        fontName=FONT_BOLD,
        fontSize=9.5,
        leading=13,
        textColor=colors.white
    )
    
    table_cell_style = ParagraphStyle(
        'TableCellCustom',
        parent=body_style,
        fontName=FONT_REGULAR,
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#1E293B')
    )
    
    # Map risk metrics to English if needed
    raw_risk = str(metrics.get('risk_level', 'N/A'))
    if is_en:
        if 'AN TOÀN' in raw_risk or 'BÌNH THƯỜNG' in raw_risk:
            risk_level_display = "SAFE / NORMAL (LOW RISK)"
            risk_desc_display = "Crack density within safe engineering limits"
            rec_display = "Routine inspection every 6 months; monitor micro-cracking"
            repair_display = "Surface cleaning, weatherproofing hydrophobic coating"
        elif 'CẢNH BÁO' in raw_risk:
            risk_level_display = "WARNING (MODERATE RISK)"
            risk_desc_display = "Active crack propagation detected; monitoring required"
            rec_display = "Conduct detailed ultrasonic inspection; monitor width variations"
            repair_display = "Low-viscosity Epoxy resin pressure injection and surface sealing"
        elif 'NGUY HIỂM' in raw_risk:
            risk_level_display = "CRITICAL (HIGH STRUCTURAL RISK)"
            risk_desc_display = "Severe wide cracks threatening structural integrity"
            rec_display = "Halt heavy loads on structure immediately; full engineering review"
            repair_display = "High-pressure Epoxy injection, CFRP wrapping or structural steel jacketing"
        else:
            risk_level_display = raw_risk
            risk_desc_display = str(metrics.get('risk_desc', ''))
            rec_display = str(metrics.get('recommendation', ''))
            repair_display = str(metrics.get('repair_method', ''))
    else:
        risk_level_display = raw_risk
        risk_desc_display = str(metrics.get('risk_desc', ''))
        rec_display = str(metrics.get('recommendation', ''))
        repair_display = str(metrics.get('repair_method', ''))

    # Header
    doc_title = "AUTOMATIC CONCRETE CRACK AUDIT REPORT (AI INSPECTION)" if is_en else "BÁO CÁO PHÂN TÍCH VẾT NỨT CÔNG TRÌNH TỰ ĐỘNG (AI AUDIT REPORT)"
    session_label = "<b>Inspection Session ID:</b>" if is_en else "<b>Mã phiên kiểm định:</b>"
    time_label = "<b>Generated At:</b>" if is_en else "<b>Thời gian tạo:</b>"
    story.append(Paragraph(doc_title, title_style))
    story.append(Paragraph(f"{session_label} CRACK-AUDIT-{int(time.time())} | {time_label} {time.strftime('%Y-%m-%d %H:%M:%S')}", body_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#CBD5E1'), spaceBefore=8, spaceAfter=12))
    
    # Summary Metrics Table
    sec1_title = "1. Quantitative Inspection Metrics" if is_en else "1. Thông số kiểm định định lượng"
    story.append(Paragraph(sec1_title, h2_style))
    
    if is_en:
        raw_data = [
            ["Evaluation Metric", "Measured Value", "Standard Benchmark"],
            ["AI Model Architecture", str(metrics.get('model_name', 'AI Engine')), "AI Segmentation Engine"],
            ["Crack Density Ratio", f"{metrics.get('crack_ratio', 0):.2f} %", "Crack Pixels / Total Pixels"],
            ["Estimated Damage Area", f"{metrics.get('affected_area', 0):.3f} m²", "Standard Metric Conversion"],
            ["Inference Latency", f"{metrics.get('infer_time', 0):.1f} ms", "Model Forward Pass Time"],
            ["Structural Risk Level", risk_level_display, risk_desc_display]
        ]
    else:
        raw_data = [
            ["Thông số đánh giá", "Giá trị thu được", "Đánh giá tiêu chuẩn"],
            ["Mô hình sử dụng", str(metrics.get('model_name', 'AI Engine')), "AI Segmentation Engine"],
            ["Tỷ lệ mật độ vết nứt", f"{metrics.get('crack_ratio', 0):.2f} %", "Số pixel vết nứt / Tổng pixel"],
            ["Diện tích hư hỏng ước tính", f"{metrics.get('affected_area', 0):.3f} m²", "Quy đổi tiêu chuẩn"],
            ["Thời gian suy luận (Latency)", f"{metrics.get('infer_time', 0):.1f} ms", "Thời gian xử lý mô hình"],
            ["Mức độ nguy cơ hư hỏng", risk_level_display, risk_desc_display]
        ]
    
    data = []
    for row_idx, row in enumerate(raw_data):
        row_cells = []
        for cell in row:
            if row_idx == 0:
                row_cells.append(Paragraph(str(cell), table_header_style))
            else:
                row_cells.append(Paragraph(str(cell), table_cell_style))
        data.append(row_cells)
    
    t = Table(data, colWidths=[170, 150, 200])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#1E293B')),
        ('BOTTOMPADDING', (0,0), (-1,0), 6),
        ('TOPPADDING', (0,0), (-1,0), 6),
        ('BACKGROUND', (0,1), (-1,-1), colors.HexColor('#F8FAFC')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#E2E8F0')),
        ('TOPPADDING', (0,1), (-1,-1), 5),
        ('BOTTOMPADDING', (0,1), (-1,-1), 5),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t)
    story.append(Spacer(1, 10))
    
    # Images Comparison
    sec2_title = "2. Visual Crack Segmentation (Side-by-Side)" if is_en else "2. Hình ảnh trực quan hóa vết nứt (Side-by-Side)"
    story.append(Paragraph(sec2_title, h2_style))
    
    with tempfile.NamedTemporaryFile(suffix=".jpg", delete=False) as f1, tempfile.NamedTemporaryFile(suffix=".jpg", delete=False) as f2:
        img_orig.save(f1.name)
        img_overlay.save(f2.name)
        img1_path, img2_path = f1.name, f2.name
        
    img_label_orig = "<b>Original Concrete Surface</b>" if is_en else "<b>Ảnh gốc bề mặt bê tông</b>"
    img_label_overlay = "<b>AI Segmentation Overlay Boundary</b>" if is_en else "<b>Mặt nạ phủ màu ranh giới vết nứt</b>"
    
    img_table_data = [
        [RLImage(img1_path, width=230, height=170), RLImage(img2_path, width=230, height=170)],
        [Paragraph(img_label_orig, body_style), Paragraph(img_label_overlay, body_style)]
    ]
    t_img = Table(img_table_data, colWidths=[245, 245])
    t_img.setStyle(TableStyle([
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_img)
    story.append(Spacer(1, 10))
    
    # Recommendations
    sec3_title = "3. Engineering Assessment & Repair Recommendations" if is_en else "3. Khuyến nghị và Phương án xử lý kỹ thuật"
    story.append(Paragraph(sec3_title, h2_style))
    
    if is_en:
        rec_text = f"""
        Based on semantic segmentation analysis by <b>{metrics.get('model_name', 'AI Engine')}</b>, the structure is categorized as: <b>{risk_level_display}</b>.<br/>
        - <b>Engineering Recommendation:</b> {rec_display}<br/>
        - <b>Proposed Repair Method:</b> {repair_display}
        """
    else:
        rec_text = f"""
        Dựa trên kết quả phân đoạn tự động bằng mô hình <b>{metrics.get('model_name', 'AI Engine')}</b>, công trình đạt mức độ cảnh báo: <b>{risk_level_display}</b>.<br/>
        - <b>Khuyến nghị thi công:</b> {rec_display}<br/>
        - <b>Phương pháp gia cố đề xuất:</b> {repair_display}
        """
    story.append(Paragraph(rec_text, body_style))
    
    doc.build(story)
    
    try:
        os.remove(img1_path)
        os.remove(img2_path)
    except Exception:
        pass
    
    buffer.seek(0)
    return buffer.getvalue()
