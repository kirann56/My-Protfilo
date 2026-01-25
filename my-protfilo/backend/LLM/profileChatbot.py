from fastapi import status,HTTPException,Depends,APIRouter,Request
from sqlalchemy.orm import Session
from backend import schema
from IntentLLM.profileLLM import predict_intent
from jsonResponce import responceJson
from chatNVD import build_portfolio_chatbot
import random

router=APIRouter(prefix='/protfiloChatbot',
                 tags=['Chatbot'])


@router.post('/profilechatbotResponce')
async def aiResponce(userName:str,
                    question:str):
    
    intent,conf= await predict_intent(question)

    if conf > 0.8:
        randnum=random.randint(0,9)
        return responceJson[intent][randnum]
    
    chat_stream =build_portfolio_chatbot(username=userName)
    responce=await chat_stream(question)

    return responce



    

