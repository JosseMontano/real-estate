from modules.core.database import Base
#libraries
from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey, Float


class Translate(Base):
    __tablename__ = 'translates'

    id = Column(Integer, primary_key=True, index=True)
    es = Column(String)
    en = Column(String)
    pt = Column(String)

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    available = Column(Boolean, default=True)
    password = Column(String)
    cellphone = Column(String, index=True)
    code_recuperation = Column(String)
    email = Column(String, unique=True, index=True)
    qualification = Column(Integer)
    role = Column(String)
    username = Column(String, index=True)
    photo= Column(String)

    # relationships if needed
    comments = relationship("Comment", back_populates="commentator")
    real_estates = relationship("RealEstate", back_populates="user")
    favorites = relationship("FavoriteRealEstate", back_populates="user")
    followers = relationship(
            "Follow",
            foreign_keys="[Follow.user_followed_id]",
            back_populates="user_followed",
    )
    following = relationship(
            "Follow",
            foreign_keys="[Follow.user_id]",
            back_populates="user",
    )

class TypeRealEstate(Base):
    __tablename__ = 'type_real_estates'

    id = Column(Integer, primary_key=True, index=True)
    name_id = Column(Integer, ForeignKey('translates.id'))
    active = Column(Boolean, default=True)
    
    name = relationship("Translate", foreign_keys=[name_id])
    # relationships
    real_estates = relationship("RealEstate", back_populates="type_real_estate")
    
class Zone(Base):
    __tablename__ = 'zones'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    active = Column(Boolean, default=True)

    # relationships
    real_estates = relationship("RealEstate", back_populates="zone")

class RealEstate(Base):
    __tablename__ = 'real_estates'

    id = Column(Integer, primary_key=True, index=True)
    address = Column(String)
    amount_bathroom = Column(Integer)
    amount_bedroom = Column(Integer)
    available = Column(Boolean, default=True)
    active = Column(Boolean, default=True)
    taken= Column(Boolean, default=False)
    lat_long = Column(String)  # Assuming this is a string, or could use Geography for lat/long in PostGIS
    price = Column(Float)
    square_meter = Column(Float)
    type_real_estate_id = Column(Integer, ForeignKey('type_real_estates.id'))
    title_id = Column(Integer, ForeignKey('translates.id'))
    description_id = Column(Integer, ForeignKey('translates.id'))
    
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship("User", back_populates="real_estates")
    
    zone_id = Column(Integer, ForeignKey('zones.id'))
    zone = relationship("Zone", back_populates="real_estates")
    
    title = relationship("Translate", foreign_keys=[title_id])
    description = relationship("Translate", foreign_keys=[description_id])
    
    # relationships
    type_real_estate = relationship("TypeRealEstate", back_populates="real_estates")
    comments = relationship("Comment", back_populates="real_estate")
    favorites = relationship("FavoriteRealEstate", back_populates="real_estate")
    photos = relationship("PhotosRealEstate", back_populates="real_estate")
    responses = relationship("Response", back_populates="real_estate")
    

class FavoriteRealEstate(Base):
    __tablename__ = 'favorite_real_estates'

    id = Column(Integer, primary_key=True, index=True)
    real_estate_id = Column(Integer, ForeignKey('real_estates.id'))
    user_id = Column(Integer, ForeignKey('users.id'))

    # relationships
    real_estate = relationship("RealEstate", back_populates="favorites")
    user = relationship("User", back_populates="favorites")

class PhotosRealEstate(Base):
    __tablename__ = 'photos_real_estates'

    id = Column(Integer, primary_key=True, index=True)
    image = Column(String)
    real_estate_id = Column(Integer, ForeignKey('real_estates.id'))

    # relationships
    real_estate = relationship("RealEstate", back_populates="photos")

class Question(Base):
    __tablename__ = 'questions'

    id = Column(Integer, primary_key=True, index=True)
    question_id = Column(Integer, ForeignKey('translates.id'))
    active = Column(Boolean, default=True)
    
    question = relationship("Translate", foreign_keys=[question_id])
    
    responses = relationship("Response", back_populates="question")

class Response(Base):
    __tablename__ = 'responses'

    id = Column(Integer, primary_key=True, index=True)
    question_id = Column(Integer, ForeignKey('questions.id'))
    real_estate_id = Column(Integer, ForeignKey('real_estates.id'))
    response_id = Column(Integer, ForeignKey('translates.id'))
    active = Column(Boolean, default=True)
    
    response = relationship("Translate", foreign_keys=[response_id])

    question = relationship("Question", back_populates="responses")
    real_estate = relationship("RealEstate", back_populates="responses")

class Comment(Base):
    __tablename__ = 'comments'

    id = Column(Integer, primary_key=True, index=True)
    amount_star = Column(Integer)
    comment_id = Column(Integer, ForeignKey('translates.id'))
    commentator_id = Column(Integer, ForeignKey('users.id'))
    real_estate_id = Column(Integer, ForeignKey('real_estates.id'))
    active = Column(Boolean, default=True)

    comment = relationship("Translate", foreign_keys=[comment_id])


    commentator = relationship("User", back_populates="comments")
    real_estate = relationship("RealEstate", back_populates="comments")

class Follow(Base):
    __tablename__ = "follows"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    user_followed_id = Column(Integer, ForeignKey("users.id"))

    # Relationships
    user = relationship(
        "User",
        foreign_keys=[user_id],
        back_populates="following",
    )
    user_followed = relationship(
        "User",
        foreign_keys=[user_followed_id],
        back_populates="followers",
    )