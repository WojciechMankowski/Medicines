from dataclasses import dataclass
from datetime import datetime, date
from pydantic import BaseModel
    
class User(BaseModel):
    id_user: int
    nameuser: str
    email: str
    password: str

    def toDict(self):
        return {
            "id_user": self.id_user,
            "nameuser": self.nameuser,
            "email": self.email, "password": self.password
        }


class Dugs(BaseModel):
    id: int
    name: str
    numberoftabletsatonce: int
    howmanytimesaday: int
    numberoftabletsinonepackage: int
    whenyouhaveenoughmedicine: str
    id_user: int
    def toTuple(self):
        return (
            self.id, self.name,  self.numberoftabletsatonce, self.howmanytimesaday,
            self.numberoftabletsinonepackage, self.whenyouhaveenoughmedicine, self.id_user
        )
    def __str__(self):
        return f"{self.name} dla {self.id_user}"