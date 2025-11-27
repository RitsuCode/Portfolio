from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import smtplib
from dotenv import load_dotenv, find_dotenv
load_dotenv()

from email.mime.text import MIMEText

app = FastAPI()

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://portfolio-two-lovat-73.vercel.app",  # your FRONTEND domain
        "http://localhost:5173",  # local dev
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
    EMAIL_HOST = "smtp.gmail.com"
    EMAIL_PORT = 587
    EMAIL_USER = os.getenv("EMAIL_USER")
    EMAIL_PASS = os.getenv("EMAIL_PASS")
    EMAIL_TO   = os.getenv("EMAIL_TO")

    print("DEBUG ENV:", EMAIL_USER, EMAIL_PASS, EMAIL_TO)

    msg = MIMEText(f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}")
    msg["Subject"] = "Message From Portfolio"
    msg["From"] = EMAIL_USER
    msg["To"] = EMAIL_TO

    try:
        server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASS)
        server.sendmail(EMAIL_USER, EMAIL_TO, msg.as_string())
        server.quit()
        return True
    except Exception as e:
        print("Email error:", e)
        return False


@app.post("/send")
async def send(data: Contact):
    email_sent = send_email(data.name, data.email, data.message)

    if not email_sent:
        return {"status": "error", "msg": "Email failed"}

    return {"status": "success", "msg": "Message delivered!"}
