from pydantic import BaseModel, EmailStr,conint,Field
from datetime import datetime
from typing import Optional

class ContactDetail(BaseModel):
    firstname: str
    secondname: str
    email: EmailStr
    subject: str
    message: str
    datetime: datetime

class ProjectsDetail(BaseModel):
    ProjectName: str
    ProjectContent: str
    TechStack: str = Field(alias="TechStcak")
    GitHubLink: Optional[str] = None
    PreviewLink: Optional[str] = None
    ImageUrl: Optional[str] = None


class ProjectShow(BaseModel):
    project_id: int
    ProjectName: str
    ProjectContent: str
    TechStack: str = Field(alias="TechStcak")
    GitHubLink: Optional[str]
    PreviewLink: Optional[str]
    ImageUrl: Optional[str]

    class Config:
        orm_mode = True
        from_attributes = True        # Pydantic v2
        populate_by_name = True


    
class Comments(BaseModel):
    project_id:int
    comment:str
    
class User(BaseModel):
    email:EmailStr
    password:str
    username:str

class ShowUser(User):
    user_id:int
    # created_at:datetime
    class Config:
        orm_mode=True

class TokenData(BaseModel):
    id: Optional[int] = None


class Token(BaseModel):
    access_token:str
    token_type:str
    
class ProjectUpvote(BaseModel):
    project_id:int
    dir:conint(le=1)