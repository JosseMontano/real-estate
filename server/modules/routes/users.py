from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from modules.core.database import get_db 
import modules.core.models as models
from modules.core.const import AuthMsg,Messages
import bcrypt
from email.message import EmailMessage
import ssl
import smtplib
import os
import random

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
    password: str
    confirmPassword: str

class NearbyPlacesRequest(BaseModel):
    location: str
    
class EmailRequestDTO(BaseModel):
    email_receiver: str

class ChangePassDTO(BaseModel):
    email: str
    password: str
    confirmPassword: str
    code: int
    

@app.post('/signup')
async def sign_up(user: signUpDTO, db: Session = Depends(get_db)):
    try:
        if user.password != user.confirmPassword:
            return {"status": 400, "message": AuthMsg.PASSWORD_NOT_MATCH, "val": []}
   
        found_user = db.query(models.User).filter(models.User.email == user.email).first()
            
        if found_user:      
            if not bcrypt.checkpw(user.password.encode('utf-8'), found_user.password.encode('utf-8')):
                return {"status": 400, "message": AuthMsg.PASSWORD_WRONG, "val": []}
        
            return {"status": 200, "message": AuthMsg.USER_EXIST, "val": found_user}
   
        hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())

        
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
        # Save RealEstate entry
        db.add(db_user)
        db.commit()
        db.refresh(db_user)

        return {"status": 201, "message": AuthMsg.USER_CREATED, "val": db_user}
    except Exception as e:
        db.rollback()
        return {"status": 500, "message": str(e), "val": []}


@app.post('/forgot_password')
def forgot_password(request: EmailRequestDTO, db: Session = Depends(get_db)):

    email_receiver = request.email_receiver
    user = db.query(models.User).filter(models.User.email == email_receiver).first()
    if user is None:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": []}
    
    random_number = random.randint(100000, 999999)
    
 
    em = EmailMessage()
    em["From"] = EMAIL_SENDER
    em["To"] = email_receiver
    em["Subject"] = "Recuperar contraseña"
    em.set_content("No olvides tu contraseña la proxima 😉, entra a este link para recuperarla: "+WEB_URL+"reset_password/"+str(random_number)+"/"+email_receiver )

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(EMAIL_SENDER, PASSWORD_EMAIL)
        server.sendmail(EMAIL_SENDER, email_receiver, em.as_string())
        


    user.code_recuperation = random_number
    db.commit()
    db.refresh(user)
    
    return {"status": 200, "message": "Email sent successfully", "val": {}}

@app.post('/change_password')
def change_password(request: ChangePassDTO, db: Session = Depends(get_db)):
    try:
        if request.password != request.confirmPassword:
            return {"status": 400, "message": AuthMsg.PASSWORD_NOT_MATCH, "val": []}
        
        found_user = db.query(models.User).filter(models.User.email == request.email).first()
        
        if not found_user:
            return {"status": 400, "message": AuthMsg.USER_NOT_EXIST, "val": []}
        print(found_user.code_recuperation, request.code)
        if int(found_user.code_recuperation )!= int(request.code):
            return {"status": 400, "message": AuthMsg.CODE_NOT_MATCH, "val": []}
        
        hashed_password = bcrypt.hashpw(request.password.encode('utf-8'), bcrypt.gensalt())
        found_user.password = hashed_password.decode('utf-8')
        db.commit()
        return {"status": 200, "message": AuthMsg.DATA_UPDATED, "val": found_user}
    except Exception as e:
        db.rollback()
        return {"status": 500, "message": str(e), "val": []}

