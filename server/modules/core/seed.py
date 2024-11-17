from modules.core.models import User, TypeRealEstate, Translate 
from sqlalchemy.orm import Session
from modules.core.utils.translate import translate_es_en_pt
import bcrypt

async def seed_users(db: Session):
    user = User(
            email="eljosema505@gmail.com",
            password=bcrypt.hashpw("123456".encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
            available=True,
            cellphone=0,
            code_recuperation="",
            qualification=0,
            role=2,
            username="eljosema505"
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


async def seed_types_real_estates(db: Session):
    result_name = translate_es_en_pt("Casa")
    print(result_name)
    name_translate = Translate(
        es=result_name['valEs'],
        en=result_name['valEn'],
        pt=result_name['valPt']
    )
    db.add(name_translate)
    db.commit()
    db.refresh(name_translate)
    
    type_real_estate = TypeRealEstate(
        name_id=name_translate.id,
        active=True
    )
    db.add(type_real_estate)
    db.commit()
    db.refresh(type_real_estate)
    
    result_name = translate_es_en_pt("Apartamento")
    
    name_translate = Translate(
        es=result_name['valEs'],
        en=result_name['valEn'],
        pt=result_name['valPt']
    )
    db.add(name_translate)
    db.commit()
    db.refresh(name_translate)
    
    type_real_estate = TypeRealEstate(
        name_id=name_translate.id,
        active=True
    )
    db.add(type_real_estate)
    db.commit()
    db.refresh(type_real_estate)
    
    result_name = translate_es_en_pt("Terreno")
    
    name_translate = Translate(
        es=result_name['valEs'],
        en=result_name['valEn'],
        pt=result_name['valPt']
    )
    db.add(name_translate)
    db.commit()
    db.refresh(name_translate)
    
    type_real_estate = TypeRealEstate(
        name_id=name_translate.id,
        active=True
    )
    db.add(type_real_estate)
    db.commit()
    db.refresh(type_real_estate)
    
    result_name = translate_es_en_pt("Local Comercial")
    
    name_translate = Translate(
        es=result_name['valEs'],
        en=result_name['valEn'],
        pt=result_name['valPt']
    )
    db.add(name_translate)
    db.commit()
    db.refresh(name_translate)
    
    type_real_estate = TypeRealEstate(
        name_id=name_translate.id,
        active=True
    )
    db.add(type_real_estate)
    db.commit()
    db.refresh(type_real_estate)
    
    result_name = translate_es_en_pt("Oficina")
    
    name_translate = Translate(
        es=result_name['valEs'],
        en=result_name['valEn'],
        pt=result_name['valPt']
    )
    db.add(name_translate)
    db.commit()
    db.refresh(name_translate)
    
    type_real_estate = TypeRealEstate(
        name_id=name_translate.id,
        active=True
    )
    db.add(type_real_estate)
    db.commit()
    db.refresh(type_real_estate)
    
    
    
    
    
    