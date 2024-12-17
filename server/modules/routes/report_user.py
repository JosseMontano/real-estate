from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from typing import List
from modules.core.database import get_db  # Import the get_db dependency
import modules.core.models as models
from pydantic import BaseModel
from modules.core.const import Messages
from modules.core.utils.translate import translate_es_en_pt

app = APIRouter(
    prefix="/api/report_users",
    tags=["Report Users"],
)

# DTO for ReportUser
class ReportUserDTO(BaseModel):
    user_reported_id: int
    reporter_id:int
    reason: str

    class Config:
        orm_mode = True

# Get all report users with the user data
@app.get('/')
async def get_all_reported_users(db: Session = Depends(get_db)):
    query = db.query(models.ReportUser).options(
        joinedload(models.ReportUser.user_reported),
        joinedload(models.ReportUser.reporter),
        joinedload(models.ReportUser.reason)
    )
    reported_users = query.all()
    if not reported_users:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": []}
    return {"status": 200, "message": Messages.DATA_FOUND.dict(), "val": reported_users}

# Report a new user
@app.post('/')
async def report_user(report: ReportUserDTO, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == report.user_reported_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    report_translated = translate_es_en_pt(report.reason)
    new_translate = models.Translate(es=report_translated["valEs"], en=report_translated["valEn"], pt=report_translated["valPt"])
    db.add(new_translate)
    db.commit()
    db.refresh(new_translate)

    new_report = models.ReportUser(
        user_reported_id=report.user_reported_id,
        reporter_id=report.reporter_id,
        reason_id=new_translate.id
    )
    db.add(new_report)
    db.commit()
    db.refresh(new_report)
    return {"status": 201, "message": Messages.DATA_CREATED.dict(), "val": new_report}

# Disable a user
@app.put('/toggle-availability/{user_id}')
async def toggle_user_availability(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Toggle the availability
    user.available = not user.available
    db.commit()
    db.refresh(user)
    
    status_message = "User enabled successfully" if user.available else "User disabled successfully"
    return {"status": 200, "message": status_message, "val": user}