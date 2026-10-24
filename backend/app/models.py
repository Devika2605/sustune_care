from datetime import datetime
from sqlalchemy import String, Integer, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .database import Base

class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(200), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(120))
    password_hash: Mapped[str] = mapped_column(String(300))
    role: Mapped[str] = mapped_column(String(20), default="client")  # client | admin
    country: Mapped[str] = mapped_column(String(60), default="")
    properties = relationship("Property", back_populates="owner", cascade="all, delete-orphan")
    parents = relationship("Parent", back_populates="owner", cascade="all, delete-orphan")

class Lead(Base):
    __tablename__ = "leads"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120))
    email: Mapped[str] = mapped_column(String(200))
    phone: Mapped[str] = mapped_column(String(40), default="")
    country: Mapped[str] = mapped_column(String(60), default="")
    interest: Mapped[str] = mapped_column(String(40), default="both")
    city: Mapped[str] = mapped_column(String(60), default="")
    preferred_slot: Mapped[str] = mapped_column(String(120), default="")
    message: Mapped[str] = mapped_column(Text, default="")
    quote_monthly_usd: Mapped[float | None] = mapped_column(Float, nullable=True)
    status: Mapped[str] = mapped_column(String(20), default="new")  # new|contacted|scheduled|won|lost
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

class Property(Base):
    __tablename__ = "properties"
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    name: Mapped[str] = mapped_column(String(160))
    city: Mapped[str] = mapped_column(String(60))
    monthly_rent_inr: Mapped[int] = mapped_column(Integer)
    tenant: Mapped[str] = mapped_column(String(120), default="Vacant")
    rent_status: Mapped[str] = mapped_column(String(40), default="Escrowed")
    last_inspection: Mapped[str] = mapped_column(String(40), default="")
    inspection_score: Mapped[int] = mapped_column(Integer, default=0)
    owner = relationship("User", back_populates="properties")

class Parent(Base):
    __tablename__ = "parents"
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    name: Mapped[str] = mapped_column(String(120))
    age: Mapped[int] = mapped_column(Integer)
    city: Mapped[str] = mapped_column(String(60))
    companion: Mapped[str] = mapped_column(String(120), default="")
    owner = relationship("User", back_populates="parents")
    vitals = relationship("Vital", back_populates="parent", cascade="all, delete-orphan", order_by="Vital.recorded_at.desc()")
    appointments = relationship("Appointment", back_populates="parent", cascade="all, delete-orphan", order_by="Appointment.when.desc()")

class Vital(Base):
    __tablename__ = "vitals"
    id: Mapped[int] = mapped_column(primary_key=True)
    parent_id: Mapped[int] = mapped_column(ForeignKey("parents.id"))
    recorded_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    bp_sys: Mapped[int] = mapped_column(Integer)
    bp_dia: Mapped[int] = mapped_column(Integer)
    pulse: Mapped[int] = mapped_column(Integer)
    spo2: Mapped[int] = mapped_column(Integer)
    sugar: Mapped[int | None] = mapped_column(Integer, nullable=True)
    note: Mapped[str] = mapped_column(Text, default="")
    parent = relationship("Parent", back_populates="vitals")

class Appointment(Base):
    __tablename__ = "appointments"
    id: Mapped[int] = mapped_column(primary_key=True)
    parent_id: Mapped[int] = mapped_column(ForeignKey("parents.id"))
    doctor: Mapped[str] = mapped_column(String(120))
    hospital: Mapped[str] = mapped_column(String(120))
    when: Mapped[datetime] = mapped_column(DateTime)
    status: Mapped[str] = mapped_column(String(20), default="scheduled")  # scheduled|completed|cancelled
    summary: Mapped[str] = mapped_column(Text, default="")
    parent = relationship("Parent", back_populates="appointments")
