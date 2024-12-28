from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, joinedload
from pydantic import BaseModel
from modules.core.database import get_db 
import modules.core.models as models
from modules.core.const import AuthMsg,Messages,TranslateResponse
from typing import Optional
import bcrypt
from email.message import EmailMessage
import ssl
import smtplib
import os
import random
from sqlalchemy.orm import joinedload
from fastapi import HTTPException

PASSWORD_EMAIL=os.getenv('PASSWORD_EMAIL')
EMAIL_SENDER=os.getenv('EMAIL_SENDER')
WEB_URL = os.getenv('WEB_URL')
app = APIRouter(
    prefix="/api/auth",
    tags=["Auth"],
)

# Request model for creating and updating RealEstate
class signUpDTO(BaseModel):
    email: str
    #password: str

class NearbyPlacesRequest(BaseModel):
    location: str
    
class EmailRequestDTO(BaseModel):
    email_receiver: str

class ChangePassDTO(BaseModel):
    email: str
    password: str
    code: int
    
class UpdateUserDTO(BaseModel):
    username: Optional[str] = None
    cellphone: Optional[int] = None
    photo: Optional[str] = None
    


@app.post('/signup')
async def sign_up(user: signUpDTO, db: Session = Depends(get_db)):
    try:

        # Check if user already exists
        found_user = (
            db.query(models.User)
            .options(joinedload(models.User.following), joinedload(models.User.favorites).joinedload(models.FavoriteRealEstate.real_estate))
            .filter(models.User.email == user.email)
            .first()
        )
        
        if found_user.available == False:
            return {"status": 400, "message": AuthMsg.USER_NOT_AVAILABLE.dict(), "val": []}
        
        if found_user:      
            """  if not bcrypt.checkpw(user.password.encode('utf-8'), found_user.password.encode('utf-8')):
                return {"status": 400, "message": AuthMsg.PASSWORD_WRONG.dict(), "val": []} """
        
            # Prepare user data with favorites
            user_data = {
                "id": found_user.id,
                "email": found_user.email,
                "role":found_user.role,
                "photo":found_user.photo,
                "favorites": [
                    {
                        "id": favorite.id,
                        "real_estate": {
                            "id": favorite.real_estate.id,
                            "address": favorite.real_estate.address,
                            "price": favorite.real_estate.price,
                            "available": favorite.real_estate.available,
                        } if favorite.real_estate else None,
                    }
                    for favorite in found_user.favorites
                ],
            }
            return {"status": 200, "message": AuthMsg.USER_EXIST.dict(), "val": user_data}
        
        # Hash the password
        hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())

        # Create new user
        db_user = models.User(
            email=user.email,
            password=hashed_password.decode('utf-8'),
            available=True,
            cellphone=0,
            code_recuperation="",
            qualification=0,
            photo="",
            role=2,
            username="1234"
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)

        # Return the new user without favorites (empty initially)
        user_data = {
            "id": db_user.id,
            "email": db_user.email,
            "favorites": [],
        }
        return {"status": 201, "message": AuthMsg.USER_CREATED.dict(), "val": user_data}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


@app.post('/forgot_password')
def forgot_password(request: EmailRequestDTO, db: Session = Depends(get_db)):

    email_receiver = request.email_receiver
    user = db.query(models.User).filter(models.User.email == email_receiver).first()
    if user is None:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND.dict(), "val": []}
    
    random_number = random.randint(100000, 999999)
    
    em = EmailMessage()
    em["From"] = EMAIL_SENDER
    em["To"] = email_receiver
    em["Subject"] = "Recuperar contraseña"
    em.set_content("No olvides tu contraseña la próxima 😉, entra a este link para recuperarla: "
                   + WEB_URL + "reset_password/" + str(random_number) + "/" + email_receiver)

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(EMAIL_SENDER, PASSWORD_EMAIL)
        server.sendmail(EMAIL_SENDER, email_receiver, em.as_string())
        
    user.code_recuperation = random_number
    db.commit()
    db.refresh(user)
    
    return {"status": 200, "message": TranslateResponse(es="Correo enviado con éxito", 
                                                        en="Email sent successfully", 
                                                        pt="Email enviado com sucesso").dict(), 
            "val": {}}


@app.post('/change_password')
def change_password(request: ChangePassDTO, db: Session = Depends(get_db)):
    try:

        found_user = db.query(models.User).filter(models.User.email == request.email).first()
        
        if not found_user:
            return {"status": 400, "message": Messages.DATA_NOT_FOUND.dict(), "val": []}
        
        if int(found_user.code_recuperation) != int(request.code):
            return {"status": 400, "message": AuthMsg.CODE_NOT_MATCH.dict(), "val": []}
        
        hashed_password = bcrypt.hashpw(request.password.encode('utf-8'), bcrypt.gensalt())
        found_user.password = hashed_password.decode('utf-8')
        db.commit()
        db.refresh(found_user)
        return {"status": 200, "message": Messages.DATA_UPDATED.dict(), "val": found_user}
    except Exception as e:
        db.rollback()
        return {"status": 500, "message": Messages.SERVER_ERROR.dict(), "val": []}


@app.put('/edit_profile/{email}')
def edit_profile(email: str, request: UpdateUserDTO, db: Session = Depends(get_db)):
    try:
        found_user = db.query(models.User).filter(models.User.email == email).first()
        
        if not found_user:
            return {"status": 400, "message": Messages.DATA_NOT_FOUND.dict(), "val": []}
        
        if request.cellphone:
            found_user.cellphone = request.cellphone
        if request.username:
            found_user.username = request.username
        if request.photo:
            found_user.photo = request.photo

        # Commit the changes to the database
        db.commit()
        db.refresh(found_user)
        
        return {"status": 200, "message": Messages.DATA_UPDATED.dict(), "val": found_user}
    except Exception as e:
        db.rollback()
        return {"status": 500, "message": Messages.SERVER_ERROR.dict(), "val": []}

@app.get('/user/{user_id}')
async def get_user(user_id:int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user:
        return {"status": 200, "message": Messages.DATA_FOUND.dict(), "val": user}
    else:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND.dict(), "val": []}