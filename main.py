from fastapi import FastAPI, Depends, HTTPException
from fastapi.security.oauth2 import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import httpx
from mysql.connector import cursor
from db import get_db
import dotenv
import os
dotenv.load_dotenv()
import json
import uvicorn

@app.get("/users/")
async def get_users(db: cursor.MySQLCursor = Depends(get_db)):
    
    query = "SELECT * FROM users"
    db.execute(query)
    result = db.fetchall()
    if result:
        return {"users": result}
    else:
        return {"error": "User not found"}

# 取得使用者
@app.get("/users/{user_id}")
async def get_user(user_id: str,
                   db: cursor.MySQLCursor = Depends(get_db)):
    query = f"SELECT * FROM users WHERE id = {user_id};"
    print(query)
    db.execute(query)
    result = db.fetchall()
    if result:
        print({"user_id": result[0][0], "username": result[0][1], "money":result[0][2], "at_1":result[0][3],"at_2":result[0][4]})
        return {"user_id": result[0][0], "username": result[0][1], "money":result[0][2], "at_1":result[0][3],"at_2":result[0][4]}
    else:
        return {"error": "User not found"}

# 創建使用者
@app.get("/user_name/{user_id}")
async def insert_user(user_id: str,
                      db: cursor.MySQLCursor = Depends(get_db)):
    query = "INSERT INTO users (id) VALUES (%s)"
    db.execute(query, (user_id,))
    result = db.fetchone()
    db.execute("COMMIT")
    return {"user_name": user_id}

# 下注
@app.get("/bet/{user_id}/{at}/{money}")
async def bet(user_id: str,
                      at: str,
                      money: int,
                      db: cursor.MySQLCursor = Depends(get_db)):
    query = f"UPDATE users SET money = money-{money}, {at} = {at}+{money} WHERE id = {user_id} ;"
    db.execute(query)
    db.execute("COMMIT")
    return {"bet": "success"}
    # return await get_user(user_id)
# 截標
@app.get("/stop/{at_1_rate}/{at_2_rate}")
async def get_new_money(at_1_rate:int,
                        at_2_rate:int,
                        db: cursor.MySQLCursor = Depends(get_db)):
    query = f"UPDATE users SET money = money+at_1*{at_1_rate}+ at_2*{at_2_rate}, at_1 = 0, at_2 = 0;"
    db.execute(query)
    db.execute("COMMIT")
    return {"stop": "success"}

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
"""
mysql> CREATE TABLE
    ->   `users` (
    ->     `id` varchar(255) NOT NULL,
    ->     `name` varchar(255) DEFAULT NULL,
    ->     `money` int(11) DEFAULT 1000,
    ->     `at_1` int(11) DEFAULT 0,
    ->     `at_2` int(11) DEFAULT 0,
    ->     PRIMARY KEY (`id`)
    ->   ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;
"""
"""
     SELECT * FROM users
    -> ;
+------+------+-------+------+------+
| id   | name | money | at_1 | at_2 |
+------+------+-------+------+------+
| 1111 | Atom |  1000 |    0 |    0 |
| 2222 | NULL |  1000 |    0 |    0 |
+------+------+-------+------+------+
2 rows in set (0.00 sec)
"""