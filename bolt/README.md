# 🤖 Bolt Chatbot Flow – Auto Damage Estimator

This folder outlines the Bolt chatbot flow used to collect user data and vehicle damage photos.

---

## 🧭 Flow Overview

1. **User starts a claim**
2. Inputs details:
   - Name
   - Policy number
   - Vehicle info (optional)
3. Uploads **vehicle damage photo**
4. Chatbot **saves image to Supabase**
5. Submits claim via a **"Submit Claim" button**
6. Triggers Zapier webhook → Kicks off ML model pipeline

---

## 🧩 Key Bolt Blocks

| Block Name         | Description |
|--------------------|-------------|
| **Start**          | Welcomes user and collects name/policy |
| **Upload Photo**   | Image upload step; stored in Supabase |
| **Submit Claim**   | Button block → Sends webhook to Zapier |
| **Thanks!**        | Confirmation message after submission |

---

## ⚙️ Supabase Integration

- Supabase is used to store:
  - User-uploaded images (via public bucket)
  - Metadata like `claim_numb`, `policy_number`, etc.

- Bolt webhook sends:
  ```json
  {
    "url": "https://.../vehicle-photos/CLM123/abc123.jpg",
    "claim_numb": "CLM12345678"
  }
