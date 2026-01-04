# backend/models/contact.py

from sqlalchemy import Column, Integer, String, TIMESTAMP, text,ForeignKey
from backend.Database import Base
from sqlalchemy.orm import relationship


class CREATEUSER(Base):
    __tablename__="createuser"
    user_id = Column(Integer, primary_key=True, index=True)
    username=Column(String,nullable=False)
    email=Column(String,nullable=False,unique=True)
    password=Column(String,nullable=False)
    created_at=Column(TIMESTAMP(timezone=True),server_default=(('now()')))
    usercomments=relationship('COMMENTS',back_populates='comments')
    userprofileupvote=relationship('PROFILE_UPVOTE',back_populates='profile_upvote')
    userprojectupvote=relationship('PROJECT_UPVOTE').back_populates('project_upvote')
    

class CONTACT(Base):
    __tablename__ = "contact"

    user_id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    second_name = Column(String)
    email = Column(String, nullable=False, unique=True)
    subject = Column(String, nullable=False)
    message = Column(String, nullable=False)
    sent_at = Column(
        TIMESTAMP(timezone=True),
        server_default=text("now()"))
    

    

class PROJECTS(Base):
    __tablename__='projects'

    project_id=Column(Integer,primary_key=True,nullable=False,index=True)
    ProjectName=Column(String,nullable=False)
    ProjectContent=Column(String,nullable=False)
    TechStcak=Column(String,nullable=False)
    GitHubLink=Column(String,nullable=False)
    PreviewLink=Column(String)
    ImageUrl=Column(String,nullable=False)

class COMMENTS(Base):
    __tablename__='comments'

    user_id=Column(Integer,ForeignKey('contact.user_id',ondelete='CASCADE'))
    project_id=Column(Integer,nullable=False,primary_key=True)
    comment=Column(String,nullable=False)
    username=Column(String,ForeignKey('createuser.username',ondelete='CASCADE'))
    comments=relationship('CREATEUSER',back_populates='usercomments')

class PROFILE_UPVOTE(Base):
    __tablename__='profile_upvote'
    user_id=Column(Integer,ForeignKey('createuser.user_id',ondelete='CASCADE'))
    profile_upvote=relationship('CREATEUSER',back_populates='userprofileupvote')

class PROJECT_UPVOTE(Base):
    __tablename__='project_upvotes'
    user_id=Column(Integer,ForeignKey('createuser.user_id',ondelete='CASCADE'))
    project_id=Column(Integer,nullable=False,unique=True)
    project_upvote=relationship('CREATEUSER',back_populates='userprojectupvote')




    
