from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from modules.core.database import get_db  # Import the get_db dependency
import modules.core.models as models
from modules.core.utils.translate import translate_es_en_pt

app = APIRouter(
    prefix="/comments",
    tags=["Comments"],
)

# Request model para crear y actualizar un comentario
class CommentDTO(BaseModel):
    amount_star: int
    comment: str
    commentator_id: int
    real_estate_id: int

# Response model para el comentario
class CommentResponse(BaseModel):
    id: int
    amount_star: int
    commentEs: str
    commentEn: str
    commentPt: str
    commentator_id: int
    real_estate_id: int

    class Config:
        orm_mode = True
        
endpoint="/api/comments/"

@app.get(endpoint, response_model=List[CommentResponse])
async def get_comments(db: Session = Depends(get_db)):
    comments = db.query(models.Comment).all()
    if not comments:
        raise HTTPException(status_code=404, detail="No comments found")
    return {"status": "200", "message": "Comments retrieved successfully", "val": comments}


@app.post(endpoint)
async def create_comment(comment: CommentDTO, db: Session = Depends(get_db)):
    # Obtener traducciones para el comentario
    resultComment = translate_es_en_pt(comment.comment)

    # Crear el diccionario de datos del comentario y eliminar el campo `comment`
    comment_data = comment.dict()
    comment_data.pop("comment", None)

    # Crear instancia de Comment con los campos válidos
    db_comment = models.Comment(**{k: v for k, v in comment_data.items() if hasattr(models.Comment, k)})

    # Asignar los valores traducidos
    db_comment.commentEs = resultComment["valEs"]
    db_comment.commentEn = resultComment["valEn"]
    db_comment.commentPt = resultComment["valPt"]

    # Guardar en la base de datos
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return {"status": "201", "message": "Comment created successfully", "val": db_comment}


@app.delete(endpoint+'{comment_id}')
async def delete_comment(comment_id: int, db: Session = Depends(get_db)):
    comment = db.query(models.Comment).filter(models.Comment.id == comment_id).first()
    if comment is None:
        raise HTTPException(status_code=404, detail="Comment not found")
    db.delete(comment)
    db.commit()
    return {"status": "200", "message": "Comment deleted successfully", "val": comment}


@app.put(endpoint+'{comment_id}')
async def update_comment(comment_id: int, updated_comment: CommentDTO, db: Session = Depends(get_db)):
    comment = db.query(models.Comment).filter(models.Comment.id == comment_id).first()
    if comment is None:
        raise HTTPException(status_code=404, detail="Comment not found")

    # Actualizar los campos del comentario
    for key, value in updated_comment.dict().items():
        setattr(comment, key, value)

    db.commit()
    db.refresh(comment)
    return {"status": "200", "message": "Comment updated successfully", "val": comment}
