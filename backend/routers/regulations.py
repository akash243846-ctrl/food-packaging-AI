from fastapi import APIRouter, Query, HTTPException
from typing import List, Optional, Dict, Any
from pydantic import BaseModel

router = APIRouter(prefix="/api/v1/regulations", tags=["FSSAI Regulations"])

class ThresholdCheckRequest(BaseModel):
    category: str # "alcohol", "heavy_metal", "crop_toxin", "fortification"
    item_name: str
    parameter: str
    measured_value: float

class ThresholdCheckResponse(BaseModel):
    item_name: str
    parameter: str
    measured_value: float
    max_limit: float
    unit: str
    is_compliant: bool
    status: str
    regulation_reference: str
    advisory: str

# Sample of official Gazette Datasets
ALCOHOLIC_BEVERAGES = [
    {
        "beverage": "Brandy / Grape Brandy",
        "category": "Distilled Spirit",
        "ethanol_range_pct": "36.0 to 50.0%",
        "max_methanol_g_100l": 150.0,
        "max_volatile_acid_g_100l": 100.0,
        "max_higher_alcohol_g_100l": 600.0,
        "max_lead_mg_l": 0.2,
        "max_arsenic_mg_l": 0.25,
        "max_copper_mg_l": 5.0,
        "regulation": "FSSAI (Alcoholic Beverages) Regulations 2018, Table 1"
    },
    {
        "beverage": "Rum",
        "category": "Distilled Spirit",
        "ethanol_range_pct": "36.0 to 50.0%",
        "max_methanol_g_100l": 20.0,
        "max_volatile_acid_g_100l": 50.0,
        "max_higher_alcohol_g_100l": 350.0,
        "max_lead_mg_l": 0.2,
        "max_arsenic_mg_l": 0.25,
        "max_copper_mg_l": 5.0,
        "regulation": "FSSAI (Alcoholic Beverages) Regulations 2018, Table 1"
    },
    {
        "beverage": "Vodka",
        "category": "Distilled Spirit",
        "ethanol_range_pct": "36.0 to 50.0%",
        "max_methanol_g_100l": 10.0,
        "max_volatile_acid_g_100l": 10.0,
        "max_higher_alcohol_g_100l": 50.0,
        "max_lead_mg_l": 0.2,
        "max_arsenic_mg_l": 0.25,
        "max_copper_mg_l": 5.0,
        "regulation": "FSSAI (Alcoholic Beverages) Regulations 2018, Table 1"
    },
    {
        "beverage": "Whisky / Single Malt",
        "category": "Distilled Spirit",
        "ethanol_range_pct": "36.0 to 50.0%",
        "max_methanol_g_100l": 30.0,
        "max_volatile_acid_g_100l": 150.0,
        "max_higher_alcohol_g_100l": 750.0,
        "max_lead_mg_l": 0.2,
        "max_arsenic_mg_l": 0.25,
        "max_copper_mg_l": 5.0,
        "regulation": "FSSAI (Alcoholic Beverages) Regulations 2018, Table 1"
    },
    {
        "beverage": "Table Wine (Red / White)",
        "category": "Wine",
        "ethanol_range_pct": "7.0 to 15.5%",
        "max_methanol_g_100l": 40.0, # 400 mg/L = 40 g/100L
        "max_volatile_acid_g_100l": 12.0,
        "max_lead_mg_l": 0.2,
        "max_arsenic_mg_l": 0.25,
        "max_copper_mg_l": 5.0,
        "regulation": "FSSAI (Alcoholic Beverages) Regulations 2018, Table 2"
    },
    {
        "beverage": "Regular Beer",
        "category": "Beer",
        "ethanol_range_pct": "0.5 to 5.0%",
        "max_methanol_g_100l": 5.0, # 50 mg/L
        "max_lead_mg_l": 0.2,
        "max_arsenic_mg_l": 0.25,
        "max_copper_mg_l": 2.0,
        "regulation": "FSSAI (Alcoholic Beverages) Regulations 2018, Table 3"
    },
    {
        "beverage": "Strong Beer",
        "category": "Beer",
        "ethanol_range_pct": "5.0 to 8.0%",
        "max_methanol_g_100l": 5.0,
        "max_lead_mg_l": 0.2,
        "max_arsenic_mg_l": 0.25,
        "max_copper_mg_l": 2.0,
        "regulation": "FSSAI (Alcoholic Beverages) Regulations 2018, Table 3"
    }
]

