from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from modules.core.database import get_db  # Import the get_db dependency
import modules.core.models as models
from pydantic import BaseModel
from typing import List

app = APIRouter(
    prefix="/type-real-estates",
    tags=["Type Real Estates"],
)
endpoint="/api/type-real-estates/"
class TypeREResponse(BaseModel):
    id: int
    name: str
    class Config:
        orm_mode = True

@app.get(endpoint)
async def get_question(db: Session = Depends(get_db)):
    typeRE: List[TypeREResponse] = db.query(models.TypeRealEstate).all()
    if not typeRE:
        raise HTTPException(status_code=404, detail="No se encontraron tipos de inmuebles")
    return {"status": "200", "message": "Question found", "val": typeRE}
