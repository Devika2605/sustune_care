import os, hashlib, hmac, secrets, time
from collections import defaultdict, deque
import jwt
from fastapi import Depends, HTTPException, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from .database import get_db
from .models import User

PRODUCTION = os.getenv("ENV", "development").lower() == "production"
_DEFAULT_SECRET = "dev-secret-change-me"
SECRET = os.getenv("SECRET_KEY", _DEFAULT_SECRET)
if PRODUCTION and (SECRET == _DEFAULT_SECRET or SECRET == "change-me" or len(SECRET) < 32):
    # Refuse to start with a guessable signing key in production.
    raise RuntimeError("Set SECRET_KEY to a random string of at least 32 characters (ENV=production).")

COOKIE = "sc_token"
TOKEN_HOURS = 12
bearer = HTTPBearer(auto_error=False)

def hash_password(pw: str) -> str:
    salt = secrets.token_hex(16)
    dk = hashlib.pbkdf2_hmac("sha256", pw.encode(), salt.encode(), 200_000).hex()
    return f"{salt}${dk}"

def verify_password(pw: str, stored: str) -> bool:
    salt, dk = stored.split("$")
    test = hashlib.pbkdf2_hmac("sha256", pw.encode(), salt.encode(), 200_000).hex()
    return hmac.compare_digest(dk, test)

def make_token(user: User, hours: int = TOKEN_HOURS) -> str:
    return jwt.encode({"sub": str(user.id), "role": user.role, "exp": int(time.time()) + hours * 3600}, SECRET, algorithm="HS256")

def current_user(request: Request, creds: HTTPAuthorizationCredentials | None = Depends(bearer), db: Session = Depends(get_db)) -> User:
    # Browser sessions use the httpOnly cookie; API tools may still send a Bearer token.
    token = creds.credentials if creds else request.cookies.get(COOKIE)
    if not token:
        raise HTTPException(401, "Not authenticated")
    try:
        data = jwt.decode(token, SECRET, algorithms=["HS256"])
    except jwt.PyJWTError:
        raise HTTPException(401, "Invalid or expired token")
    user = db.get(User, int(data["sub"]))
    if not user:
        raise HTTPException(401, "User not found")
    return user

def admin_only(user: User = Depends(current_user)) -> User:
    if user.role != "admin":
        raise HTTPException(403, "Admin only")
    return user

# ---- minimal in-memory rate limiter (single process). Use Redis or an API gateway when you scale out. ----
_hits: dict[str, deque] = defaultdict(deque)

def client_ip(request: Request) -> str:
    fwd = request.headers.get("x-forwarded-for")
    return (fwd.split(",")[0].strip() if fwd else (request.client.host if request.client else "unknown"))

def rate_limit(request: Request, bucket: str, limit: int, window_s: int = 60) -> None:
    key = f"{bucket}:{client_ip(request)}"
    now = time.time()
    q = _hits[key]
    while q and now - q[0] > window_s:
        q.popleft()
    if len(q) >= limit:
        raise HTTPException(429, "Too many attempts. Please wait a minute and try again.")
    q.append(now)
