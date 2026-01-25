import os
from pinecone import Pinecone
from langchain_nvidia_ai_endpoints import NVIDIAEmbeddings
from langchain_pinecone import PineconeVectorStore
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path=os.path.join(os.getcwd(), ".env"))

INDEX_NAME = "profile-data"

def get_retriever():
    """
    Pinecone v3+ compatible retriever
    """

    pc = Pinecone(
        api_key=os.getenv("PINECONE_API_KEY")
    )

   
    if INDEX_NAME not in pc.list_indexes().names():
        raise ValueError(f"Pinecone index '{INDEX_NAME}' does not exist")

    
    embeddings = NVIDIAEmbeddings()


    vectorstore = PineconeVectorStore(
        index_name=INDEX_NAME,
        embedding=embeddings
    )

   
    return vectorstore.as_retriever(
        search_type="similarity",
        search_kwargs={"k": 6}
    )
