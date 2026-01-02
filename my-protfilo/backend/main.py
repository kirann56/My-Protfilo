from fastapi import FastAPI
from backend.Database import engine, Base
# from backend.models import Contact  
from backend.routes import contact
app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(contact.router)
@app.get("/")
def load():
    return {"message": "hii there how are you !!!"}
