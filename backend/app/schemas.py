from datetime import datetime
from typing import Literal
from pydantic import BaseModel, EmailStr, Field

class LeadIn(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(default="", max_length=40)
    country: str = Field(default="", max_length=60)
    interest: Literal["aegis", "sparsh", "both"] = "both"
    city: str = Field(default="", max_length=60)
    preferred_slot: str = Field(default="", max_length=120)
    message: str = Field(default="", max_length=4000)
    quote_monthly_usd: float | None = Field(default=None, ge=0, le=100000)
    consent: bool = False          # must be true; not stored
    website: str = ""              # honeypot; must be empty; not stored

class LeadOut(BaseModel):
    id: int
    name: str
    email: str
    phone: str
    country: str
    interest: str
    city: str
    preferred_slot: str
    message: str
    quote_monthly_usd: float | None
    status: str
    created_at: datetime
    model_config = {"from_attributes": True}

class LeadStatus(BaseModel):
    status: str = Field(pattern="^(new|contacted|scheduled|won|lost)$")

class LoginIn(BaseModel):
    email: EmailStr
    password: str = Field(max_length=200)

class QuoteIn(BaseModel):
    city: str = "Hyderabad"
    aegis: bool = True
    sparsh: bool = True
    monthly_rent_inr: int = Field(default=65000, ge=0, le=5_000_000)
    sparsh_tier: Literal["essential", "comprehensive", "full"] = "comprehensive"
    currency: str = "USD"

class VitalIn(BaseModel):
    bp_sys: int = Field(ge=60, le=260)
    bp_dia: int = Field(ge=30, le=160)
    pulse: int = Field(ge=20, le=220)
    spo2: int = Field(ge=50, le=100)
    sugar: int | None = None
    note: str = ""

class AppointmentIn(BaseModel):
    doctor: str
    hospital: str
    when: datetime
    status: str = "scheduled"
    summary: str = ""
