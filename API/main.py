from datetime import date
from typing import Union
from fastapi import FastAPI

from database import DB
from models import User, Dugs
# TODO polecenia uruchamiania API uvicorn main:app --reload

app = FastAPI()

@app.get("/user")
def getalluser():
    db = DB("pharmacyinhome.db")
    user_all = db.takeidfromdatabase("user")
    return user_all
@app.get("/dugs")
def getAllDugs():
    db = DB("pharmacyinhome.db")
    dug_all = db.takeidfromdatabase("dugs")
    return dug_all
@app.post("/adduser/{nameuser}")
def adduser(nameuser: str, email: str, password: str):
    db = DB("pharmacyinhome.db")
    id = db.take_id("user")+1
    db.add_value("user", id, nameuser, email, password)
    return {
        "code": 200, "type": "POST"
    }

@app.post("/adddug/{namedug}")
def adddug(namedug: str, numberoftabletsatonce: int, numberoftabletsinonepackage: int,
           howmanytimesaday: int, whenyouhaveenoughmedicine: str, nameuser: str):
    db = DB("pharmacyinhome.db")
    iduser = db.takeid_user(nameuser)
    id = db.take_id("dugs") + 1
    newdug = Dugs(
        id=id, name=namedug, numberoftabletsatonce=numberoftabletsatonce,
        howmanytimesaday=howmanytimesaday, numberoftabletsinonepackage=numberoftabletsinonepackage,
        whenyouhaveenoughmedicine=whenyouhaveenoughmedicine, id_user=iduser
    )
    db.add_value("dugs", newdug.toTuple())
    return {
        "code": 200, "type": "POST"
    }