CONTAMINANTS_LIMITS = [
    {"metal": "Lead (Pb)", "food": "Fruit and vegetable juice", "limit_ppm": 1.0, "reg": "FSSAI 2011 Table 2.1.1"},
    {"metal": "Lead (Pb)", "food": "Infant milk substitute", "limit_ppm": 0.2, "reg": "FSSAI 2011 Table 2.1.1"},
    {"metal": "Lead (Pb)", "food": "Turmeric whole and powder", "limit_ppm": 10.0, "reg": "FSSAI 2011 Table 2.1.1"},
    {"metal": "Lead (Pb)", "food": "Canned fish / meat", "limit_ppm": 5.0, "reg": "FSSAI 2011 Table 2.1.1"},
    {"metal": "Lead (Pb)", "food": "Edible oils and fats", "limit_ppm": 0.5, "reg": "FSSAI 2011 Table 2.1.1"},
    {"metal": "Copper (Cu)", "food": "Carbonated water", "limit_ppm": 1.5, "reg": "FSSAI 2011 Table 2.1.1"},
    {"metal": "Copper (Cu)", "food": "Tomato puree and paste", "limit_ppm": 100.0, "reg": "FSSAI 2011 Table 2.1.1"},
    {"metal": "Copper (Cu)", "food": "Tea", "limit_ppm": 150.0, "reg": "FSSAI 2011 Table 2.1.1"},
    {"metal": "Arsenic (As)", "food": "Milk", "limit_ppm": 0.1, "reg": "FSSAI 2011 Table 2.1.1"},
    {"metal": "Arsenic (As)", "food": "Carbonated water", "limit_ppm": 0.25, "reg": "FSSAI 2011 Table 2.1.1"},
    {"metal": "Arsenic (As)", "food": "Infant foods", "limit_ppm": 0.05, "reg": "FSSAI 2011 Table 2.1.1"},
    {"metal": "Cadmium (Cd)", "food": "Infant foods", "limit_ppm": 0.1, "reg": "FSSAI 2011 Table 2.1.1"},
    {"metal": "Cadmium (Cd)", "food": "General foods", "limit_ppm": 1.5, "reg": "FSSAI 2011 Table 2.1.1"},
    {"metal": "Mercury (Hg)", "food": "Fish", "limit_ppm": 0.5, "reg": "FSSAI 2011 Table 2.1.1"},
    {"metal": "Methyl Mercury", "food": "All foods", "limit_ppm": 0.25, "reg": "FSSAI 2011 Table 2.1.1"},
    {"metal": "Tin (Sn)", "food": "Canned food products", "limit_ppm": 250.0, "reg": "FSSAI 2011 Table 2.1.1"},
    {"metal": "Nickel (Ni)", "food": "Vanaspati / Edible fats", "limit_ppm": 1.5, "reg": "FSSAI 2011 Table 2.1.1"},
]

FORTIFICATION_STAPLES = [
    {
        "food": "Iodized Salt",
        "nutrient": "Iodine",
        "mfg_level": "20 - 30 ppm",
        "retail_level": "15 - 30 ppm",
        "source": "Potassium Iodate",
        "logo": "+F Logo mandatory",
        "regulation": "FSSAI Fortification Regulations 2018, Schedule I"
    },
    {
        "food": "Double Fortified Salt",
        "nutrient": "Iron + Iodine",
        "mfg_level": "Iron: 850 - 1100 ppm, Iodine: 20 - 30 ppm",
        "source": "Ferrous sulphate/fumarate + Potassium iodate",
        "logo": "+F Logo mandatory",
        "warning": "People with Thalassemia may take under medical supervision",
        "regulation": "FSSAI Fortification Regulations 2018, Schedule I"
    },
    {
        "food": "Fortified Edible Oil",
        "nutrient": "Vitamin A & D",
        "level": "Vit A: 6 - 9.9 µg RE/g, Vit D: 0.11 - 0.16 µg/g",
        "source": "Retinyl palmitate + Cholecalciferol (plant source)",
        "logo": "+F Logo mandatory",
        "regulation": "FSSAI Fortification Regulations 2018, Schedule I"
    },
    {
        "food": "Fortified Milk",
        "nutrient": "Vitamin A & D",
        "level": "Vit A: 270 - 450 µg RE/L, Vit D: 5.0 - 7.5 µg/L",
        "source": "Retinyl acetate/palmitate + Ergocalciferol (plant)",
        "logo": "+F Logo mandatory",
        "regulation": "FSSAI Fortification Regulations 2018, Schedule I"
    },
    {
        "food": "Fortified Atta / Maida",
        "nutrient": "Iron + Folic Acid + Vitamin B12",
        "level": "Iron: 28 - 42.5 mg/kg, Folic Acid: 75 - 125 µg/kg, B12: 0.75 - 1.25 µg/kg",
        "source": "Ferrous sulphate/pyrophosphate + Folic acid + Cyanocobalamine",
        "warning": "People with Thalassemia may take under medical supervision",
        "regulation": "FSSAI Fortification Regulations 2018, Schedule I"
    },
    {
        "food": "Fortified Rice (FRK)",
        "nutrient": "Iron + Folic Acid + Vitamin B12",
        "level": "Iron: 28 - 42.5 mg/kg, Folic Acid: 75 - 125 µg/kg, B12: 0.75 - 1.25 µg/kg",
        "source": "Ferric pyrophosphate / Sodium iron EDTA",
        "regulation": "FSSAI Fortification Regulations 2018, Schedule I"
    }
]

