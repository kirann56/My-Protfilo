# backend/models/contact.py

from sqlalchemy import Column, Integer, String, TIMESTAMP, text
from backend.Database import Base

class Contact(Base):
    __tablename__ = "contact"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    second_name = Column(String)
    email = Column(String, nullable=False, unique=True)
    subject = Column(String, nullable=False)
    message = Column(String, nullable=False)
    sent_at = Column(
        TIMESTAMP(timezone=True),
        server_default=text("now()"))
    

    
