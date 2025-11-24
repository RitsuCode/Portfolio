from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import os
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

from db import init_db, save_message

# Load environment variables
load_dotenv()

# --------------------------------------------------
# Create FastAPI App FIRST  (important!)
# --------------------------------------------------
app = FastAPI()

# --------------------------------------------------
# Add CORS Middleware (after app is created)
# --------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],       # OK for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static + Templates
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")


# --------------------------------------------------
# EMAIL SENDER
# --------------------------------------------------
def send_email(name: str, email: str, message: str):
    EMAIL_HOST = os.environ.get("EMAIL_HOST")
    EMAIL_PORT = os.environ.get("EMAIL_PORT")
    EMAIL_USER = os.environ.get("EMAIL_USER")
    EMAIL_PASS = os.environ.get("EMAIL_PASS")
    EMAIL_TO   = os.environ.get("EMAIL_TO")

    if not all([EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_TO]):
        print("⚠ Missing email environment variables.")
        return False

    html_body = f"""
    <div style="font-family: Arial; padding: 20px;">
        <h2>📬 New Message From Your Portfolio</h2>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <h3>Message:</h3>
        <pre style="background:#f5f5f5; padding:15px;">{message}</pre>
    </div>
    """

    msg = MIMEText(html_body, "html")
    msg["Subject"] = "Message From Portfolio"
    msg["From"] = EMAIL_USER
    msg["To"] = EMAIL_TO

    try:
        with smtplib.SMTP(EMAIL_HOST, int(EMAIL_PORT)) as server:
            server.starttls()
            server.login(EMAIL_USER, EMAIL_PASS)
            server.sendmail(EMAIL_USER, EMAIL_TO, msg.as_string())
        print("📬 Email sent!")
        return True

    except Exception as e:
        print("❌ Email error:", e)
        return False


# --------------------------------------------------
# Startup (init DB)
# --------------------------------------------------
@app.on_event("startup")
async def startup_event():
    await init_db()


# --------------------------------------------------
# Routes
# --------------------------------------------------
@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("contact.html", {"request": request})


# 🔥 This endpoint now accepts JSON (for your React frontend)
@app.post("/send")
async def send(request: Request):
    data = await request.json()

    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    if not name or not email or not message:
        return JSONResponse({"status": "error", "msg": "Missing fields"}, status_code=400)

    # Save to DB
    try:
        await save_message(name, email, message)
    except Exception as e:
        print("DB error:", e)
        return JSONResponse({"status": "error", "msg": "Cannot save message"}, status_code=500)

    # Send email
    if not send_email(name, email, message):
        return {"status": "error", "msg": "Email not sent"}

    return {"status": "success", "msg": "Message delivered!"}
