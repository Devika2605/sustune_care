import os, sys
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from .models import User, Property, Parent, Vital, Appointment
from .security import hash_password, PRODUCTION

def seed(db: Session):
    if db.query(User).count():
        return
    admin_pw = os.getenv("ADMIN_PASSWORD", "")
    if PRODUCTION and (len(admin_pw) < 12 or admin_pw == "ChangeMe123!"):
        raise RuntimeError("Set ADMIN_PASSWORD (12+ characters) before the first production start.")
    db.add(User(email=os.getenv("ADMIN_EMAIL", "admin@sustunecare.com"), name="Sustune Admin", role="admin",
                password_hash=hash_password(admin_pw or "ChangeMe123!")))
    # Demo data is for development only. Never create a known-password client in production.
    if PRODUCTION:
        db.commit(); return
    demo = User(email="demo@sustunecare.com", name="Demo Client", role="client", country="USA", password_hash=hash_password("demo1234"))
    db.add(demo); db.flush()
    db.add_all([
        Property(user_id=demo.id, name="Sample apartment, Hyderabad", city="Hyderabad", monthly_rent_inr=65000,
                 tenant="Sample tenant (verified)", rent_status="Escrowed, payout on the 5th", last_inspection="2026-09-28", inspection_score=96),
        Property(user_id=demo.id, name="Sample flat, Bengaluru", city="Bengaluru", monthly_rent_inr=48000,
                 tenant="Vacant, 3 viewings scheduled", rent_status="Awaiting tenant", last_inspection="2026-09-28", inspection_score=91),
    ])
    mom = Parent(user_id=demo.id, name="Sample Parent", age=71, city="Hyderabad", companion="Sample Companion")
    db.add(mom); db.flush()
    now = datetime.utcnow()
    for i, (s, d, p, o, g) in enumerate([(128, 82, 74, 98, 112), (134, 86, 78, 97, 126), (126, 80, 72, 98, 108)]):
        db.add(Vital(parent_id=mom.id, recorded_at=now - timedelta(days=14 * (i + 1)), bp_sys=s, bp_dia=d, pulse=p, spo2=o, sugar=g, note="Routine home check"))
    db.add_all([
        Appointment(parent_id=mom.id, doctor="Sample Cardiologist", hospital="Sample Hospital", when=now + timedelta(days=6), summary="Quarterly cardiology review"),
        Appointment(parent_id=mom.id, doctor="Sample Physician", hospital="Sample Hospital", when=now - timedelta(days=20), status="completed", summary="BP stable. Continue current medication. Repeat lipid panel in 3 months."),
    ])
    db.commit()
