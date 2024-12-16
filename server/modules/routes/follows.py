from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session,joinedload
from typing import List
from modules.core.database import get_db  # Import the get_db dependency
import modules.core.models as models
from pydantic import BaseModel
from typing import List
from modules.core.utils.translate import translate_es_en_pt
from modules.core.const import Messages

app = APIRouter(
    prefix="/api/follows",
    tags=["Follows"],
)

class FollowDTO(BaseModel): 
    user_id: int
    user_followed_id: int

@app.post('/')
async def follow(follow: FollowDTO, db: Session = Depends(get_db)):
    
    db_follow = models.Follow(
        user_id=follow.user_id,
        user_followed_id=follow.user_followed_id
    )
    db.add(db_follow)
    db.commit()
    db.refresh(db_follow)
    return {"status": 201, "message": Messages.DATA_CREATED.dict(), "val": db_follow}

@app.delete('/{follow_id}')
async def delete_follow(follow_id: int, db: Session = Depends(get_db)):
    follow = db.query(models.Follow).filter(models.Follow.id == follow_id).first()
    if follow is None:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": []}
    auxFollow=follow
    db.delete(follow)
    db.commit()
    
    return {"status": 200, "message": Messages.DATA_DELETED, "val": auxFollow}
