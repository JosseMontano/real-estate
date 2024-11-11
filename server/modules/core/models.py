from modules.core.database import Base
#libraries
from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey, Float

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    available = Column(Boolean, default=True)
    cellphone = Column(String, unique=True, index=True)
    code_recuperation = Column(String)
    email = Column(String, unique=True, index=True)
    qualification = Column(Integer)
    role = Column(String)
    username = Column(String, unique=True, index=True)

    # relationships if needed
    comments = relationship("Comment", back_populates="commentator")

class TypeRealEstate(Base):
    __tablename__ = 'type_real_estates'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)

    # relationships
    real_estates = relationship("RealEstate", back_populates="type_real_estate")


class RealEstate(Base):
    __tablename__ = 'real_estates'

    id = Column(Integer, primary_key=True, index=True)
    address = Column(String)
    amount_bathroom = Column(Integer)
    amount_bedroom = Column(Integer)
    available = Column(Boolean, default=True)
    description = Column(String)
    image = Column(String)
    lat_long = Column(String)  # Assuming this is a string, or could use Geography for lat/long in PostGIS
    price = Column(Float)
    square_meter = Column(Float)
    title = Column(String)
    type_real_estate_id = Column(Integer, ForeignKey('type_real_estates.id'))

    # relationships
    type_real_estate = relationship("TypeRealEstate", back_populates="real_estates")
    comments = relationship("Comment", back_populates="real_estate")

class Question(Base):
    __tablename__ = 'questions'

    id = Column(Integer, primary_key=True, index=True)
    questionEs = Column(String)
    questionEn = Column(String)
    questionPt = Column(String)
class Comment(Base):
    __tablename__ = 'comments'

    id = Column(Integer, primary_key=True, index=True)
    amount_star = Column(Integer)
    comment = Column(String)
    commentator_id = Column(Integer, ForeignKey('users.id'))
    real_estate_id = Column(Integer, ForeignKey('real_estates.id'))

    # relationships
    commentator = relationship("User", back_populates="comments")
    real_estate = relationship("RealEstate", back_populates="comments")
