AI Claims Automation Prototype

A no-code AI workflow built for the Scale AI Product Manager take-home assignment. It uses Bolt.chat for user input, detects car damage with Google AutoML, estimates repair costs, and sends smart alerts via Zapier and Supabase.

# 🔧 AI-Claims-Automation Prototype


A no-code AI workflow built for an AI Product Manager take-home assignment. It uses **Bolt.chat** for user input, **Google AutoML** for image analysis, **Supabase** for data storage and triggers, and **Zapier** to orchestrate predictions, cost estimates, and confidence-based email summaries.

---

## 🧩 End-to-End Flow

1. **User starts a claim and uploads car damage photos via Bolt**
2. **Supabase** stores the photo and triggers a webhook to Zapier
3. **Zapier**:
   - Fetches the image and converts it to Base64
   - Sends it to a **Damage Classifier model** (Is it damaged?)
   - If damaged, runs:
     - **Part/Type Detection model** (Which parts?)
     - **Severity model** (How bad?)
   - Applies **cost estimation logic** based on part & severity
   - Calculates a **weighted confidence score**
   - Sends a formatted **email summary** with risk-level-based priority to Human Claims Agent

## 🔑 Setup Instructions

Here's the link to the prototype (if the link doesn't work for you please let me know): https://shiny-fairy-11cb54.netlify.app/

You can find some car crash/damage images here: https://www.kaggle.com/datasets/lplenka/coco-car-damage-detection-dataset

### 1️⃣ Enable Google AutoML Access

To run predictions via Vertex AI, obtain an access token by running: `gcloud auth print-access-token` (you will need to install the google cloud SDK)

Copy the token and paste it into each Zapier Webhook step that calls a model (classification, part/type detection, severity analysis). In each step, set the Authorization header to: `Bearer <your_token_here>`

Note: This Zapier workflow is shareable with collaborators via a Team plan. No additional paid account is required to view or test the prototype. See your email for access.

---

### 2️⃣ Access the Reviewer Email Inbox

Low-confidence or high-priority claims are routed to a shared inbox for human review:

📧 Email: py.autorx@gmail.com  
🔐 Password: 404damageNotFound


---

## 🛠 Tools Used

| Tool        | Role                                                  |
|-------------|-------------------------------------------------------|
| ⚡ Zapier    | Main orchestrator (webhooks, ML calls, logic)        |
| 🧠 Google AutoML / Vertex AI | ML models for damage detection, part ID, and severity |
| 🗃 Supabase  | Data storage (vehicle photos, claims), trigger events |
| 💬 Bolt.chat | Frontend interface for image upload (chat UI)        |
| 📩 Gmail     | Sends smart email summaries for triage               |

---

## ⚠️ Assumptions & Limitations

### Assumptions
- Each user uploads only one image per claim (for prototype simplicity)
- ML model predictions are reliable enough for initial triage
- Confidence scores from AutoML models are normalized and meaningful
- Cost estimates are based on static multipliers (not market-rate data)
- Claim number is available or mapped from image URL via Supabase

### Limitations
- No human-in-the-loop review or override capability 
- Damage classification and severity predictions may be imperfect
- Email summaries are basic and not integrated into a larger system
- Prototype does not support multi-image aggregation, video or full claim flow
- Does not evaluate image upload for quality, and authencity
- Bolt does not store claim-level context after the session ends

## 📝 Example Output

**Email Summary**  
_Subject_: `Med Priority: New Claim CLM54878685`

```text
Claim Number: CLM54878685

Estimated Damage:
• Bumper – $300
• Broken Glass – $900

Total Estimate: $1200  
Confidence Score: 0.85 (Medium)

[View Photo](https://your-supabase-link.com/image.jpg)
