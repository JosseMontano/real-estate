from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from modules.core.database import get_db  # Import the get_db dependency
import modules.core.models as models
from pydantic import BaseModel
from typing import List
from modules.core.const import Messages

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
        return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": []}
    return {"status": 200, "message": Messages.DATA_FOUND, "val":  typeRE}
