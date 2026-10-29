document.addEventListener('DOMContentLoaded', () => {
    // =========================================================================
    // BILINGUAL (I18N) TRANSLATIONS DICTIONARY
    // =========================================================================
    const TRANSLATIONS = {
        vi: {
            brand_tagline: "Hệ Thống Kiểm Định Vết Nứt Bê Tông Tự Động",
            lang_btn_text: "Tiếng Việt",
            theme_color_btn: "Màu sắc",
            select_accent_color: "Màu sắc chủ đạo",
            theme_dark: "Giao diện Tối",
            theme_light: "Giao diện Sáng",
            gpu_system: "Hệ Thống GPU:",
            gpu_status: "Tốc Độ Cao (NVIDIA CUDA)",
            weights_status_badge: "Trọng số Kaggle Seg03, Seg04 & U-Net ResNet-34 (512x512) đã nạp",
            sec1_title: "Cấu hình mô hình",
            lbl_algo_group: "Nhóm thuật toán",
            opt_algo_dl: "Học sâu (Deep Learning Segmentation)",
            opt_algo_classical: "Xử lý ảnh cổ điển (Classical Vision)",
            lbl_model_arch: "Kiến trúc mô hình",
            opt_unet_resnet34_512: "U-Net ResNet-34 (512x512 - Đề xuất)",
            opt_deeplabv3_finetuned: "DeepLabV3+ (Fine-Tuned)",
            opt_deeplabv3_frozen: "DeepLabV3+ (Frozen Backbone)",
            opt_deeplabv3plus: "DeepLabV3+ (Fine-Tuned)",
            opt_compact_unet: "Compact U-Net (Seg03 Scratch)",
            lbl_classical_algo: "Thuật toán truyền thống",
            opt_sobel: "Toán tử Sobel + Phân ngưỡng Otsu",
            opt_canny: "Lọc cạnh Canny + Phân ngưỡng Otsu",
            lbl_resolution: "Độ phân giải đầu vào:",
            lbl_threshold: "Ngưỡng nhận dạng (Threshold):",
            sec2_title: "Hiển thị phủ màu vết nứt",
            lbl_overlay_color: "Màu phủ vết nứt (Overlay Color)",
            lbl_opacity: "Độ trong suốt (Opacity):",
            sec3_title: "Nạp trọng số mô hình (.pth)",
            lbl_upload_pth: "Nạp tệp .pth tùy chỉnh",
            tab_dashboard: "Tổng Quan Dashboard",
            dash_live_badge: "HỆ THỐNG TRỰC TUYẾN • THỜI GIAN THỰC",
            dash_hero_title: "Trung Tâm Giám Sát & Tổng Quan Dự Án",
            dash_hero_desc: "Bảng điều khiển trực quan hóa thời gian thực về dữ liệu kiểm định kết cấu công trình, các chỉ số mô hình học sâu và tình trạng cơ sở dữ liệu SQL Server.",
            dash_db_engine_lbl: "Database Engine",
            dash_core_model_lbl: "AI Core Model",
            btn_refresh_dashboard: "Cập Nhật Số Liệu",
            scanner_live_badge: "MÔ PHỎNG QUÉT VẾT NỨT HIỆN TRƯỜNG",
            scanner_title: "Hệ Thống Quét Laser Phân Đoạn & Khoanh Vùng Vết Nứt Tự Động",
            scanner_desc: "Mô phỏng luồng suy luận quang học của U-Net ResNet-34 độ phân giải 512×512, bắt trọn vi nứt tế vi dưới 0.20mm.",
            scan_mode_all: "Toàn Diện",
            scan_mode_mask: "Mặt Nạ Mask",
            scan_mode_stress: "Ứng Suất",
            dash_kpi_total: "Tổng Lượt Kiểm Định",
            dash_kpi_total_sub: "Đồng bộ hai chiều SQL Server",
            dash_kpi_model: "Mô Hình Đề Xuất Luận Văn",
            dash_kpi_fps: "Tốc Độ Suy Luận GPU",
            dash_kpi_fps_sub: "Độ trễ 28.9 ms (Vượt chuẩn 30 FPS)",
            dash_kpi_area: "Diện Tích Hư Hại Tích Lũy",
            dash_kpi_area_sub: "Tổng diện tích vết nứt bề mặt",
            dash_kpi_ratio: "Mật Độ Nứt Trung Bình",
            dash_kpi_dataset: "Bộ Dữ Liệu Thực Nghiệm",
            dash_kpi_dataset_sub: "Crack Segmentation Dataset (Kaggle)",
            dash_chart_risk_title: "Phân Bố Mức Độ Rủi Ro Kết Cấu",
            dash_chart_risk_sub: "Tỷ lệ các phiên kiểm định theo cấp độ nguy cơ (An toàn, Cảnh báo, Nguy hiểm)",
            dash_chart_trend_title: "Diễn Biến Mật Độ Vết Nứt Qua Các Phiên",
            dash_chart_trend_sub: "Mật độ khuyết tật (%) và thời gian xử lý AI (ms) của các đợt kiểm định gần đây",
            dash_chart_radar_title: "Đối Sánh Đa Tiêu Chí 3 Kiến Trúc Mô Hình",
            dash_chart_radar_sub: "So sánh U-Net ResNet-34 vs DeepLabV3+ vs Compact U-Net trên 5 trục kỹ thuật",
            dash_chart_source_title: "Cơ Cấu Phương Thức Kiểm Định",
            dash_chart_source_sub: "Phân bố số lượng kiểm tra giữa Ảnh tĩnh, Video công trình và Camera trực tiếp",
            dash_feed_title: "Hoạt Động Kiểm Định Vừa Thực Hiện",
            dash_feed_sub: "5 bản ghi kiểm định kết cấu mới nhất được lưu trong cơ sở dữ liệu",
            dash_btn_view_history: "Xem Tất Cả Trong Tab Lịch Sử",
            dash_timeline_tag: "Thời gian thực",
            pillar1_title: "Độ Phân Giải 512×512 Native",
            pillar1_desc: "Bảo toàn nguyên vẹn nhánh nứt tế vi dưới 0.2mm, tránh thất thoát thông tin biên khi resize về 256×256.",
            pillar2_title: "Hàm Mất Mát Kết Hợp BCE + Dice",
            pillar2_desc: "Giải quyết triệt để mất cân bằng mẫu cực đoan khi điểm ảnh vết nứt chỉ chiếm 1% - 5% tổng bề mặt bê tông.",
            pillar3_title: "Encoder Residual ResNet-34",
            pillar3_desc: "Tận dụng trọng số tiền huấn luyện ImageNet và đường tắt Skip Connections, hội tụ mượt mà đạt mIoU 58.39%.",
            pillar4_title: "Cơ Sở Dữ Liệu Kép Công Nghiệp",
            pillar4_desc: "Hỗ trợ Microsoft SQL Server 2022 (SSMS) phục vụ giám định doanh nghiệp kết hợp bộ nhớ đệm SQLite cục bộ.",
            tab_image: "Phân Tích Ảnh",
            tab_video: "Phân Tích Video",
            tab_camera: "Camera Trực Tiếp",
            tab_benchmark: "So Sánh Mô Hình",
            tab_about: "Giới Thiệu Đề Tài",
            drop_title: "Kéo và thả ảnh bề mặt công trình vào đây",
            drop_subtitle: "hoặc",
            browse_link: "nhấn vào đây để chọn ảnh từ máy tính",
            badge_max_size: "Tối đa 20MB",
            badge_gpu_accel: "Tăng tốc GPU / CPU",
            or_sample_divider: "Hoặc thử nghiệm nhanh với dữ liệu mẫu",
            btn_sample_image: "Dùng ảnh mẫu bê tông",
            sheet_title: "PHIẾU KIỂM ĐỊNH KỸ THUẬT KẾT CẤU BÊ TÔNG",
            metric_ratio_title: "Mật độ vết nứt",
            metric_ratio_sub: "Tỷ lệ điểm ảnh khuyết tật",
            metric_area_title: "Diện tích hư hại",
            metric_area_sub: "Ước tính vùng nứt bề mặt",
            metric_time_title: "Thời gian xử lý",
            metric_time_sub: "Độ trễ suy luận mô hình",
            metric_risk_title: "Mức độ rủi ro kết cấu",
            metric_risk_sub: "Đánh giá an toàn kết cấu",
            metric_waiting: "Chưa phân tích",
            legend_header: "Chú Giải Kỹ Thuật & Phân Vùng Nguy Cơ Kết Cấu:",
            legend_crack_title: "Vùng Vết Nứt (Defect)",
            legend_crack_sub: "Điểm ảnh phát hiện khuyết tật vết nứt",
            legend_concrete_title: "Bề Mặt Bê Tông Nguyên Vẹn",
            legend_concrete_sub: "Nền kết cấu không khuyết tật",
            legend_tag_safe: "An Toàn (< 1%)",
            legend_desc_safe: "Vết nứt vi mô bề mặt, an toàn",
            legend_tag_warning: "Cảnh Báo (1% - 3.5%)",
            legend_desc_warning: "Có dấu hiệu lan rộng, cần đo siêu âm",
            legend_tag_danger: "Nguy Hiểm (> 3.5%)",
            legend_desc_danger: "Mật độ nứt cao, cần gia cố khẩn cấp",
            view_curtain_btn: "Thanh Trượt So Sánh Interactive",
            view_split_btn: "Xem Song Song (Side-by-Side)",
            view_mask_btn: "Mặt Nạ Nhị Phân (Binary Mask)",
            curtain_placeholder_title: "Chưa Có Hình Ảnh Phân Tích",
            curtain_placeholder_desc: "Tải ảnh bề mặt công trình lên hoặc nhấn nút 'Dùng Ảnh Mẫu Vết Nứt Bê Tông' để xem kết quả phân đoạn tương tác.",
            split_orig_title: "Ảnh Gốc Bề Mặt Bê Tông",
            split_overlay_title: "Phân Đoạn & Phủ Màu (Overlay)",
            split_waiting_orig: "Chờ nạp ảnh bề mặt...",
            split_waiting_overlay: "Chờ kết quả phân đoạn AI...",
            mask_title: "Mặt Nạ Nhị Phân Phân Đoạn Vết Nứt (0: Bê tông / 255: Vết nứt)",
            mask_waiting: "Chờ trích xuất mặt nạ nhị phân 0/255...",
            rec_title_default: "Đánh giá chung: Chưa có dữ liệu ảnh",
            rec_desc_default: "Hãy tải lên một bức ảnh hoặc nhấn nút 'Dùng Ảnh Mẫu Vết Nứt Bê Tông' để bắt đầu chạy phân đoạn AI.",
            btn_pdf: "Tải Báo Cáo Audit PDF",
            btn_select_video: "Chọn Video Công Trình (.mp4, .mov)",
            btn_sample_video: "Dùng Video Mẫu Crack",
            btn_process_video_start: "Bắt Đầu Phân Đoạn Real-Time",
            btn_process_video_pause: "Tạm Dừng Phân Đoạn AI",
            video_speed: "Tốc Độ:",
            video_density: "Mật Độ:",
            video_alert: "Cảnh Báo:",
            video_orig_stream: "Video Gốc Bề Mặt Công Trình (Original Stream)",
            video_ai_stream: "Phân Đoạn AI Real-Time Overlay (AI Stream)",
            video_processing_loader: "Đang Xử Lý Khung Hình...",
            btn_webcam_on: "Bật WebCam Kiểm Định",
            btn_webcam_off: "Tắt WebCam",
            btn_camera_ai_start: "Bắt Đầu Phân Đoạn AI",
            btn_camera_ai_pause: "Tạm Dừng Phân Đoạn AI",
            btn_camera_snapshot: "Chụp Ảnh & Phân Tích",
            btn_virtual_camera_on: "Dùng Luồng Mô Phỏng",
            btn_virtual_camera_off: "Dừng Luồng Mô Phỏng",
            camera_stream_title: "Luồng Camera Hiện Trường Trực Tiếp (Live Stream)",
            cam_not_active_title: "Camera Chưa Kích Hoạt",
            cam_not_active_desc: "Nhấn 'Bật WebCam Kiểm Định' để kết nối máy quay hoặc nhấn 'Dùng Luồng Mô Phỏng' để thử nghiệm ngay tính năng phân đoạn.",
            cam_ai_wait_title: "Chờ Khởi Động AI",
            cam_ai_wait_desc: "Bật Camera và nhấn 'Bắt Đầu Phân Đoạn AI' để hiển thị luồng phủ màu ranh giới vết nứt thời gian thực.",
            cam_loader_text: "Đang Phân Đoạn Trực Tiếp...",
            bench_title: "So Sánh & Phân Tích Chuyên Sâu Các Mô Hình AI",
            bench_desc: "Đối sánh thực nghiệm giữa các kiến trúc Học Sâu và Phương pháp Cổ điển khi ứng dụng vào Phân Tích Ảnh Tĩnh và Phân Tích Video / Camera Trực Tiếp (Tập kiểm thử 1.695 ảnh vết nứt bê tông độc lập).",
            bench_filter_all: "Tất Cả Kịch Bản",
            bench_filter_image: "Chuyên Phân Tích Ảnh",
            bench_filter_video: "Chuyên Phân Tích Video",
            rec_badge_image: "TỐI ƯU NHẤT CHO ẢNH TĨNH",
            rec_image_summary: "Khuyên dùng khi lập báo cáo thẩm định hồ sơ công trình, cần đo đạc diện tích nứt (m²) chính xác tuyệt đối và phát hiện các đường nứt vi mô cực mảnh (< 0.2mm).",
            rec_img_point1_title: "Độ sắc nét & mIoU cao nhất (61.2% / Dice 75.9%):",
            rec_img_point1_desc: "Mô-đun ASPP với các lớp tích chập mở rộng (Dilated Convolutions) trích xuất đặc trưng đa tỷ lệ, tái hiện toàn vẹn mạng lưới nứt phức tạp không bị đứt đoạn.",
            rec_img_point2_title: "Hạn chế khi chạy Video:",
            rec_img_point2_desc: "Tốc độ ~28.6 FPS, tiêu hao VRAM lớn (40.1M params). Nếu quay quét camera nhanh trên phần cứng trung bình sẽ xảy ra hiện tượng trễ khung hình.",
            tag_legal_audit: "Hồ Sơ Pháp Lý Kiểm Định",
            tag_precise_area: "Đo Diện Tích m² Chuẩn Xác",
            rec_badge_video: "TỐI ƯU NHẤT CHO VIDEO & CAMERA",
            rec_video_summary: "Khuyên dùng khi khảo sát hiện trường trực tiếp, bay Drone quét dọc bề mặt dầm cầu, trụ bê tông cao tầng hoặc livestream camera kiểm tra liên tục không giật lag.",
            rec_vid_point1_title: "Tốc độ thời gian thực vượt trội (42.5 FPS / Độ trễ 23.5ms):",
            rec_vid_point1_desc: "Kiến trúc Encoder-Decoder đối xứng tinh gọn, dung lượng nhẹ, xử lý tức thời từng khung hình mà không gây đầy bộ đệm (frame backlog).",
            rec_vid_point2_title: "Đánh đổi kỹ thuật (Trade-off):",
            rec_vid_point2_desc: "Độ nét biên đạt mIoU 54.5%, đủ tin cậy để khoanh vùng hư hại tức thời khi di chuyển, nhưng các mao mạch vi nứt cực mảnh đôi khi có thể bị gián đoạn nhẹ.",
            tag_drone_inspection: "Khảo Sát Drone Công Trình",
            tag_realtime_stream: "Giám Sát Hiện Trường Trực Tiếp",
            bench_table_title: "Bảng Đối Sánh Chi Tiết Toàn Diện 5 Mô Hình",
            bench_table_desc: "So sánh trực tiếp điểm số phù hợp cho Ảnh vs Video, độ chính xác phân đoạn, độ trễ suy luận và số lượng tham số.",
            th_model: "Mô Hình",
            th_suitability_img: "Phù Hợp Phân Tích Ảnh",
            th_suitability_vid: "Phù Hợp Phân Tích Video",
            th_iou: "IoU (Jaccard)",
            th_dice: "Dice (F1)",
            th_fps: "Tốc Độ (FPS)",
            th_latency: "Độ Trễ (ms)",
            th_application_rec: "Khuyến Nghị Ứng Dụng Thực Tiễn",
            chart1_title: "Chất Lượng Phân Tích Ảnh: Chỉ Số IoU & Dice F1",
            chart2_title: "Hiệu Năng Phân Tích Video: Tốc Độ Khung Hình (FPS)",
            stat_best_iou_title: "Độ Chính Xác Ảnh Cao Nhất",
            stat_best_fps_title: "Tốc Độ Video Nhanh Nhất",
            stat_lowest_latency_title: "Độ Trễ Video Thấp Nhất",
            stat_min_width_title: "Độ Rộng Nứt Nhỏ Nhất",
            gallery_img_title: "Thực Nghiệm Thị Giác: Đối Sánh Phân Đoạn Trên Cùng Vết Nứt Vi Mô",
            gallery_img_desc: "So sánh trực quan khả năng bảo toàn ranh giới vi nứt giữa các thuật toán khi phân tích ảnh hiện trường độ phân giải cao.",
            gallery_vid_title: "Thực Nghiệm Luồng Video: Đo Lường Hiện Tượng Trễ Khung Hình & Đầy Bộ Đệm",
            gallery_vid_desc: "Mô phỏng luồng camera quét dọc dầm cầu bê tông với hiển thị HUD Telemetry thời gian thực.",
            deep_dive_title: "Giải Mã Kỹ Thuật: Tại Sao Có Sự Khác Biệt Giữa Phân Tích Ảnh & Video?",
            dd_img_title: "Cơ Chế Phân Tích Ảnh Tĩnh Tối Ưu",
            dd_img_p1_bold: "Yêu cầu cốt lõi:",
            dd_img_p1_text: "Độ chính xác từng pixel (Pixel-level Precision), phân tách được vết nứt có độ mở chỉ vài pixel mà không bị đứt gãy.",
            dd_img_p2_bold: "Ưu thế của DeepLabV3+:",
            dd_img_p2_text: "Mô-đun ASPP (Atrous Spatial Pyramid Pooling) áp dụng nhiều tỷ lệ giãn nở (dilation rates = 6, 12, 18) giúp mở rộng vùng bao quát mà không làm suy giảm độ phân giải, kết hợp bộ giải mã phục hồi biên sắc nét.",
            dd_img_p3_bold: "Chi phí đánh đổi:",
            dd_img_p3_text: "Cần tính toán 40.1 triệu tham số, tốn thời gian hơn (~35ms/ảnh) — điều này hoàn toàn chấp nhận được với ảnh chụp kiểm định tĩnh.",
            dd_vid_title: "Cơ Chế Phân Tích Video & Camera Tối Ưu",
            dd_vid_p1_bold: "Yêu cầu cốt lõi:",
            dd_vid_p1_text: "Tốc độ > 30 FPS để bắt kịp tần số quét camera, độ trễ suy luận < 25ms nhằm ngăn chặn hiện tượng dồn nghẽn bộ đệm khung hình.",
            dd_vid_p2_bold: "Ưu thế của Compact U-Net:",
            dd_vid_p2_text: "Đường truyền tắt Skip Connections trực tiếp giữa Encoder và Decoder với số kênh tối ưu, giảm thiểu 40% chi phí tính toán so với các backbone nặng, duy trì FPS ổn định ngay cả khi camera lia nhanh.",
            dd_vid_p3_bold: "Vai trò của phương pháp Cổ Điển:",
            dd_vid_p3_text: "Sobel/Canny (120 FPS) có thể đóng vai trò 'Bộ lọc chuyển động' tiền trạm, chỉ kích hoạt suy luận Deep Learning khi phát hiện có biến đổi cạnh nghi ngờ nứt.",
            about_title: "Khóa Luận Tốt Nghiệp: Phát Hiện Vết Nứt Bề Mặt Công Trình",
            about_topic_lbl: "Đề tài:",
            about_topic_val: "Phát hiện vết nứt bề mặt công trình bằng mô hình phân đoạn ảnh theo hướng ứng dụng.",
            about_dataset_lbl: "Bộ dữ liệu:",
            about_dataset_val: "Crack Segmentation Dataset (Kaggle) - 11.298 ảnh chuẩn nhị phân.",
            about_models_lbl: "Các mô hình thử nghiệm:",
            about_models_val: "Sobel + Otsu (Cổ điển), Compact U-Net (Seg03), DeepLabV3+ (Frozen Backbone), DeepLabV3+ (Fine-Tuned), U-Net ResNet-34 (Đề xuất).",
            tab_history: "Lịch Sử Kiểm Định",
            history_title: "Nhật Ký & Lịch Sử Kiểm Định Công Trình",
            history_desc: "Theo dõi tiến trình kiểm định vết nứt, đối chiếu ranh giới hư hỏng và xuất lại báo cáo kỹ thuật bất cứ lúc nào.",
            history_db_lbl: "Cơ Sở Dữ Liệu SQL:",
            history_total_lbl: "Tổng Số Phiên:",
            btn_export_csv: "Xuất Bảng CSV",
            btn_clear_history: "Xóa Lịch Sử",
            filter_risk_lbl: "Lọc Theo Rủi Ro:",
            opt_filter_all: "Tất Cả Cấp Độ",
            opt_filter_safe: "🟢 An Toàn (< 1%)",
            opt_filter_warning: "🟡 Cảnh Báo (1% - 3.5%)",
            opt_filter_critical: "🔴 Nguy Hiểm (> 3.5%)",
            history_search_placeholder: "Tìm theo Mã phiên, mô hình...",
            th_hist_id: "Mã Phiên & Thời Gian",
            th_hist_images: "Hình Ảnh So Sánh",
            th_hist_model: "Mô Hình AI",
            th_hist_metrics: "Mật Độ & Diện Tích",
            th_hist_risk: "Mức Độ Rủi Ro",
            th_hist_actions: "Thao Tác",
            hist_empty_title: "Chưa Có Bản Ghi Kiểm Định Nào",
            hist_empty_desc: "Khi bạn thực hiện phân tích ảnh hoặc chụp từ camera, các bản ghi kiểm định kỹ thuật sẽ tự động được lưu trữ tại đây.",
            btn_hist_go_analyze: "Bắt Đầu Phân Tích Ngay",
            btn_hist_inspect_title: "Xem lại chi tiết trên thanh trượt",
            btn_hist_pdf_title: "Tải báo cáo PDF phiên này",
            btn_hist_delete_title: "Xóa bản ghi này",
            confirm_clear_history: "Bạn có chắc chắn muốn xóa toàn bộ lịch sử kiểm định không?",
            confirm_delete_record: "Bạn có chắc chắn muốn xóa bản ghi này không?",
            label_orig_thumb: "Gốc",
            label_overlay_thumb: "Phân đoạn",
            btn_save_video_audit: "Lưu Lịch Sử Video",
            btn_save_camera_audit: "Lưu Lịch Sử Camera",
            filter_source_lbl: "Chức Năng:",
            source_all: "Tất Cả Chức Năng",
            source_image: "📷 Phân Tích Ảnh",
            source_video: "🎥 Phân Tích Video",
            source_camera: "📹 Camera Trực Tiếp"
        },
        en: {
            brand_tagline: "Automated Concrete Crack Structural Inspection System",
            lang_btn_text: "English",
            theme_color_btn: "Color Theme",
            select_accent_color: "Theme Accent Color",
            theme_dark: "Dark Mode",
            theme_light: "Light Mode",
            gpu_system: "GPU System:",
            gpu_status: "High Performance (NVIDIA CUDA)",
            weights_status_badge: "Kaggle Seg03, Seg04 & U-Net ResNet-34 (512x512) Weights Loaded",
            sec1_title: "Model Configuration",
            lbl_algo_group: "Algorithm Group",
            opt_algo_dl: "Deep Learning Segmentation",
            opt_algo_classical: "Classical Vision",
            lbl_model_arch: "Model Architecture",
            opt_unet_resnet34_512: "U-Net ResNet-34 (512x512 - Proposed)",
            opt_deeplabv3_finetuned: "DeepLabV3+ (Fine-Tuned)",
            opt_deeplabv3_frozen: "DeepLabV3+ (Frozen Backbone)",
            opt_deeplabv3plus: "DeepLabV3+ (Fine-Tuned)",
            opt_compact_unet: "Compact U-Net (Seg03 Scratch)",
            lbl_classical_algo: "Traditional Method",
            opt_sobel: "Sobel Operator + Otsu Threshold",
            opt_canny: "Canny Edge Detection + Otsu",
            lbl_resolution: "Input Resolution:",
            lbl_threshold: "Detection Threshold:",
            sec2_title: "Crack Overlay Display",
            lbl_overlay_color: "Crack Overlay Color",
            lbl_opacity: "Overlay Opacity:",
            sec3_title: "Load Custom Weights (.pth)",
            lbl_upload_pth: "Upload custom .pth file",
            tab_dashboard: "System Dashboard",
            dash_live_badge: "LIVE SYSTEM • REAL-TIME AUDIT",
            dash_hero_title: "Monitoring Center & Project Dashboard",
            dash_hero_desc: "Real-time visual monitoring of concrete structural inspections, deep learning model metrics, and SQL Server database status.",
            dash_db_engine_lbl: "Database Engine",
            dash_core_model_lbl: "AI Core Model",
            btn_refresh_dashboard: "Refresh Metrics",
            scanner_live_badge: "FIELD CRACK SCANNING SIMULATION",
            scanner_title: "Laser Defect Scanner & Automated Crack Bounding System",
            scanner_desc: "Real-time optical inference stream of U-Net ResNet-34 at 512×512 resolution, capturing micro-cracks under 0.20mm.",
            scan_mode_all: "Full Stream",
            scan_mode_mask: "AI Mask Only",
            scan_mode_stress: "Stress Field",
            dash_kpi_total: "Total Structural Audits",
            dash_kpi_total_sub: "Two-way SQL Server sync",
            dash_kpi_model: "Proposed Primary Model",
            dash_kpi_fps: "GPU Inference Speed",
            dash_kpi_fps_sub: "Latency 28.9 ms (Exceeds 30 FPS standard)",
            dash_kpi_area: "Accumulated Defect Area",
            dash_kpi_area_sub: "Total surface crack damage area",
            dash_kpi_ratio: "Average Crack Density",
            dash_kpi_dataset: "Experimental Dataset",
            dash_kpi_dataset_sub: "Crack Segmentation Dataset (Kaggle)",
            dash_chart_risk_title: "Structural Risk Level Distribution",
            dash_chart_risk_sub: "Percentage of audits by severity (Safe, Warning, Critical)",
            dash_chart_trend_title: "Crack Density Progression Timeline",
            dash_chart_trend_sub: "Defect ratio (%) and AI latency (ms) of recent inspection runs",
            dash_chart_radar_title: "Multi-Criteria Radar Evaluation of Models",
            dash_chart_radar_sub: "Comparing U-Net ResNet-34 vs DeepLabV3+ vs Compact U-Net across 5 criteria",
            dash_chart_source_title: "Inspection Modality Breakdown",
            dash_chart_source_sub: "Distribution between Static Images, Video Streams, and Live Camera",
            dash_feed_title: "Recent Inspection Activity Feed",
            dash_feed_sub: "5 latest structural audit records stored in relational SQL database",
            dash_btn_view_history: "View All In History Tab",
            dash_timeline_tag: "Real-Time",
            pillar1_title: "Native 512×512 Resolution",
            pillar1_desc: "Faithfully preserves micro-cracks under 0.2mm, preventing boundary loss caused by downscaling to 256×256.",
            pillar2_title: "Hybrid BCE + Dice Loss",
            pillar2_desc: "Effectively tackles severe class imbalance where crack pixels occupy only 1% - 5% of the concrete surface.",
            pillar3_title: "Residual ResNet-34 Encoder",
            pillar3_desc: "Leverages ImageNet pre-training and skip connections, converging smoothly to achieve 58.39% mIoU.",
            pillar4_title: "Industrial Dual Database Engine",
            pillar4_desc: "Supports Microsoft SQL Server 2022 (SSMS) for enterprise reporting paired with local SQLite caching.",
            tab_image: "Image Analysis",
            tab_video: "Video Analysis",
            tab_camera: "Live Camera",
            tab_benchmark: "Model Benchmark",
            tab_about: "About Project",
            drop_title: "Drag and drop concrete surface image here",
            drop_subtitle: "or",
            browse_link: "click here to browse from computer",
            badge_max_size: "Max 20MB",
            badge_gpu_accel: "GPU / CPU Accelerated",
            or_sample_divider: "Or quick test with sample data",
            btn_sample_image: "Use Sample Concrete Image",
            sheet_title: "CONCRETE STRUCTURAL AUDIT & INSPECTION SLIP",
            metric_ratio_title: "Crack Density",
            metric_ratio_sub: "Defect pixel percentage",
            metric_area_title: "Estimated Damage Area",
            metric_area_sub: "Estimated surface area",
            metric_time_title: "Processing Latency",
            metric_time_sub: "AI inference latency",
            metric_risk_title: "Structural Risk Level",
            metric_risk_sub: "Safety integrity assessment",
            metric_waiting: "Pending Analysis",
            legend_header: "Technical Legend & Structural Risk Classification:",
            legend_crack_title: "Crack Defect Zone",
            legend_crack_sub: "Detected concrete crack defect pixels",
            legend_concrete_title: "Sound Concrete Surface",
            legend_concrete_sub: "Intact structural background without defects",
            legend_tag_safe: "Safe (< 1%)",
            legend_desc_safe: "Micro-surface cracks, structurally safe",
            legend_tag_warning: "Warning (1% - 3.5%)",
            legend_desc_warning: "Signs of propagation, ultrasonic survey needed",
            legend_tag_danger: "Critical (> 3.5%)",
            legend_desc_danger: "High crack density, urgent repair required",
            view_curtain_btn: "Interactive Curtain Slider",
            view_split_btn: "Side-by-Side View",
            view_mask_btn: "Binary Mask (0/255)",
            curtain_placeholder_title: "No Analysis Image Available",
            curtain_placeholder_desc: "Upload a concrete surface image or click 'Use Sample Concrete Crack Image' to view interactive segmentation.",
            split_orig_title: "Original Concrete Surface",
            split_overlay_title: "Segmentation & Color Overlay",
            split_waiting_orig: "Waiting for surface image...",
            split_waiting_overlay: "Waiting for AI segmentation results...",
            mask_title: "Binary Segmentation Mask (0: Concrete / 255: Crack)",
            mask_waiting: "Waiting to extract binary mask 0/255...",
            rec_title_default: "General Assessment: No Image Data",
            rec_desc_default: "Please upload an image or click 'Use Sample Concrete Crack Image' to start AI segmentation.",
            btn_pdf: "Export Audit PDF Report",
            btn_select_video: "Select Inspection Video (.mp4, .mov)",
            btn_sample_video: "Use Sample Crack Video",
            btn_process_video_start: "Start Real-Time AI Segmentation",
            btn_process_video_pause: "Pause AI Segmentation",
            video_speed: "Speed:",
            video_density: "Density:",
            video_alert: "Status:",
            video_orig_stream: "Original Inspection Video (Original Stream)",
            video_ai_stream: "Real-Time AI Overlay (AI Stream)",
            video_processing_loader: "Processing Video Frames...",
            btn_webcam_on: "Start Inspection WebCam",
            btn_webcam_off: "Stop WebCam",
            btn_camera_ai_start: "Start Live AI Segmentation",
            btn_camera_ai_pause: "Pause Live AI Segmentation",
            btn_camera_snapshot: "Capture & Deep Inspect",
            btn_virtual_camera_on: "Use Simulation Feed",
            btn_virtual_camera_off: "Stop Simulation Feed",
            camera_stream_title: "Live Field Camera Stream (Live Stream)",
            cam_not_active_title: "Camera Inactive",
            cam_not_active_desc: "Click 'Start Inspection WebCam' to connect camera or 'Use Simulation Feed' to test live segmentation.",
            cam_ai_wait_title: "Awaiting AI Activation",
            cam_ai_wait_desc: "Turn on Camera and click 'Start Live AI Segmentation' to render real-time crack boundary overlay.",
            cam_loader_text: "Live AI Inferencing...",
            bench_title: "Deep Model Comparison & In-Depth Analysis",
            bench_desc: "Empirical comparison between Deep Learning architectures and Classical Vision methods when applied to Static Image Analysis vs Real-time Video / Live Camera (Independent test set of 1,695 concrete crack images).",
            bench_filter_all: "All Scenarios",
            bench_filter_image: "Photo Inspection Focus",
            bench_filter_video: "Video & Drone Focus",
            rec_badge_image: "TOP CHOICE FOR STATIC PHOTO AUDITS",
            rec_image_summary: "Recommended for formal structural safety audit reports requiring millimeter-accurate defect area (m²) calculations and sub-millimeter (< 0.2mm) micro-crack mapping.",
            rec_img_point1_title: "Highest Fidelity & mIoU (61.2% / Dice 75.9%):",
            rec_img_point1_desc: "ASPP module with dilated multi-scale convolutions captures intricate crack topologies without fragmentation.",
            rec_img_point2_title: "Video Limitation:",
            rec_img_point2_desc: "Runs at ~28.6 FPS with heavier VRAM footprint (40.1M params). Fast camera panning on midrange hardware may introduce frame lag.",
            tag_legal_audit: "Official Structural Audit",
            tag_precise_area: "Exact Area Calculation (m²)",
            rec_badge_video: "TOP CHOICE FOR REAL-TIME VIDEO & DRONE",
            rec_video_summary: "Recommended for live on-site inspection, drone flyovers along bridge girders and high-rise pillars, or lag-free streaming camera feeds.",
            rec_vid_point1_title: "Real-time Throughput (42.5 FPS / 23.5ms latency):",
            rec_vid_point1_desc: "Streamlined symmetric Encoder-Decoder skip-connections with lightweight footprint, eliminating frame backlog buffers.",
            rec_vid_point2_title: "Engineering Trade-off:",
            rec_vid_point2_desc: "Boundary mIoU reaches 54.5%, reliable for instant defect mapping during movement, though hairline capillary cracks may occasionally show minor breaks.",
            tag_drone_inspection: "Drone Aerial Survey",
            tag_realtime_stream: "Live Field Telemetry",
            bench_table_title: "Comprehensive 5-Model Comparative Benchmark",
            bench_table_desc: "Direct evaluation of Image vs Video suitability ratings, segmentation accuracy, latency, and parameter footprint.",
            th_model: "Model",
            th_suitability_img: "Image Suitability",
            th_suitability_vid: "Video Suitability",
            th_iou: "IoU (Jaccard)",
            th_dice: "Dice (F1)",
            th_fps: "Throughput (FPS)",
            th_latency: "Latency (ms)",
            th_application_rec: "Practical Field Recommendation",
            chart1_title: "Image Segmentation Quality: IoU & Dice F1",
            chart2_title: "Video Stream Performance: Frames Per Second (FPS) & Latency",
            stat_best_iou_title: "Top Photo Accuracy",
            stat_best_fps_title: "Fastest Video Stream",
            stat_lowest_latency_title: "Lowest Video Latency",
            stat_min_width_title: "Minimum Crack Width",
            gallery_img_title: "Visual Empirical Proof: Micro-Crack Boundary Comparison",
            gallery_img_desc: "Direct visual proof demonstrating boundary preservation across algorithms on high-resolution field photos.",
            gallery_vid_title: "Live Video Empirical Proof: Telemetry HUD & Latency Benchmark",
            gallery_vid_desc: "Simulated camera stream scanning along concrete bridge girders with real-time HUD telemetry.",
            deep_dive_title: "Architectural Deep-Dive: Why the Trade-off Between Images & Video?",
            dd_img_title: "Optimal Mechanics for Static Image Auditing",
            dd_img_p1_bold: "Core Requirement:",
            dd_img_p1_text: "Pixel-level precision to separate minute crack openings without boundary erosion or disjointed paths.",
            dd_img_p2_bold: "DeepLabV3+ Advantage:",
            dd_img_p2_text: "Atrous Spatial Pyramid Pooling (dilation rates 6, 12, 18) expands field of view without loss of spatial resolution, paired with a sharp boundary decoder.",
            dd_img_p3_bold: "Engineering Trade-off:",
            dd_img_p3_text: "Computes 40.1M parameters (~35ms/image) — completely acceptable for static inspection photos.",
            dd_vid_title: "Optimal Mechanics for Real-Time Video Feeds",
            dd_vid_p1_bold: "Core Requirement:",
            dd_vid_p1_text: "Sustained throughput > 30 FPS matching camera shutter rates, and inference latency < 25ms to prevent queue buildup.",
            dd_vid_p2_bold: "Compact U-Net Advantage:",
            dd_vid_p2_text: "Direct skip connections with lightweight channel width reduce compute by 40% compared to heavy backbones, preserving rock-solid FPS during rapid camera motion.",
            dd_vid_p3_bold: "Classical Filter Role:",
            dd_vid_p3_text: "Sobel/Canny (120 FPS) serves as a zero-GPU motion pre-filter, invoking deep models only when suspicious edge variations are detected.",
            about_title: "Graduation Thesis: Surface Crack Detection in Civil Structures",
            about_topic_lbl: "Topic:",
            about_topic_val: "Application-oriented surface crack detection in civil structures using image semantic segmentation models.",
            about_dataset_lbl: "Dataset:",
            about_dataset_val: "Crack Segmentation Dataset (Kaggle) - 11,298 binary annotated images.",
            about_models_lbl: "Tested Models:",
            about_models_val: "Sobel + Otsu (Classical), Compact U-Net (Seg03), DeepLabV3+ (Frozen Backbone), DeepLabV3+ (Fine-Tuned), U-Net ResNet-34 (Proposed).",
            tab_history: "Audit History",
            history_title: "Civil Structure Audit & Inspection History",
            history_desc: "Track crack inspection progress, compare defect boundaries, and re-export engineering reports at any time.",
            history_db_lbl: "SQL Database:",
            history_total_lbl: "Total Audits:",
            btn_export_csv: "Export CSV",
            btn_clear_history: "Clear History",
            filter_risk_lbl: "Filter by Risk:",
            opt_filter_all: "All Risk Levels",
            opt_filter_safe: "🟢 Safe (< 1%)",
            opt_filter_warning: "🟡 Warning (1% - 3.5%)",
            opt_filter_critical: "🔴 Critical (> 3.5%)",
            history_search_placeholder: "Search by ID, model...",
            th_hist_id: "Audit ID & Timestamp",
            th_hist_images: "Comparison Previews",
            th_hist_model: "AI Model & Setup",
            th_hist_metrics: "Density & Area",
            th_hist_risk: "Risk Assessment",
            th_hist_actions: "Actions",
            hist_empty_title: "No Inspection Records Yet",
            hist_empty_desc: "When you perform image segmentation or camera capture, technical audit logs will automatically be saved here.",
            btn_hist_go_analyze: "Start Analysis Now",
            btn_hist_inspect_title: "Inspect details on curtain slider",
            btn_hist_pdf_title: "Download PDF report for this session",
            btn_hist_delete_title: "Delete this record",
            confirm_clear_history: "Are you sure you want to delete all inspection records?",
            confirm_delete_record: "Are you sure you want to delete this record?",
            label_orig_thumb: "Orig",
            label_overlay_thumb: "Overlay",
            btn_save_video_audit: "Save Video Audit",
            btn_save_camera_audit: "Save Camera Audit",
            filter_source_lbl: "Inspection Source:",
            source_all: "All Sources",
            source_image: "📷 Image Analysis",
            source_video: "🎥 Video Analysis",
            source_camera: "📹 Live Camera"
        }
    };

    // =========================================================================
    // STATE & REFS
    // =========================================================================
    let currentLang = localStorage.getItem('crackvision_lang') || 'vi';
    let selectedColor = '#EF4444';
    let currentMetrics = null;
    let currentOrigBase64 = null;
    let currentOverlayBase64 = null;
    let lastBenchmarkData = null;
    let currentBenchmarkScenario = 'all';
    let chartInstance1 = null;
    let chartInstance2 = null;
    let historyRecords = [];
    let lastDashboardData = null;
    let dashRiskChart = null;
    let dashTrendChart = null;
    let dashRadarChart = null;
    let dashSourcesChart = null;

    // Header Controls
    const langToggleBtn = document.getElementById('lang-toggle-btn');
    const langText = document.getElementById('lang-text');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');

    // Sidebar Controls
    const algorithmGroupSelect = document.getElementById('algorithm-group');
    const dlModelsGroup = document.getElementById('dl-models-group');
    const classicalModelsGroup = document.getElementById('classical-models-group');
    const modelTypeSelect = document.getElementById('model-type');
    const classicalTypeSelect = document.getElementById('classical-type');
    const imgSizeInput = document.getElementById('img-size');
    const resVal = document.getElementById('res-val');
    const thresholdInput = document.getElementById('threshold');
    const threshVal = document.getElementById('thresh-val');
    const opacityInput = document.getElementById('opacity');
    const opacityVal = document.getElementById('opacity-val');

    // Main Actions
    const imageInput = document.getElementById('image-input');
    const btnSample = document.getElementById('btn-sample');
    const btnPdf = document.getElementById('btn-download-pdf');

    // =========================================================================
    // LANGUAGE LOGIC
    // =========================================================================
    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('crackvision_lang', lang);
        document.documentElement.setAttribute('lang', lang);

        if (langText) {
            langText.textContent = lang === 'en' ? 'English' : 'Tiếng Việt';
        }

        // Update all elements with data-i18n
        const i18nElements = document.querySelectorAll('[data-i18n]');
        i18nElements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
                el.textContent = TRANSLATIONS[lang][key];
            }
        });

        // Update placeholder inputs
        const i18nPlaceholders = document.querySelectorAll('[data-i18n-placeholder]');
        i18nPlaceholders.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
                el.placeholder = TRANSLATIONS[lang][key];
            }
        });

        // Update theme button text according to language
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        if (themeText) {
            themeText.textContent = currentTheme === 'light' ? TRANSLATIONS[lang].theme_light : TRANSLATIONS[lang].theme_dark;
        }

        // Re-render benchmark table & charts if data loaded
        if (lastBenchmarkData) {
            if (typeof switchBenchmarkScenario === 'function') {
                switchBenchmarkScenario(currentBenchmarkScenario);
            } else if (typeof renderBenchmarkTable === 'function') {
                renderBenchmarkTable(lastBenchmarkData, currentBenchmarkScenario);
            }
            if (typeof renderBenchmarkCharts === 'function') {
                renderBenchmarkCharts(lastBenchmarkData);
            }
        }

        // Re-render dashboard if loaded
        if (lastDashboardData && typeof renderDashboard === 'function') {
            renderDashboard(lastDashboardData);
        }

        // Re-render metrics if results are present
        if (currentMetrics) {
            updateMetricsDisplay(currentMetrics);
        }

        // Re-render history table if records loaded
        if (historyRecords && historyRecords.length > 0 && typeof renderHistoryTable === 'function') {
            renderHistoryTable(filterHistoryRecords());
        }

        // Update palette item names according to language
        document.querySelectorAll('.palette-item').forEach(item => {
            const nameEl = item.querySelector('.palette-item-name');
            if (nameEl) {
                nameEl.textContent = lang === 'en' ? item.dataset.nameEn : item.dataset.nameVi;
            }
        });
    }

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            const newLang = currentLang === 'vi' ? 'en' : 'vi';
            applyLanguage(newLang);
        });
    }

    // =========================================================================
    // COLOR PALETTE & ACCENT THEME LOGIC
    // =========================================================================
    const colorToggleBtn = document.getElementById('color-toggle-btn');
    const colorDropdownWrapper = document.getElementById('color-dropdown-wrapper');
    const currentColorIndicator = document.getElementById('current-color-indicator');
    const paletteItems = document.querySelectorAll('.palette-item');

    function applyAccentColor(color, hoverColor) {
        document.documentElement.style.setProperty('--accent-primary', color);
        if (hoverColor) {
            document.documentElement.style.setProperty('--accent-primary-hover', hoverColor);
        }
        document.documentElement.style.setProperty('--border-focus', color);
        if (currentColorIndicator) {
            currentColorIndicator.style.backgroundColor = color;
            currentColorIndicator.style.boxShadow = `0 0 6px ${color}`;
        }
        paletteItems.forEach(item => {
            if (item.dataset.color && item.dataset.color.toLowerCase() === color.toLowerCase()) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        localStorage.setItem('crackvision_accent_color', color);
        if (hoverColor) localStorage.setItem('crackvision_accent_hover', hoverColor);
    }

    if (colorToggleBtn && colorDropdownWrapper) {
        colorToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = colorDropdownWrapper.classList.toggle('open');
            colorToggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        document.addEventListener('click', (e) => {
            if (!colorDropdownWrapper.contains(e.target)) {
                colorDropdownWrapper.classList.remove('open');
                colorToggleBtn.setAttribute('aria-expanded', 'false');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && colorDropdownWrapper.classList.contains('open')) {
                colorDropdownWrapper.classList.remove('open');
                colorToggleBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    paletteItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const color = item.dataset.color;
            const hover = item.dataset.hover;
            applyAccentColor(color, hover);
            if (colorDropdownWrapper) {
                colorDropdownWrapper.classList.remove('open');
                if (colorToggleBtn) colorToggleBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });

    const savedAccentColor = localStorage.getItem('crackvision_accent_color') || '#B4432A';
    const savedAccentHover = localStorage.getItem('crackvision_accent_hover') || '#98351F';
    applyAccentColor(savedAccentColor, savedAccentHover);

    // =========================================================================
    // THEME LOGIC
    // =========================================================================
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('crackvision_theme', theme);
        if (theme === 'light') {
            if (themeIcon) {
                themeIcon.className = 'fa-solid fa-sun';
                themeIcon.style.color = '#f59e0b';
            }
            if (themeText) themeText.textContent = TRANSLATIONS[currentLang].theme_light;
        } else {
            if (themeIcon) {
                themeIcon.className = 'fa-solid fa-moon';
                themeIcon.style.color = '#facc15';
            }
            if (themeText) themeText.textContent = TRANSLATIONS[currentLang].theme_dark;
        }

        if (lastBenchmarkData && typeof renderBenchmarkCharts === 'function') {
            renderBenchmarkCharts(lastBenchmarkData);
        }
        if (lastDashboardData && typeof renderDashboardCharts === 'function') {
            renderDashboardCharts(lastDashboardData);
        }
    }

    const savedTheme = localStorage.getItem('crackvision_theme') || 'dark';
    applyTheme(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }

    // Initial language application
    applyLanguage(currentLang);

    // =========================================================================
    // TABS & VIEWS SWITCHING
    // =========================================================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetTab = document.getElementById(btn.dataset.tab);
            if (targetTab) {
                targetTab.classList.add('active');
                if (btn.dataset.tab === 'tab-dashboard') {
                    loadDashboardData();
                }
                if (btn.dataset.tab === 'tab-benchmark') {
                    loadBenchmarkData();
                }
                if (btn.dataset.tab === 'tab-history') {
                    loadHistoryData();
                }
                if (btn.dataset.tab === 'tab-video') {
                    if (videoPlayer) {
                        if (!videoPlayer.src || videoPlayer.src.endsWith('/#') || videoPlayer.src === window.location.href) {
                            videoPlayer.src = '/static/sample_crack_video.mp4';
                            videoPlayer.load();
                        }
                    }
                }
                if (btn.dataset.tab !== 'tab-camera' && isProcessingCamera) {
                    stopCameraProcessing();
                }
            }
        });
    });

    // About tab quick navigation buttons
    const btnAboutGoDash = document.getElementById('btn-about-go-dash');
    const btnAboutGoInspect = document.getElementById('btn-about-go-inspect');
    const btnAboutGoBench = document.getElementById('btn-about-go-bench');

    if (btnAboutGoDash) {
        btnAboutGoDash.addEventListener('click', () => {
            const btn = document.querySelector('[data-tab="tab-dashboard"]');
            if (btn) btn.click();
        });
    }
    if (btnAboutGoInspect) {
        btnAboutGoInspect.addEventListener('click', () => {
            const btn = document.querySelector('[data-tab="tab-image"]');
            if (btn) btn.click();
        });
    }
    if (btnAboutGoBench) {
        btnAboutGoBench.addEventListener('click', () => {
            const btn = document.querySelector('[data-tab="tab-benchmark"]');
            if (btn) btn.click();
        });
    }

    // Initial dashboard data load on startup
    loadDashboardData();

    const viewBtns = document.querySelectorAll('.view-btn');
    const viewPanels = document.querySelectorAll('.view-panel');

    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            viewPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetView = document.getElementById(btn.dataset.view);
            if (targetView) targetView.classList.add('active');
        });
    });

    // =========================================================================
    // SIDEBAR CONTROLS & ACTIVE MODEL SYNC
    // =========================================================================
    const MODEL_REGISTRY_METRICS = {
        'unet_resnet34_512': {
            name: 'U-Net ResNet-34 (512×512)',
            short: 'U-Net ResNet-34',
            miou: '58.39%',
            dice: '73.36%',
            fps: '34.5',
            latency: '28.9 ms',
            encoder: 'U-NET RESNET-34 ENCODER (512×512)',
            width: '< 0.20 mm'
        },
        'resunet34': {
            name: 'U-Net ResNet-34 (512×512)',
            short: 'U-Net ResNet-34',
            miou: '58.39%',
            dice: '73.36%',
            fps: '34.5',
            latency: '28.9 ms',
            encoder: 'U-NET RESNET-34 ENCODER (512×512)',
            width: '< 0.20 mm'
        },
        'deeplabv3_finetuned': {
            name: 'DeepLabV3+ (Fine-Tuned)',
            short: 'DeepLabV3+ (Fine-Tuned)',
            miou: '36.66%',
            dice: '53.65%',
            fps: '28.7',
            latency: '34.8 ms',
            encoder: 'DEEPLABV3+ RESNET-50 ASPP (256×256)',
            width: '< 0.35 mm'
        },
        'deeplabv3plus': {
            name: 'DeepLabV3+ (Fine-Tuned)',
            short: 'DeepLabV3+',
            miou: '36.66%',
            dice: '53.65%',
            fps: '28.7',
            latency: '34.8 ms',
            encoder: 'DEEPLABV3+ RESNET-50 ASPP (256×256)',
            width: '< 0.35 mm'
        },
        'deeplabv3_frozen': {
            name: 'DeepLabV3+ (Frozen Backbone)',
            short: 'DeepLabV3+ (Frozen)',
            miou: '31.84%',
            dice: '47.12%',
            fps: '31.2',
            latency: '32.1 ms',
            encoder: 'DEEPLABV3+ FROZEN RESNET-50 (256×256)',
            width: '< 0.40 mm'
        },
        'compact_unet': {
            name: 'Compact U-Net (Seg03 Scratch)',
            short: 'Compact U-Net',
            miou: '39.35%',
            dice: '51.61%',
            fps: '42.5',
            latency: '23.5 ms',
            encoder: 'COMPACT 4-LAYER CONVNET (256×256)',
            width: '< 0.28 mm'
        },
        'sobel': {
            name: 'Toán Tử Sobel + Otsu',
            short: 'Sobel + Otsu',
            miou: '22.40%',
            dice: '34.20%',
            fps: '65.0',
            latency: '15.4 ms',
            encoder: 'SOBEL GRADIENT FILTER + OTSU THRESHOLD',
            width: '< 0.50 mm'
        },
        'canny': {
            name: 'Lọc Cạnh Canny + Otsu',
            short: 'Canny + Otsu',
            miou: '24.15%',
            dice: '36.50%',
            fps: '58.0',
            latency: '17.2 ms',
            encoder: 'CANNY GAUSSIAN FILTER + OTSU THRESHOLD',
            width: '< 0.45 mm'
        }
    };

    function updateActiveModelUI() {
        const isClassical = (algorithmGroupSelect && algorithmGroupSelect.value === 'classical');
        const activeKey = isClassical 
            ? (classicalTypeSelect ? classicalTypeSelect.value : 'sobel')
            : (modelTypeSelect ? modelTypeSelect.value : 'unet_resnet34_512');

        const m = MODEL_REGISTRY_METRICS[activeKey] || MODEL_REGISTRY_METRICS['unet_resnet34_512'];

        // 1. Update AI Core Model in Dashboard Hero
        const dashModelName = document.getElementById('dash-model-name');
        const dashModelPill = document.getElementById('dash-model-pill');
        if (dashModelName) {
            dashModelName.textContent = m.name;
        }
        if (dashModelPill) {
            dashModelPill.classList.remove('model-changed-pulse');
            void dashModelPill.offsetWidth;
            dashModelPill.classList.add('model-changed-pulse');
        }

        // 2. Update KPI Card 2
        const kpiModelVal = document.getElementById('dash-kpi-model-val');
        const kpiModelSub = document.getElementById('dash-kpi-model-sub');
        if (kpiModelVal) {
            kpiModelVal.textContent = m.short;
        }
        if (kpiModelSub) {
            kpiModelSub.innerHTML = `<strong class="text-accent">mIoU ${m.miou}</strong> &bull; Dice ${m.dice}`;
        }

        // 3. Update KPI Card 3
        const kpiFpsVal = document.getElementById('dash-kpi-fps-val');
        const kpiFpsSub = document.getElementById('dash-kpi-fps-sub');
        if (kpiFpsVal) {
            kpiFpsVal.textContent = m.fps;
        }
        if (kpiFpsSub) {
            kpiFpsSub.textContent = `Độ trễ ${m.latency} (Chuẩn công nghiệp)`;
        }

        // 4. Update Scanner Showcase Quick Stats
        const statFps = document.getElementById('scanner-stat-fps');
        const statIou = document.getElementById('scanner-stat-iou');
        const statWidth = document.getElementById('scanner-stat-width');
        if (statFps) statFps.innerHTML = `${m.fps} FPS <i class="fa-solid fa-wave-square"></i>`;
        if (statIou) statIou.textContent = `${m.miou} IoU`;
        if (statWidth) statWidth.textContent = m.width;

        // 5. Update Scanner Telemetry Footer
        const hudEncoder = document.getElementById('scanner-hud-encoder');
        const hudLatency = document.getElementById('scanner-hud-latency');
        if (hudEncoder) hudEncoder.textContent = m.encoder;
        if (hudLatency) hudLatency.textContent = `INFERENCE LATENCY: ${m.latency}`;
    }

    algorithmGroupSelect.addEventListener('change', (e) => {
        if (e.target.value === 'dl') {
            dlModelsGroup.classList.remove('hidden');
            classicalModelsGroup.classList.add('hidden');
        } else {
            dlModelsGroup.classList.add('hidden');
            classicalModelsGroup.classList.remove('hidden');
        }
        updateActiveModelUI();
    });

    if (modelTypeSelect) {
        modelTypeSelect.addEventListener('change', (e) => {
            if (e.target.value === 'unet_resnet34_512' || e.target.value === 'resunet34') {
                if (imgSizeInput) {
                    imgSizeInput.value = 512;
                    if (resVal) resVal.textContent = '512 x 512';
                }
            } else {
                if (imgSizeInput) {
                    imgSizeInput.value = 256;
                    if (resVal) resVal.textContent = '256 x 256';
                }
            }
            updateActiveModelUI();
        });
    }

    if (classicalTypeSelect) {
        classicalTypeSelect.addEventListener('change', () => {
            updateActiveModelUI();
        });
    }

    // Setup Scanner Mode Switching (All, Mask, Stress)
    const scanModeBtns = document.querySelectorAll('.scan-mode-btn');
    const scannerViewport = document.getElementById('scanner-viewport-box');

    scanModeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            scanModeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const mode = btn.dataset.mode;
            if (scannerViewport) {
                scannerViewport.classList.remove('mode-mask', 'mode-stress');
                if (mode === 'mask') scannerViewport.classList.add('mode-mask');
                if (mode === 'stress') scannerViewport.classList.add('mode-stress');
            }
        });
    });

    // Animate Live Laser Coordinate Ticker
    const coordEl = document.getElementById('laser-coord-display');
    if (coordEl) {
        let coordDir = 1;
        let coordVal = 140.0;
        setInterval(() => {
            coordVal += coordDir * (Math.random() * 9 + 4);
            if (coordVal >= 495) {
                coordVal = 495;
                coordDir = -1;
            } else if (coordVal <= 25) {
                coordVal = 25;
                coordDir = 1;
            }
            coordEl.textContent = `X: ${coordVal.toFixed(1)}mm`;
        }, 120);
    }

    // Initial Active Model UI sync
    updateActiveModelUI();

    imgSizeInput.addEventListener('input', (e) => {
        resVal.textContent = `${e.target.value} x ${e.target.value}`;
    });

    thresholdInput.addEventListener('input', (e) => {
        threshVal.textContent = parseFloat(e.target.value).toFixed(2);
    });

    opacityInput.addEventListener('input', (e) => {
        opacityVal.textContent = `${Math.round(e.target.value * 100)}%`;
    });

    const colorBtns = document.querySelectorAll('.color-btn');
    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            colorBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedColor = btn.dataset.color;
            const legendCrackDot = document.getElementById('legend-crack-dot');
            if (legendCrackDot) {
                legendCrackDot.style.background = selectedColor;
                legendCrackDot.style.boxShadow = `0 0 10px ${selectedColor}`;
            }
        });
    });

    // Dropzone Events
    const dropzone = document.getElementById('dropzone');
    if (dropzone) {
        ['dragenter', 'dragover'].forEach(eventName => {
            dropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropzone.classList.add('dragover');
            }, false);
        });
        ['dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropzone.classList.remove('dragover');
            }, false);
        });
        dropzone.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            if (files && files[0]) {
                uploadAndPredictImage(files[0]);
            }
        }, false);
    }

    imageInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            uploadAndPredictImage(e.target.files[0]);
        }
    });

    btnSample.addEventListener('click', () => {
        predictSampleImage();
    });

    // =========================================================================
    // PROGRESS BAR LOGIC
    // =========================================================================
    let progressInterval = null;
    function startInferenceProgress() {
        const container = document.getElementById('inference-progress-container');
        const bar = document.getElementById('inference-progress-bar');
        const statusText = document.getElementById('inference-status-text');
        const percentText = document.getElementById('inference-percent-text');
        if (!container || !bar) return;

        container.classList.remove('hidden');
        bar.style.width = '0%';
        percentText.textContent = '0%';
        let currentPercent = 5;

        const phases = currentLang === 'en' ? [
            { p: 25, text: '<i class="fa-solid fa-image fa-beat"></i> Preprocessing image &amp; ImageNet normalization...' },
            { p: 55, text: '<i class="fa-solid fa-microchip fa-beat"></i> Loading tensors into Deep Learning model...' },
            { p: 82, text: '<i class="fa-solid fa-network-wired fa-beat"></i> Extracting features &amp; crack boundary segmentation...' }
        ] : [
            { p: 25, text: '<i class="fa-solid fa-image fa-beat"></i> Đang tiền xử lý ảnh &amp; chuẩn hóa ImageNet...' },
            { p: 55, text: '<i class="fa-solid fa-microchip fa-beat"></i> Đang nạp Tensor vào mô hình Deep Learning...' },
            { p: 82, text: '<i class="fa-solid fa-network-wired fa-beat"></i> Đang trích xuất đặc trưng &amp; phân đoạn ranh giới vết nứt...' }
        ];

        let phaseIdx = 0;
        clearInterval(progressInterval);
        progressInterval = setInterval(() => {
            if (phaseIdx < phases.length) {
                currentPercent += 3;
                if (currentPercent >= phases[phaseIdx].p) {
                    statusText.innerHTML = phases[phaseIdx].text;
                    phaseIdx++;
                }
            } else if (currentPercent < 94) {
                currentPercent += 1;
            }
            bar.style.width = `${currentPercent}%`;
            percentText.textContent = `${currentPercent}%`;
        }, 40);
    }

    function finishInferenceProgress() {
        clearInterval(progressInterval);
        const container = document.getElementById('inference-progress-container');
        const bar = document.getElementById('inference-progress-bar');
        const statusText = document.getElementById('inference-status-text');
        const percentText = document.getElementById('inference-percent-text');
        if (!bar) return;

        bar.style.width = '100%';
        percentText.textContent = '100%';
        statusText.innerHTML = currentLang === 'en' ?
            '<i class="fa-solid fa-circle-check" style="color:#10b981;"></i> Segmentation &amp; damage area calculation complete!' :
            '<i class="fa-solid fa-circle-check" style="color:#10b981;"></i> Hoàn tất phân đoạn &amp; tính toán diện tích hư hại!';
        setTimeout(() => {
            if (container) container.classList.add('hidden');
        }, 650);
    }

    // =========================================================================
    // COMPARISON CURTAIN SLIDER
    // =========================================================================
    const sliderContainer = document.getElementById('comparison-slider');
    const beforeWrapper = document.getElementById('before-wrapper');
    const sliderHandle = document.getElementById('slider-handle');
    let isDragging = false;

    function setSliderPosition(x) {
        const rect = sliderContainer.getBoundingClientRect();
        let offsetX = x - rect.left;
        if (offsetX < 0) offsetX = 0;
        if (offsetX > rect.width) offsetX = rect.width;

        const percent = (offsetX / rect.width) * 100;
        beforeWrapper.style.width = `${percent}%`;
        sliderHandle.style.left = `${percent}%`;
    }

    sliderContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        setSliderPosition(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
        if (isDragging) setSliderPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // =========================================================================
    // API PREDICTION HANDLERS
    // =========================================================================
    async function predictSampleImage() {
        const selectedModel = (algorithmGroupSelect && algorithmGroupSelect.value === 'dl') ? modelTypeSelect.value : (classicalTypeSelect ? classicalTypeSelect.value : 'sobel');
        const threshold = thresholdInput ? thresholdInput.value : 0.5;
        const imgSize = imgSizeInput ? imgSizeInput.value : 256;
        const opacity = opacityInput ? opacityInput.value : 0.55;

        const formData = new FormData();
        formData.append('model_type', selectedModel);
        formData.append('threshold', threshold);
        formData.append('img_size', imgSize);
        formData.append('overlay_color', selectedColor);
        formData.append('overlay_opacity', opacity);

        startInferenceProgress();

        try {
            if (btnSample) {
                btnSample.disabled = true;
                btnSample.innerHTML = currentLang === 'en' ? '<i class="fa-solid fa-spinner fa-spin"></i> Running AI Segmentation...' : '<i class="fa-solid fa-spinner fa-spin"></i> Đang Phân Đoạn AI...';
            }

            const response = await fetch('/api/predict/sample', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.success) {
                finishInferenceProgress();
                updateUIWithResults(data);
            } else {
                clearInterval(progressInterval);
                const container = document.getElementById('inference-progress-container');
                if (container) container.classList.add('hidden');
                alert((currentLang === 'en' ? 'Error: ' : 'Lỗi: ') + (data.detail || 'Failed to segment'));
            }
        } catch (err) {
            clearInterval(progressInterval);
            const container = document.getElementById('inference-progress-container');
            if (container) container.classList.add('hidden');
            console.error('Error predicting sample:', err);
            alert(currentLang === 'en' ? 'Error connecting to API Server!' : 'Lỗi kết nối tới Server API!');
        } finally {
            if (btnSample) {
                btnSample.disabled = false;
                btnSample.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> ${TRANSLATIONS[currentLang].btn_sample_image}`;
            }
        }
    }

    async function uploadAndPredictImage(file, sourceType = 'image') {
        const selectedModel = (algorithmGroupSelect && algorithmGroupSelect.value === 'dl') ? modelTypeSelect.value : (classicalTypeSelect ? classicalTypeSelect.value : 'sobel');
        const threshold = thresholdInput ? thresholdInput.value : 0.5;
        const imgSize = imgSizeInput ? imgSizeInput.value : 256;
        const opacity = opacityInput ? opacityInput.value : 0.55;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('model_type', selectedModel);
        formData.append('threshold', threshold);
        formData.append('img_size', imgSize);
        formData.append('overlay_color', selectedColor);
        formData.append('overlay_opacity', opacity);
        formData.append('source_type', sourceType);

        startInferenceProgress();

        try {
            const response = await fetch('/api/predict/image', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.success) {
                finishInferenceProgress();
                updateUIWithResults(data);
            } else {
                clearInterval(progressInterval);
                const container = document.getElementById('inference-progress-container');
                if (container) container.classList.add('hidden');
                alert((currentLang === 'en' ? 'Image Analysis Error: ' : 'Lỗi phân tích ảnh: ') + (data.detail || 'Unknown'));
            }
        } catch (err) {
            clearInterval(progressInterval);
            const container = document.getElementById('inference-progress-container');
            if (container) container.classList.add('hidden');
            console.error('Error uploading image:', err);
            alert(currentLang === 'en' ? 'Error uploading image file!' : 'Lỗi gửi tệp ảnh!');
        }
    }

    // =========================================================================
    // LOCALIZED METRICS & DISPLAY UPDATE
    // =========================================================================
    function getLocalizedRisk(rawRisk, lang) {
        if (lang === 'en') {
            if (rawRisk.includes('AN TOÀN') || rawRisk.includes('BÌNH THƯỜNG')) return 'SAFE (NORMAL)';
            if (rawRisk.includes('CẢNH BÁO')) return 'WARNING (MODERATE RISK)';
            if (rawRisk.includes('NGUY HIỂM')) return 'CRITICAL (HIGH RISK)';
            return rawRisk;
        }
        return rawRisk;
    }

    function getLocalizedRec(metrics, lang) {
        if (lang === 'en') {
            const rawRisk = metrics.risk_level || '';
            if (rawRisk.includes('AN TOÀN') || rawRisk.includes('BÌNH THƯỜNG')) {
                return {
                    rec: 'Routine visual monitoring every 6 months; monitor micro-cracking',
                    repair: 'Surface cleaning, weatherproofing hydrophobic coating'
                };
            }
            if (rawRisk.includes('CẢNH BÁO')) {
                return {
                    rec: 'Conduct detailed ultrasonic inspection and crack width monitoring',
                    repair: 'Low-viscosity Epoxy resin pressure injection and sealing'
                };
            }
            if (rawRisk.includes('NGUY HIỂM')) {
                return {
                    rec: 'Halt heavy operations on affected zone immediately; structural review required',
                    repair: 'High-pressure Epoxy injection, CFRP wrapping or steel jacketing'
                };
            }
        }
        return {
            rec: metrics.recommendation,
            repair: metrics.repair_method
        };
    }

    function updateMetricsDisplay(metrics) {
        if (!metrics) return;
        const ratioEl = document.getElementById('metric-ratio');
        const areaEl = document.getElementById('metric-area');
        const timeEl = document.getElementById('metric-time');
        if (ratioEl) ratioEl.textContent = `${metrics.crack_ratio.toFixed(2)} %`;
        if (areaEl) areaEl.textContent = `${metrics.affected_area.toFixed(3)} m²`;
        if (timeEl) timeEl.textContent = `${metrics.infer_time.toFixed(1)} ms`;

        // Update technical inspection sheet metadata
        const sheetTime = document.getElementById('sheet-timestamp');
        if (sheetTime) {
            const now = new Date();
            sheetTime.textContent = now.toLocaleTimeString('vi-VN', { hour12: false });
        }
        const sheetModel = document.getElementById('sheet-model-name');
        if (sheetModel && metrics.model_name) {
            sheetModel.textContent = metrics.model_name;
        }

        const riskEl = document.getElementById('metric-risk');
        const displayRisk = getLocalizedRisk(metrics.risk_level, currentLang);
        if (riskEl) {
            riskEl.classList.remove('text-waiting');
            riskEl.textContent = displayRisk;
            riskEl.style.color = metrics.risk_color;
        }

        // Move the continuous risk gauge marker smoothly:
        // Range 0-1.0%: 0% -> 25% track width
        // Range 1.0-3.5%: 25% -> 70% track width
        // Range 3.5-5.0%+: 70% -> 98% track width
        let markerPercent = 0;
        if (metrics.crack_ratio <= 1.0) {
            markerPercent = (metrics.crack_ratio / 1.0) * 25;
        } else if (metrics.crack_ratio <= 3.5) {
            markerPercent = 25 + ((metrics.crack_ratio - 1.0) / 2.5) * 45;
        } else {
            markerPercent = 70 + Math.min(28, ((metrics.crack_ratio - 3.5) / 3.5) * 28);
        }
        markerPercent = Math.max(0, Math.min(98, markerPercent));

        const gaugeMarker = document.getElementById('risk-gauge-marker');
        if (gaugeMarker) {
            gaugeMarker.style.left = `${markerPercent}%`;
            gaugeMarker.style.borderColor = metrics.risk_color;
        }

        const iconBox = document.getElementById('risk-icon-box');
        if (iconBox) {
            iconBox.style.background = `${metrics.risk_color}22`;
            iconBox.style.color = metrics.risk_color;
        }

        const riskCard = document.querySelector('.metric-card.risk-card');
        if (riskCard && metrics.risk_color) {
            riskCard.style.borderLeftColor = metrics.risk_color;
        }
        const riskStripItem = document.querySelector('.risk-strip-item');
        if (riskStripItem && metrics.risk_color) {
            riskStripItem.style.borderTopColor = metrics.risk_color;
        }

        const localized = getLocalizedRec(metrics, currentLang);
        const titlePrefix = currentLang === 'en' ? `Model: ${metrics.model_name} | Status: ${displayRisk}` : `Mô Hình: ${metrics.model_name} | Cảnh Báo: ${metrics.risk_level}`;
        const descText = currentLang === 'en' ? `${localized.rec} | Repair: ${localized.repair}` : `${localized.rec} | Gia cố: ${localized.repair}`;
        const recTitle = document.getElementById('rec-title');
        const recDesc = document.getElementById('rec-desc');
        if (recTitle) recTitle.textContent = titlePrefix;
        if (recDesc) recDesc.textContent = descText;
    }

    function updateUIWithResults(data) {
        currentOrigBase64 = data.orig_base64;
        currentOverlayBase64 = data.overlay_base64;
        currentMetrics = data.metrics;

        // Hide Empty Placeholders & Show Elements
        const slider = document.getElementById('comparison-slider');
        if (slider) slider.classList.remove('empty');

        const curtainPlaceholder = document.getElementById('curtain-placeholder');
        if (curtainPlaceholder) curtainPlaceholder.classList.add('hidden');
        const splitBeforePlaceholder = document.getElementById('split-before-placeholder');
        if (splitBeforePlaceholder) splitBeforePlaceholder.classList.add('hidden');
        const splitAfterPlaceholder = document.getElementById('split-after-placeholder');
        if (splitAfterPlaceholder) splitAfterPlaceholder.classList.add('hidden');
        const maskPlaceholder = document.getElementById('mask-placeholder');
        if (maskPlaceholder) maskPlaceholder.classList.add('hidden');

        // Set Images & Unhide
        const imgBefore = document.getElementById('img-before');
        const imgAfter = document.getElementById('img-after');
        const beforeWrapper = document.getElementById('before-wrapper');
        const sliderHandle = document.getElementById('slider-handle');
        const splitBefore = document.getElementById('split-before');
        const splitAfter = document.getElementById('split-after');
        const maskImg = document.getElementById('mask-img');

        if (imgBefore) { imgBefore.classList.remove('hidden'); imgBefore.src = data.orig_base64; }
        if (imgAfter) { imgAfter.classList.remove('hidden'); imgAfter.src = data.overlay_base64; }
        if (beforeWrapper) beforeWrapper.classList.remove('hidden');
        if (sliderHandle) sliderHandle.classList.remove('hidden');
        if (splitBefore) { splitBefore.classList.remove('hidden'); splitBefore.src = data.orig_base64; }
        if (splitAfter) { splitAfter.classList.remove('hidden'); splitAfter.src = data.overlay_base64; }
        if (maskImg) { maskImg.classList.remove('hidden'); maskImg.src = data.mask_base64; }

        updateMetricsDisplay(data.metrics);
    }

    // =========================================================================
    // EXPORT PDF REPORT (BILINGUAL SUPPORT)
    // =========================================================================
    btnPdf.addEventListener('click', async () => {
        if (!currentMetrics) {
            alert(currentLang === 'en' ? 'Please perform crack segmentation before exporting PDF report!' : 'Vui lòng thực hiện phân đoạn ảnh trước khi xuất báo cáo PDF!');
            return;
        }

        try {
            btnPdf.disabled = true;
            btnPdf.innerHTML = currentLang === 'en' ? '<i class="fa-solid fa-spinner fa-spin"></i> Generating PDF...' : '<i class="fa-solid fa-spinner fa-spin"></i> Đang Tạo PDF...';

            const response = await fetch('/api/report/pdf', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orig_base64: currentOrigBase64,
                    overlay_base64: currentOverlayBase64,
                    metrics: currentMetrics,
                    lang: currentLang
                })
            });

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = currentLang === 'en' ? `Crack_Audit_Report_${Date.now()}.pdf` : `BaoCao_KiemDinh_VetNut_${Date.now()}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (err) {
            console.error('Error generating PDF:', err);
        } finally {
            btnPdf.disabled = false;
            btnPdf.innerHTML = `<i class="fa-solid fa-file-pdf"></i> ${TRANSLATIONS[currentLang].btn_pdf}`;
        }
    });

    // =========================================================================
    // BENCHMARK DATA & CHARTS (LOCALIZED)
    // =========================================================================
    async function loadBenchmarkData() {
        try {
            const response = await fetch('/api/benchmark');
            const result = await response.json();
            if (result.success) {
                lastBenchmarkData = result.data;
                renderBenchmarkTable(result.data);
                renderBenchmarkCharts(result.data);
            }
        } catch (err) {
            console.error('Error benchmark:', err);
        }
    }

    function renderBenchmarkTable(data) {
        const tbody = document.getElementById('benchmark-table-body');
        tbody.innerHTML = '';
        data.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${item.model}</strong></td>
                <td><span style="color:#38bdf8; font-weight:700;">${item.iou.toFixed(4)}</span></td>
                <td><span style="color:#818cf8; font-weight:700;">${item.dice.toFixed(4)}</span></td>
                <td>${item.precision.toFixed(4)}</td>
                <td>${item.recall.toFixed(4)}</td>
                <td><span style="color:#10b981; font-weight:700;">${item.fps}</span></td>
                <td>${item.params}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    function renderBenchmarkCharts(data) {
        if (!data) return;
        const labels = data.map(d => d.model);
        const iouData = data.map(d => d.iou);
        const diceData = data.map(d => d.dice);
        const fpsData = data.map(d => d.fps);

        if (chartInstance1) chartInstance1.destroy();
        if (chartInstance2) chartInstance2.destroy();

        const ctx1 = document.getElementById('chart-metrics').getContext('2d');
        chartInstance1 = new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    { label: currentLang === 'en' ? 'IoU Score' : 'Chỉ số IoU', data: iouData, backgroundColor: '#38bdf8' },
                    { label: currentLang === 'en' ? 'Dice Score (F1)' : 'Điểm Dice (F1)', data: diceData, backgroundColor: '#818cf8' }
                ]
            },
            options: {
                responsive: true,
                plugins: { legend: { labels: { color: '#ffffff' } } },
                scales: {
                    x: { ticks: { color: '#94a3b8' } },
                    y: { ticks: { color: '#94a3b8' } }
                }
            }
        });

        const ctx2 = document.getElementById('chart-fps').getContext('2d');
        chartInstance2 = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{ label: currentLang === 'en' ? 'Inference Latency (FPS)' : 'Tốc độ suy luận (FPS)', data: fpsData, backgroundColor: '#10b981' }]
            },
            options: {
                responsive: true,
                indexAxis: 'y',
                plugins: { legend: { labels: { color: '#ffffff' } } },
                scales: {
                    x: { ticks: { color: '#94a3b8' } },
                    y: { ticks: { color: '#94a3b8' } }
                }
            }
        });
    }

    // =========================================================================
    // REAL-TIME VIDEO PROCESSING ENGINE
    // =========================================================================
    const videoFileInput = document.getElementById('video-file-input');
    const btnSampleVideo = document.getElementById('btn-sample-video');
    const btnProcessVideo = document.getElementById('btn-process-video');
    const videoPlayer = document.getElementById('video-player');
    const videoOverlayImg = document.getElementById('video-overlay-img');
    const videoLoader = document.getElementById('video-loader');

    const videoFpsEl = document.getElementById('video-fps');
    const videoRatioEl = document.getElementById('video-ratio');
    const videoRiskEl = document.getElementById('video-risk');

    let isProcessingVideo = false;
    let videoFrameCanvas = document.createElement('canvas');
    let isSendingFrame = false;
    let lastVideoData = null;
    let lastVideoOrigB64 = null;
    let lastVideoAutoSaveTime = 0;
    let hasSavedVideoInitial = false;

    if (videoFileInput) {
        videoFileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                const url = URL.createObjectURL(e.target.files[0]);
                if (videoPlayer) {
                    videoPlayer.src = url;
                    videoPlayer.load();
                    videoPlayer.play().catch(err => console.log(err));
                    startVideoProcessing();
                }
            }
        });
    }

    if (btnSampleVideo) {
        btnSampleVideo.addEventListener('click', () => {
            if (videoPlayer) {
                videoPlayer.src = '/static/sample_crack_video.mp4';
                videoPlayer.load();
                videoPlayer.play().then(() => {
                    startVideoProcessing();
                });
            }
        });
    }

    if (btnProcessVideo) {
        btnProcessVideo.addEventListener('click', () => {
            if (isProcessingVideo) {
                stopVideoProcessing();
            } else {
                if (videoPlayer) {
                    videoPlayer.play().catch(e => console.log(e));
                }
                startVideoProcessing();
            }
        });
    }

    function startVideoProcessing() {
        isProcessingVideo = true;
        hasSavedVideoInitial = false;
        if (btnProcessVideo) {
            btnProcessVideo.innerHTML = `<i class="fa-solid fa-circle-pause"></i> ${TRANSLATIONS[currentLang].btn_process_video_pause}`;
            btnProcessVideo.classList.replace('btn-sample-success', 'btn-sample-outline');
        }
        if (videoLoader) videoLoader.classList.remove('hidden');
        requestAnimationFrame(captureAndProcessVideoFrame);
    }

    function stopVideoProcessing() {
        isProcessingVideo = false;
        if (btnProcessVideo) {
            btnProcessVideo.innerHTML = `<i class="fa-solid fa-circle-play"></i> ${TRANSLATIONS[currentLang].btn_process_video_start}`;
            btnProcessVideo.classList.replace('btn-sample-outline', 'btn-sample-success');
        }
        if (videoLoader) videoLoader.classList.add('hidden');
        autoSaveVideoAudit('Tạm dừng phân tích video');
    }

    let rollingVideoFps = 0;

    async function captureAndProcessVideoFrame() {
        if (!isProcessingVideo || !videoPlayer) return;

        if (videoPlayer.paused || videoPlayer.ended) {
            if (isProcessingVideo && !videoPlayer.ended) {
                requestAnimationFrame(captureAndProcessVideoFrame);
            }
            return;
        }

        if (isSendingFrame) {
            requestAnimationFrame(captureAndProcessVideoFrame);
            return;
        }

        // High-definition stream resolution matching original video clarity
        const vw = videoPlayer.videoWidth || 640;
        const vh = videoPlayer.videoHeight || 480;
        const maxDim = 720;
        let targetW = vw;
        let targetH = vh;
        if (targetW > maxDim) {
            targetH = Math.round((vh * maxDim) / vw);
            targetW = maxDim;
        }

        videoFrameCanvas.width = targetW;
        videoFrameCanvas.height = targetH;
        const ctx = videoFrameCanvas.getContext('2d', { alpha: false });
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(videoPlayer, 0, 0, targetW, targetH);
        try { lastVideoOrigB64 = videoFrameCanvas.toDataURL('image/jpeg', 0.90); } catch (e) {}

        isSendingFrame = true;
        videoFrameCanvas.toBlob(async (blob) => {
            if (!blob || !isProcessingVideo) {
                isSendingFrame = false;
                return;
            }

            const selectedModel = (algorithmGroupSelect && algorithmGroupSelect.value === 'dl') ? modelTypeSelect.value : (classicalTypeSelect ? classicalTypeSelect.value : 'sobel');
            const threshold = thresholdInput ? thresholdInput.value : 0.5;
            const imgSize = imgSizeInput ? imgSizeInput.value : 256;
            const opacity = opacityInput ? opacityInput.value : 0.55;

            const formData = new FormData();
            formData.append('file', blob, 'video_frame.jpg');
            formData.append('model_type', selectedModel);
            formData.append('threshold', threshold);
            formData.append('img_size', imgSize);
            formData.append('overlay_color', selectedColor);
            formData.append('overlay_opacity', opacity);

            try {
                const startT = performance.now();
                const response = await fetch('/api/stream/frame', {
                    method: 'POST',
                    body: formData
                });

                const inferMs = performance.now() - startT;
                const data = await response.json();

                if (data.success) {
                    lastVideoData = data;
                    if (videoOverlayImg) videoOverlayImg.src = data.overlay_base64;
                    if (videoLoader) videoLoader.classList.add('hidden');

                    const instantFps = 1000 / Math.max(inferMs, 8);
                    rollingVideoFps = rollingVideoFps ? (rollingVideoFps * 0.7 + instantFps * 0.3) : instantFps;
                    if (videoFpsEl) videoFpsEl.textContent = `${rollingVideoFps.toFixed(1)} FPS`;
                    if (videoRatioEl) videoRatioEl.textContent = `${data.metrics.crack_ratio.toFixed(2)}%`;
                    if (videoRiskEl) {
                        const displayRisk = getLocalizedRisk(data.metrics.risk_level, currentLang);
                        videoRiskEl.textContent = displayRisk;
                        videoRiskEl.style.color = data.metrics.risk_color;
                    }

                    // TỰ ĐỘNG LƯU LỊCH SỬ PHÂN TÍCH VIDEO (Không cần bấm nút)
                    if (!hasSavedVideoInitial) {
                        hasSavedVideoInitial = true;
                        setTimeout(() => autoSaveVideoAudit('Khung hình video tự động'), 350);
                    } else if (Date.now() - lastVideoAutoSaveTime >= 6000) {
                        autoSaveVideoAudit('Kiểm tra định kỳ video');
                    }
                }
            } catch (err) {
                console.warn('Frame processing dropped:', err);
            } finally {
                isSendingFrame = false;
                if (isProcessingVideo) {
                    requestAnimationFrame(captureAndProcessVideoFrame);
                }
            }
        }, 'image/jpeg', 0.90);
    }

    // TỰ ĐỘNG LƯU BẢN GHI KIỂM ĐỊNH VIDEO
    async function autoSaveVideoAudit(reason = 'Khung hình video kiểm định') {
        if (!videoPlayer || !lastVideoData || !lastVideoData.overlay_base64) return;
        const now = Date.now();
        if (now - lastVideoAutoSaveTime < 4500) return; // Tránh ghi trùng lặp quá nhanh
        lastVideoAutoSaveTime = now;

        let origB64 = lastVideoOrigB64;
        if (!origB64) {
            const c = document.createElement('canvas');
            c.width = videoPlayer.videoWidth || 640;
            c.height = videoPlayer.videoHeight || 480;
            const ctx = c.getContext('2d');
            ctx.drawImage(videoPlayer, 0, 0, c.width, c.height);
            try { origB64 = c.toDataURL('image/jpeg', 0.85); } catch (e) {}
        }
        if (!origB64) return;

        const metrics = lastVideoData.metrics || {};
        const selectedModel = (algorithmGroupSelect && algorithmGroupSelect.value === 'dl')
            ? (modelTypeSelect.options[modelTypeSelect.selectedIndex] ? modelTypeSelect.options[modelTypeSelect.selectedIndex].text : 'Compact U-Net (PyTorch)')
            : (classicalTypeSelect ? classicalTypeSelect.value : 'Sobel Operator');

        const payload = {
            source_type: "video",
            model_name: selectedModel,
            threshold: parseFloat(thresholdInput ? thresholdInput.value : 0.5),
            img_size: parseInt(imgSizeInput ? imgSizeInput.value : 256),
            crack_ratio: metrics.crack_ratio || 0,
            affected_area: metrics.affected_area || Math.round((metrics.crack_ratio || 0) * 0.012 * 1000) / 1000,
            infer_time: metrics.infer_time || 23.5,
            risk_level: metrics.risk_level || 'AN TOÀN (THẤP)',
            risk_color: metrics.risk_color || '#10b981',
            risk_desc: `${reason} (${Math.floor(videoPlayer.currentTime || 0)}s, ${(rollingVideoFps || 30).toFixed(1)} FPS)`,
            orig_base64: origB64,
            overlay_base64: lastVideoData.overlay_base64 || origB64,
            mask_base64: lastVideoData.overlay_base64 || origB64,
            fps: parseFloat((rollingVideoFps || 30).toFixed(1))
        };

        try {
            const res = await fetch('/api/history/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const resData = await res.json();
            if (resData.success && typeof loadHistoryData === 'function') {
                loadHistoryData();
            }
        } catch (err) {
            console.warn('Auto-save video audit failed:', err);
        }
    }

    // =========================================================================
    // CAMERA / WEBCAM LIVE INSPECTION LOGIC (LOCALIZED)
    // =========================================================================
    let webcamStream = null;
    let isProcessingCamera = false;
    let isSendingCameraFrame = false;
    let isVirtualCamera = false;
    const cameraFrameCanvas = document.createElement('canvas');

    const btnWebcam = document.getElementById('btn-webcam');
    const btnCameraAi = document.getElementById('btn-camera-ai');
    const btnCameraSnapshot = document.getElementById('btn-camera-snapshot');
    const btnVirtualCamera = document.getElementById('btn-virtual-camera');
    let lastCameraData = null;
    let lastCameraOrigB64 = null;
    let lastCameraAutoSaveTime = 0;
    let hasSavedCameraInitial = false;

    const webcamVideo = document.getElementById('webcam-video');
    const webcamPlaceholder = document.getElementById('webcam-placeholder');
    const cameraOverlayImg = document.getElementById('camera-overlay-img');
    const cameraOverlayPlaceholder = document.getElementById('camera-overlay-placeholder');
    const cameraLoader = document.getElementById('camera-loader');
    const cameraAlertBanner = document.getElementById('camera-alert-banner');
    const cameraAlertMsg = document.getElementById('camera-alert-msg');

    const cameraFps = document.getElementById('camera-fps');
    const cameraRatio = document.getElementById('camera-ratio');
    const cameraRisk = document.getElementById('camera-risk');

    function showCameraAlert(message) {
        if (cameraAlertBanner && cameraAlertMsg) {
            cameraAlertMsg.textContent = message;
            cameraAlertBanner.classList.remove('hidden');
        }
    }

    function hideCameraAlert() {
        if (cameraAlertBanner) {
            cameraAlertBanner.classList.add('hidden');
        }
    }

    if (btnWebcam) {
        btnWebcam.addEventListener('click', async () => {
            if (webcamStream || isVirtualCamera) {
                stopWebcam();
            } else {
                await startWebcam();
            }
        });
    }

    if (btnVirtualCamera) {
        btnVirtualCamera.addEventListener('click', () => {
            if (isVirtualCamera) {
                stopWebcam();
            } else {
                startVirtualCamera();
            }
        });
    }

    async function startWebcam() {
        hideCameraAlert();
        if (isVirtualCamera) stopWebcam();

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            showCameraAlert(currentLang === 'en' ?
                'Webcam access blocked by browser security policy on HTTP custom domain. To use your REAL physical webcam, open: http://localhost:8000. Running Simulation feed now...' :
                'Trình duyệt chặn mở Webcam thật trên tên miền HTTP riêng do chính sách bảo mật WebRTC. Để bật WEBCAM THẬT, bạn hãy truy cập: http://localhost:8000. Hiện tại đang mở luồng mô phỏng.');
            startVirtualCamera();
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 640 },
                    height: { ideal: 480 },
                    facingMode: 'environment'
                },
                audio: false
            });

            webcamStream = stream;
            isVirtualCamera = false;

            if (webcamVideo) {
                webcamVideo.srcObject = stream;
                webcamVideo.src = '';
                webcamVideo.classList.remove('hidden');
                webcamVideo.play().catch(e => console.warn('Camera play error:', e));
            }

            if (webcamPlaceholder) webcamPlaceholder.classList.add('hidden');

            if (btnWebcam) {
                btnWebcam.innerHTML = `<i class="fa-solid fa-video-slash"></i> ${TRANSLATIONS[currentLang].btn_webcam_off}`;
                btnWebcam.classList.replace('btn-sample-success', 'btn-sample-outline');
            }

            if (btnCameraAi) btnCameraAi.disabled = false;
            if (btnCameraSnapshot) btnCameraSnapshot.disabled = false;
            if (btnVirtualCamera) btnVirtualCamera.classList.remove('btn-sample-success');

            if (cameraRisk) {
                cameraRisk.textContent = currentLang === 'en' ? 'READY' : 'SẴN SÀNG';
                cameraRisk.style.color = '#38bdf8';
            }
        } catch (err) {
            console.error('Error opening webcam:', err);
            let errMsg = currentLang === 'en' ? 'Unable to access camera: ' : 'Không thể mở Camera: ';
            if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                errMsg += currentLang === 'en' ? 'Camera permission was denied. Please allow camera access in browser address bar.' : 'Quyền truy cập Camera đã bị chặn. Vui lòng cho phép quyền trên thanh địa chỉ trình duyệt.';
            } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
                errMsg += currentLang === 'en' ? 'No physical webcam found connected to this computer.' : 'Không tìm thấy thiết bị Webcam vật lý kết nối với máy tính.';
            } else {
                errMsg += (err.message || 'Unknown device error.');
            }
            errMsg += currentLang === 'en' ? ' Automatically switching to Simulation Feed for testing.' : ' Hệ thống tự động kích hoạt Luồng Mô Phỏng Hiện Trường để bạn tiếp tục kiểm nghiệm.';
            showCameraAlert(errMsg);
            startVirtualCamera();
        }
    }

    function startVirtualCamera() {
        hideCameraAlert();
        if (webcamStream) {
            webcamStream.getTracks().forEach(t => t.stop());
            webcamStream = null;
        }

        isVirtualCamera = true;
        if (webcamVideo) {
            webcamVideo.srcObject = null;
            webcamVideo.src = '/static/sample_crack_video.mp4';
            webcamVideo.loop = true;
            webcamVideo.muted = true;
            webcamVideo.classList.remove('hidden');
            webcamVideo.play().catch(e => console.warn('Virtual camera play:', e));
        }

        if (webcamPlaceholder) webcamPlaceholder.classList.add('hidden');

        if (btnWebcam) {
            btnWebcam.innerHTML = `<i class="fa-solid fa-power-off"></i> ${TRANSLATIONS[currentLang].btn_webcam_on}`;
            btnWebcam.classList.replace('btn-sample-outline', 'btn-sample-success');
        }

        if (btnVirtualCamera) {
            btnVirtualCamera.innerHTML = `<i class="fa-solid fa-stop"></i> ${TRANSLATIONS[currentLang].btn_virtual_camera_off}`;
            btnVirtualCamera.classList.add('btn-sample-success');
        }

        if (btnCameraAi) btnCameraAi.disabled = false;
        if (btnCameraSnapshot) btnCameraSnapshot.disabled = false;

        if (cameraRisk) {
            cameraRisk.textContent = currentLang === 'en' ? 'SIMULATION FEED' : 'MÔ PHỎNG HIỆN TRƯỜNG';
            cameraRisk.style.color = '#38bdf8';
        }
    }

    function stopWebcam() {
        stopCameraProcessing();

        if (webcamStream) {
            webcamStream.getTracks().forEach(track => track.stop());
            webcamStream = null;
        }

        isVirtualCamera = false;

        if (webcamVideo) {
            webcamVideo.pause();
            webcamVideo.srcObject = null;
            webcamVideo.src = '';
            webcamVideo.classList.add('hidden');
        }

        if (webcamPlaceholder) webcamPlaceholder.classList.remove('hidden');

        if (btnWebcam) {
            btnWebcam.innerHTML = `<i class="fa-solid fa-power-off"></i> ${TRANSLATIONS[currentLang].btn_webcam_on}`;
            btnWebcam.classList.remove('btn-sample-outline');
            btnWebcam.classList.add('btn-sample-success');
        }

        if (btnVirtualCamera) {
            btnVirtualCamera.innerHTML = `<i class="fa-solid fa-laptop-code"></i> ${TRANSLATIONS[currentLang].btn_virtual_camera_on}`;
            btnVirtualCamera.classList.remove('btn-sample-success');
        }

        if (btnCameraAi) {
            btnCameraAi.disabled = true;
            btnCameraAi.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> ${TRANSLATIONS[currentLang].btn_camera_ai_start}`;
            btnCameraAi.classList.remove('btn-sample-success');
            btnCameraAi.classList.add('btn-sample');
        }

        if (btnCameraSnapshot) btnCameraSnapshot.disabled = true;

        if (cameraOverlayImg) cameraOverlayImg.classList.add('hidden');
        if (cameraOverlayPlaceholder) cameraOverlayPlaceholder.classList.remove('hidden');

        if (cameraFps) cameraFps.textContent = '0 FPS';
        if (cameraRatio) cameraRatio.textContent = '0.00%';
        if (cameraRisk) {
            cameraRisk.textContent = currentLang === 'en' ? 'AWAITING CAMERA' : 'CHỜ CAMERA';
            cameraRisk.style.color = '#94a3b8';
        }
    }

    if (btnCameraAi) {
        btnCameraAi.addEventListener('click', () => {
            if (isProcessingCamera) {
                stopCameraProcessing();
            } else {
                startCameraProcessing();
            }
        });
    }

    function startCameraProcessing() {
        if (!webcamStream && !isVirtualCamera) return;

        isProcessingCamera = true;
        hasSavedCameraInitial = false;
        if (btnCameraAi) {
            btnCameraAi.innerHTML = `<i class="fa-solid fa-circle-pause"></i> ${TRANSLATIONS[currentLang].btn_camera_ai_pause}`;
            btnCameraAi.classList.replace('btn-sample', 'btn-sample-outline');
        }

        if (cameraOverlayPlaceholder) cameraOverlayPlaceholder.classList.add('hidden');
        if (cameraOverlayImg) cameraOverlayImg.classList.remove('hidden');
        if (cameraLoader) cameraLoader.classList.remove('hidden');

        requestAnimationFrame(captureAndProcessCameraFrame);
    }

    function stopCameraProcessing() {
        isProcessingCamera = false;
        if (btnCameraAi) {
            btnCameraAi.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> ${TRANSLATIONS[currentLang].btn_camera_ai_start}`;
            btnCameraAi.classList.replace('btn-sample-outline', 'btn-sample');
        }
        if (cameraLoader) cameraLoader.classList.add('hidden');
        autoSaveCameraAudit('Tạm dừng phân đoạn camera');
    }

    let rollingCameraFps = 0;

    async function captureAndProcessCameraFrame() {
        if (!isProcessingCamera || !webcamVideo) return;

        if (webcamVideo.paused || webcamVideo.ended) {
            if (isProcessingCamera && !webcamVideo.ended) {
                requestAnimationFrame(captureAndProcessCameraFrame);
            }
            return;
        }

        if (isSendingCameraFrame) {
            requestAnimationFrame(captureAndProcessCameraFrame);
            return;
        }

        // High-definition stream resolution matching original camera clarity
        const vw = webcamVideo.videoWidth || 640;
        const vh = webcamVideo.videoHeight || 480;
        const maxDim = 720;
        let targetW = vw;
        let targetH = vh;
        if (targetW > maxDim) {
            targetH = Math.round((vh * maxDim) / vw);
            targetW = maxDim;
        }

        cameraFrameCanvas.width = targetW;
        cameraFrameCanvas.height = targetH;
        const ctx = cameraFrameCanvas.getContext('2d', { alpha: false });
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(webcamVideo, 0, 0, targetW, targetH);
        try { lastCameraOrigB64 = cameraFrameCanvas.toDataURL('image/jpeg', 0.90); } catch (e) {}

        isSendingCameraFrame = true;
        cameraFrameCanvas.toBlob(async (blob) => {
            if (!blob || !isProcessingCamera) {
                isSendingCameraFrame = false;
                return;
            }

            const selectedModel = (algorithmGroupSelect && algorithmGroupSelect.value === 'dl') ? modelTypeSelect.value : (classicalTypeSelect ? classicalTypeSelect.value : 'sobel');
            const threshold = thresholdInput ? thresholdInput.value : 0.5;
            const imgSize = imgSizeInput ? imgSizeInput.value : 256;
            const opacity = opacityInput ? opacityInput.value : 0.55;

            const formData = new FormData();
            formData.append('file', blob, 'camera_frame.jpg');
            formData.append('model_type', selectedModel);
            formData.append('threshold', threshold);
            formData.append('img_size', imgSize);
            formData.append('overlay_color', selectedColor);
            formData.append('overlay_opacity', opacity);

            try {
                const startT = performance.now();
                const response = await fetch('/api/stream/frame', {
                    method: 'POST',
                    body: formData
                });

                const inferMs = performance.now() - startT;
                const data = await response.json();

                if (data.success) {
                    lastCameraData = data;
                    if (cameraOverlayImg) cameraOverlayImg.src = data.overlay_base64;
                    if (cameraLoader) cameraLoader.classList.add('hidden');

                    const instantFps = 1000 / Math.max(inferMs, 8);
                    rollingCameraFps = rollingCameraFps ? (rollingCameraFps * 0.7 + instantFps * 0.3) : instantFps;
                    if (cameraFps) cameraFps.textContent = `${rollingCameraFps.toFixed(1)} FPS`;
                    if (cameraRatio) cameraRatio.textContent = `${data.metrics.crack_ratio.toFixed(2)}%`;
                    if (cameraRisk) {
                        const displayRisk = getLocalizedRisk(data.metrics.risk_level, currentLang);
                        cameraRisk.textContent = displayRisk;
                        cameraRisk.style.color = data.metrics.risk_color;
                    }

                    // TỰ ĐỘNG LƯU LỊCH SỬ CAMERA TRỰC TIẾP (Không cần bấm nút)
                    if (!hasSavedCameraInitial) {
                        hasSavedCameraInitial = true;
                        setTimeout(() => autoSaveCameraAudit('Khung hình camera tự động'), 350);
                    } else if (Date.now() - lastCameraAutoSaveTime >= 6000) {
                        autoSaveCameraAudit('Kiểm tra định kỳ camera');
                    }
                }
            } catch (err) {
                console.warn('Camera frame dropped:', err);
            } finally {
                isSendingCameraFrame = false;
                if (isProcessingCamera) {
                    requestAnimationFrame(captureAndProcessCameraFrame);
                }
            }
        }, 'image/jpeg', 0.90);
    }

    if (btnCameraSnapshot) {
        btnCameraSnapshot.addEventListener('click', () => {
            if (!webcamVideo) return;

            const vw = webcamVideo.videoWidth || 640;
            const vh = webcamVideo.videoHeight || 480;
            cameraFrameCanvas.width = vw;
            cameraFrameCanvas.height = vh;
            const ctx = cameraFrameCanvas.getContext('2d');
            ctx.drawImage(webcamVideo, 0, 0, vw, vh);

            cameraFrameCanvas.toBlob((blob) => {
                if (!blob) return;
                const file = new File([blob], `camera_audit_snapshot_${Date.now()}.jpg`, { type: 'image/jpeg' });

                // Switch to Tab 1 (Image Analysis)
                const tabImageBtn = document.querySelector('[data-tab="tab-image"]');
                if (tabImageBtn) tabImageBtn.click();

                // Trigger full image prediction & report setup tagged as camera source
                uploadAndPredictImage(file, 'camera');
            }, 'image/jpeg', 0.95);
        });
    }

    // TỰ ĐỘNG LƯU BẢN GHI KIỂM ĐỊNH CAMERA
    async function autoSaveCameraAudit(reason = 'Khung hình camera hiện trường') {
        if (!webcamVideo || !lastCameraData || !lastCameraData.overlay_base64) return;
        const now = Date.now();
        if (now - lastCameraAutoSaveTime < 4500) return; // Tránh ghi trùng lặp quá nhanh
        lastCameraAutoSaveTime = now;

        let origB64 = lastCameraOrigB64;
        if (!origB64) {
            const c = document.createElement('canvas');
            c.width = webcamVideo.videoWidth || 640;
            c.height = webcamVideo.videoHeight || 480;
            const ctx = c.getContext('2d');
            ctx.drawImage(webcamVideo, 0, 0, c.width, c.height);
            try { origB64 = c.toDataURL('image/jpeg', 0.85); } catch (e) {}
        }
        if (!origB64) return;

        const metrics = lastCameraData.metrics || {};
        const selectedModel = (algorithmGroupSelect && algorithmGroupSelect.value === 'dl')
            ? (modelTypeSelect.options[modelTypeSelect.selectedIndex] ? modelTypeSelect.options[modelTypeSelect.selectedIndex].text : 'U-Net ResNet-34 (512x512 HD)')
            : (classicalTypeSelect ? classicalTypeSelect.value : 'Sobel Operator');

        const payload = {
            source_type: "camera",
            model_name: selectedModel,
            threshold: parseFloat(thresholdInput ? thresholdInput.value : 0.5),
            img_size: parseInt(imgSizeInput ? imgSizeInput.value : 256),
            crack_ratio: metrics.crack_ratio || 0,
            affected_area: metrics.affected_area || Math.round((metrics.crack_ratio || 0) * 0.012 * 1000) / 1000,
            infer_time: metrics.infer_time || 32.0,
            risk_level: metrics.risk_level || 'AN TOÀN (THẤP)',
            risk_color: metrics.risk_color || '#10b981',
            risk_desc: `${reason} (${(rollingCameraFps || 30).toFixed(1)} FPS)`,
            orig_base64: origB64,
            overlay_base64: lastCameraData.overlay_base64 || origB64,
            mask_base64: lastCameraData.overlay_base64 || origB64,
            fps: parseFloat((rollingCameraFps || 30).toFixed(1))
        };

        try {
            const res = await fetch('/api/history/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const resData = await res.json();
            if (resData.success && typeof loadHistoryData === 'function') {
                loadHistoryData();
            }
        } catch (err) {
            console.warn('Auto-save camera audit failed:', err);
        }
    }

    // =========================================================================
    // WEIGHT UPLOAD HANDLER
    // =========================================================================
    const pthFileInput = document.getElementById('pth-file');
    const pthName = document.getElementById('pth-name');
    if (pthFileInput) {
        pthFileInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            pthName.textContent = (currentLang === 'en' ? 'Uploading: ' : 'Đang nạp: ') + file.name + '...';
            const formData = new FormData();
            formData.append('file', file);
            try {
                const res = await fetch('/api/upload/weights', {
                    method: 'POST',
                    body: formData
                });
                const data = await res.json();
                if (data.success) {
                    pthName.innerHTML = `<span style="color:#10b981; font-weight:600;"><i class="fa-solid fa-circle-check"></i> ${file.name} (${data.size_mb} MB)</span>`;
                    alert(currentLang === 'en' ? `Model weights ${file.name} (${data.size_mb} MB) loaded successfully!` : `Đã nạp thành công mô hình ${file.name} (${data.size_mb} MB) vào hệ thống!`);
                } else {
                    pthName.textContent = currentLang === 'en' ? 'Weight upload error' : 'Lỗi nạp trọng số';
                    alert((currentLang === 'en' ? 'Error: ' : 'Lỗi: ') + (data.detail || 'Cannot load weights'));
                }
            } catch (err) {
                pthName.textContent = currentLang === 'en' ? 'Connection error' : 'Lỗi kết nối';
                alert((currentLang === 'en' ? 'Connection error while uploading: ' : 'Lỗi kết nối khi nạp file: ') + err.message);
            }
        });
    }

    // =========================================================================
    // BENCHMARK & MODEL EVALUATION (TAB 4) IMPLEMENTATION
    // =========================================================================
    const benchmarkTableBody = document.getElementById('benchmark-table-body');
    const scenarioPillBtns = document.querySelectorAll('.scenario-pill-btn');

    function switchBenchmarkScenario(scenario) {
        currentBenchmarkScenario = scenario || 'all';

        // 1. Update Scenario Buttons
        const btns = document.querySelectorAll('.scenario-pill-btn');
        btns.forEach(b => {
            if (b.dataset.scenario === currentBenchmarkScenario) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });

        // 2. Switch Visible Panel (All vs Image vs Video)
        const panels = document.querySelectorAll('.scenario-panel');
        panels.forEach(p => p.classList.remove('active'));

        const targetPanel = document.getElementById(`scenario-panel-${currentBenchmarkScenario}`);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }

        // 3. Update Table Highlights & Sorting
        if (lastBenchmarkData) {
            renderBenchmarkTable(lastBenchmarkData, currentBenchmarkScenario);
        }
    }

    if (scenarioPillBtns) {
        scenarioPillBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const sc = btn.dataset.scenario || 'all';
                switchBenchmarkScenario(sc);
            });
        });
    }

    async function loadBenchmarkData() {
        try {
            const res = await fetch('/api/benchmark');
            const data = await res.json();
            if (data.success && data.data) {
                lastBenchmarkData = data.data;
                switchBenchmarkScenario(currentBenchmarkScenario);
                renderBenchmarkCharts(lastBenchmarkData);
            }
        } catch (err) {
            console.error('Error fetching benchmark data:', err);
        }
    }

    function renderBenchmarkTable(data, scenario = 'all') {
        if (!benchmarkTableBody || !data) return;
        benchmarkTableBody.innerHTML = '';

        // Determine sorting based on selected scenario
        let displayData = [...data];
        if (scenario === 'image') {
            displayData.sort((a, b) => (b.image_score || 0) - (a.image_score || 0));
        } else if (scenario === 'video') {
            displayData.sort((a, b) => (b.video_score || 0) - (a.video_score || 0));
        }

        displayData.forEach(item => {
            const tr = document.createElement('tr');

            // Image Suitability Badge & Label
            const imgScore = item.image_score || 0;
            let imgBadgeClass = 'badge-low-tier';
            let imgTierLabel = currentLang === 'en' ? 'Low' : 'Thấp';
            if (imgScore >= 9.5) {
                imgBadgeClass = 'badge-top-tier';
                imgTierLabel = currentLang === 'en' ? 'Top Choice (9.8/10)' : 'Tối Ưu Nhất (9.8/10)';
            } else if (imgScore >= 9.0) {
                imgBadgeClass = 'badge-high-tier';
                imgTierLabel = currentLang === 'en' ? 'Outstanding (9.3/10)' : 'Xuất Sắc (9.3/10)';
            } else if (imgScore >= 8.0) {
                imgBadgeClass = 'badge-good-tier';
                imgTierLabel = currentLang === 'en' ? 'Very Good (8.9/10)' : 'Rất Tốt (8.9/10)';
            } else if (imgScore >= 7.0) {
                imgBadgeClass = 'badge-moderate-tier';
                imgTierLabel = currentLang === 'en' ? 'Good (7.9/10)' : 'Khá Tốt (7.9/10)';
            } else {
                imgBadgeClass = 'badge-low-tier';
                imgTierLabel = currentLang === 'en' ? 'Basic (4.5/10)' : 'Sơ Loại (4.5/10)';
            }

            // Video Suitability Badge & Label
            const vidScore = item.video_score || 0;
            let vidBadgeClass = 'badge-low-tier';
            let vidTierLabel = currentLang === 'en' ? 'Low' : 'Thấp';
            if (vidScore >= 9.5) {
                vidBadgeClass = 'badge-top-tier';
                vidTierLabel = currentLang === 'en' ? 'Top Realtime (9.6/10)' : 'Tối Ưu Nhất (9.6/10)';
            } else if (vidScore >= 9.0) {
                vidBadgeClass = 'badge-high-tier';
                vidTierLabel = currentLang === 'en' ? 'Smooth (9.0/10)' : 'Rất Mượt (9.0/10)';
            } else if (vidScore >= 8.0) {
                vidBadgeClass = 'badge-good-tier';
                vidTierLabel = currentLang === 'en' ? 'Good Realtime (8.2/10)' : 'Tốt (8.2/10)';
            } else if (vidScore >= 7.0) {
                vidBadgeClass = 'badge-moderate-tier';
                vidTierLabel = currentLang === 'en' ? 'Acceptable (7.4/10)' : 'Trung Bình (7.4/10)';
            } else {
                vidBadgeClass = 'badge-low-tier';
                vidTierLabel = currentLang === 'en' ? 'Pre-Filter (6.9/10)' : 'Lọc Khung (6.9/10)';
            }

            // FPS Pill
            const fps = item.fps || 0;
            let fpsClass = 'fps-mid';
            if (fps >= 60) fpsClass = 'fps-ultra';
            else if (fps >= 30) fpsClass = 'fps-high';

            // Localized descriptions
            const imgDesc = currentLang === 'en' ? (item.image_desc_en || '') : (item.image_desc_vi || '');
            const vidDesc = currentLang === 'en' ? (item.video_desc_en || '') : (item.video_desc_vi || '');
            const recDesc = currentLang === 'en' ? (item.recommendation_en || '') : (item.recommendation_vi || '');

            // Highlight classes based on scenario
            const imgColHighlight = (scenario === 'image') ? 'highlight-column-image' : '';
            const vidColHighlight = (scenario === 'video') ? 'highlight-column-video' : '';

            tr.innerHTML = `
                <td>
                    <div class="model-col-name">
                        <span>${item.model}</span>
                        <span class="model-col-params"><i class="fa-solid fa-microchip"></i> ${item.params || 'N/A'}</span>
                    </div>
                </td>
                <td class="${imgColHighlight}">
                    <div class="suitability-cell">
                        <span class="suitability-badge ${imgBadgeClass}">
                            <i class="fa-solid fa-camera-retro"></i> ${imgTierLabel}
                        </span>
                        <span class="suitability-sub">${imgDesc}</span>
                    </div>
                </td>
                <td class="${vidColHighlight}">
                    <div class="suitability-cell">
                        <span class="suitability-badge ${vidBadgeClass}">
                            <i class="fa-solid fa-video"></i> ${vidTierLabel}
                        </span>
                        <span class="suitability-sub">${vidDesc}</span>
                    </div>
                </td>
                <td style="font-weight:700; color:var(--hazard-warning); font-family:monospace; font-size:0.88rem;">
                    ${((item.iou || 0) * 100).toFixed(2)}%
                </td>
                <td style="font-weight:700; color:#38bdf8; font-family:monospace; font-size:0.88rem;">
                    ${((item.dice || 0) * 100).toFixed(2)}%
                </td>
                <td class="${vidColHighlight}">
                    <span class="fps-pill ${fpsClass}">${fps.toFixed(1)} FPS</span>
                </td>
                <td class="${vidColHighlight}" style="font-family:monospace; color:var(--text-main); font-weight:600;">
                    ${(item.latency_ms || 0).toFixed(1)} ms
                </td>
                <td style="font-size:0.78rem; color:var(--text-main); max-width:260px; line-height:1.4;">
                    ${recDesc}
                </td>
            `;

            benchmarkTableBody.appendChild(tr);
        });
    }

    function renderBenchmarkCharts(data) {
        if (!data || typeof Chart === 'undefined') return;

        const isLight = (document.documentElement.getAttribute('data-theme') === 'light');
        const textColor = isLight ? '#475569' : '#94a3b8';
        const gridColor = isLight ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.06)';

        const labels = data.map(d => {
            if (d.model.includes('U-Net ResNet-34') || d.model.includes('ResNet-34')) return 'U-Net ResNet-34 (Đề xuất)';
            if (d.model.includes('Fine-Tuned')) return 'DeepLabV3+ (Fine-Tuned)';
            if (d.model.includes('Compact U-Net')) return 'Compact U-Net (Seg03)';
            if (d.model.includes('Frozen')) return 'DeepLabV3+ (Frozen)';
            if (d.model.includes('Sobel')) return 'Sobel + Otsu (Cổ điển)';
            return d.model;
        });

        // Chart 1: IoU & Dice Score
        const canvas1 = document.getElementById('chart-metrics');
        if (canvas1) {
            if (chartInstance1) chartInstance1.destroy();
            const ctx1 = canvas1.getContext('2d');
            chartInstance1 = new Chart(ctx1, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: currentLang === 'en' ? 'IoU (Jaccard) %' : 'Chỉ số IoU (Jaccard) %',
                            data: data.map(d => +((d.iou || 0) * 100).toFixed(2)),
                            backgroundColor: 'rgba(245, 158, 11, 0.75)',
                            borderColor: '#f59e0b',
                            borderWidth: 1,
                            borderRadius: 4
                        },
                        {
                            label: currentLang === 'en' ? 'Dice Score (F1) %' : 'Chỉ số Dice (F1) %',
                            data: data.map(d => +((d.dice || 0) * 100).toFixed(2)),
                            backgroundColor: 'rgba(56, 189, 248, 0.75)',
                            borderColor: '#38bdf8',
                            borderWidth: 1,
                            borderRadius: 4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            ticks: { color: textColor, font: { size: 11 } },
                            grid: { color: gridColor }
                        },
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                color: textColor,
                                font: { size: 11 },
                                callback: val => val + '%'
                            },
                            grid: { color: gridColor }
                        }
                    },
                    plugins: {
                        legend: {
                            labels: { color: textColor, font: { size: 12 } }
                        },
                        tooltip: {
                            callbacks: {
                                label: ctx => `${ctx.dataset.label}: ${ctx.raw}%`
                            }
                        }
                    }
                }
            });
        }

        // Chart 2: FPS & Latency
        const canvas2 = document.getElementById('chart-fps');
        if (canvas2) {
            if (chartInstance2) chartInstance2.destroy();
            const ctx2 = canvas2.getContext('2d');
            chartInstance2 = new Chart(ctx2, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: currentLang === 'en' ? 'Video Speed (FPS)' : 'Tốc độ Video (FPS)',
                            data: data.map(d => d.fps || 0),
                            backgroundColor: 'rgba(16, 185, 129, 0.75)',
                            borderColor: '#10b981',
                            borderWidth: 1,
                            borderRadius: 4,
                            yAxisID: 'y'
                        },
                        {
                            label: currentLang === 'en' ? 'Latency (ms)' : 'Độ trễ xử lý (ms)',
                            data: data.map(d => d.latency_ms || 0),
                            backgroundColor: 'rgba(239, 68, 68, 0.65)',
                            borderColor: '#ef4444',
                            borderWidth: 1,
                            borderRadius: 4,
                            yAxisID: 'y1'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            ticks: { color: textColor, font: { size: 11 } },
                            grid: { color: gridColor }
                        },
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'FPS (Frames / Sec)',
                                color: textColor
                            },
                            ticks: { color: textColor, font: { size: 11 } },
                            grid: { color: gridColor }
                        },
                        y1: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Latency (ms)',
                                color: textColor
                            },
                            ticks: { color: textColor, font: { size: 11 } },
                            grid: { drawOnChartArea: false }
                        }
                    },
                    plugins: {
                        legend: {
                            labels: { color: textColor, font: { size: 12 } }
                        },
                        tooltip: {
                            callbacks: {
                                label: ctx => `${ctx.dataset.label}: ${ctx.raw} ${ctx.datasetIndex === 0 ? 'FPS' : 'ms'}`
                            }
                        }
                    }
                }
            });
        }
    }

    // =========================================================================
    // AUDIT HISTORY (TAB 5) IMPLEMENTATION
    // =========================================================================
    const historyTableBody = document.getElementById('history-table-body');
    const historyEmptyState = document.getElementById('history-empty-state');
    const historyTableWrapper = document.getElementById('history-table-wrapper');
    const historyTotalCount = document.getElementById('history-total-count');
    const historySourceFilter = document.getElementById('history-source-filter');
    const historyRiskFilter = document.getElementById('history-risk-filter');
    const historySearchInput = document.getElementById('history-search-input');
    const btnExportCsv = document.getElementById('btn-export-csv');
    const btnClearHistory = document.getElementById('btn-clear-history');
    const btnHistGoAnalyze = document.getElementById('btn-hist-go-analyze');

    async function loadHistoryData() {
        try {
            const res = await fetch('/api/history');
            const data = await res.json();
            if (data.success) {
                historyRecords = data.records || [];
                if (historyTotalCount) historyTotalCount.textContent = historyRecords.length;
                const dbBadge = document.getElementById('db-engine-badge');
                const dbPill = document.getElementById('db-status-pill');
                if (dbBadge) {
                    if (data.db_engine && data.db_engine.includes('Microsoft SQL Server')) {
                        dbBadge.textContent = 'SQL Server (SSMS)';
                        if (dbPill) dbPill.title = `Microsoft SQL Server 2022 (${data.server_instance || '.\\SQLEXPRESS01'}) -> Database: ${data.db_name || 'CrackVisionDB'}`;
                    } else {
                        dbBadge.textContent = 'SQLite SQL (Online)';
                        if (dbPill) dbPill.title = 'SQLite Relational Database Engine (crackvision.db)';
                    }
                }
                renderHistoryTable(filterHistoryRecords());
            }
        } catch (err) {
            console.error('Error fetching history:', err);
        }
    }

    function filterHistoryRecords() {
        if (!historyRecords || historyRecords.length === 0) return [];
        const sourceVal = historySourceFilter ? historySourceFilter.value : 'all';
        const filterVal = historyRiskFilter ? historyRiskFilter.value : 'all';
        const query = (historySearchInput ? historySearchInput.value : '').toLowerCase().trim();

        return historyRecords.filter(item => {
            // Function Source Filter
            if (sourceVal !== 'all') {
                const itemSrc = item.source_type || 'image';
                if (itemSrc !== sourceVal) return false;
            }

            // Risk Filter
            if (filterVal !== 'all') {
                const risk = (item.risk_level || '').toUpperCase();
                if (filterVal === 'safe' && !risk.includes('AN TOÀN') && !risk.includes('SAFE')) return false;
                if (filterVal === 'warning' && !risk.includes('CẢNH BÁO') && !risk.includes('WARNING')) return false;
                if (filterVal === 'critical' && !risk.includes('NGUY HIỂM') && !risk.includes('CRITICAL')) return false;
            }

            // Search Query
            if (query) {
                const idMatch = (item.id || '').toLowerCase().includes(query);
                const modelMatch = (item.model_name || '').toLowerCase().includes(query);
                const timeMatch = (item.timestamp || '').toLowerCase().includes(query);
                const riskMatch = (item.risk_level || '').toLowerCase().includes(query);
                if (!idMatch && !modelMatch && !timeMatch && !riskMatch) return false;
            }

            return true;
        });
    }

    function renderHistoryTable(records) {
        if (!historyTableBody) return;
        historyTableBody.innerHTML = '';

        if (!records || records.length === 0) {
            if (historyTableWrapper) historyTableWrapper.classList.add('hidden');
            if (historyEmptyState) historyEmptyState.classList.remove('hidden');
            return;
        }

        if (historyTableWrapper) historyTableWrapper.classList.remove('hidden');
        if (historyEmptyState) historyEmptyState.classList.add('hidden');

        records.forEach(item => {
            const tr = document.createElement('tr');

            // Format date time
            let dateStr = item.timestamp || '';
            try {
                const d = new Date(item.timestamp);
                if (!isNaN(d.getTime())) {
                    dateStr = d.toLocaleString(currentLang === 'en' ? 'en-US' : 'vi-VN', {
                        year: 'numeric', month: '2-digit', day: '2-digit',
                        hour: '2-digit', minute: '2-digit', second: '2-digit'
                    });
                }
            } catch (e) {}

            const displayRisk = getLocalizedRisk(item.risk_level || 'N/A', currentLang);
            const origThumb = item.orig_base64 || '';
            const overlayThumb = item.overlay_base64 || '';

            const origLabel = (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang].label_orig_thumb) || 'Orig';
            const overlayLabel = (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang].label_overlay_thumb) || 'Overlay';

            const inspectTitle = (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang].btn_hist_inspect_title) || 'Inspect';
            const pdfTitle = (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang].btn_hist_pdf_title) || 'Download PDF';
            const deleteTitle = (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang].btn_hist_delete_title) || 'Delete';

            const src = item.source_type || 'image';
            let srcBadgeClass = 'badge-src-image';
            let srcIcon = '<i class="fa-solid fa-camera"></i>';
            let srcLabel = (currentLang === 'en' ? 'Image Analysis' : 'Phân Tích Ảnh');
            if (src === 'video') {
                srcBadgeClass = 'badge-src-video';
                srcIcon = '<i class="fa-solid fa-video"></i>';
                srcLabel = (currentLang === 'en' ? 'Video Analysis' : 'Phân Tích Video');
            } else if (src === 'camera') {
                srcBadgeClass = 'badge-src-camera';
                srcIcon = '<i class="fa-solid fa-camera-retro"></i>';
                srcLabel = (currentLang === 'en' ? 'Live Camera' : 'Camera Trực Tiếp');
            }

            tr.innerHTML = `
                <td>
                    <div style="margin-bottom:6px;">
                        <span class="source-badge ${srcBadgeClass}">${srcIcon} ${srcLabel}</span>
                    </div>
                    <div style="font-weight:700; color:var(--text-primary); font-family:monospace;">#${item.id || 'N/A'}</div>
                    <div style="font-size:0.8rem; color:var(--text-muted); margin-top:2px;"><i class="fa-regular fa-clock"></i> ${dateStr}</div>
                </td>
                <td>
                    <div class="history-thumb-pair">
                        <div class="history-thumb-wrapper">
                            <img src="${origThumb}" class="history-thumb" alt="Original" loading="lazy">
                            <span class="history-thumb-label">${origLabel}</span>
                        </div>
                        <div class="history-thumb-wrapper">
                            <img src="${overlayThumb}" class="history-thumb" alt="Overlay" loading="lazy">
                            <span class="history-thumb-label" style="background:rgba(239, 68, 68, 0.85);">${overlayLabel}</span>
                        </div>
                    </div>
                </td>
                <td>
                    <div style="font-weight:600; color:var(--accent-primary);">${item.model_name || 'N/A'}</div>
                    <div style="font-size:0.8rem; color:var(--text-muted);">Ngưỡng: ${item.threshold !== undefined ? item.threshold : 0.5} | ${item.img_size || 256}px</div>
                </td>
                <td>
                    <div style="font-weight:700; color:#38bdf8;">${(item.crack_ratio || 0).toFixed(2)} %</div>
                    <div style="font-size:0.8rem; color:var(--text-muted);">${(item.affected_area || 0).toFixed(3)} m² (${(item.infer_time || 0).toFixed(1)}ms)</div>
                </td>
                <td>
                    <span class="history-risk-badge" style="background:${item.risk_color || '#10b981'}22; color:${item.risk_color || '#10b981'}; border:1px solid ${item.risk_color || '#10b981'}55;">
                        ${displayRisk}
                    </span>
                </td>
                <td style="text-align:center;">
                    <div class="history-actions-cell">
                        <button class="btn-action-icon inspect" data-id="${item.id}" title="${inspectTitle}">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                        <button class="btn-action-icon pdf" data-id="${item.id}" title="${pdfTitle}">
                            <i class="fa-solid fa-file-pdf"></i>
                        </button>
                        <button class="btn-action-icon delete" data-id="${item.id}" title="${deleteTitle}">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </td>
            `;

            // Inspect click
            const inspectBtn = tr.querySelector('.btn-action-icon.inspect');
            inspectBtn.addEventListener('click', () => inspectHistoryRecord(item));

            // PDF click
            const pdfBtn = tr.querySelector('.btn-action-icon.pdf');
            pdfBtn.addEventListener('click', () => exportHistoryRecordPdf(item, pdfBtn));

            // Delete click
            const delBtn = tr.querySelector('.btn-action-icon.delete');
            delBtn.addEventListener('click', () => deleteHistoryItem(item.id));

            historyTableBody.appendChild(tr);
        });
    }

    function inspectHistoryRecord(record) {
        // Construct standard data payload for updateUIWithResults
        const data = {
            orig_base64: record.orig_base64,
            overlay_base64: record.overlay_base64,
            mask_base64: record.mask_base64,
            metrics: {
                crack_ratio: record.crack_ratio,
                affected_area: record.affected_area,
                infer_time: record.infer_time,
                risk_level: record.risk_level,
                risk_color: record.risk_color,
                risk_desc: record.risk_desc,
                recommendation: record.recommendation,
                repair_method: record.repair_method,
                model_name: record.model_name
            }
        };

        // Populate Tab 1 state and view
        updateUIWithResults(data);

        // Switch active tab to Tab 1 (Image Analysis)
        const tabImageBtn = document.querySelector('[data-tab="tab-image"]');
        if (tabImageBtn) tabImageBtn.click();

        // Smooth scroll to top of workspace
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    async function exportHistoryRecordPdf(record, btnEl) {
        if (!record) return;
        const originalHtml = btnEl ? btnEl.innerHTML : '';
        if (btnEl) {
            btnEl.disabled = true;
            btnEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
        }

        try {
            const response = await fetch('/api/report/pdf', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orig_base64: record.orig_base64,
                    overlay_base64: record.overlay_base64,
                    metrics: {
                        crack_ratio: record.crack_ratio,
                        affected_area: record.affected_area,
                        infer_time: record.infer_time,
                        risk_level: record.risk_level,
                        risk_color: record.risk_color,
                        risk_desc: record.risk_desc,
                        recommendation: record.recommendation,
                        repair_method: record.repair_method,
                        model_name: record.model_name
                    },
                    lang: currentLang
                })
            });

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = currentLang === 'en' ? `Crack_Audit_${record.id}.pdf` : `BaoCao_KiemDinh_${record.id}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (err) {
            console.error('Error generating PDF for record:', err);
            alert(currentLang === 'en' ? 'Failed to generate PDF!' : 'Không thể tạo file PDF báo cáo!');
        } finally {
            if (btnEl) {
                btnEl.disabled = false;
                btnEl.innerHTML = originalHtml;
            }
        }
    }

    async function deleteHistoryItem(auditId) {
        const confirmMsg = (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang].confirm_delete_record) || 'Delete this record?';
        if (!confirm(confirmMsg)) return;

        try {
            const res = await fetch(`/api/history/${auditId}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                historyRecords = historyRecords.filter(r => r.id !== auditId);
                if (historyTotalCount) historyTotalCount.textContent = historyRecords.length;
                renderHistoryTable(filterHistoryRecords());
            }
        } catch (err) {
            console.error('Error deleting record:', err);
            alert(currentLang === 'en' ? 'Failed to delete record' : 'Lỗi xóa bản ghi');
        }
    }

    async function clearAllHistory() {
        const confirmMsg = (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang].confirm_clear_history) || 'Clear all inspection history?';
        if (!confirm(confirmMsg)) return;

        try {
            const res = await fetch('/api/history', { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                historyRecords = [];
                if (historyTotalCount) historyTotalCount.textContent = '0';
                renderHistoryTable([]);
            }
        } catch (err) {
            console.error('Error clearing history:', err);
            alert(currentLang === 'en' ? 'Failed to clear history' : 'Lỗi xóa lịch sử');
        }
    }

    // Filter & Search Events
    if (historySourceFilter) {
        historySourceFilter.addEventListener('change', () => {
            renderHistoryTable(filterHistoryRecords());
        });
    }

    if (historyRiskFilter) {
        historyRiskFilter.addEventListener('change', () => {
            renderHistoryTable(filterHistoryRecords());
        });
    }

    if (historySearchInput) {
        historySearchInput.addEventListener('input', () => {
            renderHistoryTable(filterHistoryRecords());
        });
    }

    if (btnExportCsv) {
        btnExportCsv.addEventListener('click', () => {
            window.location.href = '/api/history/export/csv';
        });
    }

    if (btnClearHistory) {
        btnClearHistory.addEventListener('click', clearAllHistory);
    }

    if (btnHistGoAnalyze) {
        btnHistGoAnalyze.addEventListener('click', () => {
            const tabImageBtn = document.querySelector('[data-tab="tab-image"]');
            if (tabImageBtn) tabImageBtn.click();
        });
    }

    // =========================================================================
    // EXECUTIVE DASHBOARD (TAB 0) IMPLEMENTATION & CHARTS
    // =========================================================================

    function animateCounter(elementId, targetValue, duration = 1200, decimals = 0, suffix = '') {
        const el = document.getElementById(elementId);
        if (!el) return;
        const target = parseFloat(targetValue) || 0;
        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = start + (target - start) * easeProgress;
            
            el.textContent = current.toFixed(decimals) + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target.toFixed(decimals) + suffix;
            }
        }

        requestAnimationFrame(update);
    }

    async function loadDashboardData() {
        const refreshBtn = document.getElementById('btn-refresh-dashboard');
        const icon = refreshBtn ? refreshBtn.querySelector('i') : null;
        if (icon) icon.classList.add('spin');

        try {
            let summary = null;
            try {
                const res = await fetch('/api/dashboard/summary');
                if (res.ok) {
                    const json = await res.json();
                    if (json.success) summary = json;
                }
            } catch (e) {
                console.warn('Dashboard summary endpoint unavailable, falling back:', e);
            }

            if (!summary) {
                const [dbRes, histRes] = await Promise.all([
                    fetch('/api/database/status').then(r => r.json()).catch(() => ({ database: {} })),
                    fetch('/api/history').then(r => r.json()).catch(() => ({ records: [] }))
                ]);
                const dbStats = dbRes.database || {};
                const records = histRes.records || [];
                
                const lightRecent = records.slice(0, 6).map(r => ({
                    id: r.id,
                    source_type: r.source_type || 'image',
                    timestamp: r.timestamp || '',
                    model_name: r.model_name || 'U-Net ResNet-34',
                    crack_ratio: +(r.crack_ratio || 0).toFixed(2),
                    affected_area: +(r.affected_area || 0).toFixed(3),
                    infer_time: +(r.infer_time || 0).toFixed(1),
                    risk_level: r.risk_level || 'AN TOÀN',
                    risk_color: r.risk_color || '#4C7A4A'
                }));

                const timeline = records.slice(0, 8).reverse().map(r => {
                    const ts = r.timestamp || '';
                    return {
                        id: r.id,
                        time: ts.length >= 8 ? ts.slice(-8) : ts,
                        crack_ratio: +(r.crack_ratio || 0).toFixed(2),
                        infer_time: +(r.infer_time || 0).toFixed(1)
                    };
                });

                summary = {
                    database: dbStats,
                    recent_inspections: lightRecent,
                    timeline: timeline,
                    primary_model: {
                        name: "U-Net ResNet-34 (512x512)",
                        miou: 58.39,
                        dice: 73.36,
                        fps: 34.5,
                        latency_ms: 28.9
                    }
                };
            }

            lastDashboardData = summary;
            renderDashboard(summary);
        } catch (err) {
            console.error('Error loading dashboard data:', err);
        } finally {
            if (icon) {
                setTimeout(() => icon.classList.remove('spin'), 400);
            }
        }
    }

    function renderDashboard(data) {
        if (!data) return;
        const db = data.database || {};
        const isEn = (currentLang === 'en');

        // Update Database Engine Banner
        const engineEl = document.getElementById('dash-engine-name');
        if (engineEl) {
            if (db.engine && db.engine.includes('Microsoft SQL Server')) {
                engineEl.textContent = 'Microsoft SQL Server (SSMS)';
            } else {
                engineEl.textContent = db.engine || 'SQLite 3 (Online)';
            }
        }

        // Animate KPI Numbers
        const totalRecords = db.total_records !== undefined ? db.total_records : (data.recent_inspections ? data.recent_inspections.length : 0);
        animateCounter('dash-kpi-total-val', totalRecords, 1000, 0);

        const totalArea = db.total_affected_area_m2 || 0;
        animateCounter('dash-kpi-area-val', totalArea, 1200, 3);

        const avgCrack = db.avg_crack_ratio || 0;
        animateCounter('dash-kpi-ratio-val', avgCrack, 1000, 2);

        // Subtitle status pill
        const riskTag = document.getElementById('dash-kpi-risk-tag');
        if (riskTag) {
            if (avgCrack > 3.5) {
                riskTag.innerHTML = `<span class="dash-risk-tag tag-danger">${isEn ? 'High Risk' : 'Mức Nguy Hiểm'}</span>`;
            } else if (avgCrack > 1.0) {
                riskTag.innerHTML = `<span class="dash-risk-tag tag-warning">${isEn ? 'Moderate Warning' : 'Cảnh Báo Vừa'}</span>`;
            } else {
                riskTag.innerHTML = `<span class="dash-risk-tag tag-safe">${isEn ? 'Safe Status' : 'Trạng Thái An Toàn'}</span>`;
            }
        }

        // Render Charts
        renderDashboardCharts(data);

        // Render Recent Activity Stream
        renderDashboardFeed(data.recent_inspections || []);

        // Sync Active Model UI with sidebar state
        updateActiveModelUI();
    }

    function renderDashboardCharts(data) {
        if (!data || typeof Chart === 'undefined') return;

        const isLight = (document.documentElement.getAttribute('data-theme') === 'light');
        const textColor = isLight ? '#475569' : '#CBD5E1';
        const gridColor = isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)';
        const isEn = (currentLang === 'en');

        const db = data.database || {};
        const riskDist = db.risk_distribution || {};
        const sourceDist = db.source_distribution || {};

        // 1. RISK DOUGHNUT CHART
        let safeCount = 0;
        let warnCount = 0;
        let critCount = 0;

        for (const [k, v] of Object.entries(riskDist)) {
            const upper = k.toUpperCase();
            if (upper.includes('AN TOÀN') || upper.includes('SAFE') || upper.includes('THẤP')) {
                safeCount += v;
            } else if (upper.includes('CẢNH BÁO') || upper.includes('WARNING') || upper.includes('TRUNG')) {
                warnCount += v;
            } else if (upper.includes('NGUY HIỂM') || upper.includes('CRITICAL') || upper.includes('DANGER') || upper.includes('CAO')) {
                critCount += v;
            }
        }

        const safeEl = document.getElementById('dash-risk-safe-count');
        const warnEl = document.getElementById('dash-risk-warn-count');
        const critEl = document.getElementById('dash-risk-crit-count');
        const riskTotalTag = document.getElementById('dash-risk-total-tag');

        if (safeEl) safeEl.textContent = safeCount;
        if (warnEl) warnEl.textContent = warnCount;
        if (critEl) critEl.textContent = critCount;
        const totalRiskAudits = safeCount + warnCount + critCount;
        if (riskTotalTag) riskTotalTag.textContent = `${totalRiskAudits} ${isEn ? 'audits' : 'phiên'}`;

        const canvasRisk = document.getElementById('dash-chart-risk');
        if (canvasRisk) {
            if (dashRiskChart) dashRiskChart.destroy();
            const ctxRisk = canvasRisk.getContext('2d');
            dashRiskChart = new Chart(ctxRisk, {
                type: 'doughnut',
                data: {
                    labels: isEn ? ['Safe (< 1%)', 'Warning (1% - 3.5%)', 'Critical (> 3.5%)'] : ['An Toàn (< 1%)', 'Cảnh Báo (1% - 3.5%)', 'Nguy Hiểm (> 3.5%)'],
                    datasets: [{
                        data: totalRiskAudits > 0 ? [safeCount, warnCount, critCount] : [1, 0, 0],
                        backgroundColor: ['#4C7A4A', '#C98A2E', '#B4432A'],
                        borderColor: isLight ? '#FFFFFF' : '#2D2C28',
                        borderWidth: 3,
                        hoverOffset: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 1400,
                        easing: 'easeOutQuart'
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: (ctx) => {
                                    const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                                    const val = ctx.raw;
                                    const pct = total > 0 ? ((val / total) * 100).toFixed(1) : 0;
                                    return ` ${ctx.label}: ${val} (${pct}%)`;
                                }
                            }
                        }
                    },
                    cutout: '72%'
                }
            });
        }

        // 2. TIMELINE / TREND SPLINE CHART
        const timeline = data.timeline || [];
        const canvasTrend = document.getElementById('dash-chart-trend');
        if (canvasTrend) {
            if (dashTrendChart) dashTrendChart.destroy();
            const ctxTrend = canvasTrend.getContext('2d');

            const trendLabels = timeline.map(t => t.time || t.id);
            const trendRatios = timeline.map(t => t.crack_ratio);
            const trendTimes = timeline.map(t => t.infer_time);

            const grad1 = ctxTrend.createLinearGradient(0, 0, 0, 240);
            grad1.addColorStop(0, 'rgba(180, 67, 42, 0.45)');
            grad1.addColorStop(1, 'rgba(180, 67, 42, 0.02)');

            dashTrendChart = new Chart(ctxTrend, {
                type: 'line',
                data: {
                    labels: trendLabels.length > 0 ? trendLabels : ['P1', 'P2', 'P3', 'P4'],
                    datasets: [
                        {
                            label: isEn ? 'Crack Density (%)' : 'Mật Độ Vết Nứt (%)',
                            data: trendRatios.length > 0 ? trendRatios : [0.5, 1.2, 0.8, 2.1],
                            borderColor: '#B4432A',
                            backgroundColor: grad1,
                            borderWidth: 2.5,
                            fill: true,
                            tension: 0.38,
                            pointBackgroundColor: '#B4432A',
                            pointBorderColor: '#FFFFFF',
                            pointBorderWidth: 1.5,
                            pointRadius: 4,
                            pointHoverRadius: 7,
                            yAxisID: 'y'
                        },
                        {
                            label: isEn ? 'Inference Latency (ms)' : 'Thời Gian Xử Lý (ms)',
                            data: trendTimes.length > 0 ? trendTimes : [28, 32, 29, 35],
                            borderColor: '#3B82F6',
                            borderWidth: 2,
                            borderDash: [4, 4],
                            fill: false,
                            tension: 0.25,
                            pointBackgroundColor: '#3B82F6',
                            pointRadius: 3,
                            yAxisID: 'y1'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 1500,
                        easing: 'easeOutQuart'
                    },
                    scales: {
                        x: {
                            ticks: { color: textColor, font: { size: 10 } },
                            grid: { color: gridColor }
                        },
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            beginAtZero: true,
                            ticks: {
                                color: textColor,
                                callback: v => v + '%'
                            },
                            grid: { color: gridColor }
                        },
                        y1: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            beginAtZero: true,
                            grid: { drawOnChartArea: false },
                            ticks: {
                                color: textColor,
                                callback: v => v + 'ms'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: { color: textColor, boxWidth: 14, font: { size: 11, weight: '600' } }
                        }
                    }
                }
            });
        }

        // 3. RADAR COMPARISON CHART
        const canvasRadar = document.getElementById('dash-chart-radar');
        if (canvasRadar) {
            if (dashRadarChart) dashRadarChart.destroy();
            const ctxRadar = canvasRadar.getContext('2d');
            const radarLabels = isEn ?
                ['Accuracy (mIoU)', 'Dice F1 Score', 'Speed (FPS)', 'Hairline Crack Recall', 'Param Efficiency'] :
                ['Độ chính xác (mIoU)', 'Điểm Dice F1', 'Tốc độ (FPS)', 'Bắt vi nứt (Recall)', 'Độ gọn nhẹ tham số'];

            dashRadarChart = new Chart(ctxRadar, {
                type: 'radar',
                data: {
                    labels: radarLabels,
                    datasets: [
                        {
                            label: isEn ? 'U-Net ResNet-34 (Proposed)' : 'U-Net ResNet-34 (Đề xuất)',
                            data: [58.39, 73.36, 69.0, 73.82, 75.0],
                            borderColor: '#B4432A',
                            backgroundColor: 'rgba(180, 67, 42, 0.28)',
                            pointBackgroundColor: '#B4432A',
                            borderWidth: 2.2
                        },
                        {
                            label: 'DeepLabV3+ (Fine-Tuned)',
                            data: [36.66, 53.65, 57.2, 89.63, 40.0],
                            borderColor: '#3B82F6',
                            backgroundColor: 'rgba(59, 130, 246, 0.16)',
                            pointBackgroundColor: '#3B82F6',
                            borderWidth: 1.8
                        },
                        {
                            label: 'Compact U-Net (Seg03)',
                            data: [39.35, 51.61, 85.0, 81.73, 65.0],
                            borderColor: '#4C7A4A',
                            backgroundColor: 'rgba(76, 122, 74, 0.16)',
                            pointBackgroundColor: '#4C7A4A',
                            borderWidth: 1.8
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 1600,
                        easing: 'easeOutQuart'
                    },
                    scales: {
                        r: {
                            angleLines: { color: gridColor },
                            grid: { color: gridColor },
                            pointLabels: {
                                color: textColor,
                                font: { size: 10, weight: '600' }
                            },
                            ticks: {
                                display: false,
                                max: 100,
                                min: 0
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { color: textColor, boxWidth: 12, font: { size: 11 } }
                        }
                    }
                }
            });
        }

        // 4. INSPECTION SOURCES BAR CHART
        const canvasSources = document.getElementById('dash-chart-sources');
        if (canvasSources) {
            if (dashSourcesChart) dashSourcesChart.destroy();
            const ctxSources = canvasSources.getContext('2d');

            const imgCount = sourceDist.image || 0;
            const vidCount = sourceDist.video || 0;
            const camCount = sourceDist.camera || 0;
            const totalSrc = imgCount + vidCount + camCount;

            const sourceTag = document.getElementById('dash-source-total-tag');
            if (sourceTag) sourceTag.textContent = `${totalSrc} ${isEn ? 'inspections' : 'lượt'}`;

            dashSourcesChart = new Chart(ctxSources, {
                type: 'bar',
                data: {
                    labels: isEn ? ['Static Images', 'Field Videos', 'Live Camera'] : ['Ảnh Chụp Hiện Trường', 'Video Công Trình', 'Camera Trực Tiếp'],
                    datasets: [{
                        label: isEn ? 'Audit Count' : 'Số Lượng Phiên',
                        data: [imgCount, vidCount, camCount],
                        backgroundColor: [
                            'rgba(180, 67, 42, 0.85)',
                            'rgba(201, 138, 46, 0.85)',
                            'rgba(76, 122, 74, 0.85)'
                        ],
                        borderColor: ['#B4432A', '#C98A2E', '#4C7A4A'],
                        borderWidth: 1,
                        borderRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 1300,
                        easing: 'easeOutQuart'
                    },
                    scales: {
                        x: {
                            ticks: { color: textColor, font: { size: 11, weight: '600' } },
                            grid: { display: false }
                        },
                        y: {
                            beginAtZero: true,
                            ticks: { color: textColor, stepSize: 1 },
                            grid: { color: gridColor }
                        }
                    },
                    plugins: {
                        legend: { display: false }
                    }
                }
            });
        }
    }

    function renderDashboardFeed(recentItems) {
        const tbody = document.getElementById('dash-feed-table-body');
        if (!tbody) return;
        tbody.innerHTML = '';

        if (!recentItems || recentItems.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 20px; color: var(--text-dim);"><i class="fa-solid fa-inbox"></i> Chưa có bản ghi kiểm định nào trong cơ sở dữ liệu</td></tr>`;
            return;
        }

        const isEn = (currentLang === 'en');

        recentItems.slice(0, 5).forEach(item => {
            const tr = document.createElement('tr');
            
            let srcBadge = '<span class="badge-source"><i class="fa-solid fa-image"></i> Ảnh</span>';
            if (item.source_type === 'video') {
                srcBadge = '<span class="badge-source"><i class="fa-solid fa-video"></i> Video</span>';
            } else if (item.source_type === 'camera') {
                srcBadge = '<span class="badge-source"><i class="fa-solid fa-camera"></i> Camera</span>';
            }

            const riskUpper = (item.risk_level || '').toUpperCase();
            let riskClass = 'tag-safe';
            let riskText = item.risk_level || 'AN TOÀN';
            if (riskUpper.includes('CẢNH BÁO') || riskUpper.includes('WARNING') || riskUpper.includes('TRUNG')) {
                riskClass = 'tag-warning';
            } else if (riskUpper.includes('NGUY HIỂM') || riskUpper.includes('CRITICAL') || riskUpper.includes('CAO')) {
                riskClass = 'tag-danger';
            }

            tr.innerHTML = `
                <td>
                    <strong style="color: var(--text-main); font-family: var(--font-mono);">${item.id}</strong>
                    <div style="font-size: 0.72rem; color: var(--text-dim);"><i class="fa-regular fa-clock"></i> ${item.timestamp}</div>
                </td>
                <td>${srcBadge}</td>
                <td><small style="font-weight: 600; color: var(--text-main);">${item.model_name || 'U-Net ResNet-34'}</small></td>
                <td><strong class="tabular-num" style="color: var(--accent-primary);">${(item.crack_ratio || 0).toFixed(2)} %</strong></td>
                <td><span class="tabular-num">${(item.affected_area || 0).toFixed(3)} m²</span></td>
                <td><span class="dash-risk-tag ${riskClass}">${riskText}</span></td>
                <td style="text-align:center;">
                    <button class="btn-mini-inspect" data-audit-id="${item.id}" title="${isEn ? 'View in History' : 'Xem chi tiết'}">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i> ${isEn ? 'Inspect' : 'Xem lại'}
                    </button>
                </td>
            `;

            const inspectBtn = tr.querySelector('.btn-mini-inspect');
            if (inspectBtn) {
                inspectBtn.addEventListener('click', () => {
                    const tabHistBtn = document.querySelector('[data-tab="tab-history"]');
                    if (tabHistBtn) {
                        tabHistBtn.click();
                        const searchInput = document.getElementById('history-search-input');
                        if (searchInput) {
                            searchInput.value = item.id;
                            searchInput.dispatchEvent(new Event('input'));
                        }
                    }
                });
            }

            tbody.appendChild(tr);
        });
    }

    // Dashboard Buttons
    const btnRefreshDashboard = document.getElementById('btn-refresh-dashboard');
    if (btnRefreshDashboard) {
        btnRefreshDashboard.addEventListener('click', () => {
            loadDashboardData();
        });
    }

    const btnDashViewAllHistory = document.getElementById('btn-dash-view-all-history');
    if (btnDashViewAllHistory) {
        btnDashViewAllHistory.addEventListener('click', () => {
            const tabHistBtn = document.querySelector('[data-tab="tab-history"]');
            if (tabHistBtn) tabHistBtn.click();
        });
    }
});
