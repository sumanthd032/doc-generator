# ART Document Generator

A **Flask-based web application** for generating documents for **Assisted Reproductive Technology (ART)** processes, including structured, validated forms for **sperm donors, oocyte donors, and commissioning couples**.

---

## Features

* Structured forms with **accordion layout** for organized data entry.
* **Input validation** and error handling for accurate data capture.
* **Progress tracking** to visualize form completion.
* **Responsive design** for desktop and mobile.
* **Dynamic field generation** for specific inputs.

---

## Setup

1. **Clone the repository:**

   ```bash
   git clone <repo-url>
   cd document-generator
   ```

2. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application:**

   ```bash
   python api/app.py
   ```

5. **Access the app** via your browser at:

   ```
   http://127.0.0.1:5000
   ```

---

## Requirements

* Python 3.x
* Flask
* Bootstrap 5.3.3 (via CDN)

---

## Usage

1. Open your web browser.
2. Navigate to the entry page (`home.html`).
3. Select the desired form:

   * Sperm Donor
   * Oocyte Donor
   * Commissioning Couple
4. Fill in the required fields in the structured accordion form.
5. Submit the form to generate and save ART documentation.

---
