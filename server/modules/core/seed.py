from modules.core.models import User, Question, TypeRealEstate, Translate, RealEstate , PhotosRealEstate,Zone
from sqlalchemy.orm import Session
from modules.core.utils.translate import translate_es_en_pt
import bcrypt
from geopy.geocoders import Nominatim

async def seed_users(db: Session):
    user = User(
            email="admin@gmail.com",
            password=bcrypt.hashpw("123456".encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
            available=True,
            cellphone=0,
            code_recuperation="",
            qualification=0,
            role=1,
            username="eljosema505",
            photo="https://firebasestorage.googleapis.com/v0/b/new-realestate-f4127.appspot.com/o/users%2Fadmin%40gmail.com%2Fadmin.jpg?alt=media&token=8ce3a025-1d5a-4588-af3e-2406be52bfa9"
    )
    db.add(user)

    user= User(
        email="isabel@gmail.com",
        password=bcrypt.hashpw("123456".encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
        available=True,
        cellphone=0,
        code_recuperation="",
        qualification=0,
        role=2,
        username="isabel6",
        photo="https://firebasestorage.googleapis.com/v0/b/new-realestate-f4127.appspot.com/o/users%2Fisabel%40gmail.com%2Fisa.jpg?alt=media&token=5a507129-ba8b-4795-8fa5-ad1c3cf294f7"
    )
    db.add(user)
    
    user= User(
        email="alejandra@gmail.com",
        password=bcrypt.hashpw("123456".encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
        available=True,
        cellphone=0,
        code_recuperation="",
        qualification=0,
        role=2,
        username="alejandra12",
        photo="https://firebasestorage.googleapis.com/v0/b/new-realestate-f4127.appspot.com/o/users%2Falejandra%40gmail.com%2Falejandra.jpg?alt=media&token=3f33f82b-f2f8-47ba-b2c7-b66436b864fd"
    )
    
    db.add(user)
    
    user= User(
        email="enrique@gmail.com",
        password=bcrypt.hashpw("123456".encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
        available=True,
        cellphone=0,
        code_recuperation="",
        qualification=0,
        role=2,
        username="enrique8",
        photo="https://firebasestorage.googleapis.com/v0/b/new-realestate-f4127.appspot.com/o/users%2Fenrique%40gmail.com%2Fenrique.jpg?alt=media&token=d2020338-3b81-4f2f-9c85-90a478e9789f"
    )
    db.add(user)
    db.commit()
    db.refresh(user)

async def seed_questions(db: Session):
    questions = [
        "¿Cuál es el precio de la propiedad?",
        "¿Cuál es el área de la propiedad?",
        "¿Cuántos baños tiene la propiedad?",
        "¿Cuántas habitaciones tiene la propiedad?",
        "¿Cuál es la dirección de la propiedad?",
        "¿Se aceptan mascotas?"
    ]
    
    for question_text in questions:
        # Traduce la pregunta a múltiples idiomas
        result_translate = translate_es_en_pt(question_text)
        translation = Translate(
            es=result_translate['valEs'],
            en=result_translate['valEn'],
            pt=result_translate['valPt']
        )
        db.add(translation)
        db.commit()
        db.refresh(translation)
        
        # Crea la pregunta vinculándola a la traducción
        question = Question(
            question_id=translation.id,
            active=True
        )
        db.add(question)
        db.commit()
        db.refresh(question)
    
async def seed_types_real_estates(db: Session):
    result_name = translate_es_en_pt("Casa")
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
    
async def seed_real_estates(db: Session):
    real_estates_data = [
        {
            "title": "Hermosa casa moderna",
            "description": "Casa amplia con acabados de lujo, ideal para familias.",
            "lat_long": "-17.37245691304283, -66.15988392731477",
            "price": 350000,
            "square_meter": 250.5,
            "amount_bathroom": 3,
            "amount_bedroom": 4,
            "type_real_estate_id": 1,
            "user_id": 2,
            "image_url":["https://firebasestorage.googleapis.com/v0/b/new-realestate-f4127.appspot.com/o/realEstates%2Feljosema505%2Fimg2.jpg-c119bfc2-e00a-42b3-852a-d927712a3292?alt=media&token=a41af7f4-3dea-4a57-9743-5266d87f6d4d", "https://firebasestorage.googleapis.com/v0/b/new-realestate-f4127.appspot.com/o/realEstates%2Feljosema505%2Fimage.png-af37eed9-2fab-4764-8ab8-9e5805ddee34?alt=media&token=cc1d4428-6c90-45d5-8e07-1a0ddf488017", "https://firebasestorage.googleapis.com/v0/b/new-realestate-f4127.appspot.com/o/realEstates%2Feljosema505%2Fimg3.jpg-e80ae06f-7963-4665-b2c4-5a19feb4a9ed?alt=media&token=57e1768e-2634-448d-8122-ab8364f339c7"]
        },
        {
            "title": "Apartamento céntrico",
            "description": "Perfecto para quienes buscan estar cerca de todo.",
            "lat_long": "-17.377987093588157, -66.1581009764426",
            "price": 250000,
            "square_meter": 120.0,
            "amount_bathroom": 2,
            "amount_bedroom": 2,
            "type_real_estate_id": 2,
            "user_id": 2,
            "image_url":["https://firebasestorage.googleapis.com/v0/b/new-realestate-f4127.appspot.com/o/realEstates%2Feljosema505%2Fimg1.jpg?alt=media&token=bab87c35-2a09-4d64-858d-b5698c354593", "https://firebasestorage.googleapis.com/v0/b/new-realestate-f4127.appspot.com/o/realEstates%2Feljosema505%2Fimg2.jpg?alt=media&token=15db490c-dc95-400d-ad53-44e5b50dfd81"]
        },
        {
            "title": "Residencia de lujo",
            "description": "Exclusiva residencia en una zona privada y segura.",
            "lat_long": "-17.396986953576604, -66.15356930964973",
            "price": 1200000,
            "square_meter": 450.0,
            "amount_bathroom": 5,
            "amount_bedroom": 6,
            "type_real_estate_id": 1,
            "user_id": 2,
            "image_url":["https://firebasestorage.googleapis.com/v0/b/new-realestate-f4127.appspot.com/o/realEstates%2Feljosema505%2Ffoto%20panoramica.jpg?alt=media&token=4d07c0b8-53bf-4339-b4bb-d4e3b9b7c4a8", "https://firebasestorage.googleapis.com/v0/b/new-realestate-f4127.appspot.com/o/realEstates%2Feljosema505%2Fxngvxlbz1ym1h10emzfs.jpg?alt=media&token=f64521d4-1107-45ec-b588-036bcc665e68",]
        },
        {
            "title": "Departamento minimalista",
            "description": "Ideal para profesionales jóvenes o parejas.",
            "lat_long": "-17.396136255780767, -66.16456417336137",
            "price": 180000,
            "square_meter": 90.0,
            "amount_bathroom": 1,
            "amount_bedroom": 1,
            "type_real_estate_id": 2,
            "user_id": 3,
            "image_url":["https://firebasestorage.googleapis.com/v0/b/new-realestate-f4127.appspot.com/o/realEstates%2Falejandra8%2Fimg11.jpg?alt=media&token=3f1fc24e-06b9-4bda-800f-e4f34bed7bc3"]
            
        },
        {
            "title": "Casa en zona tranquila",
            "description": "Perfecta para familias, en una zona tranquila y segura.",
            "lat_long": "-17.394647525224652, -66.13729988292147",
            "price": 400000,
            "square_meter": 300.0,
            "amount_bathroom": 3,
            "amount_bedroom": 4,
            "type_real_estate_id": 1,
            "user_id": 3,
            "image_url":["https://firebasestorage.googleapis.com/v0/b/new-realestate-f4127.appspot.com/o/realEstates%2Falejandra8%2Fimg10.jpg?alt=media&token=64afb4e2-59b6-4bdb-ae0e-c55960795990"]
        
        },
        {
            "title": "Penthouse con vista al mar",
            "description": "Impresionante vista al mar con terraza privada.",
            "lat_long": "-17.376348699406037, -66.17603575681372",
            "price": 950000,
            "square_meter": 200.0,
            "amount_bathroom": 3,
            "amount_bedroom": 3,
            "type_real_estate_id": 2,
            "user_id": 3,
            "image_url":["https://firebasestorage.googleapis.com/v0/b/new-realestate-f4127.appspot.com/o/realEstates%2Falejandra8%2Fimg13.jpg?alt=media&token=003a0ade-cb13-48db-9ec2-50c846e54268"]
        },
        {
            "title": "Casa en el bosque",
            "description": "Ideal para amantes de la naturaleza, rodeada de árboles.",
            "lat_long": "-17.369076474777895, -66.18392061483308",
            "price": 500000,
            "square_meter": 350.0,
            "amount_bathroom": 2,
            "amount_bedroom": 3,
            "type_real_estate_id": 1,
            "user_id": 4,
            "image_url":["https://firebasestorage.googleapis.com/v0/b/new-realestate-f4127.appspot.com/o/realEstates%2Fenrique8%2Fimg14.jpg?alt=media&token=fcebdf3d-131d-4d04-ad7f-778ef82a4d77"]
        },
        {
            "title": "Departamento económico",
            "description": "Buena opción para estudiantes o trabajadores.",
            "lat_long": "-17.365029198558453, -66.18599673992665",
            "price": 120000,
            "square_meter": 75.0,
            "amount_bathroom": 1,
            "amount_bedroom": 1,
            "type_real_estate_id": 2,
            "user_id": 4,
            "image_url":["https://firebasestorage.googleapis.com/v0/b/new-realestate-f4127.appspot.com/o/realEstates%2Fenrique8%2F20.jpg?alt=media&token=92dd0c99-08ae-40d7-8bb5-9b740c4257f6"]
        },
        {
            "title": "Casa histórica renovada",
            "description": "Combina lo mejor de la arquitectura clásica y moderna.",
            "lat_long": "-17.385346892162364, -66.18981491934493",
            "price": 650000,
            "square_meter": 280.0,
            "amount_bathroom": 3,
            "amount_bedroom": 4,
            "type_real_estate_id": 1,
            "user_id": 4,
            "image_url":["https://firebasestorage.googleapis.com/v0/b/new-realestate-f4127.appspot.com/o/realEstates%2Fenrique8%2F100.jpg?alt=media&token=5b166abb-8ed2-4887-9393-0bc537005e00", "https://firebasestorage.googleapis.com/v0/b/new-realestate-f4127.appspot.com/o/realEstates%2Fenrique8%2F101.jpg?alt=media&token=bb475046-91dc-431e-b9e0-ea8deaf0ab19"]
        },
        {
            "title": "Departamento de lujo",
            "description": "Con acceso a áreas comunes exclusivas y servicios premium.",
            "lat_long": "-17.35919000202271, -66.18502493669777",
            "price": 850000,
            "square_meter": 150.0,
            "amount_bathroom": 2,
            "amount_bedroom": 2,
            "type_real_estate_id": 2,
            "user_id": 4,
            "image_url":["https://firebasestorage.googleapis.com/v0/b/new-realestate-f4127.appspot.com/o/realEstates%2Fenrique8%2F102.jpg?alt=media&token=5ae40321-d5fb-4b23-a9ff-b662faf48ab6", "https://firebasestorage.googleapis.com/v0/b/new-realestate-f4127.appspot.com/o/realEstates%2Fenrique8%2F103.jpg?alt=media&token=2c872c46-4611-49e1-8617-e1759d8e29f5"]
        },
    ]

    for real_estate in real_estates_data:
        # Traducción de título y descripción
        result_title = translate_es_en_pt(real_estate["title"])
        result_description = translate_es_en_pt(real_estate["description"])

        title_translate = Translate(
            es=result_title["valEs"],
            en=result_title["valEn"],
            pt=result_title["valPt"]
        )
        db.add(title_translate)
        db.commit()
        db.refresh(title_translate)

        description_translate = Translate(
            es=result_description["valEs"],
            en=result_description["valEn"],
            pt=result_description["valPt"]
        )
        db.add(description_translate)
        db.commit()
        db.refresh(description_translate)
        geo_location = Nominatim(user_agent="GetLoc")
        loc_name = geo_location.reverse(real_estate["lat_long"])
        address=""
        if loc_name:
            address = loc_name.address
            raw_data = loc_name.raw.get("address", {})
            zone = raw_data.get("neighbourhood", "Not Found") 
            found_zone = db.query(Zone).filter(Zone.name == zone).first()

            zone_id=0
            if not found_zone:
                new_zone = Zone(name=zone)
                db.add(new_zone)
                db.commit()
                db.refresh(new_zone)
                zone_id=new_zone.id
            else:
                zone_id = found_zone.id

        # Crear registro RealEstate
        new_real_estate = RealEstate(
            address=address, 
            amount_bathroom=real_estate["amount_bathroom"],
            amount_bedroom=real_estate["amount_bedroom"],
            available=True,
            active=True,
            taken=False,
            lat_long=real_estate["lat_long"],
            price=real_estate["price"],
            square_meter=real_estate["square_meter"],
            type_real_estate_id=real_estate["type_real_estate_id"],
            title_id=title_translate.id,
            description_id=description_translate.id,
            user_id=real_estate["user_id"],
            zone_id= zone_id
        )

        db.add(new_real_estate)
        db.commit()
        db.refresh(new_real_estate)
        for image_url in real_estate["image_url"]:
            new_image = PhotosRealEstate(
                image=image_url,
                real_estate_id=new_real_estate.id
            )
            db.add(new_image)
            db.commit()
            db.refresh(new_image)
    