Sperm Donor Document Generator
This Flask application generates three Word documents (form_15.docx, medical_history.docx, donor_info.docx) based on user input for sperm donor registration, compliant with the ART Regulation Act, 2021. It features dynamic document generation, robust input validation, and a user-friendly interface.
Features

Dynamic Document Generation: Fills templates with user data, including separate blood test fields (HIV, HBV, HCV, VDRL) and dynamic children fields.
Input Validation: Client- and server-side validation for required fields, formats (e.g., Aadhaar, email), and logical constraints (e.g., dates not in future).
UI/UX: Bootstrap-based interface with collapsible sections, responsive design, and clear error feedback.
Error Handling: Logs errors to logs/app.log, handles template/file errors, and includes rate limiting.
Deployment-Ready: Configured for Heroku with Gunicorn.

Project Structure
doc_generator/
├── templates/                  # HTML templates
│   ├── index.html             # Input form
│   ├── success.html           # Success page
│   ├── error.html             # Error page
├── templates_docx/            # Word document templates
│   ├── form_15.docx
│   ├── medical_history.docx
│   └── donor_info.docx
├── output/                    # Generated .docx files
├── downloads/                 # ZIP archives
├── logs/                      # Error logs
├── static/                    # CSS and JS
│   ├── styles.css
│   └── scripts.js
├── .gitignore
├── requirements.txt
├── create_templates.py        # Generates .docx templates
├── app.py                     # Flask application
├── Procfile                   # Heroku process file
├── README.md

Setup Instructions

Clone the Repository:
git clone <repository-url>
cd doc_generator


Set Up Virtual Environment:
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate


Install Dependencies:
pip install -r requirements.txt


Generate Templates:
python create_templates.py


Run Locally:
python app.py

Open http://127.0.0.1:5000 in your browser.


Deployment to Heroku

Install Heroku CLI: Follow Heroku CLI installation.
Log In to Heroku:heroku login


Create Heroku App:heroku create my-donor-app


Push to Heroku:git push heroku main


Open App:heroku open



Usage

Fill the form with required fields (marked with *).
Blood test results (HIV, HBV, HCV, VDRL) are selected from dropdowns.
Number of children dynamically generates age fields (max 20).
Submit to generate a ZIP file containing three .docx documents.
Errors are displayed clearly; logs are saved in logs/app.log.

Dependencies

Flask: Web framework
python-docx: Word document manipulation
gunicorn: WSGI server for production
flask-limiter: Rate limiting

License
MIT License