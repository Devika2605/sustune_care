import os, smtplib, logging
from email.message import EmailMessage
import httpx

log = logging.getLogger("sustune.notify")

def _email(subject: str, body: str):
    host, to = os.getenv("SMTP_HOST"), os.getenv("NOTIFY_TO")
    if not (host and to):
        return
    msg = EmailMessage()
    msg["Subject"], msg["From"], msg["To"] = subject, os.getenv("SMTP_USER", "no-reply@sustunecare.com"), to
    msg.set_content(body)
    with smtplib.SMTP(host, int(os.getenv("SMTP_PORT", 587))) as s:
        s.starttls()
        s.login(os.getenv("SMTP_USER", ""), os.getenv("SMTP_PASS", ""))
        s.send_message(msg)

def _whatsapp(text: str):
    token, pid, to = os.getenv("WHATSAPP_TOKEN"), os.getenv("WHATSAPP_PHONE_ID"), os.getenv("WHATSAPP_NOTIFY_TO")
    if not (token and pid and to):
        return
    httpx.post(f"https://graph.facebook.com/v20.0/{pid}/messages",
               headers={"Authorization": f"Bearer {token}"},
               json={"messaging_product": "whatsapp", "to": to, "type": "text", "text": {"body": text}}, timeout=10)

def new_lead(lead):
    text = (f"New Sustune lead #{lead.id}: {lead.name} ({lead.country}) | {lead.interest} | {lead.city}\n"
            f"{lead.email} {lead.phone}\nSlot: {lead.preferred_slot}\n{lead.message}")
    log.info(text)
    for fn, args in ((_email, (f"New consultation request: {lead.name}", text)), (_whatsapp, (text,))):
        try:
            fn(*args)
        except Exception as e:  # never fail the request because a notification failed
            log.warning("notify failed: %s", e)
