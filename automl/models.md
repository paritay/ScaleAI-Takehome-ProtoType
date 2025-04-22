# 🤖 Models Overview

This prototype uses three image classification models built with **Google AutoML (Vertex AI)** to assess vehicle damage from user-uploaded images. Each model plays a distinct role in the damage estimation pipeline.

---

## 1️⃣ Damage Classification

- **🧠 Purpose**: Detect whether visible vehicle damage exists in the photo.
- **🎯 Output**: `Damaged` or `Not Damaged`
- **📊 Dataset**: [Car Damage Detection – Kaggle](https://www.kaggle.com/datasets/anujms/car-damage-detection)
- **🔍 Use Case**: Photos classified as “Not Damaged” are filtered out of the pipeline to reduce unnecessary cost estimation runs.

---

## 2️⃣ Part / Type Detection

- **🧠 Purpose**: Identify what part of the vehicle is damaged (e.g., bumper, door, glass).
- **🎯 Output Examples**: `bumper`, `door`, `glass`, `mirror`, etc.
- **📊 Dataset**: [CARDD: Car Damage Dataset](https://cardd-ustc.github.io/)
- **🔍 Use Case**: Each identified part is mapped to a base repair cost in business logic.

---

## 3️⃣ Severity Estimation

- **🧠 Purpose**: Assess how severe the damage is to each identified part.
- **🎯 Output**: `minor`, `moderate`, or `severe`
- **📊 Dataset**: [Car Damage Severity Dataset – Kaggle](https://www.kaggle.com/datasets/prajwalbhamere/car-damage-severity-dataset)
- **🔍 Use Case**: Severity labels are used to multiply base part costs, producing a more accurate cost estimate.

---

## 🧩 How They Work Together

Each image runs through the following pipeline:

1. **Damage Classification**: Is there any damage? If not, exit the pipeline.
2. **Part Detection**: Which vehicle parts are damaged?
3. **Severity Estimation**: How bad is the damage to each part?
4. **Business Logic**:
   - Part + severity → Estimated cost
   - Confidence scores from each model → Weighted final confidence
   - Summary emailed to human reviewer (if needed)

---
