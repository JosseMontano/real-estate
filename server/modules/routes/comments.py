from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from typing import List
from modules.core.database import get_db  # Import the get_db dependency
import modules.core.models as models
from pydantic import BaseModel
from modules.core.const import Messages
from modules.core.utils.translate import translate_es_en_pt
from sqlalchemy import desc

app = APIRouter(
    prefix="/api/comments",
    tags=["Comments"],
)

# Pydantic DTO for Comment
class CommentDTO(BaseModel):
    amount_star: int
    comment_text: str  
    commentator_id: int
    real_estate_id: int

@app.get('/')
async def get_comments(db: Session = Depends(get_db)):
    query = db.query(models.Comment).options(
        joinedload(models.Comment.comment),
        joinedload(models.Comment.commentator),
        joinedload(models.Comment.real_estate)
    )
    comments = query.all()
    if not comments:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": []}
    return {"status": 200, "message": Messages.DATA_FOUND, "val": comments}

@app.get('/{real_estate_id}')
async def get_comments_by_real_estate(real_estate_id: int, db: Session = Depends(get_db)):
    query = db.query(models.Comment).filter(models.Comment.real_estate_id == real_estate_id).options(
        joinedload(models.Comment.comment),
        joinedload(models.Comment.commentator),
        joinedload(models.Comment.real_estate)
    )
    comments = query.all()
    if not comments:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": []}
    return {"status": 200, "message": Messages.DATA_FOUND, "val": comments}

@app.get('/top-comments-by-user/{user_id}')
async def get_top_comments_by_user(user_id: int, db: Session = Depends(get_db)):
    query = (
        db.query(models.Comment)
        .join(models.RealEstate, models.Comment.real_estate_id == models.RealEstate.id)  
        .filter(models.RealEstate.user_id == user_id, models.Comment.active == True)  
        .order_by(desc(models.Comment.amount_star))
        .options(
            joinedload(models.Comment.comment),
            joinedload(models.Comment.commentator),
            joinedload(models.Comment.real_estate)
        )
        .limit(5)  
    )
    comments = query.all()
    if not comments:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": []}
    return {"status": 200, "message": Messages.DATA_FOUND, "val": comments}

@app.get('/statistics/general')
async def get_comment_statistics(db: Session = Depends(get_db)):
    comments = db.query(models.Comment).all()

    val = {
        "total": len(comments),
        "active": len([comment for comment in comments if comment.active]),
        "inactive": len([comment for comment in comments if not comment.active])
    }
    
    if not comments:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": val}
        
    return {"status": 200, "message": Messages.DATA_FOUND, "val": val}


@app.post('/')
async def create_comment(comment: CommentDTO, db: Session = Depends(get_db)):
    try:
        result_comment = translate_es_en_pt(comment.comment_text)
        
        translated_comment = models.Translate(es=result_comment["valEs"], en=result_comment["valEn"], pt=result_comment["valPt"]) 
        db.add(translated_comment)
        db.commit()
        db.refresh(translated_comment)

        new_comment = models.Comment(
            amount_star=comment.amount_star,
            comment_id=translated_comment.id,
            commentator_id=comment.commentator_id,
            real_estate_id=comment.real_estate_id,
            active=True
        )
        db.add(new_comment)
        db.commit()
        db.refresh(new_comment)
        return {"status": 201, "message": Messages.DATA_CREATED, "val": new_comment}
    except Exception as e:
        db.rollback()
        return {"status": 500, "message": str(e), "val": []}


@app.put('/{comment_id}')
async def update_comment(comment_id: int, updated_comment: CommentDTO, db: Session = Depends(get_db)):
    try:
        comment = db.query(models.Comment).filter(models.Comment.id == comment_id).first()
        if not comment:
            return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": []}
        
        
        result_comment = translate_es_en_pt(updated_comment.comment_text)
        
        comment.comment.es = result_comment["valEs"]
        comment.comment.en = result_comment["valEn"]
        comment.comment.pt = result_comment["valPt"]
        comment.active = True

        comment.amount_star = updated_comment.amount_star
        db.commit()
        db.refresh(comment)
        return {"status": 200, "message": Messages.DATA_UPDATED, "val": comment}
    except Exception as e:
        db.rollback()
        return {"status": 500, "message": str(e), "val": []}

@app.delete('/{comment_id}')
async def delete_comment(comment_id: int, db: Session = Depends(get_db)):
    comment = db.query(models.Comment).filter(models.Comment.id == comment_id).first()
    if not comment:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": []}
    
    comment.active = not comment.active
    db.commit()
    db.refresh(comment)
    return {"status": 200, "message": Messages.DATA_DELETED, "val": comment}
