from pydantic import BaseModel
class Messages:
    DATA_FOUND = "Datos encontradas"
    DATA_CREATED = "Se creo el dato con exito"
    DATA_DELETED = "Se elimino el dato exitosamente"
    DATA_UPDATED = "Se actualizo el dato con exito"
    DATA_NOT_FOUND = "No se encontraron datos"
    SERVER_ERROR = "Error en el servidor"
    
class TranslateResponse(BaseModel):
    es: str
    en: str
    pt: str

    class Config:
        orm_mode = True
