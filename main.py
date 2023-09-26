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
from fastapi import FastAPI, Depends, HTTPException, Request 
from authlib.integrations.starlette_client import OAuth
from starlette.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # 检查这里的域名是否正确
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
#取得所有使用者
oauth = OAuth()
oauth.register(
    name="nycu",
    client_id=os.getenv("OAUTH_ID"),
    client_secret=os.getenv("OAUTH_KEY"),
    authorize_url="https://nycu.edu.tw/oauth/authorize",
    authorize_params=None,
    authorize_prompt=None,
    authorize_response=None,
    authorize_token=None,
    authorize_token_url="https://nycu.edu.tw/oauth/token",
    client_kwargs=None,
)
@app.get("/")
async def hello():
    return {"message": "welcome to NYCU 14 UNION greeting api"}

@app.get("/login")
async def login(request: Request):
    
    return RedirectResponse(f'https://id.nycu.edu.tw/o/authorize/?client_id={os.getenv("OAUTH_ID")}&response_type=code&scope=profile&redirect_uri=http://127.0.0.1:8000/callback')

@app.get("/callback")
async def callback(code):
    print(code)
    # token = await oauth.nycu.authorize_access_token(request)
    # user = await oauth.nycu.parse_id_token(request, token)
    return code
    # return {"success": True, "user": user}

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