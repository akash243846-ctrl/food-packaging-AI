import uuid
import csv
import io
from fastapi import APIRouter, Depends, HTTPException, Query, Response
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from database import get_db
from models import ScanHistory, FarmerRecord
from schemas import (
    ScanRecordCreate,
    ScanRecordResponse,
    FarmerRecordCreate,
    FarmerRecordResponse
)

router = APIRouter(prefix="/api/v1", tags=["Data Storage & Scan History"])

# ─── SCAN HISTORY ENDPOINTS ──────────────────────────────────────────────────

@router.post("/scans", response_model=ScanRecordResponse, status_code=201)
def save_scan(payload: ScanRecordCreate, db: Session = Depends(get_db)):
    """Save a new camera crop detection scan to the database."""
    scan_id = f"scan-{uuid.uuid4().hex[:8]}"
    record = ScanHistory(
        id=scan_id,
        crop_name=payload.crop_name,
        hindi_name=payload.hindi_name,
        category=payload.category,
        confidence=payload.confidence,
        detector=payload.detector or "YOLOv8n-ONNX",
        recommended_material=payload.recommended_material,
        storage_temp=payload.storage_temp,
        shelf_life=payload.shelf_life,
        map_gas=payload.map_gas,
        hindi_speech=payload.hindi_speech,
        notes=payload.notes
    )
    db.add(record)
    db.commit()
    db.refresh(record)

    return ScanRecordResponse(
        id=record.id,
        crop_name=record.crop_name,
        hindi_name=record.hindi_name,
        category=record.category,
        confidence=record.confidence,
        detector=record.detector,
        recommended_material=record.recommended_material,
        storage_temp=record.storage_temp,
        shelf_life=record.shelf_life,
        map_gas=record.map_gas,
        hindi_speech=record.hindi_speech,
        notes=record.notes,
        created_at=record.created_at.isoformat() if record.created_at else None
    )

@router.get("/scans", response_model=List[ScanRecordResponse])
def get_scans(
    category: Optional[str] = None,
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db)
):
    """Retrieve saved crop scans sorted by latest first."""
    query = db.query(ScanHistory)
    if category and category.lower() != 'all':
        query = query.filter(ScanHistory.category.ilike(f"%{category}%"))
    
    records = query.order_by(ScanHistory.created_at.desc()).limit(limit).all()

    return [
        ScanRecordResponse(
            id=r.id,
            crop_name=r.crop_name,
            hindi_name=r.hindi_name,
            category=r.category,
            confidence=r.confidence,
            detector=r.detector,
            recommended_material=r.recommended_material,
            storage_temp=r.storage_temp,
            shelf_life=r.shelf_life,
            map_gas=r.map_gas,
            hindi_speech=r.hindi_speech,
            notes=r.notes,
            created_at=r.created_at.isoformat() if r.created_at else None
        )
        for r in records
    ]

@router.delete("/scans/{scan_id}")
def delete_scan(scan_id: str, db: Session = Depends(get_db)):
    """Delete a specific scan record by ID."""
    record = db.query(ScanHistory).filter(ScanHistory.id == scan_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Scan record not found")
    db.delete(record)
    db.commit()
    return {"status": "success", "message": f"Scan {scan_id} deleted successfully"}

@router.delete("/scans")
def clear_scans(db: Session = Depends(get_db)):
    """Clear all saved scan history records."""
    db.query(ScanHistory).delete()
    db.commit()
    return {"status": "success", "message": "All scan history cleared"}

# ─── FARMER BATCH RECORDS ────────────────────────────────────────────────────

@router.post("/farmer-records", response_model=FarmerRecordResponse, status_code=201)
def save_farmer_record(payload: FarmerRecordCreate, db: Session = Depends(get_db)):
    """Save a farmer crop packaging batch record."""
    rec_id = f"frm-{uuid.uuid4().hex[:8]}"
    record = FarmerRecord(
        id=rec_id,
        farmer_name=payload.farmer_name or "Kisan Bhai",
        crop_name=payload.crop_name,
        hindi_name=payload.hindi_name,
        quantity_kg=payload.quantity_kg or 100.0,
        current_loss_pct=payload.current_loss_pct or 20.0,
        recommended_package=payload.recommended_package,
        storage_temp=payload.storage_temp,
        projected_savings_inr=payload.projected_savings_inr or 0.0,
        notes=payload.notes
    )
    db.add(record)
    db.commit()
    db.refresh(record)

    return FarmerRecordResponse(
        id=record.id,
        farmer_name=record.farmer_name,
        crop_name=record.crop_name,
        hindi_name=record.hindi_name,
        quantity_kg=record.quantity_kg,
        current_loss_pct=record.current_loss_pct,
        recommended_package=record.recommended_package,
        storage_temp=record.storage_temp,
        projected_savings_inr=record.projected_savings_inr,
        notes=record.notes,
        created_at=record.created_at.isoformat() if record.created_at else None
    )

@router.get("/farmer-records", response_model=List[FarmerRecordResponse])
def get_farmer_records(limit: int = 50, db: Session = Depends(get_db)):
    """Retrieve saved farmer batch records."""
    records = db.query(FarmerRecord).order_by(FarmerRecord.created_at.desc()).limit(limit).all()
    return [
        FarmerRecordResponse(
            id=r.id,
            farmer_name=r.farmer_name,
            crop_name=r.crop_name,
            hindi_name=r.hindi_name,
            quantity_kg=r.quantity_kg,
            current_loss_pct=r.current_loss_pct,
            recommended_package=r.recommended_package,
            storage_temp=r.storage_temp,
            projected_savings_inr=r.projected_savings_inr,
            notes=r.notes,
            created_at=r.created_at.isoformat() if r.created_at else None
        )
        for r in records
    ]

# ─── EXPORT DATA ENDPOINTS ───────────────────────────────────────────────────

@router.get("/history/export/csv")
def export_scans_csv(db: Session = Depends(get_db)):
    """Export all scan history as downloadable CSV."""
    records = db.query(ScanHistory).order_by(ScanHistory.created_at.desc()).all()
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow([
        "Scan ID", "Crop Name", "Hindi Name", "Category", "Confidence (%)",
        "Detector", "Recommended Packaging", "Storage Temp", "Shelf Life", "MAP Gas", "Date"
    ])
    for r in records:
        writer.writerow([
            r.id, r.crop_name, r.hindi_name, r.category, r.confidence,
            r.detector, r.recommended_material, r.storage_temp, r.shelf_life, r.map_gas,
            r.created_at.strftime("%Y-%m-%d %H:%M:%S") if r.created_at else ""
        ])

    csv_data = output.getvalue()
    return Response(
        content=csv_data,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=packsmart_scan_history.csv"}
    )
