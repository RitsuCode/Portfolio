from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://portfolio-two-lovat-73.vercel.app",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Contact(BaseModel):
    name: str
    email: str
    message: str

def send_email(name: str, email: str, message: str):
    EMAIL_USER = os.getenv("EMAIL_USER")
    EMAIL_PASS = os.getenv("EMAIL_PASS")
    EMAIL_TO   = os.getenv("EMAIL_TO")

    if not all([EMAIL_USER, EMAIL_PASS, EMAIL_TO]):
        raise Exception("Missing email environment variables")

    msg = MIMEText(
        f"Name: {name}\n"
        f"Email: {email}\n\n"
        f"Message:\n{message}"
    )
    msg["Subject"] = "New Message From Portfolio"
    msg["From"] = EMAIL_USER
    msg["To"] = EMAIL_TO
    msg["Reply-To"] = email  # 👈 THIS IS KEY

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(EMAIL_USER, EMAIL_PASS)
            server.send_message(msg)
        return True
    except Exception as e:
        print("Email error:", e)
        return False

@app.post("/send")
async def send(data: Contact):
    if not send_email(data.name, data.email, data.message):
        raise HTTPException(status_code=500, detail="Email failed")

    return {
        "status": "success",
        "msg": "Message delivered successfully 🚀"
    }
