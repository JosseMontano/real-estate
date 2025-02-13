from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session
from typing import Annotated
from fastapi import Depends

#SQLALCHEMY_DATABASE_URL = "postgresql://postgres:admin@localhost:5432/realEstateDB"
SQLALCHEMY_DATABASE_URL = "postgresql://neondb_owner:VqB9zUSica7Q@ep-dry-darkness-a5nfk4if.us-east-2.aws.neon.tech/neondb?sslmode=require"


engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]