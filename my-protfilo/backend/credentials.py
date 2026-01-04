from passlib.context import CryptContext

encrypt=CryptContext(schemes=['bcrypt'],deprecated='auto')

def passwordhash(password:str):
    return encrypt.hash(password)

def passworddehash(plain,deprecatedPass):
    return encrypt.verify(plain,deprecatedPass)
