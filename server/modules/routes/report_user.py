from fastapi import APIRouter, Depends, HTTPException,Query
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

@app.get("/filter/{reporter_id}")
async def get_reported_users_by_reporter(
    reporter_id: int,
    db: Session = Depends(get_db)
):
    query = db.query(models.ReportUser).options(
        joinedload(models.ReportUser.user_reported),
        joinedload(models.ReportUser.reporter),
        joinedload(models.ReportUser.reason)
    )

    # Apply filter by reporter's email if provided
    if reporter_id:
        query = query.filter(models.ReportUser.reporter.has(id=reporter_id))
    
    reported_users = query.all()

    if not reported_users:
        return {"status": 404, "message": "No data found", "val": []}

    # Flatten results
    response = [
        {
            "id": user.id,
            "user_reported_email": user.user_reported.email if user.user_reported else None,
            "user_reported_cellphone": user.user_reported.cellphone if user.user_reported else None,
            "reporter_email": user.reporter.email if user.reporter else None,
            "reporter_cellphone": user.reporter.cellphone if user.reporter else None,
            "reason": user.reason if user.reason else None,
        }
        for user in reported_users
    ]
    return response

# Get all report users with the user data
@app.get("/")
async def get_all_reported_users(db: Session = Depends(get_db)):
    query = db.query(models.ReportUser).options(
        joinedload(models.ReportUser.user_reported),
        joinedload(models.ReportUser.reporter),
        joinedload(models.ReportUser.reason)
    )
    
    reported_users = query.all()
    
    if not reported_users:
        return {"status": 404, "message": "No data found", "val": []}
    
    # Flatten results into a list of dictionaries
    response = [
        {
            "id": user.id,
            "user_reported_email": user.user_reported.email if user.user_reported else None,
            "user_reported_cellphone": user.user_reported.cellphone if user.user_reported else None,
            "reporter_email": user.reporter.email if user.reporter else None,
            "reporter_cellphone": user.reporter.cellphone if user.reporter.cellphone else None,
            "reason": user.reason if user.reason else None,
        }
        for user in reported_users
    ]
    return {"status": 200, "message": Messages.DATA_FOUND.dict(), "val":  response}

@app.get('/statistics/general')
async def get_statistics(db: Session = Depends(get_db)):
    reports = db.query(models.ReportUser).all()
    
    val={
        "total": len(reports),
        "active": len([val for val in reports if val.active]),
        "inactive": len([val for val in reports if not val.active])
    }
    
    if not reports:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND.dict(), "val": {
            "total": 0,
            "active": 0,
            "inactive": 0
        }}
        
    return {"status": 200, "message": Messages.DATA_FOUND.dict(), "val": val }


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
@app.delete('/toggle-report/{report_id}')
async def toggle_report_status(report_id: int, db: Session = Depends(get_db)):
    # Obtener el reporte por su ID
    report = db.query(models.ReportUser).filter(models.ReportUser.id == report_id).first()
    
    # Verificar si el reporte existe
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    # Obtener el usuario reportado y cambiar su estado (activar o desactivar)
    user_reported = db.query(models.User).filter(models.User.id == report.user_reported_id).first()
    
    # Verificar si el usuario reportado existe
    if not user_reported:
        raise HTTPException(status_code=404, detail="User reported not found")

    # Cambiar el estado del reporte (activar o desactivar)
    report.active = not report.active
    db.commit()
    db.refresh(report)
    
    # Cambiar el estado del usuario reportado si es necesario (si es por algún tipo de reporte)
    user_reported.available = not user_reported.available
    db.commit()
    db.refresh(user_reported)
    
    # Preparar el mensaje de éxito dependiendo del nuevo estado
    status_message = "Report enabled successfully" if report.active else "Report disabled successfully"
    user_status_message = "User enabled successfully" if user_reported.available else "User disabled successfully"
    
    # Retornar la respuesta
    return {
        "status": 200,
        "message": {"report_status": status_message, "user_status": user_status_message},
        "val": {
            "report": report,
            "user_reported": user_reported
        }
    }