from pydantic import BaseModel, EmailStr
from datetime import datetime

class ContactDetail(BaseModel):
    firstname: str
    secondname: str
    email: EmailStr
    subject: str
    message: str
    datetime: datetime
