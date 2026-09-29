import os
from reportlab.lib.pagesizes import landscape, letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

def generate_pdf():
    pdf_path = r"c:\Users\AKASH\Downloads\food (2)\food\SIH2026_Evergreen_161280.pdf"
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=landscape(letter),
        leftMargin=36,
        rightMargin=36,
        topMargin=28,
        bottomMargin=28
    )

    styles = getSampleStyleSheet()

    # Custom styles
    c_navy = colors.HexColor("#0F172A")
    c_blue = colors.HexColor("#0F2C59")
    c_green = colors.HexColor("#10B981")
    c_dark = colors.HexColor("#1E293B")
    c_muted = colors.HexColor("#64748B")
    c_card_bg = colors.HexColor("#F8FAFC")
    c_border = colors.HexColor("#CBD5E1")

    title_sih = ParagraphStyle(
        'SIHTitle',
        fontName='Helvetica-Bold',
        fontSize=24,
        textColor=c_blue,
        alignment=1, # Center
        spaceAfter=6
    )
    subtitle_page = ParagraphStyle(
        'SubtitlePage',
        fontName='Helvetica-Bold',
        fontSize=18,
        textColor=c_dark,
        alignment=1,
        spaceAfter=14
    )
    header_title = ParagraphStyle(
        'HeaderTitle',
        fontName='Helvetica-Bold',
        fontSize=15,
        textColor=c_blue,
        alignment=1
    )
    header_sub = ParagraphStyle(
        'HeaderSub',
        fontName='Helvetica',
        fontSize=8.5,
        textColor=c_muted,
        alignment=1
    )
    body_txt = ParagraphStyle(
        'BodyTxt',
        fontName='Helvetica',
        fontSize=8.5,
        textColor=c_dark,
        leading=11
    )
    body_bold = ParagraphStyle(
        'BodyBold',
        fontName='Helvetica-Bold',
        fontSize=8.5,
        textColor=c_dark,
        leading=11
    )
    card_title = ParagraphStyle(
        'CardTitle',
        fontName='Helvetica-Bold',
        fontSize=10,
        textColor=c_blue,
        leading=13,
        spaceAfter=4
    )

    story = []

    def get_header_table(title_text):
        pill_p = Paragraph("<font color='#10B981'><b>Evergreen</b></font><br/><font color='#1E293B'><b>Team 161280</b></font>", ParagraphStyle('Pill', fontName='Helvetica', fontSize=10, alignment=1))
        mid_p = Paragraph(f"<b>{title_text}</b><br/><font size='8' color='#64748B'>AI-Based Intelligent Food Packaging Material Recommendation System • PS SIH26236</font>", header_title)
        sih_p = Paragraph("<b>SMART INDIA<br/>HACKATHON 2026</b>", ParagraphStyle('SIH', fontName='Helvetica-Bold', fontSize=8, alignment=1, textColor=c_blue))

        t = Table([[pill_p, mid_p, sih_p]], colWidths=[120, 480, 120])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (0,0), colors.white),
            ('BOX', (0,0), (0,0), 1.5, c_green),
            ('ALIGN', (0,0), (-1,-1), 'CENTER'),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('BOTTOMPADDING', (0,0), (-1,-1), 4),
            ('TOPPADDING', (0,0), (-1,-1), 4),
            ('BOX', (2,0), (2,0), 1, c_border),
            ('BACKGROUND', (2,0), (2,0), c_card_bg),
        ]))
        return t

    # ---------------------------------------------------------
    # PAGE 1: TITLE PAGE
    # ---------------------------------------------------------
    story.append(Paragraph("SMART INDIA HACKATHON 2026", title_sih))
    story.append(Paragraph("TITLE PAGE", subtitle_page))
    story.append(Spacer(1, 10))

    meta_rows = [
        [Paragraph("<b>• Problem Statement ID</b>", body_bold), Paragraph("SIH26236", body_txt)],
        [Paragraph("<b>• Problem Statement Title</b>", body_bold), Paragraph("AI-Based Intelligent Food Packaging Material Recommendation System for Food Commodities", body_txt)],
        [Paragraph("<b>• Theme</b>", body_bold), Paragraph("Agriculture, FoodTech & Rural Development", body_txt)],
        [Paragraph("<b>• PS Category</b>", body_bold), Paragraph("Software", body_txt)],
        [Paragraph("<b>• Team ID</b>", body_bold), Paragraph("<font color='#10B981'><b>161280</b></font>", body_bold)],
        [Paragraph("<b>• Team Name (Registered on portal)</b>", body_bold), Paragraph("<font color='#10B981'><b>Evergreen</b></font>", body_bold)],
    ]
    t_meta = Table(meta_rows, colWidths=[240, 480])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_card_bg),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING', (0,0), (-1,-1), 16),
        ('RIGHTPADDING', (0,0), (-1,-1), 16),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_meta)
    story.append(PageBreak())

    # ---------------------------------------------------------
    # PAGE 2: PROPOSED SOLUTION & INNOVATION
    # ---------------------------------------------------------
    story.append(get_header_table("PACKWISE AI — PROPOSED SOLUTION"))
    story.append(Spacer(1, 8))

    banner_p = Paragraph("<b>PACKWISE AI — Physics-informed hybrid AI platform matching 100+ Indian food commodities & storage physics with 31 barrier polymers.</b><br/><font size='8'>✓ Explainable • ✓ Source-traced • ✓ Respiration & MAP aware • ✓ Edge AI Vision & Voice</font>", ParagraphStyle('Banner', fontName='Helvetica', fontSize=9.5, textColor=colors.white, alignment=1))
    t_ban = Table([[banner_p]], colWidths=[720])
    t_ban.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), c_blue),
        ('TOPPADDING', (0,0), (0,0), 6),
        ('BOTTOMPADDING', (0,0), (0,0), 6),
    ]))
    story.append(t_ban)
    story.append(Spacer(1, 6))

    # Modules Grid
    m_data = [
        [Paragraph("100+ Indian Commodities DB (FDC+ICAR)", body_bold), Paragraph("Mass-Transfer & Respiration Physics", body_bold), Paragraph("Dynamic Storage & Transit Logistics", body_bold), Paragraph("31 Polymers & Bio-Resins Catalog", body_bold)],
        [Paragraph("TOPSIS Multi-Criteria Ranking", body_bold), Paragraph("Dynamic Barrier Needs (OTR / WVTR)", body_bold), Paragraph("MAP Equilibrium Solver (O2 / CO2)", body_bold), Paragraph("Explainable Report, FSSAI Pass & QR", body_bold)],
    ]
    t_mods = Table(m_data, colWidths=[180, 180, 180, 180])
    t_mods.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_card_bg),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_mods)
    story.append(Spacer(1, 6))

    # How it addresses problem
    p_prob = Paragraph("""
    <b>❖ How it addresses the problem:</b><br/>
    • <b>Perishable crop devastation:</b> India suffers ~30% post-harvest spoilage (₹1.52 Lakh Cr loss) due to unvented polybags and condensation rot.<br/>
    • <b>One pack can't fit all:</b> Moisture sorption, fat oxidation, and respiration rates differ fundamentally across commodities; mismatched films cause premature spoilage.<br/>
    • <b>Selection is expert-dependent & slow:</b> Fragmented offline knowledge, arbitrary polymer thickness, and high trial-and-error laboratory costs.<br/>
    • <b>Ground-level stakeholders struggle:</b> Smallholder farmers, FPOs & food MSMEs lack packaging scientists and need instant guidance in native language.<br/>
    • <b>Unified physics + regulatory decision core:</b> Integrates food composition, crop biology, polymer barrier physics, and FSSAI/BIS rules into one automated engine.
    """, body_txt)
    story.append(p_prob)
    story.append(Spacer(1, 6))

    # Pipeline
    pipe_p = Paragraph("<b>SOLUTION PIPELINE:</b> Food Selection (100+ Crops) ➔ Property Analysis (aw, pH, Lipids) ➔ Risk Analysis (Respiration & O2) ➔ Compatibility (31 Polymers) ➔ TOPSIS AI Ranking ➔ Explained Result (3D Lab + QR)", ParagraphStyle('Pipe', fontName='Helvetica', fontSize=8, textColor=colors.white, alignment=1))
    t_pipe = Table([[pipe_p]], colWidths=[720])
    t_pipe.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), c_dark),
        ('TOPPADDING', (0,0), (0,0), 4),
        ('BOTTOMPADDING', (0,0), (0,0), 4),
    ]))
    story.append(t_pipe)
    story.append(Spacer(1, 6))

    # 5 Innovations
    inno_data = [[
        Paragraph("<b>1. EXPLAINABLE AI</b><br/>Transparent mathematical justification (TOPSIS Closeness Ci*) with statutory FSSAI citations & Gemini Flash reasoning.", body_txt),
        Paragraph("<b>2. MASS-TRANSFER PHYSICS</b><br/>Tetens vapor pressure equation + Arrhenius respiration kinetics for anaerobic hazard alerts.", body_txt),
        Paragraph("<b>3. 3D PACKAGING LAB & HUD</b><br/>Interactive Three.js WebGL multi-layer digital twin with layer exploding + Quantum 3D cards & 50-frame storyboard.", body_txt),
        Paragraph("<b>4. SOURCE TRACEABILITY</b><br/>Strict data discipline: FSSAI, APEDA, BIS, ICAR & USDA FDC — zero fabricated synthetic values.", body_txt),
        Paragraph("<b>5. AASAAN VOICE + AI VISION</b><br/>Bilingual Hindi/English voice assistant (Vaani AI) + Real-time Edge YOLOv8 & NVIDIA NIM camera crop scanner + batch QR pass.", body_txt)
    ]]
    t_inno = Table(inno_data, colWidths=[144, 144, 144, 144, 144])
    t_inno.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_card_bg),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_inno)
    story.append(PageBreak())

    # ---------------------------------------------------------
    # PAGE 3: TECHNICAL APPROACH
    # ---------------------------------------------------------
    story.append(get_header_table("TECHNICAL APPROACH & ARCHITECTURE"))
    story.append(Spacer(1, 8))

    tech_cols = [
        Paragraph("<b>FRONTEND TECH STACK</b><br/>• React 19, Vite (Instant HMR)<br/>• TypeScript, Tailwind CSS<br/>• Three.js WebGL 3D Film Lab<br/>• Quantum 3D Perspective HUD<br/>• 50-Frame Visual Storyboard<br/>• Web Speech Voice AI & WebRTC", body_txt),
        Paragraph("<b>BACKEND & DATABASE</b><br/>• Python 3.12 High-Speed Async<br/>• FastAPI (RESTful, Auto-Docs)<br/>• Uvicorn ASGI, Pydantic v2<br/>• SQLAlchemy ORM<br/>• SQLite Offline / PostgreSQL Cloud<br/>• Resilient Client-Side Engine", body_txt),
        Paragraph("<b>AI & MACHINE LEARNING (NEW)</b><br/>• <b>YOLOv8n Edge Neural Net:</b> 12ms/60FPS local on-device scanner<br/>• <b>NVIDIA NIM Llama-3.2:</b> Multimodal GPU vision detector<br/>• <b>Gemini 3.8/1.5 Flash:</b> FSSAI explainability & reasoning<br/>• <b>NumPy TOPSIS:</b> MCDM decision<br/>• <b>Vaani Voice AI:</b> Hindi/Eng STT/TTS", body_txt),
        Paragraph("<b>PHYSICS & KINETIC MODELS</b><br/>• <b>Tetens Formula:</b> Saturated vapor pressure Psat(T) & WVTR flux<br/>• <b>Michaelis-Menten:</b> Dynamic O2/CO2 respiration kinetics<br/>• <b>Arrhenius Model:</b> Temperature buffer (+5°C safety)<br/>• <b>MAP Solver:</b> Laser micro-perforation gas balance", body_txt)
    ]
    t_tech = Table([tech_cols], colWidths=[180, 180, 180, 180])
    t_tech.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_card_bg),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BACKGROUND', (2,0), (2,0), colors.HexColor("#ECFDF5")),
        ('BOX', (2,0), (2,0), 1.5, c_green),
    ]))
    story.append(t_tech)
    story.append(Spacer(1, 8))

    mid_cols = [
        Paragraph("""<b>OPERATIONAL METHODOLOGY PIPELINE:</b><br/>
        <b>1. Crop Intake & Profiling:</b> Input via Hindi Voice or Camera (YOLOv8/NVIDIA NIM); extract moisture %, aw, pH, lipids & respiration.<br/>
        <b>2. Physics & Respiration Modeling:</b> Tetens equation calculates Psat(T); Michaelis-Menten & Arrhenius model O2/CO2 with +5°C safety buffer.<br/>
        <b>3. Barrier Solving:</b> Computes target OTR & WVTR bounds; filters 31 food-grade barrier polymers & bio-resins.<br/>
        <b>4. TOPSIS MCDM:</b> Vector-normalized ranking balances Shelf-Life Extension (Max), Film Cost (Min), and Carbon Footprint (Min).<br/>
        <b>5. Regulatory Audit:</b> Verifies FSSAI 2018 (IS 9845) migration compliance; renders Three.js 3D pack and batch QR pass.
        """, body_txt),
        Paragraph("""<b>INTELLIGENT MULTI-LAYER FOOD PACKAGING ARCHITECTURE:</b><br/>
        • <b>Outer Protective Layer:</b> BOPET (12 µm) ➔ Mechanical puncture resistance & printable surface<br/>
        • <b>Adhesive Tie Layer:</b> Modified PE (3 µm) ➔ Inter-layer molecular bonding preventing delamination<br/>
        • <b>High Gas Barrier:</b> EVOH Core (5 µm) ➔ Ultra-low OTR (<1 cc/m²·day) • Prevents oxidation & rancidity<br/>
        • <b>Adhesive Tie Layer:</b> Modified PE (3 µm) ➔ Inter-layer molecular bonding preventing delamination<br/>
        • <b>Hermetic Sealant:</b> Metallocene LLDPE (50 µm) ➔ Moisture barrier (WVTR <3 g/m²·day) • FSSAI Food Contact Safe (IS 10146)<br/>
        • <b>MAP Gas Equilibrium:</b> Laser micro-perforations match respiration (RO2) to extend produce shelf life by 200% - 300%.
        """, body_txt)
    ]
    t_mid = Table([mid_cols], colWidths=[360, 360])
    t_mid.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.white),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_mid)
    story.append(Spacer(1, 6))

    arch_txt = Paragraph("<b>SYSTEM ARCHITECTURE FLOW (END-TO-END MULTI-TIER CONNECTION):</b><br/><font size='7.5' color='#FFFFFF'>1. Client Layer: React 19 UI, Quantum 3D HUD, Vaani Voice AI, WebRTC YOLOv8/NVIDIA Scanner | 2. API Gateway: FastAPI Async Router, Pydantic v2 | 3. AI & Physics: YOLOv8 ONNX, NVIDIA NIM Vision, NumPy TOPSIS, Tetens/Arrhenius Solver | 4. Data Layer: 100 Indian Crops (ICAR/USDA), 31 Polymers DB, FSSAI IS 9845 | 5. Delivery HUD: Three.js 3D Lab, MAP Solver, QR Pass</font>", ParagraphStyle('Arch', fontName='Helvetica', fontSize=8, textColor=c_green, alignment=1))
    t_arch = Table([[arch_txt]], colWidths=[720])
    t_arch.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), c_navy),
        ('TOPPADDING', (0,0), (0,0), 5),
        ('BOTTOMPADDING', (0,0), (0,0), 5),
    ]))
    story.append(t_arch)
    story.append(PageBreak())

    # ---------------------------------------------------------
    # PAGE 4: FEASIBILITY AND VIABILITY
    # ---------------------------------------------------------
    story.append(get_header_table("FEASIBILITY AND VIABILITY"))
    story.append(Spacer(1, 8))

    feas_cols = [
        Paragraph("<b>TECHNICAL FEASIBILITY</b><br/>✓ Modern full stack — React 19 + FastAPI<br/>✓ Sub-50ms execution latency for TOPSIS & physics<br/>✓ 12ms / 60 FPS real-time YOLOv8 edge vision<br/>✓ Modular, high-speed RESTful microservices<br/>✓ Three.js WebGL & Quantum 3D run in any browser<br/>▸ 100% functional working prototype verified locally & deployed live.", body_txt),
        Paragraph("<b>DATA RIGOR & PROVENANCE</b><br/>✓ 100 pre-calibrated commodities across 6 core food categories<br/>✓ Integrated official FSSAI • APEDA • BIS • ICAR-CIPHET standards<br/>✓ Complete provenance lineage kept for every value & equation<br/>✓ Strict zero synthetic/hallucinated data — fully explainable math<br/>▸ Every rule, threshold & barrier value traceable to Slide-6 sources.", body_txt),
        Paragraph("<b>DEPLOYMENT & SCALING</b><br/>✓ Fully functional cloud & edge deployable prototype with offline mode<br/>✓ Zero proprietary hardware Capex needed (any smartphone or PC)<br/>✓ Stateless FastAPI containers scale horizontally with traffic load<br/>✓ Direct integration pathway with e-NAM digital mandis & APEDA<br/>▸ Built for immediate grassroots deployment across rural FPOs.", body_txt)
    ]
    t_feas = Table([feas_cols], colWidths=[240, 240, 240])
    t_feas.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_card_bg),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_feas)
    story.append(Spacer(1, 8))

    story.append(Paragraph("<b>❖ Potential challenges and risks ➔ Strategies for overcoming these challenges</b>", body_bold))
    story.append(Spacer(1, 4))

    ch_rows = [
        [Paragraph("<b>1. Crop respiration & moisture vary by harvest maturity</b> ➔ Calibrated against ICAR & UC Davis postharvest baselines; live sliders allow fine-tuning.", body_txt)],
        [Paragraph("<b>2. Broken Indian rural cold-chain transit abuse</b> ➔ Arrhenius kinetic engine factors in +5°C transit safety buffer to prevent premature spoilage.", body_txt)],
        [Paragraph("<b>3. Material barrier variations across film suppliers</b> ➔ Normalized ASTM/ISO testing metrics (OTR: ASTM D3985, WVTR: ASTM F1249) stored in DB.", body_txt)],
        [Paragraph("<b>4. Complex Plastic Waste Management (PWM) Rules 2022</b> ➔ Automated regulatory audit checks FSSAI (IS 9845) migration and prioritizes compostable PLA/PHA.", body_txt)],
        [Paragraph("<b>5. Rural digital literacy divide for grassroots farmers</b> ➔ Aasaan Mode with native Hindi voice assistance (Vaani AI) and real-time camera crop recognition.", body_txt)],
    ]
    t_ch = Table(ch_rows, colWidths=[720])
    t_ch.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.white),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_ch)
    story.append(Spacer(1, 6))

    verd_p = Paragraph("<b>✓ Verdict: Fully feasible with modern web & physics AI stack — validated working prototype ready for immediate pilot. • Risk: Low–Medium</b>", ParagraphStyle('V', fontName='Helvetica-Bold', fontSize=9, textColor=colors.white, alignment=1))
    t_v = Table([[verd_p]], colWidths=[720])
    t_v.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), c_green),
        ('TOPPADDING', (0,0), (0,0), 5),
        ('BOTTOMPADDING', (0,0), (0,0), 5),
    ]))
    story.append(t_v)
    story.append(PageBreak())

    # ---------------------------------------------------------
    # PAGE 5: IMPACT AND BENEFITS
    # ---------------------------------------------------------
    story.append(get_header_table("IMPACT AND BENEFITS"))
    story.append(Spacer(1, 8))

    aud_p = Paragraph("<b>TARGET AUDIENCE:</b> Farmers / Mandi FPOs | Food Processors | Agri-MSMEs | Packaging Designers | Exporters | Cold-Chain Logistics | Food Scientists | Govt Inspectors", ParagraphStyle('Aud', fontName='Helvetica', fontSize=8.5, textColor=colors.white, alignment=1))
    t_aud = Table([[aud_p]], colWidths=[720])
    t_aud.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), c_navy),
        ('TOPPADDING', (0,0), (0,0), 5),
        ('BOTTOMPADDING', (0,0), (0,0), 5),
    ]))
    story.append(t_aud)
    story.append(Spacer(1, 6))

    ben_cols = [
        Paragraph("<b>SOCIAL</b><br/>• Democratizes packaging science for grassroots farmers<br/>• Native Hindi/English voice AI bridges literacy barrier<br/>• Prevents distress sales during market glut via shelf-life gain<br/>• Protects smallholder farm incomes & rural livelihoods", body_txt),
        Paragraph("<b>ECONOMIC</b><br/>• Reduces post-harvest spoilage by 25% – 40% across transit<br/>• Mitigates India's annual ₹1.52 Lakh Crore food loss burden<br/>• Saves 12-20% resin cost via precision film down-gauging<br/>• Eliminates costly export consignment rejections at ports", body_txt),
        Paragraph("<b>AGRICULTURAL</b><br/>• Crop-wise preservation for 100 Indian commodities<br/>• Preserves fresh produce vitamins, firmness & natural aroma<br/>• Enables long-distance rail/road freight without spoilage<br/>• Generates export-ready APEDA packaging compliance passes", body_txt),
        Paragraph("<b>ENVIRONMENT</b><br/>• Recommends compostable Bio-PLA, Bio-PBS & PHA films<br/>• Accelerates transition to recyclable mono-material polyolefins<br/>• Fully aligns with Plastic Waste Management (PWM) Rules 2022<br/>• Minimizes methane emissions from rotting mandi landfill waste", body_txt),
        Paragraph("<b>FOOD QUALITY</b><br/>• Optimal OTR/WVTR stops moisture pooling & fungal rot<br/>• MAP gas equilibrium (O2/CO2) preserves crispness & color<br/>• Prevents lipid oxidation and rancidity in high-fat foods<br/>• Guarantees certified, safe & hygienic produce for consumers", body_txt),
    ]
    t_ben = Table([ben_cols], colWidths=[144, 144, 144, 144, 144])
    t_ben.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_card_bg),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_ben)
    story.append(Spacer(1, 8))

    ad_p = Paragraph("<b>ADOPTION PATHWAY:</b> 1. PROTOTYPE (Functional Full-Stack) ➔ 2. PILOT (Selected Mandis & FPOs) ➔ 3. VALIDATION (IIP & Lab Trials) ➔ 4. SCALE-UP (National e-NAM / Cloud)", ParagraphStyle('Ad', fontName='Helvetica', fontSize=8.5, textColor=colors.white, alignment=1))
    t_ad = Table([[ad_p]], colWidths=[720])
    t_ad.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), c_blue),
        ('TOPPADDING', (0,0), (0,0), 5),
        ('BOTTOMPADDING', (0,0), (0,0), 5),
    ]))
    story.append(t_ad)
    story.append(Spacer(1, 6))

    pill_row = [
        Paragraph("<b>Compare Recyclable & Compostable Options</b>", body_bold),
        Paragraph("<b>Right-Size & Down-Gauge Packs (Less Plastic)</b>", body_bold),
        Paragraph("<b>Voice-First, Low-Literacy Bilingual UI</b>", body_bold),
        Paragraph("<b>Rural + Mandi FPO Friendly Practical Guidance</b>", body_bold),
    ]
    t_pil = Table([pill_row], colWidths=[180, 180, 180, 180])
    t_pil.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.white),
        ('BOX', (0,0), (-1,-1), 1, c_green),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_pil)
    story.append(PageBreak())

    # ---------------------------------------------------------
    # PAGE 6: RESEARCH, REFERENCES & DEMO PLAN
    # ---------------------------------------------------------
    story.append(get_header_table("RESEARCH, REFERENCES & DEMO PLAN"))
    story.append(Spacer(1, 8))

    ref_cols = [
        Paragraph("""<b>FUTURE SCOPE & ADVANCED EXTENSIONS:</b><br/>
        <b>1. National e-NAM Mandi Integration:</b> Direct API integration with electronic mandis for automated packaging grading and instant transit passes.<br/>
        <b>2. IoT Telemetry & Cold-Chain Sensors:</b> Live RFID/BLE temperature & RH data streams for real-time dynamic shelf-life decay updates.<br/>
        <b>3. Active & Antimicrobial Bio-Films:</b> Integration of natural nano-emulsion coatings (chitosan, thymol) to actively arrest fungal decay.<br/>
        <b>4. Converter Marketplace & Procurement:</b> Direct B2B digital gateway connecting FPOs directly with verified sustainable film converters.<br/>
        <b>5. Offline Progressive Web App (PWA):</b> Zero-connectivity Service Worker caching for seamless use in remote rural mandis.<br/>
        <b>6. AI Computer Vision Ripeness Grading:</b> Camera-based maturity & blemish detection prior to barrier film recommendation.
        """, body_txt),
        Paragraph("""<b>OFFICIAL GOVERNMENT & SCIENTIFIC SOURCES (VERIFIED PORTALS):</b><br/>
        • <b>FSSAI [fssai.gov.in]:</b> Packaging Reg. 2018 & Overall Migration Limits (IS 9845:2020)<br/>
        • <b>BIS [bis.gov.in]:</b> Indian Standards: IS 10146 (PE food contact), IS 12252 (PET), IS 15495<br/>
        • <b>APEDA [apeda.gov.in]:</b> Fresh produce export packaging standards & cold-chain phytosanitary norms<br/>
        • <b>IIP [iip-in.com]:</b> Indian Institute of Packaging (ASTM D3985 OTR & ASTM F1249 WVTR)<br/>
        • <b>ICAR-CIPHET [ciphet.icar.gov.in]:</b> Post-harvest loss statistics & crop respiration rates (RO2/RCO2)<br/>
        • <b>MoFPI [mofpi.gov.in]:</b> Ministry of Food Processing Industries cold-chain cluster schemes<br/>
        • <b>USDA FoodData [fdc.nal.usda.gov]:</b> Crop baseline composition dataset (moisture %, Aw, lipids, pH)<br/>
        • <b>CPCB (MoEFCC) [cpcb.nic.in]:</b> Plastic Waste Management Rules 2022 & Compostable IS/ISO 17088
        """, body_txt),
    ]
    t_ref = Table([ref_cols], colWidths=[360, 360])
    t_ref.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.white),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_ref)
    story.append(Spacer(1, 6))

    ev_p = Paragraph("<b>EVIDENCE DISCIPLINE — ZERO FABRICATED SYNTHETIC VALUES:</b> Official / Verified • Authoritative Research • Derived Physics • Statutory Compliance", ParagraphStyle('Ev', fontName='Helvetica', fontSize=8, textColor=colors.white, alignment=1))
    t_ev = Table([[ev_p]], colWidths=[720])
    t_ev.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), c_navy),
        ('TOPPADDING', (0,0), (0,0), 4),
        ('BOTTOMPADDING', (0,0), (0,0), 4),
    ]))
    story.append(t_ev)
    story.append(Spacer(1, 6))

    story.append(Paragraph("<b>PROTOTYPE DEMO PLAN — WHAT WE WILL DEMONSTRATE IN EVALUATION (TESTED & WORKING):</b>", body_bold))
    story.append(Spacer(1, 3))

    demo_row = [
        Paragraph("<b>1. Live 100-Crop Search & Camera Scan</b><br/>Real-time edge YOLOv8 + NVIDIA NIM Vision crop scanner with auto-detection.", body_txt),
        Paragraph("<b>2. Mass-Transfer & Respiration Solver</b><br/>Live Tetens equation vapor pressure & Arrhenius Michaelis-Menten respiration flux.", body_txt),
        Paragraph("<b>3. Quantum 3D TOPSIS & Three.js Lab</b><br/>Interactive 3D multi-layer film digital twin with layer exploding & MCDM sliders.", body_txt),
        Paragraph("<b>4. Bilingual Voice AI & FSSAI QR Pass</b><br/>Vaani Hindi/English voice copilot, Farmer Aasaan mode & instant batch QR report.", body_txt),
    ]
    t_dem = Table([demo_row], colWidths=[180, 180, 180, 180])
    t_dem.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_card_bg),
        ('BOX', (0,0), (-1,-1), 1.5, c_green),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_dem)

    doc.build(story)
    print("Saved PDF to:", pdf_path)

if __name__ == "__main__":
    generate_pdf()
