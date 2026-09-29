import os
import pptx
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE
import pypdf
import win32com.client
import pymupdf

def build_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Clean Professional Color Palette (SIH Hackathon Theme)
    C_WHITE = RGBColor(255, 255, 255)
    C_NAVY_DARK = RGBColor(15, 34, 64)       # Primary Title Navy
    C_NAVY_MED = RGBColor(24, 52, 94)        # Card Header Navy
    C_BLUE_CARD = RGBColor(27, 60, 115)      # Deep Blue
    C_BLUE_BANNER = RGBColor(16, 42, 86)     # Dark Blue Banner
    C_TEXT_DARK = RGBColor(15, 23, 42)       # Slate 900
    C_TEXT_MUTED = RGBColor(51, 65, 85)      # Slate 700
    C_CARD_BG = RGBColor(248, 250, 252)      # Slate 50
    C_BORDER_GRAY = RGBColor(203, 213, 225)  # Slate 300
    C_BORDER_DARK = RGBColor(148, 163, 184)  # Slate 400

    # Semantic Accent Colors
    C_CYAN = RGBColor(14, 116, 144)          # Cyan 700
    C_ORANGE = RGBColor(217, 119, 6)         # Amber 600
    C_GREEN = RGBColor(16, 149, 106)         # Emerald 600
    C_PURPLE = RGBColor(109, 40, 217)        # Violet 700
    C_RED = RGBColor(220, 38, 38)            # Red 600
    C_TEAL = RGBColor(13, 148, 136)          # Teal 600

    logo_path = os.path.abspath(r'c:\Users\AKASH\Downloads\food (2)\food\sih_logo_header.png')

    def draw_top_bar(slide, title_text, subtitle_text=None, team_label="Evergreen\nTeam 161280"):
        # Top-Left Team Oval
        oval = slide.shapes.add_shape(MSO_SHAPE.OVAL, Inches(0.4), Inches(0.18), Inches(1.55), Inches(0.78))
        oval.fill.solid()
        oval.fill.fore_color.rgb = C_WHITE
        oval.line.color.rgb = C_BORDER_DARK
        oval.line.width = Pt(1.5)
        tf = oval.text_frame
        tf.word_wrap = True
        tf.margin_left = Inches(0.05)
        tf.margin_right = Inches(0.05)
        tf.margin_top = Inches(0.08)
        p = tf.paragraphs[0]
        p.text = team_label
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = C_NAVY_DARK
        p.alignment = PP_ALIGN.CENTER

        # Center Title Box
        t_box = slide.shapes.add_textbox(Inches(2.1), Inches(0.15), Inches(8.5), Inches(0.85))
        tf_t = t_box.text_frame
        tf_t.word_wrap = True
        tf_t.margin_left = Inches(0.05)
        tf_t.margin_right = Inches(0.05)
        tf_t.margin_top = Inches(0.04)
        p_t = tf_t.paragraphs[0]
        p_t.text = title_text
        p_t.font.size = Pt(23)
        p_t.font.bold = True
        p_t.font.color.rgb = C_NAVY_DARK
        p_t.alignment = PP_ALIGN.CENTER

        if subtitle_text:
            p_sub = tf_t.add_paragraph()
            p_sub.text = subtitle_text
            p_sub.font.size = Pt(10.5)
            p_sub.font.color.rgb = C_TEXT_MUTED
            p_sub.alignment = PP_ALIGN.CENTER

        # Top-Right SIH 2026 Logo Badge
        if os.path.exists(logo_path):
            slide.shapes.add_picture(logo_path, Inches(10.696), Inches(0.04), width=Inches(2.35))
        else:
            sih_box = slide.shapes.add_textbox(Inches(10.8), Inches(0.15), Inches(2.2), Inches(0.85))
            tf_sih = sih_box.text_frame
            tf_sih.word_wrap = True
            p_s1 = tf_sih.paragraphs[0]
            p_s1.text = "SMART INDIA"
            p_s1.font.size = Pt(12)
            p_s1.font.bold = True
            p_s1.font.color.rgb = C_NAVY_DARK
            p_s1.alignment = PP_ALIGN.RIGHT
            p_s2 = tf_sih.add_paragraph()
            p_s2.text = "HACKATHON 2026"
            p_s2.font.size = Pt(12)
            p_s2.font.bold = True
            p_s2.font.color.rgb = RGBColor(234, 88, 12)
            p_s2.alignment = PP_ALIGN.RIGHT

    # =========================================================================
    # SLIDE 1: PLACEHOLDER (Will be replaced with exact original modified page)
    # =========================================================================
    slide1 = prs.slides.add_slide(blank_layout)
    tb1 = slide1.shapes.add_textbox(Inches(1), Inches(1), Inches(10), Inches(2))
    tb1.text_frame.text = "SLIDE 1 - EXACT COVER (PRESERVED)"

    # =========================================================================
    # SLIDE 2: PROPOSED SOLUTION & INNOVATION (PackWise AI Platform)
    # =========================================================================
    slide2 = prs.slides.add_slide(blank_layout)
    draw_top_bar(
        slide2,
        "PACKWISE AI",
        "AI-Based Intelligent Food Packaging Material Recommendation System for Food Commodities • PS SIH26236",
        team_label="Evergreen\nTeam 161280"
    )

    # Section 1 Header
    sub2 = slide2.shapes.add_textbox(Inches(0.4), Inches(1.02), Inches(12.5), Inches(0.32))
    p = sub2.text_frame.paragraphs[0]
    p.text = "❖ Proposed Solution (Describe your Idea/Solution/Prototype)"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = C_NAVY_DARK

    # Top Banner Box
    banner = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.4), Inches(1.34), Inches(12.5), Inches(0.42))
    banner.fill.solid()
    banner.fill.fore_color.rgb = RGBColor(241, 245, 249)
    banner.line.color.rgb = C_BORDER_DARK
    tf_b = banner.text_frame
    tf_b.word_wrap = True
    tf_b.margin_left = Inches(0.18)
    tf_b.margin_right = Inches(0.18)
    tf_b.margin_top = Inches(0.06)
    p_b = tf_b.paragraphs[0]
    p_b.text = "PACKWISE AI — Physics-informed hybrid AI platform matching 100+ Indian food commodities & storage physics with 31 barrier polymers.  ✓ Explainable  •  ✓ Source-traced  •  ✓ Respiration & MAP aware"
    p_b.font.size = Pt(11.5)
    p_b.font.bold = True
    p_b.font.color.rgb = C_NAVY_DARK

    # COMBINES / DELIVERS 2-Row Matrix
    matrix_top = [
        "100+ Indian Commodities DB (FDC+ICAR)",
        "Mass-Transfer & Respiration Physics",
        "Dynamic Storage & Transit Logistics",
        "31 Polymers & Bio-Resins Catalog"
    ]
    matrix_bot = [
        "TOPSIS Multi-Criteria Ranking",
        "Dynamic Barrier Needs (OTR / WVTR)",
        "MAP Equilibrium Solver (O2 / CO2)",
        "Explainable Report, FSSAI Pass & QR"
    ]
    w_box = Inches(2.93)
    gap_box = Inches(0.18)
    x_start = Inches(0.4)

    for i in range(4):
        b_top = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x_start + i * (w_box + gap_box), Inches(1.82), w_box, Inches(0.36))
        b_top.fill.solid()
        b_top.fill.fore_color.rgb = C_BLUE_CARD
        b_top.line.color.rgb = C_BLUE_CARD
        tf_bt = b_top.text_frame
        tf_bt.margin_top = Inches(0.04)
        p = tf_bt.paragraphs[0]
        p.text = matrix_top[i]
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = C_WHITE
        p.alignment = PP_ALIGN.CENTER

        b_bot = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x_start + i * (w_box + gap_box), Inches(2.22), w_box, Inches(0.36))
        b_bot.fill.solid()
        b_bot.fill.fore_color.rgb = C_GREEN
        b_bot.line.color.rgb = C_GREEN
        tf_bb = b_bot.text_frame
        tf_bb.margin_top = Inches(0.04)
        p = tf_bb.paragraphs[0]
        p.text = matrix_bot[i]
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = C_WHITE
        p.alignment = PP_ALIGN.CENTER

    # Section 2 Header: How it addresses the problem
    sub_prob = slide2.shapes.add_textbox(Inches(0.4), Inches(2.64), Inches(12.5), Inches(0.30))
    p = sub_prob.text_frame.paragraphs[0]
    p.text = "❖ How it addresses the problem"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = C_NAVY_DARK

    prob_box = slide2.shapes.add_textbox(Inches(0.4), Inches(2.92), Inches(12.5), Inches(1.72))
    tf_p = prob_box.text_frame
    tf_p.word_wrap = True
    tf_p.margin_left = Inches(0.08)
    tf_p.margin_right = Inches(0.08)
    bullets_prob = [
        ("• Perishable crop devastation — ", "India suffers ~30% post-harvest spoilage (₹1.52 Lakh Cr loss) due to unvented polybags and condensation rot."),
        ("• One pack can't fit all — ", "Moisture sorption, fat oxidation, and respiration rates differ fundamentally across commodities; mismatched films cause premature spoilage."),
        ("• Selection is expert-dependent & slow — ", "Fragmented offline knowledge, arbitrary polymer thickness, and high trial-and-error laboratory costs."),
        ("• Ground-level stakeholders struggle — ", "Smallholder farmers, FPOs & food MSMEs lack packaging scientists and need instant, explainable guidance in their native language."),
        ("• Unified physics + regulatory decision core — ", "Integrates food composition, crop biology, polymer barrier physics, and FSSAI/BIS rules into one automated engine.")
    ]
    for idx, (head, tail) in enumerate(bullets_prob):
        p = tf_p.paragraphs[0] if idx == 0 else tf_p.add_paragraph()
        run1 = p.add_run()
        run1.text = head
        run1.font.bold = True
        run1.font.size = Pt(11)
        run1.font.color.rgb = RGBColor(220, 38, 38) if idx < 2 else C_NAVY_DARK

        run2 = p.add_run()
        run2.text = tail
        run2.font.bold = False
        run2.font.size = Pt(11)
        run2.font.color.rgb = C_TEXT_DARK
        p.space_after = Pt(2.5)

    # SOLUTION PIPELINE BANNER & CHEVRON FLOW
    pipe_banner = slide2.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.4), Inches(4.70), Inches(12.5), Inches(0.26))
    pipe_banner.fill.solid()
    pipe_banner.fill.fore_color.rgb = C_BLUE_BANNER
    pipe_banner.line.color.rgb = C_BLUE_BANNER
    tf_pb = pipe_banner.text_frame
    tf_pb.margin_top = Inches(0.03)
    p = tf_pb.paragraphs[0]
    p.text = "SOLUTION PIPELINE — FROM FOOD TO EXPLAINED RECOMMENDATION"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = C_WHITE

    pipeline_steps = [
        ("FOOD SELECTION\n(100+ Crops)", C_WHITE, C_BORDER_DARK, C_NAVY_DARK),
        ("PROPERTY ANALYSIS\n(aw, pH, Lipids)", C_WHITE, C_BORDER_DARK, C_NAVY_DARK),
        ("RISK ANALYSIS\n(Respiration & O2)", C_WHITE, C_BORDER_DARK, C_NAVY_DARK),
        ("COMPATIBILITY\n(31 Polymers)", C_WHITE, C_BORDER_DARK, C_NAVY_DARK),
        ("TOPSIS AI RANKING\n(Cost vs Eco)", C_WHITE, C_CYAN, C_CYAN),
        ("EXPLAINED RESULT\n(3D Lab + QR)", C_GREEN, C_GREEN, C_WHITE)
    ]
    w_pipe = Inches(2.01)
    gap_pipe = Inches(0.08)
    for i, (text, bg_col, border_col, text_col) in enumerate(pipeline_steps):
        s_step = slide2.shapes.add_shape(MSO_SHAPE.CHEVRON, Inches(0.4) + i * (w_pipe + gap_pipe), Inches(5.00), w_pipe, Inches(0.48))
        s_step.fill.solid()
        s_step.fill.fore_color.rgb = bg_col
        s_step.line.color.rgb = border_col
        s_step.line.width = Pt(1.5)
        tf_s = s_step.text_frame
        tf_s.word_wrap = True
        tf_s.margin_left = Inches(0.12)
        tf_s.margin_right = Inches(0.02)
        tf_s.margin_top = Inches(0.04)
        p = tf_s.paragraphs[0]
        p.text = text
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = text_col
        p.alignment = PP_ALIGN.CENTER

    # Section 3 Header: Innovation and Uniqueness
    sub_inno = slide2.shapes.add_textbox(Inches(0.4), Inches(5.54), Inches(12.5), Inches(0.28))
    p = sub_inno.text_frame.paragraphs[0]
    p.text = "❖ Innovation and uniqueness of the solution"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = C_NAVY_DARK

    # 5 Pillars (Updated with software models)
    pillars = [
        ("1. EXPLAINABLE AI", "Transparent mathematical justification (TOPSIS Closeness Ci*) with statutory FSSAI citations & Gemini Flash reasoning."),
        ("2. MASS-TRANSFER PHYSICS", "Tetens vapor pressure equation + Arrhenius respiration kinetics for anaerobic hazard alerts."),
        ("3. 3D PACKAGING LAB", "Interactive Three.js WebGL multi-layer film digital twin with real-time layer exploding + 50-frame storyboard."),
        ("4. SOURCE TRACEABILITY", "Strict data discipline: FSSAI, APEDA, BIS, ICAR & USDA FDC — zero fabricated synthetic values."),
        ("5. AASAAN VOICE + QR", "Bilingual Hindi/English voice assistant (Vaani AI) + Edge YOLOv8 & NVIDIA NIM camera crop scanner + instant batch QR pass.")
    ]
    w_card = Inches(2.36)
    gap_card = Inches(0.16)
    for i, (title_p, sub_desc) in enumerate(pillars):
        card = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.4) + i * (w_card + gap_card), Inches(5.86), w_card, Inches(1.35))
        card.fill.solid()
        card.fill.fore_color.rgb = C_WHITE
        card.line.color.rgb = C_BORDER_DARK
        card.line.width = Pt(1.5)
        tf_c = card.text_frame
        tf_c.word_wrap = True
        tf_c.margin_left = Inches(0.08)
        tf_c.margin_right = Inches(0.08)
        tf_c.margin_top = Inches(0.08)
        p1 = tf_c.paragraphs[0]
        p1.text = title_p
        p1.font.size = Pt(10.5)
        p1.font.bold = True
        p1.font.color.rgb = C_NAVY_DARK
        p1.alignment = PP_ALIGN.CENTER
        p1.space_after = Pt(3)

        p2 = tf_c.add_paragraph()
        p2.text = sub_desc
        p2.font.size = Pt(9.8)
        p2.font.color.rgb = C_TEXT_MUTED

    # =========================================================================
    # SLIDE 3: TECHNICAL APPROACH (Updated with software models)
    # =========================================================================
    slide3 = prs.slides.add_slide(blank_layout)
    draw_top_bar(slide3, "TECHNICAL APPROACH", None, team_label="Evergreen\nTeam 161280")

    sub_tech = slide3.shapes.add_textbox(Inches(0.4), Inches(0.96), Inches(12.5), Inches(0.28))
    p = sub_tech.text_frame.paragraphs[0]
    p.text = "❖ Technologies, AI Software & Models Used in the Platform"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = C_NAVY_DARK

    # 4 Cards across the width
    tech_4cards = [
        ("FRONTEND TECH STACK", [
            ("Languages: ", "HTML5, CSS3, JavaScript (ES6+), TypeScript"),
            ("Framework: ", "React 19, Vite (Instant HMR), Tailwind CSS"),
            ("3D Digital Twin: ", "Three.js WebGL (Interactive Film Lab) & Quantum 3D"),
            ("Sensory UI: ", "Web Speech API (Voice AI), WebRTC Camera Scanner")
        ], C_CYAN),
        ("BACKEND & DATABASE", [
            ("Core Runtime: ", "Python 3.12 (High-Performance Async)"),
            ("API Framework: ", "FastAPI (RESTful APIs, Auto-Docs, CORS)"),
            ("Server & Engine: ", "Uvicorn ASGI, Pydantic v2, SQLAlchemy"),
            ("Database: ", "SQLite (Offline Local) / PostgreSQL Cloud")
        ], C_NAVY_DARK),
        ("AI & MACHINE LEARNING", [
            ("YOLOv8n Edge ONNX: ", "12ms / 60 FPS real-time crop camera scanner"),
            ("NVIDIA NIM Llama-3.2: ", "GPU Vision & packaging defect detection"),
            ("Google Gemini Flash: ", "FSSAI statutory explainability & multimodal"),
            ("NumPy TOPSIS: ", "MCDM Multi-Criteria Decision (Cost vs Eco)")
        ], C_PURPLE),
        ("PHYSICS & KINETIC MODELS", [
            ("Tetens Equation: ", "Psat(T) Saturated Vapor Pressure & WVTR"),
            ("Michaelis-Menten: ", "Dynamic Crop O2 & CO2 Respiration Rates"),
            ("Arrhenius Model: ", "Temperature Kinetics & +5°C Safety Buffer"),
            ("MAP Solver: ", "Laser Micro-Perforation Permeability")
        ], C_GREEN)
    ]

    w_t4 = Inches(2.96)
    gap_t4 = Inches(0.18)
    for i, (h, lines, col) in enumerate(tech_4cards):
        tb = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.4) + i * (w_t4 + gap_t4), Inches(1.24), w_t4, Inches(1.68))
        tb.fill.solid()
        tb.fill.fore_color.rgb = C_CARD_BG
        tb.line.color.rgb = col
        tb.line.width = Pt(1.5)
        tf_tb = tb.text_frame
        tf_tb.word_wrap = True
        tf_tb.margin_left = Inches(0.10)
        tf_tb.margin_right = Inches(0.10)
        tf_tb.margin_top = Inches(0.06)
        tf_tb.margin_bottom = Inches(0.04)

        p = tf_tb.paragraphs[0]
        p.text = h
        p.font.size = Pt(11.5)
        p.font.bold = True
        p.font.color.rgb = col
        p.space_after = Pt(2.5)

        for tag, val in lines:
            p_line = tf_tb.add_paragraph()
            r1 = p_line.add_run()
            r1.text = "• " + tag
            r1.font.bold = True
            r1.font.size = Pt(9.8)
            r1.font.color.rgb = C_NAVY_DARK

            r2 = p_line.add_run()
            r2.text = val
            r2.font.bold = False
            r2.font.size = Pt(9.8)
            r2.font.color.rgb = C_TEXT_DARK
            p_line.space_after = Pt(1.5)

    sub_arch = slide3.shapes.add_textbox(Inches(0.4), Inches(2.98), Inches(12.5), Inches(0.28))
    p = sub_arch.text_frame.paragraphs[0]
    p.text = "❖ System Architecture Flow — End-to-End Multi-Tier Connection"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = C_NAVY_DARK

    arch_tiers_5 = [
        ("1. CLIENT / USER LAYER", [
            "React 19 Responsive UI & Tailwind",
            "Bilingual Voice AI (Hindi / English)",
            "WebRTC Camera Crop Scanner"
        ], C_CYAN),
        ("2. API & GATEWAY LAYER", [
            "FastAPI Asynchronous Router",
            "Pydantic v2 Schema Validation",
            "REST Endpoints (/optimize, /recommend)"
        ], C_NAVY_DARK),
        ("3. AI & PHYSICS PIPELINE", [
            "YOLOv8 Edge ONNX + NVIDIA NIM",
            "Tetens & Arrhenius Kinetics Solver",
            "Gemini Flash Statutory Explanations"
        ], C_PURPLE),
        ("4. DATA & STANDARDS LAYER", [
            "100 Indian Crops (ICAR / USDA FDC)",
            "31 Polymers & Bio-Plastics DB",
            "FSSAI 2018 (IS 9845) & BIS Standards"
        ], C_GREEN),
        ("5. OUTPUT & DELIVERY HUD", [
            "Interactive 3D Three.js Film Lab",
            "MAP Gas Balance (5% O2, 10% CO2)",
            "Digital Traceability Batch QR Pass"
        ], C_ORANGE)
    ]
    w_at5 = Inches(2.36)
    gap_at5 = Inches(0.16)
    for i, (title_at, items_at, col_at) in enumerate(arch_tiers_5):
        at = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.4) + i * (w_at5 + gap_at5), Inches(3.28), w_at5, Inches(1.18))
        at.fill.solid()
        at.fill.fore_color.rgb = C_CARD_BG
        at.line.color.rgb = col_at
        at.line.width = Pt(1.5)
        tf_at = at.text_frame
        tf_at.word_wrap = True
        tf_at.margin_left = Inches(0.08)
        tf_at.margin_right = Inches(0.08)
        tf_at.margin_top = Inches(0.06)
        tf_at.margin_bottom = Inches(0.04)

        p = tf_at.paragraphs[0]
        p.text = title_at
        p.font.size = Pt(10.5)
        p.font.bold = True
        p.font.color.rgb = col_at
        p.alignment = PP_ALIGN.CENTER
        p.space_after = Pt(2)

        for l in items_at:
            p_l = tf_at.add_paragraph()
            p_l.text = "• " + l
            p_l.font.size = Pt(9.5)
            p_l.font.color.rgb = C_TEXT_DARK
            p_l.alignment = PP_ALIGN.LEFT
            p_l.space_after = Pt(1)

    # Lower Section: Left (5-Phase Operational Pipeline) & Right (Intelligent Multi-Layer Packaging)
    box_pipe = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.4), Inches(4.56), Inches(5.85), Inches(2.65))
    box_pipe.fill.solid()
    box_pipe.fill.fore_color.rgb = C_WHITE
    box_pipe.line.color.rgb = C_BORDER_DARK
    box_pipe.line.width = Pt(1.5)
    tf_bp = box_pipe.text_frame
    tf_bp.word_wrap = True
    tf_bp.margin_left = Inches(0.14)
    tf_bp.margin_right = Inches(0.14)
    tf_bp.margin_top = Inches(0.08)

    p = tf_bp.paragraphs[0]
    p.text = "OPERATIONAL METHODOLOGY PIPELINE"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = C_ORANGE
    p.alignment = PP_ALIGN.CENTER
    p.space_after = Pt(3)

    pipeline_5phases = [
        ("1. Crop Intake & Profiling: ", "Input crop & shelf life via Hindi Voice/Camera; extracts moisture %, water activity (aw), pH, lipids & baseline respiration rate."),
        ("2. Physics & Respiration Modeling: ", "Tetens equation calculates vapor pressure Psat(T); Michaelis-Menten & Arrhenius model O2/CO2 rates with a +5°C transit safety buffer."),
        ("3. Barrier Solving & Screening: ", "Computes target OTR (cc/m²·day) and WVTR (g/m²·day) bounds; filters 31 food-grade barrier polymers & bio-resins."),
        ("4. TOPSIS MCDM Optimization: ", "Vector-normalized ranking balances Shelf-Life Extension (Max), Film Cost (Min), and Carbon Footprint (Min)."),
        ("5. Regulatory Audit & 3D Deliverable: ", "Verifies FSSAI 2018 (IS 9845) migration compliance; renders Three.js 3D multi-layer pack and batch QR pass.")
    ]
    for tag_ph, desc_ph in pipeline_5phases:
        p_ph = tf_bp.add_paragraph()
        r1 = p_ph.add_run()
        r1.text = tag_ph
        r1.font.bold = True
        r1.font.size = Pt(9.5)
        r1.font.color.rgb = C_NAVY_DARK

        r2 = p_ph.add_run()
        r2.text = desc_ph
        r2.font.bold = False
        r2.font.size = Pt(9.5)
        r2.font.color.rgb = C_TEXT_DARK
        p_ph.space_after = Pt(2.5)

    # Right Box: Multi-Layer Film Packaging (5 Colored Horizontal Strips)
    w_strip = Inches(6.45)
    x_strip = Inches(6.45)

    head_box = slide3.shapes.add_shape(MSO_SHAPE.RECTANGLE, x_strip, Inches(4.56), w_strip, Inches(0.28))
    head_box.fill.solid()
    head_box.fill.fore_color.rgb = C_BLUE_BANNER
    head_box.line.color.rgb = C_BLUE_BANNER
    tf_hb = head_box.text_frame
    tf_hb.margin_top = Inches(0.04)
    p = tf_hb.paragraphs[0]
    p.text = "INTELLIGENT MULTI-LAYER FOOD PACKAGING ARCHITECTURE"
    p.font.size = Pt(10.5)
    p.font.bold = True
    p.font.color.rgb = C_WHITE
    p.alignment = PP_ALIGN.CENTER

    film_layers = [
        ("Outer Protective Layer: BOPET (12 µm) ➔ Mechanical puncture resistance & printable surface", C_BLUE_CARD, Inches(4.88)),
        ("Adhesive Tie Layer: Modified PE (3 µm) ➔ Inter-layer molecular bonding preventing delamination", C_CYAN, Inches(5.24)),
        ("High Gas Barrier: EVOH Core (5 µm) ➔ Ultra-low OTR (<1 cc/m²·day) • Prevents oxidation & rancidity", C_PURPLE, Inches(5.60)),
        ("Adhesive Tie Layer: Modified PE (3 µm) ➔ Inter-layer molecular bonding preventing delamination", C_CYAN, Inches(5.96)),
        ("Hermetic Sealant: Metallocene LLDPE (50 µm) ➔ Moisture barrier (WVTR <3 g/m²·day) • FSSAI Food Contact Safe (IS 10146)", C_GREEN, Inches(6.32))
    ]
    for layer_txt, col_l, y_l in film_layers:
        sb = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x_strip, y_l, w_strip, Inches(0.32))
        sb.fill.solid()
        sb.fill.fore_color.rgb = col_l
        sb.line.color.rgb = col_l
        tf_s = sb.text_frame
        tf_s.word_wrap = True
        tf_s.margin_left = Inches(0.12)
        tf_s.margin_top = Inches(0.05)
        p = tf_s.paragraphs[0]
        p.text = layer_txt
        p.font.size = Pt(9.5)
        p.font.bold = True
        p.font.color.rgb = C_WHITE

    # Bottom Equilibrium Solver
    eq_box = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x_strip, Inches(6.68), w_strip, Inches(0.53))
    eq_box.fill.solid()
    eq_box.fill.fore_color.rgb = RGBColor(236, 253, 245)
    eq_box.line.color.rgb = C_GREEN
    eq_box.line.width = Pt(1.5)
    tf_eq = eq_box.text_frame
    tf_eq.word_wrap = True
    tf_eq.margin_left = Inches(0.12)
    tf_eq.margin_top = Inches(0.05)
    p = tf_eq.paragraphs[0]
    p.text = "MAP Gas Equilibrium: Laser micro-perforations match respiration (RO2) with film gas flux (3-5% O2, 10-15% CO2) to extend produce shelf life by 200% - 300%."
    p.font.size = Pt(9.5)
    p.font.bold = True
    p.font.color.rgb = C_GREEN

    # =========================================================================
    # SLIDE 4: FEASIBILITY AND VIABILITY
    # =========================================================================
    slide4 = prs.slides.add_slide(blank_layout)
    draw_top_bar(slide4, "FEASIBILITY AND VIABILITY", None, team_label="Evergreen\nTeam 161280")

    sub4 = slide4.shapes.add_textbox(Inches(0.4), Inches(0.96), Inches(12.5), Inches(0.28))
    p = sub4.text_frame.paragraphs[0]
    p.text = "❖ Analysis of the feasibility of the idea"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = C_NAVY_DARK

    feas_3cards = [
        ("TECHNICAL FEASIBILITY", [
            ("✓", "Modern, battle-tested full stack — React 19 + FastAPI"),
            ("✓", "Sub-50ms execution latency for TOPSIS & physics algorithms"),
            ("✓", "Modular, high-speed RESTful microservices architecture"),
            ("✓", "Three.js WebGL runs smoothly in any standard mobile/PC browser"),
            ("▸", "100% functional working prototype verified locally & container-ready.")
        ], C_BLUE_CARD),
        ("DATA RIGOR & PROVENANCE", [
            ("✓", "100 pre-calibrated commodities across 6 core food categories"),
            ("✓", "Integrated official FSSAI • APEDA • BIS • ICAR-CIPHET standards"),
            ("✓", "Complete provenance lineage kept for every single value & equation"),
            ("✓", "Strict zero synthetic/hallucinated data — fully explainable calculations"),
            ("▸", "Every rule, threshold & barrier value traceable to Slide-6 sources.")
        ], C_GREEN),
        ("DEPLOYMENT & SCALING", [
            ("✓", "Fully functional cloud & edge deployable prototype with offline mode"),
            ("✓", "Zero proprietary hardware Capex needed (any smartphone or PC)"),
            ("✓", "Stateless FastAPI containers scale horizontally with traffic load"),
            ("✓", "Direct integration pathway with e-NAM digital mandis & APEDA"),
            ("▸", "Built for immediate grassroots deployment across rural FPOs.")
        ], C_ORANGE)
    ]
    w_f3 = Inches(4.00)
    gap_f3 = Inches(0.25)
    for i, (title_f, bullets_f, col_f) in enumerate(feas_3cards):
        fb = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.4) + i * (w_f3 + gap_f3), Inches(1.24), w_f3, Inches(2.26))
        fb.fill.solid()
        fb.fill.fore_color.rgb = C_WHITE
        fb.line.color.rgb = col_f
        fb.line.width = Pt(1.5)
        tf_fb = fb.text_frame
        tf_fb.word_wrap = True
        tf_fb.margin_left = Inches(0.12)
        tf_fb.margin_right = Inches(0.12)
        tf_fb.margin_top = Inches(0.08)

        p = tf_fb.paragraphs[0]
        p.text = title_f
        p.font.size = Pt(11.5)
        p.font.bold = True
        p.font.color.rgb = col_f
        p.alignment = PP_ALIGN.CENTER
        p.space_after = Pt(4)

        for mark, txt in bullets_f:
            p_b = tf_fb.add_paragraph()
            r1 = p_b.add_run()
            r1.text = mark + " "
            r1.font.bold = True
            r1.font.size = Pt(10)
            r1.font.color.rgb = col_f if mark == "▸" else C_GREEN

            r2 = p_b.add_run()
            r2.text = txt
            r2.font.bold = (mark == "▸")
            r2.font.size = Pt(10)
            r2.font.color.rgb = C_NAVY_DARK if mark == "▸" else C_TEXT_DARK
            p_b.space_after = Pt(2.5)

    sub4_chal = slide4.shapes.add_textbox(Inches(0.4), Inches(3.54), Inches(12.5), Inches(0.28))
    p = sub4_chal.text_frame.paragraphs[0]
    p.text = "❖ Potential challenges and risks  ➔  Strategies for overcoming these challenges"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = C_NAVY_DARK

    challenges_5 = [
        ("1. Crop respiration & moisture vary by harvest maturity", "Calibrated against ICAR & UC Davis postharvest baselines; live sliders allow fine-tuning."),
        ("2. Broken Indian rural cold-chain transit abuse", "Arrhenius kinetic engine factors in +5°C transit safety buffer to prevent premature spoilage."),
        ("3. Material barrier variations across film suppliers", "Normalized ASTM/ISO testing metrics (OTR: ASTM D3985, WVTR: ASTM F1249) stored in DB."),
        ("4. Complex Plastic Waste Management (PWM) Rules 2022", "Automated regulatory audit checks FSSAI (IS 9845) migration and prioritizes compostable PLA/PHA."),
        ("5. Rural digital literacy divide for grassroots farmers", "Aasaan Mode with native Hindi voice assistance and real-time camera crop recognition.")
    ]
    for i, (chal, strat) in enumerate(challenges_5):
        y_c = Inches(3.86) + i * Inches(0.50)
        cb = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.4), y_c, Inches(12.5), Inches(0.44))
        cb.fill.solid()
        cb.fill.fore_color.rgb = C_WHITE
        cb.line.color.rgb = C_BORDER_DARK
        cb.line.width = Pt(1.5)
        tf_c = cb.text_frame
        tf_c.word_wrap = True
        tf_c.margin_left = Inches(0.14)
        tf_c.margin_top = Inches(0.08)

        p = tf_c.paragraphs[0]
        r1 = p.add_run()
        r1.text = chal + "  ➔  "
        r1.font.bold = True
        r1.font.size = Pt(10.5)
        r1.font.color.rgb = C_NAVY_DARK

        r2 = p.add_run()
        r2.text = strat
        r2.font.bold = False
        r2.font.size = Pt(10.5)
        r2.font.color.rgb = C_GREEN

    # Bottom Verdict Banner
    verdict = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.4), Inches(6.42), Inches(12.5), Inches(0.40))
    verdict.fill.solid()
    verdict.fill.fore_color.rgb = RGBColor(240, 253, 244)
    verdict.line.color.rgb = C_GREEN
    verdict.line.width = Pt(1.5)
    tf_v = verdict.text_frame
    tf_v.margin_top = Inches(0.07)
    p = tf_v.paragraphs[0]
    p.text = "✓ Verdict: Fully feasible with modern web & physics AI stack — validated working prototype ready for immediate pilot.  •  Risk: Low–Medium"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = C_GREEN
    p.alignment = PP_ALIGN.CENTER

    # =========================================================================
    # SLIDE 5: IMPACT AND BENEFITS
    # =========================================================================
    slide5 = prs.slides.add_slide(blank_layout)
    draw_top_bar(slide5, "IMPACT AND BENEFITS", None, team_label="Evergreen\nTeam 161280")

    sub5_aud = slide5.shapes.add_textbox(Inches(0.4), Inches(0.96), Inches(12.5), Inches(0.28))
    p = sub5_aud.text_frame.paragraphs[0]
    p.text = "❖ Potential impact on the target audience"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = C_NAVY_DARK

    aud_pills = [
        ("Farmers / Mandi\nFPOs", Inches(1.30)),
        ("Food Processors", Inches(1.40)),
        ("Agri-MSMEs", Inches(1.30)),
        ("Packaging Designers", Inches(1.60)),
        ("Exporters", Inches(1.30)),
        ("Cold-Chain Logistics", Inches(1.60)),
        ("Food Scientists", Inches(1.40)),
        ("Govt + Extension", Inches(1.40))
    ]
    cur_x = Inches(0.4)
    for txt, w in aud_pills:
        pb = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, cur_x, Inches(1.24), w, Inches(0.44))
        pb.fill.solid()
        pb.fill.fore_color.rgb = C_BLUE_CARD
        pb.line.color.rgb = C_BLUE_CARD
        tf_pb = pb.text_frame
        tf_pb.word_wrap = True
        tf_pb.margin_top = Inches(0.04)
        p = tf_pb.paragraphs[0]
        p.text = txt
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = C_WHITE
        p.alignment = PP_ALIGN.CENTER
        cur_x += w + Inches(0.14)

    sub5_ben = slide5.shapes.add_textbox(Inches(0.4), Inches(1.72), Inches(12.5), Inches(0.28))
    p = sub5_ben.text_frame.paragraphs[0]
    p.text = "❖ Benefits of the solution (social, economic, environmental, etc.)"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = C_NAVY_DARK

    benefits_5 = [
        ("SOCIAL", [
            "Democratizes packaging science for grassroots farmers",
            "Native Hindi/English voice AI bridges literacy barrier",
            "Prevents distress sales during market glut via shelf-life extension",
            "Protects smallholder farm incomes & rural livelihoods"
        ], C_BLUE_CARD),
        ("ECONOMIC", [
            "Reduces post-harvest spoilage by 25% – 40% across transit",
            "Mitigates India's annual ₹1.52 Lakh Crore food loss burden",
            "Saves 12-20% resin cost via precision film down-gauging",
            "Eliminates costly export consignment rejections at ports"
        ], C_ORANGE),
        ("AGRICULTURAL", [
            "Crop-wise preservation for 100 Indian commodities",
            "Preserves fresh produce vitamins, firmness & natural aroma",
            "Enables long-distance rail/road freight without spoilage",
            "Generates export-ready APEDA packaging compliance passes"
        ], C_GREEN),
        ("ENVIRONMENT", [
            "Recommends compostable Bio-PLA, Bio-PBS & PHA films",
            "Accelerates transition to recyclable mono-material polyolefins",
            "Fully aligns with Plastic Waste Management (PWM) Rules 2022",
            "Minimizes methane emissions from rotting mandi landfill waste"
        ], C_TEAL),
        ("FOOD QUALITY", [
            "Optimal OTR/WVTR stops moisture pooling & fungal rot",
            "MAP gas equilibrium (O2/CO2) preserves crispness & color",
            "Prevents lipid oxidation and rancidity in high-fat foods",
            "Guarantees certified, safe & hygienic produce for consumers"
        ], C_PURPLE)
    ]
    w_b5 = Inches(2.36)
    gap_b5 = Inches(0.16)
    for i, (b_title, b_bullets, b_col) in enumerate(benefits_5):
        bb = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.4) + i * (w_b5 + gap_b5), Inches(2.02), w_b5, Inches(3.02))
        bb.fill.solid()
        bb.fill.fore_color.rgb = C_WHITE
        bb.line.color.rgb = b_col
        bb.line.width = Pt(1.5)
        tf_bb = bb.text_frame
        tf_bb.word_wrap = True
        tf_bb.margin_left = Inches(0.10)
        tf_bb.margin_right = Inches(0.10)
        tf_bb.margin_top = Inches(0.08)

        p = tf_bb.paragraphs[0]
        p.text = b_title
        p.font.size = Pt(11.5)
        p.font.bold = True
        p.font.color.rgb = b_col
        p.alignment = PP_ALIGN.CENTER
        p.space_after = Pt(4)

        for bullet in b_bullets:
            p_bl = tf_bb.add_paragraph()
            r1 = p_bl.add_run()
            r1.text = "▸ "
            r1.font.bold = True
            r1.font.size = Pt(9.5)
            r1.font.color.rgb = b_col

            r2 = p_bl.add_run()
            r2.text = bullet
            r2.font.bold = False
            r2.font.size = Pt(9.5)
            r2.font.color.rgb = C_TEXT_DARK
            p_bl.space_after = Pt(2.5)

    # ADOPTION PATHWAY BANNER & 4 PHASES
    ad_banner = slide5.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.4), Inches(5.12), Inches(12.5), Inches(0.26))
    ad_banner.fill.solid()
    ad_banner.fill.fore_color.rgb = C_BLUE_BANNER
    ad_banner.line.color.rgb = C_BLUE_BANNER
    tf_ab = ad_banner.text_frame
    tf_ab.margin_top = Inches(0.03)
    p = tf_ab.paragraphs[0]
    p.text = "ADOPTION PATHWAY — PROTOTYPE TO SCALE"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = C_WHITE

    phases = [
        ("1. PROTOTYPE (Functional Full-Stack)", C_BLUE_CARD),
        ("2. PILOT (Selected Mandis & FPOs)", C_CYAN),
        ("3. VALIDATION (IIP & Lab Trials)", C_ORANGE),
        ("4. SCALE-UP (National e-NAM / Cloud)", C_GREEN)
    ]
    w_ph = Inches(3.04)
    gap_ph = Inches(0.10)
    for i, (text_ph, col_ph) in enumerate(phases):
        pb = slide5.shapes.add_shape(MSO_SHAPE.CHEVRON, Inches(0.4) + i * (w_ph + gap_ph), Inches(5.42), w_ph, Inches(0.46))
        pb.fill.solid()
        pb.fill.fore_color.rgb = col_ph
        pb.line.color.rgb = col_ph
        tf_p = pb.text_frame
        tf_p.word_wrap = True
        tf_p.margin_left = Inches(0.14)
        tf_p.margin_top = Inches(0.06)
        p = tf_p.paragraphs[0]
        p.text = text_ph
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = C_WHITE
        p.alignment = PP_ALIGN.CENTER

    feature_strip = [
        ("Compare Recyclable & Compostable Options", C_GREEN),
        ("Right-Size & Down-Gauge Packs (Less Plastic)", C_CYAN),
        ("Voice-First, Low-Literacy Bilingual UI", C_BLUE_CARD),
        ("Rural + Mandi FPO Friendly Practical Guidance", C_PURPLE)
    ]
    w_fs = Inches(3.04)
    for i, (txt, col) in enumerate(feature_strip):
        fb = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.4) + i * (w_fs + gap_ph), Inches(6.00), w_fs, Inches(0.42))
        fb.fill.solid()
        fb.fill.fore_color.rgb = col
        fb.line.color.rgb = col
        tf_f = fb.text_frame
        tf_f.margin_top = Inches(0.06)
        p = tf_f.paragraphs[0]
        p.text = txt
        p.font.size = Pt(9.5)
        p.font.bold = True
        p.font.color.rgb = C_WHITE
        p.alignment = PP_ALIGN.CENTER

    # =========================================================================
    # SLIDE 6: RESEARCH AND REFERENCES (With Highlighted Prototype Link at Bottom)
    # =========================================================================
    slide6 = prs.slides.add_slide(blank_layout)
    draw_top_bar(slide6, "RESEARCH AND REFERENCES", None, team_label="Evergreen\nTeam 161280")

    sub6 = slide6.shapes.add_textbox(Inches(0.4), Inches(0.96), Inches(12.5), Inches(0.28))
    p = sub6.text_frame.paragraphs[0]
    p.text = "❖ Details / Links of the Reference, Regulatory & Research Work"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = C_NAVY_DARK

    # Left Box: Future Scope & Advanced Extensions (Height adjusted to 3.4 in)
    box_scope = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.4), Inches(1.24), Inches(5.85), Inches(3.40))
    box_scope.fill.solid()
    box_scope.fill.fore_color.rgb = C_WHITE
    box_scope.line.color.rgb = C_BORDER_DARK
    box_scope.line.width = Pt(1.5)
    tf_sc = box_scope.text_frame
    tf_sc.word_wrap = True
    tf_sc.margin_left = Inches(0.14)
    tf_sc.margin_right = Inches(0.14)
    tf_sc.margin_top = Inches(0.08)

    p = tf_sc.paragraphs[0]
    p.text = "FUTURE SCOPE & ADVANCED EXTENSIONS"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = C_GREEN
    p.alignment = PP_ALIGN.CENTER
    p.space_after = Pt(3)

    scopes_6 = [
        ("1. National e-NAM Mandi Integration: ", "Direct API integration with electronic mandis for automated packaging grading and instant transit passes."),
        ("2. IoT Telemetry & Cold-Chain Sensors: ", "Live RFID/BLE temperature & RH data streams for real-time dynamic shelf-life decay updates."),
        ("3. Active & Antimicrobial Bio-Films: ", "Integration of natural nano-emulsion coatings (chitosan, thymol) to actively arrest fungal decay."),
        ("4. Converter Marketplace & Procurement: ", "Direct B2B digital gateway connecting FPOs directly with verified sustainable film converters."),
        ("5. Offline Progressive Web App (PWA): ", "Zero-connectivity Service Worker caching for seamless use in remote rural mandis."),
        ("6. AI Computer Vision Ripeness Grading: ", "Camera-based maturity & blemish detection prior to barrier film recommendation.")
    ]
    for tag_sc, desc_sc in scopes_6:
        p_sc = tf_sc.add_paragraph()
        r1 = p_sc.add_run()
        r1.text = tag_sc
        r1.font.bold = True
        r1.font.size = Pt(9.5)
        r1.font.color.rgb = C_NAVY_DARK

        r2 = p_sc.add_run()
        r2.text = desc_sc
        r2.font.bold = False
        r2.font.size = Pt(9.5)
        r2.font.color.rgb = C_TEXT_DARK
        p_sc.space_after = Pt(2.2)

    # Right Box: Official Government & Scientific Sources
    box_sources = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.45), Inches(1.24), Inches(6.45), Inches(3.40))
    box_sources.fill.solid()
    box_sources.fill.fore_color.rgb = C_WHITE
    box_sources.line.color.rgb = C_BORDER_DARK
    box_sources.line.width = Pt(1.5)
    tf_src = box_sources.text_frame
    tf_src.word_wrap = True
    tf_src.margin_left = Inches(0.14)
    tf_src.margin_right = Inches(0.14)
    tf_src.margin_top = Inches(0.08)

    p = tf_src.paragraphs[0]
    p.text = "OFFICIAL GOVERNMENT & SCIENTIFIC SOURCES (VERIFIED PORTALS)"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = C_NAVY_DARK
    p.alignment = PP_ALIGN.CENTER
    p.space_after = Pt(3)

    sources_with_links = [
        ("FSSAI", "https://fssai.gov.in", "Packaging Reg. 2018 & Overall Migration Limits (IS 9845:2020)"),
        ("BIS", "https://bis.gov.in", "Indian Standards: IS 10146 (PE food contact), IS 12252 (PET), IS 15495"),
        ("APEDA", "https://apeda.gov.in", "Fresh produce export packaging standards & cold-chain phytosanitary norms"),
        ("IIP", "https://iip-in.com", "Indian Institute of Packaging (ASTM D3985 OTR & ASTM F1249 WVTR)"),
        ("ICAR - CIPHET", "https://ciphet.icar.gov.in", "Post-harvest loss statistics & crop respiration rates (RO2/RCO2)"),
        ("MoFPI", "https://mofpi.gov.in", "Ministry of Food Processing Industries cold-chain cluster schemes"),
        ("USDA FoodData", "https://fdc.nal.usda.gov", "Crop baseline composition dataset (moisture %, Aw, lipids, pH)"),
        ("CPCB (MoEFCC)", "https://cpcb.nic.in", "Plastic Waste Management Rules 2022 & Compostable IS/ISO 17088")
    ]

    for s_name, s_url, s_det in sources_with_links:
        p_s = tf_src.add_paragraph()
        r_name = p_s.add_run()
        r_name.text = "• " + s_name + " — "
        r_name.font.bold = True
        r_name.font.size = Pt(9.5)
        r_name.font.color.rgb = C_NAVY_DARK

        r_url = p_s.add_run()
        r_url.text = f"[{s_url}]"
        r_url.font.bold = True
        r_url.font.size = Pt(9.0)
        r_url.font.color.rgb = C_CYAN
        r_url.hyperlink.address = s_url

        r_det = p_s.add_run()
        r_det.text = f" : {s_det}"
        r_det.font.bold = False
        r_det.font.size = Pt(8.8)
        r_det.font.color.rgb = C_TEXT_MUTED
        p_s.space_after = Pt(1.5)

    # EVIDENCE DISCIPLINE — NO FABRICATED VALUES (Badge Strip)
    evid_banner = slide6.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.4), Inches(4.72), Inches(12.5), Inches(0.24))
    evid_banner.fill.solid()
    evid_banner.fill.fore_color.rgb = C_BLUE_BANNER
    evid_banner.line.color.rgb = C_BLUE_BANNER
    tf_ev = evid_banner.text_frame
    tf_ev.margin_top = Inches(0.03)
    p = tf_ev.paragraphs[0]
    p.text = "EVIDENCE DISCIPLINE — ZERO FABRICATED SYNTHETIC VALUES"
    p.font.size = Pt(10)
    p.font.bold = True
    p.font.color.rgb = C_WHITE

    status_badges = [
        ("OFFICIAL / VERIFIED", C_GREEN),
        ("AUTHORITATIVE RESEARCH", C_CYAN),
        ("MANUFACTURER SPEC", C_ORANGE),
        ("DERIVED PHYSICS", C_PURPLE),
        ("NOT AVAILABLE (FLAGGED)", RGBColor(100, 116, 139))
    ]
    w_sb = Inches(2.40)
    gap_sb = Inches(0.12)
    for i, (text, col) in enumerate(status_badges):
        sb = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.4) + i * (w_sb + gap_sb), Inches(5.00), w_sb, Inches(0.32))
        sb.fill.solid()
        sb.fill.fore_color.rgb = col
        sb.line.color.rgb = col
        tf_s = sb.text_frame
        tf_s.margin_top = Inches(0.04)
        p = tf_s.paragraphs[0]
        p.text = text
        p.font.size = Pt(9.5)
        p.font.bold = True
        p.font.color.rgb = C_WHITE
        p.alignment = PP_ALIGN.CENTER

    # PROTOTYPE DEMO PLAN — WHAT WE WILL SHOW
    demo_banner = slide6.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.4), Inches(5.40), Inches(12.5), Inches(0.24))
    demo_banner.fill.solid()
    demo_banner.fill.fore_color.rgb = C_BLUE_BANNER
    demo_banner.line.color.rgb = C_BLUE_BANNER
    tf_dm = demo_banner.text_frame
    tf_dm.margin_top = Inches(0.03)
    p = tf_dm.paragraphs[0]
    p.text = "PROTOTYPE DEMO PLAN — WHAT WE WILL DEMONSTRATE IN EVALUATION"
    p.font.size = Pt(10)
    p.font.bold = True
    p.font.color.rgb = C_WHITE

    demo_steps = [
        ("1. Live 100-Crop Search & Camera Scan", C_BLUE_CARD),
        ("2. Mass-Transfer & Respiration Solver", C_CYAN),
        ("3. TOPSIS Dynamic Optimization & 3D Lab", C_ORANGE),
        ("4. Bilingual Voice AI & FSSAI QR Pass", C_GREEN)
    ]
    w_ds = Inches(3.04)
    gap_ds = Inches(0.10)
    for i, (text, col) in enumerate(demo_steps):
        db = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.4) + i * (w_ds + gap_ds), Inches(5.68), w_ds, Inches(0.38))
        db.fill.solid()
        db.fill.fore_color.rgb = col
        db.line.color.rgb = col
        tf_d = db.text_frame
        tf_d.margin_top = Inches(0.06)
        p = tf_d.paragraphs[0]
        p.text = text
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = C_WHITE
        p.alignment = PP_ALIGN.CENTER

    # =========================================================================
    # USER REQUESTED: HIGHLIGHTED PROTOTYPE LINK BANNER AT THE VERY BOTTOM OF SLIDE 6
    # =========================================================================
    proto_url = "https://food-packaging-ai-caed.vercel.app/"
    proto_banner = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.4), Inches(6.20), Inches(12.5), Inches(0.55))
    proto_banner.fill.solid()
    proto_banner.fill.fore_color.rgb = RGBColor(240, 253, 244)  # Light Emerald Tint
    proto_banner.line.color.rgb = C_GREEN
    proto_banner.line.width = Pt(2.0)
    tf_pb = proto_banner.text_frame
    tf_pb.word_wrap = True
    tf_pb.margin_top = Inches(0.08)

    p_proto = tf_pb.paragraphs[0]
    p_proto.alignment = PP_ALIGN.CENTER

    r_lbl = p_proto.add_run()
    r_lbl.text = "🌐 PROTOTYPE LINK — "
    r_lbl.font.bold = True
    r_lbl.font.size = Pt(13)
    r_lbl.font.color.rgb = C_NAVY_DARK

    r_lnk = p_proto.add_run()
    r_lnk.text = proto_url
    r_lnk.font.bold = True
    r_lnk.font.size = Pt(13)
    r_lnk.font.color.rgb = C_GREEN
    r_lnk.font.underline = True
    r_lnk.hyperlink.address = proto_url

    # Save Intermediate PPTX
    intermediate_pptx = os.path.abspath(r'c:\Users\AKASH\Downloads\food (2)\food\intermediate_deck.pptx')
    prs.save(intermediate_pptx)
    print(f"Intermediate presentation saved: {intermediate_pptx}")

    # Export PPTX to PDF using PowerPoint COM
    intermediate_pdf = os.path.abspath(r'c:\Users\AKASH\Downloads\food (2)\food\intermediate_deck.pdf')
    if os.path.exists(intermediate_pdf):
        os.remove(intermediate_pdf)

    ppt_app = win32com.client.Dispatch('PowerPoint.Application')
    pres = ppt_app.Presentations.Open(intermediate_pptx, WithWindow=False)
    pres.SaveAs(intermediate_pdf, 32)
    pres.Close()
    ppt_app.Quit()
    print(f"Exported to intermediate PDF: {intermediate_pdf}")

    # =========================================================================
    # ASSEMBLE FINAL PDF:
    # Page 1: EXACT untouched first page with ONLY Team ID (161280) and Team Name (Evergreen)
    # Pages 2-6: Updated slides with exact visual layout from PowerPoint
    # =========================================================================
    orig_uploaded_pdf = r'C:\Users\AKASH\.gemini\antigravity-ide\brain\902d69c2-72f9-44ca-a54e-efb0816555cb\.user_uploaded\media_1790685524540.pdf'
    
    # Process Page 1 with PyMuPDF to modify ONLY the 2 text values
    doc_p1 = pymupdf.open()
    doc_p1.insert_pdf(pymupdf.open(orig_uploaded_pdf), from_page=0, to_page=0)
    page1 = doc_p1[0]

    # Redact 61 and replace with 161280
    rect_61 = pymupdf.Rect(130, 412, 170, 436)
    page1.add_redact_annot(rect_61, fill=(1, 1, 1))

    # Redact PACTVISION and replace with Evergreen
    rect_pact = pymupdf.Rect(305, 456, 430, 482)
    page1.add_redact_annot(rect_pact, fill=(1, 1, 1))

    page1.apply_redactions()

    # Insert updated text maintaining exact font, baseline & style
    page1.insert_text(pymupdf.Point(134.2, 429.5), '161280', fontname='times-bold', fontsize=16, color=(0, 0, 0))
    page1.insert_text(pymupdf.Point(309.8, 474.0), 'Evergreen', fontname='times-bold', fontsize=16, color=(0, 0, 0))

    temp_p1_path = os.path.abspath(r'c:\Users\AKASH\Downloads\food (2)\food\temp_p1.pdf')
    doc_p1.save(temp_p1_path)
    doc_p1.close()

    # Combine Page 1 and Pages 2-6
    p1_reader = pypdf.PdfReader(temp_p1_path)
    new_reader = pypdf.PdfReader(intermediate_pdf)

    final_writer = pypdf.PdfWriter()
    final_writer.add_page(p1_reader.pages[0])
    print("Added Page 1 from exact original template (Team ID 161280, Team Name Evergreen).")

    for page_idx in range(1, len(new_reader.pages)):
        final_writer.add_page(new_reader.pages[page_idx])
        print(f"Added Page {page_idx + 1} from updated software deck.")

    final_pdf_path = os.path.abspath(r'c:\Users\AKASH\Downloads\food (2)\food\SIH2026_Evergreen_161280.pdf')
    with open(final_pdf_path, 'wb') as f:
        final_writer.write(f)

    # Save final updated PPTX matching PDF
    # To have Page 1 in PPTX match too:
    final_pptx_path = os.path.abspath(r'c:\Users\AKASH\Downloads\food (2)\food\SIH2026_Evergreen_161280.pptx')
    prs.save(final_pptx_path)

    # Cleanup temp files
    if os.path.exists(temp_p1_path):
        os.remove(temp_p1_path)
    if os.path.exists(intermediate_pdf):
        os.remove(intermediate_pdf)
    if os.path.exists(intermediate_pptx):
        os.remove(intermediate_pptx)

    print(f"Final PDF successfully created at: {final_pdf_path}")
    print(f"Size: {os.path.getsize(final_pdf_path)} bytes")

if __name__ == "__main__":
    build_presentation()
