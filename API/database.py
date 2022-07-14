import sqlite3

from models import User, Dugs


class DB:

    def __init__(self, patchtodb: str)-> None:
        self.connect = sqlite3.connect(patchtodb)
        self.cursor = self.connect.cursor()

    def creattable(self):
        query = """CREATE TABLE dugs (
            id INTEGER PRIMARY KEY,
            name_dug text null null,
            numberoftabletsatonce number null null,
            howmanytimesaday number null null,
            numberoftabletsinonepackage number null null,
            whenyouhaveenoughmedicine text null null,
            id_user number null null,
            FOREIGN KEY (id_user) REFERENCES user(id_user)
        )
        """
        query_user = """CREATE TABLE user (
            id_user INTEGER PRIMARY KEY,
            nameuser text null null,
            email text null null,
            password text null null)"""
        self.cursor.execute(query_user)
        self.cursor.execute(query)

        self.connect.commit()

    def add_value(self, nametable, *args):
        print(args[0])
        if nametable == "dugs":
            query = f"INSERT INTO {nametable} VALUES {args[0]}"
        else:
            query = f"INSERT INTO {nametable} VALUES {args}"
        self.cursor.execute(query)
        self.connect.commit()

    def take_id(self, nametable: str) -> int:
        x = lambda x: "id" if x == "dugs" else "id_user"
        name_id = x(nametable)
        query = f"SELECT {name_id} FROM {nametable}"
        self.cursor.execute(query)
        resultat = self.cursor.fetchall()
        if len(resultat) == 0:
            return 0
        else:
            return len(resultat)

    def takeidfromdatabase(self, nametable) -> list[User | Dugs]:
        query = f"SELECT * FRom {nametable}"
        res = self.cursor.execute(query)
        collections: list[User | Dugs ]= []
        if nametable == "user":
            for item in res:
                print(len(item))
                collections.append(User(id_user=item[0],
                    nameuser= item[1], email=item[3], password=item[4]))
        elif nametable == "dugs":
            for item in res:
                collections.append(Dugs(
                        id=item[0], name=item[1], numberoftabletsatonce=item[2],
                        howmanytimesaday=item[3], numberoftabletsinonepackage=item[4],
                        whenyouhaveenoughmedicine=item[5], id_user=item[6]
                ))
        return collections


    def takeid_user(self, nameuser: str) -> int:
        query = f"SELECT id_user FRom user WHERE nameuser='{nameuser}'"
        self.cursor.execute(query)
        resultat = self.cursor.fetchone()
        return resultat[0]

    def update_password(self, newpassword: str, nameuser: str):
        query = f"UPDATE user SET password={newpassword} where nameuser='{nameuser}'"

    def __del__(self):
        self.connect.close()


if __name__ == '__main__':
    db = DB("")
    # db.creattable()
    # number_id = db.take_id("user") + 1
    # db.add_value("user",number_id ,"wojtek", "wojtekm510@gmail.com", "Wojtek92!")
    # print(db.takeid_user("wojtek"))
    db.takeidfromdatabase("dugs")

