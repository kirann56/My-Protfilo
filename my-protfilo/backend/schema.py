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


class ProjectWithVotes(BaseModel):
    project_id: int
    ProjectName: str
    ProjectContent: str
    TechStack: str = Field(alias="TechStcak")
    GitHubLink: Optional[str]
    PreviewLink: Optional[str]
    ImageUrl: Optional[str]
    project_votes: int

    class Config:
        from_attributes = True
        populate_by_name = True



    
class Comments(BaseModel):
    project_id:int
    comment:str
    
# schema.py
from pydantic import BaseModel

class User(BaseModel):
    email: str
    username: str

class ShowUser(BaseModel):
    user_id: int
    email: str
    username: str

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    id: Optional[int] = None

class ProjectUpvote(BaseModel):
    project_id:int
    dir:conint(le=1)