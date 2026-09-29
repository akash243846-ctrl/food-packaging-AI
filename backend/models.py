from sqlalchemy import Column, String, Float, Integer, Boolean, DateTime, func
from database import Base

class FoodCommodity(Base):
    __tablename__ = "food_commodities"

    commodity_id = Column(String(36), primary_key=True)
    name = Column(String(100), unique=True, nullable=False, index=True)
    category = Column(String(50), nullable=False, index=True)
    moisture_content_pct = Column(Float, nullable=False)
    lipid_content_pct = Column(Float, nullable=False)
    ph_value = Column(Float, nullable=False)
    is_respiring = Column(Boolean, default=False)
    optimum_temp_c = Column(Float, nullable=False)
    critical_oxygen_limit_pct = Column(Float, nullable=True)
    critical_moisture_limit_pct = Column(Float, nullable=False)
    water_activity_aw = Column(Float, nullable=False)
    default_shelf_life_days = Column(Integer, nullable=False)

class PackagingMaterial(Base):
    __tablename__ = "packaging_materials"

    material_id = Column(String(36), primary_key=True)
    trade_name = Column(String(100), unique=True, nullable=False)
    base_polymer = Column(String(50), nullable=False)
    thickness_microns = Column(Float, nullable=False)
    otr_normalized = Column(Float, nullable=False)
    wvtr_normalized = Column(Float, nullable=False)
    co2tr_normalized = Column(Float, nullable=False)
    tensile_strength_mpa = Column(Float, nullable=False)
    cost_per_kg = Column(Float, nullable=False)
    carbon_footprint_index = Column(Float, nullable=False)
    is_biodegradable = Column(Boolean, default=False)
    fda_approved = Column(Boolean, default=True)

class RespirationKinetics(Base):
    __tablename__ = "respiration_kinetics"

    id = Column(String(36), primary_key=True)
    commodity_name = Column(String(100), nullable=False, index=True)
    v_max_o2 = Column(Float, nullable=False)
    k_m_o2 = Column(Float, nullable=False)
    rq = Column(Float, default=1.0)
    activation_energy_kj = Column(Float, default=65.0)

class RecommendationLog(Base):
    __tablename__ = "recommendation_logs"

    log_id = Column(String(36), primary_key=True)
    commodity_name = Column(String(100), nullable=False)
    ambient_temp_c = Column(Float, nullable=False)
    external_rh_pct = Column(Float, nullable=False)
    surface_area_m2 = Column(Float, nullable=False)
    product_mass_kg = Column(Float, nullable=False)
    recommended_material = Column(String(100), nullable=False)
    topsis_score = Column(Float, nullable=False)
    predicted_shelf_life_days = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=func.now())

class ScanHistory(Base):
    __tablename__ = "scan_history"

    id = Column(String(36), primary_key=True)
    crop_name = Column(String(100), nullable=False)
    hindi_name = Column(String(100), nullable=False)
    category = Column(String(50), nullable=False)
    confidence = Column(Float, nullable=False)
    detector = Column(String(50), default="YOLOv8n-ONNX")
    recommended_material = Column(String(200), nullable=False)
    storage_temp = Column(String(100), nullable=False)
    shelf_life = Column(String(100), nullable=False)
    map_gas = Column(String(150), nullable=True)
    hindi_speech = Column(String(500), nullable=True)
    notes = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=func.now())

class FarmerRecord(Base):
    __tablename__ = "farmer_records"

    id = Column(String(36), primary_key=True)
    farmer_name = Column(String(100), default="Kisan Bhai")
    crop_name = Column(String(100), nullable=False)
    hindi_name = Column(String(100), nullable=False)
    quantity_kg = Column(Float, default=100.0)
    current_loss_pct = Column(Float, default=20.0)
    recommended_package = Column(String(200), nullable=False)
    storage_temp = Column(String(100), nullable=False)
    projected_savings_inr = Column(Float, default=0.0)
    notes = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=func.now())