@router.get("/alcoholic-beverages")
def get_alcoholic_standards():
    return {
        "title": "Food Safety and Standards (Alcoholic Beverages) Regulations, 2018",
        "enforcement_date": "1st April 2019",
        "statutory_warning": "CONSUMPTION OF ALCOHOL IS INJURIOUS TO HEALTH. BE SAFE-DONT DRINK AND DRIVE (min 3mm font)",
        "standard_drink_definition": "12.7 ml of abv as measured at 20°C",
        "beverages": ALCOHOLIC_BEVERAGES
    }

@router.get("/contaminants")
def get_contaminant_standards():
    return {
        "title": "Food Safety and Standards (Contaminants, Toxins and Residues) Regulations, 2011",
        "metal_contaminants": CONTAMINANTS_LIMITS,
        "crop_contaminants": [
            {"contaminant": "Aflatoxin Total", "limit": "30 µg/kg", "food": "All foods"},
            {"contaminant": "Aflatoxin M1", "limit": "0.5 µg/kg", "food": "Milk"},
            {"contaminant": "Patulin", "limit": "50 µg/kg", "food": "Apple juice"},
            {"contaminant": "Ochratoxin A", "limit": "20 µg/kg", "food": "Wheat, barley, rye"}
        ],
        "naturally_occurring_toxins": [
            {"substance": "Agaric acid", "limit": "100 ppm"},
            {"substance": "Hydrocyanic acid", "limit": "5 ppm"},
            {"substance": "Hypericine", "limit": "1 ppm"},
            {"substance": "Saffrole", "limit": "10 ppm"}
        ]
    }

@router.get("/fortification")
def get_fortification_standards():
    return {
        "title": "Food Safety and Standards (Fortification of Foods) Regulations, 2018",
        "tagline": "SAMPOORNA POSHAN SWASTHA JEEVAN",
        "logo_color": "Pantone 3005 C & Pantone Black",
        "staples": FORTIFICATION_STAPLES
    }

@router.post("/verify", response_model=ThresholdCheckResponse)
def verify_threshold(req: ThresholdCheckRequest):
    val = req.measured_value
    # Find matching limit
    matched = None
    for item in CONTAMINANTS_LIMITS:
        if req.parameter.lower() in item["metal"].lower() and req.item_name.lower() in item["food"].lower():
            matched = item
            break
    
    if not matched:
        # Default safety threshold
        limit = 1.0
        reg = "FSSAI Baseline Safety Regulation"
    else:
        limit = matched["limit_ppm"]
        reg = matched["reg"]
    
    is_safe = val <= limit
    return ThresholdCheckResponse(
        item_name=req.item_name,
        parameter=req.parameter,
        measured_value=val,
        max_limit=limit,
        unit="ppm / mg/L",
        is_compliant=is_safe,
        status="PASSED (प्रमाणित)" if is_safe else "VIOLATION (मानक उल्लंघन - गैरकानूनी)",
        regulation_reference=reg,
        advisory=f"Measured {val} is within safe ceiling limit of {limit}." if is_safe else f"CRITICAL: Exceeds safe ceiling limit of {limit}. Batch must be seized under FSS Act 2006."
    )
