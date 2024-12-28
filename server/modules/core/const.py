from pydantic import BaseModel

class TranslateResponse(BaseModel):
    es: str
    en: str
    pt: str

class Messages:
    DATA_FOUND = TranslateResponse(es="Datos encontradas", en="Data found", pt="Dados encontrados")
    DATA_CREATED = TranslateResponse(es="Se creó el dato con éxito", en="Data created successfully", pt="Dado criado com sucesso")
    DATA_DELETED = TranslateResponse(es="Se eliminó el dato exitosamente", en="Data deleted successfully", pt="Dado excluído com sucesso")
    DATA_UPDATED = TranslateResponse(es="Se actualizó el dato con éxito", en="Data updated successfully", pt="Dado atualizado com sucesso")
    DATA_NOT_FOUND = TranslateResponse(es="No se encontraron datos", en="No data found", pt="Nenhum dado encontrado")
    SERVER_ERROR = TranslateResponse(es="Error en el servidor", en="Server error", pt="Erro no servidor")
    ADD_FAV = TranslateResponse(es="Se agrego a favoritos", en="Added to favorites", pt="adicionado aos favoritos")
    NEW_RESPONSE = TranslateResponse(es="Pregunta respondida", en="Question answered", pt="Pergunta respondida")
    USER_REPORTED = TranslateResponse(es="Usuario reportado", en="User reported", pt="Usuário reportado")


class AuthMsg:
    PASSWORD_NOT_MATCH = TranslateResponse(es="Las contraseñas no coinciden", en="Passwords do not match", pt="As senhas não coincidem")
    PASSWORD_WRONG = TranslateResponse(es="Contraseña incorrecta", en="Incorrect password", pt="Senha incorreta")
    USER_EXIST = TranslateResponse(es="Bienvenido de nuevo", en="Welcome back", pt="Bem-vindo de volta")
    USER_CREATED = TranslateResponse(es="Usuario creado con éxito", en="User created successfully", pt="Usuário criado com sucesso")
    CODE_NOT_MATCH = TranslateResponse(es="El código no coincide", en="Code does not match", pt="O código não corresponde")
    USER_NOT_AVAILABLE= TranslateResponse(es="El usuario fue desactivado", en="User was deactivated", pt="O usuário foi desativado")
    

    class Config:
        orm_mode = True
