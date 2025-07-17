from flask import Flask, render_template, request
from docx import Document
import os
from datetime import datetime

app = Flask(__name__)

# Ensure output directory exists
if not os.path.exists('output'):
    os.makedirs('output')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate_document():
    # Collect form data
    form_data = {
        'full_name': request.form.get('full_name', 'N/A'),
        'address': request.form.get('address', 'N/A'),
        'pin_code': request.form.get('pin_code', 'N/A'),
        'contact_number': request.form.get('contact_number', 'N/A'),
        'aadhaar_number': request.form.get('aadhaar_number', 'N/A'),
        'date_of_birth': request.form.get('date_of_birth', 'N/A'),
        'email_address': request.form.get('email_address', 'N/A'),
        'donor_id': request.form.get('donor_id', 'N/A'),
        'date_of_consultancy': request.form.get('date_of_consultancy', 'N/A'),
        'date_of_discussion': request.form.get('date_of_discussion', 'N/A'),
        'genetic_disorders': request.form.get('genetic_disorders', 'N/A'),
        'family_history': request.form.get('family_history', 'N/A'),
        'current_medications': request.form.get('current_medications', 'N/A'),
        'allergies': request.form.get('allergies', 'N/A'),
        'last_medical_exam': request.form.get('last_medical_exam', 'N/A'),
        'blood_test_results': request.form.get('blood_test_results', 'N/A'),
        'serious_illness': request.form.get('serious_illness', 'N/A'),
        'smoking': request.form.get('smoking', 'N/A'),
        'smoking_frequency': request.form.get('smoking_frequency', 'N/A'),
        'cigarettes_per_day': request.form.get('cigarettes_per_day', 'N/A'),
        'alcohol': request.form.get('alcohol', 'N/A'),
        'alcohol_frequency': request.form.get('alcohol_frequency', 'N/A'),
        'alcohol_amount': request.form.get('alcohol_amount', 'N/A'),
        'drug_use': request.form.get('drug_use', 'N/A'),
        'diet': request.form.get('diet', 'N/A'),
        'marital_status': request.form.get('marital_status', 'N/A'),
        'num_children': request.form.get('num_children', '0'),
        'donor_experience': request.form.get('donor_experience', 'N/A'),
        'donation_frequency': request.form.get('donation_frequency', 'N/A'),
        'height': request.form.get('height', 'N/A'),
        'weight': request.form.get('weight', 'N/A'),
        'education': request.form.get('education', 'N/A'),
        'mother_tongue': request.form.get('mother_tongue', 'N/A'),
        'skin_colour': request.form.get('skin_colour', 'N/A'),
        'hair_colour': request.form.get('hair_colour', 'N/A'),
        'eye_colour': request.form.get('eye_colour', 'N/A'),
        'religion': request.form.get('religion', 'N/A'),
        'occupation': request.form.get('occupation', 'N/A'),
        'consent_cryopreservation': 'Yes' if request.form.get('consent_cryopreservation') else 'No',
        'consent_art_bank': 'Yes' if request.form.get('consent_art_bank') else 'No',
        'consent_registry': 'Yes' if request.form.get('consent_registry') else 'No',
        'date': datetime.now().strftime('%d/%m/%Y')
    }

    # Handle dynamic children ages
    for i in range(1, 10):  # Support up to 9 children
        form_data[f'child_{i}_age'] = request.form.get(f'child_{i}_age', 'N/A')

    # List of templates and their required fields
    templates = [
        {
            'file': 'templates_docx/form_15.docx',
            'output': 'form_15_{full_name}_{timestamp}.docx',
            'fields': ['full_name', 'address', 'pin_code', 'contact_number', 'aadhaar_number', 'date_of_discussion', 'date_of_consultancy', 'date']
        },
        {
            'file': 'templates_docx/medical_history.docx',
            'output': 'medical_history_{full_name}_{timestamp}.docx',
            'fields': ['full_name', 'date_of_birth', 'address', 'contact_number', 'email_address', 'aadhaar_number', 'donor_id', 'date', 'last_medical_exam', 'blood_test_results', 'family_history', 'serious_illness', 'current_medications', 'allergies', 'consent_cryopreservation', 'consent_art_bank', 'consent_registry']
        },
        {
            'file': 'templates_docx/donor_info.docx',
            'output': 'donor_info_{full_name}_{timestamp}.docx',
            'fields': ['full_name', 'date_of_birth', 'contact_number', 'email_address', 'aadhaar_number', 'genetic_disorders', 'family_history', 'current_medications', 'allergies', 'smoking', 'smoking_frequency', 'cigarettes_per_day', 'alcohol', 'alcohol_frequency', 'alcohol_amount', 'drug_use', 'diet', 'marital_status', 'num_children', 'donor_experience', 'donation_frequency', 'height', 'weight', 'education', 'mother_tongue', 'skin_colour', 'hair_colour', 'eye_colour', 'religion', 'occupation', 'date'] + [f'child_{i}_age' for i in range(1, 10)]
        }
    ]

    # Generate documents
    generated_files = []
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    for template in templates:
        try:
            doc = Document(template['file'])
            for paragraph in doc.paragraphs:
                for key in template['fields']:
                    placeholder = f'{{{key}}}'
                    if placeholder in paragraph.text:
                        paragraph.text = paragraph.text.replace(placeholder, form_data[key])
            output_filename = template['output'].format(full_name=form_data['full_name'].replace(' ', '_'), timestamp=timestamp)
            output_path = os.path.join('output', output_filename)
            doc.save(output_path)
            generated_files.append(output_path)
        except FileNotFoundError:
            return f"Error: Template file {template['file']} not found.", 500

    # Return success message (download will be implemented in Step 4)
    return f"Documents generated successfully: {', '.join(generated_files)}"

if __name__ == '__main__':
    app.run(debug=True)