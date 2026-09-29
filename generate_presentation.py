import os
import pptx
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def create_deck():
    prs = pptx.Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Colors
    c_navy = RGBColor(15, 23, 42)      # Slate 900
    c_blue = RGBColor(24, 61, 120)     # SIH Deep Blue
    c_green = RGBColor(16, 185, 129)   # Evergreen Emerald
    c_card_bg = RGBColor(248, 250, 252) # Slate 50
    c_border = RGBColor(226, 232, 240) # Slate 200
    c_dark = RGBColor(30, 41, 59)      # Slate 800
    c_muted = RGBColor(100, 116, 139)  # Slate 500
    c_white = RGBColor(255, 255, 255)

    def add_header(slide, title_text):
        # Header Team Pill
        pill = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.5), Inches(0.35), Inches(2.2), Inches(0.85))
        pill.fill.solid()
        pill.fill.fore_color.rgb = c_white
        pill.line.color.rgb = c_green
        pill.line.width = Pt(1.5)
        tf = pill.text_frame
        tf.word_wrap = True
        p1 = tf.paragraphs[0]
        p1.text = "Evergreen"
        p1.font.bold = True
        p1.font.size = Pt(14)
        p1.font.color.rgb = c_green
        p1.alignment = PP_ALIGN.CENTER
        p2 = tf.add_paragraph()
        p2.text = "Team 161280"
        p2.font.bold = True
        p2.font.size = Pt(12)
        p2.font.color.rgb = c_dark
        p2.alignment = PP_ALIGN.CENTER

        # Title
        tb = slide.shapes.add_textbox(Inches(2.9), Inches(0.35), Inches(8.0), Inches(0.9))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title_text
        p.font.bold = True
        p.font.size = Pt(22)
        p.font.color.rgb = c_blue
        p.alignment = PP_ALIGN.CENTER

        # Subtitle
        p_sub = tf.add_paragraph()
        p_sub.text = "AI-Based Intelligent Food Packaging Material Recommendation System • PS SIH26236"
        p_sub.font.size = Pt(10)
        p_sub.font.color.rgb = c_muted
        p_sub.alignment = PP_ALIGN.CENTER

        # SIH Logo / Tag
        sih_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(11.1), Inches(0.35), Inches(1.7), Inches(0.85))
        sih_box.fill.solid()
        sih_box.fill.fore_color.rgb = c_card_bg
        sih_box.line.color.rgb = c_border
        tf_sih = sih_box.text_frame
        p_sih = tf_sih.paragraphs[0]
        p_sih.text = "SMART INDIA\nHACKATHON 2026"
        p_sih.font.bold = True
        p_sih.font.size = Pt(9)
        p_sih.font.color.rgb = c_navy
        p_sih.alignment = PP_ALIGN.CENTER

    # -------------------------------------------------------------
    # SLIDE 1: TITLE PAGE
    # -------------------------------------------------------------
    s1 = prs.slides.add_slide(blank_layout)
    # Background Accent Top Bar
    top_bar = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(0.15))
    top_bar.fill.solid()
    top_bar.fill.fore_color.rgb = c_green
    top_bar.line.fill.background()

    # Main Header
    tb = s1.shapes.add_textbox(Inches(1.0), Inches(0.8), Inches(11.333), Inches(1.2))
    tf = tb.text_frame
    p = tf.paragraphs[0]
    p.text = "SMART INDIA HACKATHON 2026"
    p.font.bold = True
    p.font.size = Pt(36)
    p.font.color.rgb = c_blue
    p.alignment = PP_ALIGN.CENTER

    p2 = tf.add_paragraph()
    p2.text = "TITLE PAGE"
    p2.font.bold = True
    p2.font.size = Pt(24)
    p2.font.color.rgb = c_navy
    p2.alignment = PP_ALIGN.CENTER

    # Left Details Card
    card = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(2.2), Inches(7.5), Inches(4.6))
    card.fill.solid()
    card.fill.fore_color.rgb = c_card_bg
    card.line.color.rgb = c_border
    tf = card.text_frame
    tf.word_wrap = True

    details = [
        ("• Problem Statement ID", "SIH26236"),
        ("• Problem Statement Title", "AI-Based Intelligent Food Packaging Material Recommendation System for Food Commodities"),
        ("• Theme", "Agriculture, FoodTech & Rural Development"),
        ("• PS Category", "Software"),
        ("• Team ID", "161280"),
        ("• Team Name (Registered on portal)", "Evergreen")
    ]

    for i, (k, v) in enumerate(details):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.space_after = Pt(12)
        run_k = p.add_run()
        run_k.text = f"{k} – "
        run_k.font.bold = True
        run_k.font.size = Pt(14)
        run_k.font.color.rgb = c_navy
        
        run_v = p.add_run()
        run_v.text = v
        run_v.font.bold = (k in ["• Team ID", "• Team Name (Registered on portal)"])
        run_v.font.size = Pt(14)
        if k in ["• Team ID", "• Team Name (Registered on portal)"]:
            run_v.font.color.rgb = c_green
        else:
            run_v.font.color.rgb = c_dark

    # Right Logo/Illustration Card
    right_card = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.8), Inches(2.2), Inches(3.5), Inches(4.6))
    right_card.fill.solid()
    right_card.fill.fore_color.rgb = c_white
    right_card.line.color.rgb = c_green
    right_card.line.width = Pt(2)
    tf_rc = right_card.text_frame
    tf_rc.word_wrap = True
    p_rc = tf_rc.paragraphs[0]
    p_rc.text = "\n\n💡\nSIH 2026\n\nTEAM EVERGREEN\nID: 161280\n\nPackWise AI / PackSmart\nIntelligent Decision Core"
    p_rc.font.bold = True
    p_rc.font.size = Pt(16)
    p_rc.font.color.rgb = c_blue
    p_rc.alignment = PP_ALIGN.CENTER

    # -------------------------------------------------------------
    # SLIDE 2: PROPOSED SOLUTION & INNOVATION
    # -------------------------------------------------------------
    s2 = prs.slides.add_slide(blank_layout)
    add_header(s2, "PACKWISE AI — PROPOSED SOLUTION")

    # Banner
    banner = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.5), Inches(1.35), Inches(12.333), Inches(0.65))
    banner.fill.solid()
    banner.fill.fore_color.rgb = c_blue
    banner.line.fill.background()
    tf_b = banner.text_frame
    p_b = tf_b.paragraphs[0]
    p_b.text = "PACKWISE AI — Physics-informed hybrid AI platform matching 100+ Indian food commodities & storage physics with 31 barrier polymers.\n✓ Explainable • ✓ Source-traced • ✓ Respiration & MAP aware • ✓ Edge AI Vision & Voice"
    p_b.font.bold = True
    p_b.font.size = Pt(11)
    p_b.font.color.rgb = c_white
    p_b.alignment = PP_ALIGN.CENTER

    # Modules Grid (8 pills)
    modules = [
        "100+ Indian Commodities DB (FDC+ICAR)", "Mass-Transfer & Respiration Physics",
        "Dynamic Storage & Transit Logistics", "31 Polymers & Bio-Resins Catalog",
        "TOPSIS Multi-Criteria Ranking", "Dynamic Barrier Needs (OTR / WVTR)",
        "MAP Equilibrium Solver (O2 / CO2)", "Explainable Report, FSSAI Pass & QR"
    ]
    for idx, mod in enumerate(modules):
        col = idx % 4
        row = idx // 4
        x = Inches(0.5 + col * 3.1)
        y = Inches(2.1 + row * 0.42)
        m_box = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, Inches(3.0), Inches(0.36))
        m_box.fill.solid()
        m_box.fill.fore_color.rgb = c_card_bg
        m_box.line.color.rgb = c_green if row == 1 else c_border
        tf_m = m_box.text_frame
        p_m = tf_m.paragraphs[0]
        p_m.text = mod
        p_m.font.bold = True
        p_m.font.size = Pt(9.5)
        p_m.font.color.rgb = c_navy
        p_m.alignment = PP_ALIGN.CENTER

    # Section: How it addresses the problem
    tb_prob = s2.shapes.add_textbox(Inches(0.5), Inches(2.95), Inches(12.333), Inches(1.5))
    tf_p = tb_prob.text_frame
    tf_p.word_wrap = True
    p_title = tf_p.paragraphs[0]
    p_title.text = "❖ How it addresses the problem"
    p_title.font.bold = True
    p_title.font.size = Pt(12)
    p_title.font.color.rgb = c_navy

    points = [
        "• Perishable crop devastation — India suffers ~30% post-harvest spoilage (₹1.52 Lakh Cr loss) due to unvented polybags and condensation rot.",
        "• One pack can't fit all — Moisture sorption, fat oxidation, and respiration rates differ fundamentally across commodities; mismatched films cause premature spoilage.",
        "• Selection is expert-dependent & slow — Fragmented offline knowledge, arbitrary polymer thickness, and high trial-and-error laboratory costs.",
        "• Ground-level stakeholders struggle — Smallholder farmers, FPOs & food MSMEs lack packaging scientists and need instant guidance in their native language.",
        "• Unified physics + regulatory decision core — Integrates food composition, crop biology, polymer barrier physics, and FSSAI/BIS rules into one automated engine."
    ]
    for pt in points:
        p_pt = tf_p.add_paragraph()
        p_pt.text = pt
        p_pt.font.size = Pt(9.5)
        p_pt.font.color.rgb = c_dark
        p_pt.space_after = Pt(2)

    # Pipeline bar
    p_bar = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.5), Inches(4.55), Inches(12.333), Inches(0.5))
    p_bar.fill.solid()
    p_bar.fill.fore_color.rgb = c_navy
    tf_pb = p_bar.text_frame
    p_pb = tf_pb.paragraphs[0]
    p_pb.text = "SOLUTION PIPELINE: Food Intake (100+ Crops) ➔ Property Analysis (aw, pH, Lipids) ➔ Risk Analysis (Respiration & O2) ➔ Compatibility (31 Polymers) ➔ TOPSIS Ranking ➔ Explained Result (3D Lab + QR)"
    p_pb.font.bold = True
    p_pb.font.size = Pt(9.5)
    p_pb.font.color.rgb = c_white
    p_pb.alignment = PP_ALIGN.CENTER

    # 5 Innovation Cards (Updated with software models)
    innovations = [
        ("1. EXPLAINABLE AI", "Transparent mathematical justification (TOPSIS Closeness Ci*) with statutory FSSAI citations & Gemini Flash reasoning."),
        ("2. MASS-TRANSFER PHYSICS", "Tetens vapor pressure equation + Arrhenius respiration kinetics for dynamic anaerobic hazard alerts."),
        ("3. 3D PACKAGING LAB & HUD", "Interactive Three.js WebGL multi-layer digital twin with layer exploding + Quantum 3D cards & 50-frame storyboard."),
        ("4. SOURCE TRACEABILITY", "Strict data discipline: FSSAI, APEDA, BIS, ICAR & USDA FDC — zero fabricated synthetic values."),
        ("5. AASAAN VOICE + AI VISION", "Bilingual Hindi/English voice assistant (Vaani AI) + Real-time Edge YOLOv8 & NVIDIA NIM camera crop scanner + batch QR pass.")
    ]
    for idx, (title, desc) in enumerate(innovations):
        x = Inches(0.5 + idx * 2.48)
        card_i = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(5.15), Inches(2.4), Inches(2.0))
        card_i.fill.solid()
        card_i.fill.fore_color.rgb = c_card_bg
        card_i.line.color.rgb = c_green if idx in [2, 4] else c_border
        card_i.line.width = Pt(1.5 if idx in [2, 4] else 1)
        tf_i = card_i.text_frame
        tf_i.word_wrap = True
        p_t = tf_i.paragraphs[0]
        p_t.text = title
        p_t.font.bold = True
        p_t.font.size = Pt(10)
        p_t.font.color.rgb = c_blue
        p_t.alignment = PP_ALIGN.CENTER
        p_d = tf_i.add_paragraph()
        p_d.text = desc
        p_d.font.size = Pt(8.5)
        p_d.font.color.rgb = c_dark
        p_d.space_before = Pt(4)

    # -------------------------------------------------------------
    # SLIDE 3: TECHNICAL APPROACH (Key update with actual models)
    # -------------------------------------------------------------
    s3 = prs.slides.add_slide(blank_layout)
    add_header(s3, "TECHNICAL APPROACH & ARCHITECTURE")

    # 4 Tech Stack Columns
    tech_stacks = [
        ("FRONTEND TECH STACK", [
            "• Languages: HTML5, CSS3, JS, TypeScript",
            "• Framework: React 19, Vite (Instant HMR), Tailwind",
            "• 3D Digital Twin: Three.js WebGL (Interactive Film Lab)",
            "• Quantum 3D HUD: CSS3D Perspective cards",
            "• Storyboard: 50-Frame visual narrative sequence",
            "• Sensory UI: Web Speech API (Voice AI), WebRTC Camera"
        ]),
        ("BACKEND & DATABASE", [
            "• Core Runtime: Python 3.12 (High-Performance Async)",
            "• API Framework: FastAPI (RESTful, Auto-Docs, CORS)",
            "• Server & Engine: Uvicorn ASGI, Pydantic v2, SQLAlchemy",
            "• Database: SQLite (Offline Local) / PostgreSQL Cloud",
            "• Zero-Config Offline Resilience: Client-side engine fallback",
            "• Modular Routers: /optimize, /recommend, /detect, /scans"
        ]),
        ("AI & MACHINE LEARNING (NEW)", [
            "• YOLOv8n Edge Neural Net: ONNX/OpenCV 12ms 60FPS local",
            "• NVIDIA NIM Llama-3.2 Vision: GPU multimodal detector",
            "• Gemini 3.8/1.5 Flash: FSSAI explainability & reasoning",
            "• NumPy Vectorized TOPSIS: MCDM cost-eco-barrier rank",
            "• Vaani Voice AI Copilot: Bilingual Hindi & English STT/TTS",
            "• FSSAI Gazette Rules Engine: Statutory 2018/2022 rules"
        ]),
        ("PHYSICS & KINETIC MODELS", [
            "• Tetens Formula: Psat(T)=0.61078*exp(17.27T/(T+237.3))",
            "• WVTR Flux: Vapor transmission & dry shelf-life decay",
            "• Michaelis-Menten: Dynamic O2 & CO2 respiration rates",
            "• Arrhenius Kinetics: Temperature buffer (+5°C transit safety)",
            "• MAP Solver: Laser micro-perforation gas equilibrium",
            "• Defect Warning: Automated anaerobic hazard prediction"
        ])
    ]

    for idx, (head, items) in enumerate(tech_stacks):
        x = Inches(0.5 + idx * 3.1)
        box = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(1.35), Inches(3.0), Inches(2.25))
        box.fill.solid()
        box.fill.fore_color.rgb = c_card_bg
        box.line.color.rgb = c_green if idx == 2 else c_border
        box.line.width = Pt(1.5 if idx == 2 else 1)
        tf_s = box.text_frame
        tf_s.word_wrap = True
        p_h = tf_s.paragraphs[0]
        p_h.text = head
        p_h.font.bold = True
        p_h.font.size = Pt(10)
        p_h.font.color.rgb = c_blue if idx != 2 else c_green
        for itm in items:
            p_it = tf_s.add_paragraph()
            p_it.text = itm
            p_it.font.size = Pt(8)
            p_it.font.color.rgb = c_dark
            p_it.space_after = Pt(1)

    # Middle: Operational Methodology Pipeline (5 steps)
    mid_box = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.5), Inches(3.7), Inches(6.0), Inches(2.3))
    mid_box.fill.solid()
    mid_box.fill.fore_color.rgb = c_white
    mid_box.line.color.rgb = c_border
    tf_mb = mid_box.text_frame
    tf_mb.word_wrap = True
    p_mh = tf_mb.paragraphs[0]
    p_mh.text = "OPERATIONAL METHODOLOGY PIPELINE"
    p_mh.font.bold = True
    p_mh.font.size = Pt(10.5)
    p_mh.font.color.rgb = c_blue

    pipeline_steps = [
        "1. Crop Intake & Profiling: Input via Hindi Voice or Camera (YOLOv8/NVIDIA NIM); extract moisture, aw, pH, lipids & respiration.",
        "2. Physics & Respiration Modeling: Tetens equation calculates Psat(T); Michaelis-Menten & Arrhenius model O2/CO2 with +5°C safety buffer.",
        "3. Barrier Solving: Computes target OTR & WVTR bounds; filters 31 food-grade barrier polymers & bio-resins.",
        "4. TOPSIS MCDM: Vector-normalized ranking balances Shelf-Life Extension (Max), Film Cost (Min), and Carbon Footprint (Min).",
        "5. Regulatory Audit & 3D Deliverable: Verifies FSSAI 2018 (IS 9845) migration; renders Three.js 3D pack and batch QR pass."
    ]
    for s in pipeline_steps:
        p_s = tf_mb.add_paragraph()
        p_s.text = s
        p_s.font.size = Pt(7.8)
        p_s.font.color.rgb = c_dark
        p_s.space_after = Pt(2)

    # Right: Multi-Layer Packaging Architecture
    right_box = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.7), Inches(3.7), Inches(6.133), Inches(2.3))
    right_box.fill.solid()
    right_box.fill.fore_color.rgb = c_white
    right_box.line.color.rgb = c_border
    tf_rb = right_box.text_frame
    tf_rb.word_wrap = True
    p_rh = tf_rb.paragraphs[0]
    p_rh.text = "INTELLIGENT MULTI-LAYER FOOD PACKAGING ARCHITECTURE"
    p_rh.font.bold = True
    p_rh.font.size = Pt(10.5)
    p_rh.font.color.rgb = c_blue

    layers = [
        "• Outer Layer: BOPET (12 µm) ➔ Mechanical puncture resistance & printable surface",
        "• Tie Layer: Modified PE (3 µm) ➔ Inter-layer molecular bonding preventing delamination",
        "• High Gas Barrier: EVOH Core (5 µm) ➔ Ultra-low OTR (<1 cc/m²·day) • Prevents oxidation & rancidity",
        "• Tie Layer: Modified PE (3 µm) ➔ Inter-layer molecular bonding preventing delamination",
        "• Hermetic Sealant: Metallocene LLDPE (50 µm) ➔ Moisture barrier (WVTR <3 g/m²·day) • FSSAI Food Safe (IS 10146)",
        "• MAP Gas Balance: Laser micro-perforations match respiration (RO2) to extend life by 200% - 300%."
    ]
    for lyr in layers:
        p_l = tf_rb.add_paragraph()
        p_l.text = lyr
        p_l.font.size = Pt(8.2)
        p_l.font.color.rgb = c_dark
        p_l.space_after = Pt(2)

    # Bottom Architecture Flow Strip
    arch_strip = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.5), Inches(6.1), Inches(12.333), Inches(1.0))
    arch_strip.fill.solid()
    arch_strip.fill.fore_color.rgb = c_navy
    tf_as = arch_strip.text_frame
    tf_as.word_wrap = True
    p_ash = tf_as.paragraphs[0]
    p_ash.text = "SYSTEM ARCHITECTURE FLOW (END-TO-END MULTI-TIER CONNECTION)"
    p_ash.font.bold = True
    p_ash.font.size = Pt(10)
    p_ash.font.color.rgb = c_green

    p_asc = tf_as.add_paragraph()
    p_asc.text = "1. Client Layer: React 19 UI, Quantum 3D HUD, Vaani Voice AI, WebRTC YOLOv8/NVIDIA Scanner | 2. API Gateway: FastAPI Async Router, Pydantic v2 | 3. AI & Physics: YOLOv8 ONNX, NVIDIA NIM Vision, NumPy TOPSIS, Tetens/Arrhenius Solver | 4. Data Layer: 100 Indian Crops (ICAR/USDA), 31 Polymers DB, FSSAI IS 9845 | 5. Delivery HUD: Three.js 3D Lab, MAP Solver, QR Pass"
    p_asc.font.size = Pt(8)
    p_asc.font.color.rgb = c_white

    # -------------------------------------------------------------
    # SLIDE 4: FEASIBILITY AND VIABILITY
    # -------------------------------------------------------------
    s4 = prs.slides.add_slide(blank_layout)
    add_header(s4, "FEASIBILITY AND VIABILITY")

    f_cards = [
        ("TECHNICAL FEASIBILITY", [
            "✓ Modern, battle-tested full stack — React 19 + FastAPI",
            "✓ Sub-50ms execution latency for TOPSIS & physics algorithms",
            "✓ 12ms / 60 FPS real-time YOLOv8 edge vision inference",
            "✓ Modular, high-speed RESTful microservices architecture",
            "✓ Three.js WebGL & Quantum 3D run smoothly on any browser",
            "▸ 100% functional working prototype verified & deployed live."
        ]),
        ("DATA RIGOR & PROVENANCE", [
            "✓ 100 pre-calibrated commodities across 6 core food categories",
            "✓ Integrated official FSSAI • APEDA • BIS • ICAR-CIPHET standards",
            "✓ Complete provenance lineage kept for every single value & equation",
            "✓ Strict zero synthetic/hallucinated data — fully explainable math",
            "✓ Gazette 2011/2018/2022 plastic & heavy metal compliance rules",
            "▸ Every rule, threshold & barrier value traceable to Slide-6 sources."
        ]),
        ("DEPLOYMENT & SCALING", [
            "✓ Fully functional cloud & edge deployable prototype with offline mode",
            "✓ Zero proprietary hardware Capex needed (any smartphone or PC)",
            "✓ Stateless FastAPI containers scale horizontally with traffic load",
            "✓ Direct integration pathway with e-NAM digital mandis & APEDA",
            "✓ Zero-config client-side fallback runs without active server",
            "▸ Built for immediate grassroots deployment across rural FPOs."
        ])
    ]

    for idx, (title, items) in enumerate(f_cards):
        x = Inches(0.5 + idx * 4.15)
        box = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(1.35), Inches(4.0), Inches(2.4))
        box.fill.solid()
        box.fill.fore_color.rgb = c_card_bg
        box.line.color.rgb = c_border
        tf = box.text_frame
        tf.word_wrap = True
        p_t = tf.paragraphs[0]
        p_t.text = title
        p_t.font.bold = True
        p_t.font.size = Pt(11)
        p_t.font.color.rgb = c_blue
        for itm in items:
            p_i = tf.add_paragraph()
            p_i.text = itm
            p_i.font.size = Pt(8.5)
            p_i.font.color.rgb = c_dark
            p_i.space_after = Pt(2)

    # Challenges & Strategies (5 rows)
    c_title = s4.shapes.add_textbox(Inches(0.5), Inches(3.9), Inches(12.333), Inches(0.4))
    tf_ct = c_title.text_frame
    p_ct = tf_ct.paragraphs[0]
    p_ct.text = "❖ Potential challenges and risks ➔ Strategies for overcoming these challenges"
    p_ct.font.bold = True
    p_ct.font.size = Pt(11)
    p_ct.font.color.rgb = c_navy

    challenges = [
        ("1. Crop respiration & moisture vary by harvest maturity", "Calibrated against ICAR & UC Davis postharvest baselines; live sliders allow fine-tuning."),
        ("2. Broken Indian rural cold-chain transit abuse", "Arrhenius kinetic engine factors in +5°C transit safety buffer to prevent premature spoilage."),
        ("3. Material barrier variations across film suppliers", "Normalized ASTM/ISO testing metrics (OTR: ASTM D3985, WVTR: ASTM F1249) stored in DB."),
        ("4. Complex Plastic Waste Management (PWM) Rules 2022", "Automated regulatory audit checks FSSAI (IS 9845) migration and prioritizes compostable PLA/PHA."),
        ("5. Rural digital literacy divide for grassroots farmers", "Aasaan Mode with native Hindi voice assistance (Vaani AI) and real-time camera crop recognition.")
    ]

    for idx, (ch, st) in enumerate(challenges):
        y = Inches(4.35 + idx * 0.48)
        row_box = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.5), y, Inches(12.333), Inches(0.42))
        row_box.fill.solid()
        row_box.fill.fore_color.rgb = c_white
        row_box.line.color.rgb = c_border
        tf_r = row_box.text_frame
        p_r = tf_r.paragraphs[0]
        r1 = p_r.add_run()
        r1.text = ch + " ➔ "
        r1.font.bold = True
        r1.font.size = Pt(8.8)
        r1.font.color.rgb = c_navy
        r2 = p_r.add_run()
        r2.text = st
        r2.font.size = Pt(8.8)
        r2.font.color.rgb = c_dark

    # Bottom Verdict
    v_box = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.5), Inches(6.8), Inches(12.333), Inches(0.45))
    v_box.fill.solid()
    v_box.fill.fore_color.rgb = c_green
    tf_v = v_box.text_frame
    p_v = tf_v.paragraphs[0]
    p_v.text = "✓ Verdict: Fully feasible with modern web & physics AI stack — validated working prototype ready for immediate pilot. • Risk: Low–Medium"
    p_v.font.bold = True
    p_v.font.size = Pt(10)
    p_v.font.color.rgb = c_white
    p_v.alignment = PP_ALIGN.CENTER

    # -------------------------------------------------------------
    # SLIDE 5: IMPACT AND BENEFITS
    # -------------------------------------------------------------
    s5 = prs.slides.add_slide(blank_layout)
    add_header(s5, "IMPACT AND BENEFITS")

    # Target Audience Row
    aud_box = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.5), Inches(1.35), Inches(12.333), Inches(0.45))
    aud_box.fill.solid()
    aud_box.fill.fore_color.rgb = c_navy
    tf_a = aud_box.text_frame
    p_a = tf_a.paragraphs[0]
    p_a.text = "TARGET AUDIENCE: Farmers / Mandi FPOs | Food Processors | Agri-MSMEs | Packaging Designers | Exporters | Cold-Chain Logistics | Food Scientists | Govt Inspectors"
    p_a.font.bold = True
    p_a.font.size = Pt(9.5)
    p_a.font.color.rgb = c_white
    p_a.alignment = PP_ALIGN.CENTER

    # 5 Benefit Columns
    benefits = [
        ("SOCIAL", [
            "▸ Democratizes packaging science for grassroots farmers",
            "▸ Native Hindi/English voice AI bridges literacy barrier",
            "▸ Prevents distress sales during market glut via shelf-life gain",
            "▸ Protects smallholder farm incomes & rural livelihoods"
        ]),
        ("ECONOMIC", [
            "▸ Reduces post-harvest spoilage by 25% – 40% across transit",
            "▸ Mitigates India's annual ₹1.52 Lakh Crore food loss burden",
            "▸ Saves 12-20% resin cost via precision film down-gauging",
            "▸ Eliminates costly export consignment rejections at ports"
        ]),
        ("AGRICULTURAL", [
            "▸ Crop-wise preservation for 100 Indian commodities",
            "▸ Preserves fresh produce vitamins, firmness & aroma",
            "▸ Enables long-distance rail/road freight without spoilage",
            "▸ Generates export-ready APEDA packaging compliance passes"
        ]),
        ("ENVIRONMENT", [
            "▸ Recommends compostable Bio-PLA, Bio-PBS & PHA films",
            "▸ Accelerates transition to recyclable mono-material polyolefins",
            "▸ Fully aligns with Plastic Waste Management (PWM) Rules 2022",
            "▸ Minimizes methane emissions from rotting mandi landfill waste"
        ]),
        ("FOOD QUALITY", [
            "▸ Optimal OTR/WVTR stops moisture pooling & fungal rot",
            "▸ MAP gas equilibrium (O2/CO2) preserves crispness & color",
            "▸ Prevents lipid oxidation and rancidity in high-fat foods",
            "▸ Guarantees certified, safe & hygienic produce for consumers"
        ])
    ]

    for idx, (title, items) in enumerate(benefits):
        x = Inches(0.5 + idx * 2.48)
        box = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(1.95), Inches(2.4), Inches(3.6))
        box.fill.solid()
        box.fill.fore_color.rgb = c_card_bg
        box.line.color.rgb = c_border
        tf = box.text_frame
        tf.word_wrap = True
        p_t = tf.paragraphs[0]
        p_t.text = title
        p_t.font.bold = True
        p_t.font.size = Pt(11)
        p_t.font.color.rgb = c_blue
        p_t.alignment = PP_ALIGN.CENTER
        for itm in items:
            p_i = tf.add_paragraph()
            p_i.text = itm
            p_i.font.size = Pt(8.2)
            p_i.font.color.rgb = c_dark
            p_i.space_before = Pt(4)

    # Bottom Adoption Pathway
    ad_box = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.5), Inches(5.7), Inches(12.333), Inches(0.45))
    ad_box.fill.solid()
    ad_box.fill.fore_color.rgb = c_blue
    tf_ad = ad_box.text_frame
    p_ad = tf_ad.paragraphs[0]
    p_ad.text = "ADOPTION PATHWAY: 1. PROTOTYPE (Functional Full-Stack) ➔ 2. PILOT (Selected Mandis & FPOs) ➔ 3. VALIDATION (IIP & Lab Trials) ➔ 4. SCALE-UP (National e-NAM / Cloud)"
    p_ad.font.bold = True
    p_ad.font.size = Pt(9.5)
    p_ad.font.color.rgb = c_white
    p_ad.alignment = PP_ALIGN.CENTER

    # 4 Feature Pills
    pills = [
        "Compare Recyclable & Compostable Options",
        "Right-Size & Down-Gauge Packs (Less Plastic)",
        "Voice-First, Low-Literacy Bilingual UI",
        "Rural + Mandi FPO Friendly Practical Guidance"
    ]
    for idx, pill in enumerate(pills):
        x = Inches(0.5 + idx * 3.1)
        p_box = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(6.25), Inches(3.0), Inches(0.55))
        p_box.fill.solid()
        p_box.fill.fore_color.rgb = c_white
        p_box.line.color.rgb = c_green
        p_box.line.width = Pt(1.5)
        tf_p = p_box.text_frame
        p_txt = tf_p.paragraphs[0]
        p_txt.text = pill
        p_txt.font.bold = True
        p_txt.font.size = Pt(8.8)
        p_txt.font.color.rgb = c_navy
        p_txt.alignment = PP_ALIGN.CENTER

    # -------------------------------------------------------------
    # SLIDE 6: RESEARCH AND REFERENCES & DEMO PLAN
    # -------------------------------------------------------------
    s6 = prs.slides.add_slide(blank_layout)
    add_header(s6, "RESEARCH, REFERENCES & DEMO PLAN")

    # Left: Future Scope (6 items)
    left_box = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.5), Inches(1.35), Inches(5.9), Inches(3.9))
    left_box.fill.solid()
    left_box.fill.fore_color.rgb = c_card_bg
    left_box.line.color.rgb = c_border
    tf_l = left_box.text_frame
    tf_l.word_wrap = True
    p_lh = tf_l.paragraphs[0]
    p_lh.text = "FUTURE SCOPE & ADVANCED EXTENSIONS"
    p_lh.font.bold = True
    p_lh.font.size = Pt(11)
    p_lh.font.color.rgb = c_blue

    scopes = [
        ("1. National e-NAM Mandi Integration: ", "Direct API integration with electronic mandis for automated packaging grading and instant transit passes."),
        ("2. IoT Telemetry & Cold-Chain Sensors: ", "Live RFID/BLE temperature & RH data streams for real-time dynamic shelf-life decay updates."),
        ("3. Active & Antimicrobial Bio-Films: ", "Integration of natural nano-emulsion coatings (chitosan, thymol) to actively arrest fungal decay."),
        ("4. Converter Marketplace & Procurement: ", "Direct B2B digital gateway connecting FPOs directly with verified sustainable film converters."),
        ("5. Offline Progressive Web App (PWA): ", "Zero-connectivity Service Worker caching for seamless use in remote rural mandis."),
        ("6. AI Computer Vision Ripeness Grading: ", "Camera-based maturity & blemish detection prior to barrier film recommendation.")
    ]
    for h, d in scopes:
        p_sc = tf_l.add_paragraph()
        r1 = p_sc.add_run()
        r1.text = h
        r1.font.bold = True
        r1.font.size = Pt(8.2)
        r1.font.color.rgb = c_navy
        r2 = p_sc.add_run()
        r2.text = d
        r2.font.size = Pt(8.2)
        r2.font.color.rgb = c_dark
        p_sc.space_after = Pt(2)

    # Right: Official Sources
    right_box = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.6), Inches(1.35), Inches(6.233), Inches(3.9))
    right_box.fill.solid()
    right_box.fill.fore_color.rgb = c_white
    right_box.line.color.rgb = c_border
    tf_r = right_box.text_frame
    tf_r.word_wrap = True
    p_rh = tf_r.paragraphs[0]
    p_rh.text = "OFFICIAL GOVERNMENT & SCIENTIFIC SOURCES (VERIFIED PORTALS)"
    p_rh.font.bold = True
    p_rh.font.size = Pt(11)
    p_rh.font.color.rgb = c_blue

    sources = [
        ("• FSSAI [fssai.gov.in]: ", "Packaging Reg. 2018 & Overall Migration Limits (IS 9845:2020)"),
        ("• BIS [bis.gov.in]: ", "Indian Standards: IS 10146 (PE food contact), IS 12252 (PET), IS 15495"),
        ("• APEDA [apeda.gov.in]: ", "Fresh produce export packaging standards & cold-chain phytosanitary norms"),
        ("• IIP [iip-in.com]: ", "Indian Institute of Packaging (ASTM D3985 OTR & ASTM F1249 WVTR)"),
        ("• ICAR-CIPHET [ciphet.icar.gov.in]: ", "Post-harvest loss statistics & crop respiration rates (RO2/RCO2)"),
        ("• MoFPI [mofpi.gov.in]: ", "Ministry of Food Processing Industries cold-chain cluster schemes"),
        ("• USDA FoodData [fdc.nal.usda.gov]: ", "Crop baseline composition dataset (moisture %, Aw, lipids, pH)"),
        ("• CPCB (MoEFCC) [cpcb.nic.in]: ", "Plastic Waste Management Rules 2022 & Compostable IS/ISO 17088")
    ]
    for h, d in sources:
        p_so = tf_r.add_paragraph()
        r1 = p_so.add_run()
        r1.text = h
        r1.font.bold = True
        r1.font.size = Pt(8.2)
        r1.font.color.rgb = c_navy
        r2 = p_so.add_run()
        r2.text = d
        r2.font.size = Pt(8.2)
        r2.font.color.rgb = c_dark
        p_so.space_after = Pt(2)

    # Evidence Discipline Bar
    ev_bar = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.5), Inches(5.35), Inches(12.333), Inches(0.4))
    ev_bar.fill.solid()
    ev_bar.fill.fore_color.rgb = c_navy
    tf_ev = ev_bar.text_frame
    p_ev = tf_ev.paragraphs[0]
    p_ev.text = "EVIDENCE DISCIPLINE — ZERO FABRICATED SYNTHETIC VALUES: Official / Verified • Authoritative Research • Derived Physics • Statutory Compliance"
    p_ev.font.bold = True
    p_ev.font.size = Pt(8.5)
    p_ev.font.color.rgb = c_white
    p_ev.alignment = PP_ALIGN.CENTER

    # Bottom Demo Plan (Updated to match software)
    demo_title = s6.shapes.add_textbox(Inches(0.5), Inches(5.8), Inches(12.333), Inches(0.35))
    tf_dt = demo_title.text_frame
    p_dt = tf_dt.paragraphs[0]
    p_dt.text = "PROTOTYPE DEMO PLAN — WHAT WE WILL DEMONSTRATE IN EVALUATION (TESTED & WORKING)"
    p_dt.font.bold = True
    p_dt.font.size = Pt(10)
    p_dt.font.color.rgb = c_blue

    demo_cards = [
        ("1. Live 100-Crop Search & Camera Scan", "Real-time edge YOLOv8 + NVIDIA NIM Vision crop scanner with auto-detection."),
        ("2. Mass-Transfer & Respiration Solver", "Live Tetens equation vapor pressure & Arrhenius Michaelis-Menten respiration flux."),
        ("3. Quantum 3D TOPSIS & Three.js Lab", "Interactive 3D multi-layer film digital twin with layer exploding & MCDM sliders."),
        ("4. Bilingual Voice AI & FSSAI QR Pass", "Vaani Hindi/English voice copilot, Farmer Aasaan mode & instant batch QR report.")
    ]
    for idx, (title, desc) in enumerate(demo_cards):
        x = Inches(0.5 + idx * 3.1)
        d_box = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(6.2), Inches(3.0), Inches(0.95))
        d_box.fill.solid()
        d_box.fill.fore_color.rgb = c_card_bg
        d_box.line.color.rgb = c_green
        d_box.line.width = Pt(1.5)
        tf_d = d_box.text_frame
        tf_d.word_wrap = True
        p_t = tf_d.paragraphs[0]
        p_t.text = title
        p_t.font.bold = True
        p_t.font.size = Pt(9)
        p_t.font.color.rgb = c_navy
        p_d = tf_d.add_paragraph()
        p_d.text = desc
        p_d.font.size = Pt(7.8)
        p_d.font.color.rgb = c_dark
        p_d.space_before = Pt(2)

    output_pptx = r"c:\Users\AKASH\Downloads\food (2)\food\SIH2026_Evergreen_161280.pptx"
    prs.save(output_pptx)
    print("Saved PPTX to:", output_pptx)

if __name__ == "__main__":
    create_deck()
