from fastapi import Depends
import mysql.connector
import dotenv
import os 
dotenv.load_dotenv()

def get_db_connection():
    print("=====================================")
    connection = mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database="greeting_db"
    )
    return connection

def get_db():
    connection = get_db_connection()
    db = connection.cursor()

    try:
        yield db
    finally:
        db.close()
        connection.close()
 