from docx import Document
from docx.shared import Pt, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
import os

def create_form_15_template():
    doc = Document()
    # Title
    heading = doc.add_heading('FORM 15', level=1)
    heading.alignment = WD_ALIGN_PARAGRAPH.CENTER
    heading.runs[0].bold = True
    doc.add_paragraph('[Refer Rule 13 (2) (ii)]', style='Normal').alignment = WD_ALIGN_PARAGRAPH.CENTER
    doc.add_heading('Consent Form for the Donor of Sperm', level=2).alignment = WD_ALIGN_PARAGRAPH.CENTER

    # Consent paragraph
    p = doc.add_paragraph()
    p.add_run('I, ').bold = True
    p.add_run('{full_name}, residing at {address}, PIN Code: {pin_code}, Mobile: {contact_number}, Aadhaar Number {aadhaar_number}, willingly consent to donate my sperm to couple/individual who are unable to have a child by other means. At this stage and to the best of my knowledge I am free of any infectious diseases or genetic disorders.')
    doc.add_paragraph('I have had a full discussion with ').add_run('Dr. Ravikumar N.R').bold = True
    p = doc.add_paragraph()
    p.add_run(' on {date_of_discussion}, address Subash Nagara, B.H Road, Nelamangala Town, Bengaluru District, Karnataka-562123')
    p = doc.add_paragraph('I have been counselled by ')
    p.add_run('Ranjana Basavaraj Byadagi').bold = True
    p.add_run(', address Avaraguppa, Avaraguppa Post, Siddapura, Uttara Kannada-581355 on {date_of_consultancy}.')
    doc.add_paragraph('(I understand that there will be no direct or indirect contact between the recipient, and me, and my personal identity will not be disclosed to the recipient or to the child born through the use of my gamete: If applicable)')
    doc.add_paragraph('I understand that I shall have no rights whatsoever on the resulting offspring and vice versa.')
    doc.add_paragraph('_________________\nSignature of Donor', style='Normal').alignment = WD_ALIGN_PARAGRAPH.LEFT

    # Endorsement
    doc.add_heading('ENDORSEMENT BY THE ART BANK', level=2)
    doc.add_paragraph('I/we have personally explained to {full_name}, the details and implications of his signing this consent/approval form, and made sure to the extent humanly possible that he understands these details and implications.')
    doc.add_paragraph('_______________________________\nName and signature of the Doctor', style='Normal')
    doc.add_paragraph('___________________________________________________________\nName, address and signature of the Witness from the ART bank', style='Normal')
    doc.add_paragraph('Name and address of the ART bank\nCryoconserve Private Limited,\n3rd Floor, 59/1, Dr Rajkumar Road, 2nd Block,\nRajajinagar, Bengaluru, Karnataka 560010', style='Normal')
    doc.add_paragraph('Dated: {date}', style='Normal')
    doc.save('templates_docx/form_15.docx')

def create_medical_history_template():
    doc = Document()
    # Title
    heading = doc.add_heading('MEDICAL HISTORY AND SCREENING REPORT FOR SEMEN DONOR', level=1)
    heading.alignment = WD_ALIGN_PARAGRAPH.CENTER
    heading.runs[0].bold = True
    doc.add_paragraph()
    p = doc.add_paragraph()
    p.add_run('ART Bank Name: ').bold = True
    p.add_run('Cryoconserve')
    p = doc.add_paragraph()
    p.add_run('Donor ID: ').bold = True
    p.add_run('{donor_id}')
    p = doc.add_paragraph()
    p.add_run('Date: ').bold = True
    p.add_run('{date}')

    # Section A
    doc.add_heading('Section A: Donor Identification and Registration', level=2).bold = True
    doc.add_paragraph('1. Full Name: {full_name}')
    doc.add_paragraph('2. Date of Birth: {date_of_birth} (As per Aadhaar, Enclosed)')
    doc.add_paragraph('3. Contact Information:')
    p = doc.add_paragraph()
    p.add_run('   · Address: ').bold = True
    p.add_run('{address} (As per Aadhaar, Enclosed)')
    p = doc.add_paragraph()
    p.add_run('   · Phone Number: ').bold = True
    p.add_run('{contact_number}')
    p = doc.add_paragraph()
    p.add_run('   · Email: ').bold = True
    p.add_run('{email_address}')
    p = doc.add_paragraph()
    p.add_run('   · Aadhaar Number: ').bold = True
    p.add_run('{aadhaar_number}')

    # Section B
    doc.add_heading('Section B: Medical and Genetic Screening', level=2).bold = True
    doc.add_paragraph('1. Date of last comprehensive medical examination: {last_medical_exam}')
    doc.add_paragraph('2. Results of recent blood tests:')
    doc.add_paragraph('   · Human immunodeficiency virus (HIV), types 1 and 2: {blood_test_results}')
    doc.add_paragraph('   · Hepatitis B virus (HBV): {blood_test_results}')
    doc.add_paragraph('   · Hepatitis C virus (HCV): {blood_test_results}')
    doc.add_paragraph('   · Treponema pallidum (syphilis) through VDRL: {blood_test_results}')
    doc.add_paragraph('3. Detailed family medical history, including any genetic conditions:\n{family_history}')
    doc.add_paragraph('4. Record of any serious illnesses or surgeries:\n{serious_illness}')
    doc.add_paragraph('5. Current medications and known allergies:\n{current_medications}, {allergies}')

    # Section C
    doc.add_heading('Section C: Consent for Cryopreservation and Use', level=2).bold = True
    doc.add_paragraph('1. Consent for cryopreservation of sperm: {consent_cryopreservation}')
    doc.add_paragraph('2. Consent for the use of sperm by ART Bank: {consent_art_bank}')

    # Section D
    doc.add_heading('Section D: National Registry Update Consent', level=2).bold = True
    doc.add_paragraph('1. Consent to update donor information in the National Registry: {consent_registry}')
    doc.add_paragraph('Declaration and Consent')
    p = doc.add_paragraph()
    p.add_run('I hereby declare that the information provided above is true and complete to the best of my knowledge and I consent to the screening, collection, registration, and cryopreservation of my sperm as per the ART Regulation Act, 2021. I also consent to the maintenance of my records and the regular update of the National Registry as required by the Act. Furthermore, I declare I have never donated my semen to any ART clinic or bank, nor through any other means, and I will not donate my semen in the future.')
    doc.add_paragraph('Signature: _______________________________ Date: {date}')
    doc.save('templates_docx/medical_history.docx')

def create_donor_info_template():
    doc = Document()
    # Title
    heading = doc.add_heading('SPERM/SEMEN DONOR INFORMATION FORM', level=1)
    heading.alignment = WD_ALIGN_PARAGRAPH.CENTER
    heading.runs[0].bold = True
    doc.add_paragraph()

    # Personal Details
    doc.add_heading('Personal Details:', level=2).bold = True
    doc.add_paragraph('1. Full Name: {full_name}')
    doc.add_paragraph('2. Date of Birth: {date_of_birth} (As per Aadhaar, Attached)')
    doc.add_paragraph('3. Contact Number: {contact_number}')
    doc.add_paragraph('4. Email Address: {email_address}')
    doc.add_paragraph('5. Aadhaar Number: {aadhaar_number}')

    # Health and Medical History
    doc.add_heading('Health and Medical History:', level=2).bold = True
    doc.add_paragraph('1. Any Known Genetic Disorders or Medical Conditions: {genetic_disorders}')
    doc.add_paragraph('2. Family History of Genetic Conditions: {family_history}')
    doc.add_paragraph('3. Current Medications: {current_medications}')
    doc.add_paragraph('4. Allergies: {allergies}')

    # Lifestyle and Habits
    doc.add_heading('Lifestyle and Habits:', level=2).bold = True
    p = doc.add_paragraph('1. Smoking Habits: ')
    p.add_run('(Circle one) {smoking}')
    doc.add_paragraph('   If yes, Frequency: {smoking_frequency} (e.g., daily, occasionally)')
    doc.add_paragraph('   If yes, Number of Cigarettes per Day: {cigarettes_per_day}')
    p = doc.add_paragraph('2. Alcohol Consumption: ')
    p.add_run('(Circle one) {alcohol}')
    doc.add_paragraph('   If yes, Frequency: {alcohol_frequency} (e.g., weekly, monthly)')
    doc.add_paragraph('   If yes, Average Amount Consumed: {alcohol_amount} (e.g., number of drinks per occasion)')
    p = doc.add_paragraph('3. Recreational Drug Use: ')
    p.add_run('(Circle one) {drug_use}')
    p = doc.add_paragraph('4. Dietary Preferences: ')
    p.add_run('(Circle one) {diet}')

    # Reproductive History
    doc.add_heading('Reproductive History:', level=2).bold = True
    p = doc.add_paragraph('1. Marital Status: ')
    p.add_run('(Circle one) {marital_status}')
    doc.add_paragraph('2. Number of Biological Children (if any): {num_children}')
   
    for i in range(1,3): 
        doc.add_paragraph(f'   Child {i}: Age: {{child_ages[{i}]}}')
    doc.add_paragraph('   (Add more if applicable)')
    p = doc.add_paragraph('3. Previous Donor Experience (if applicable): ')
    p.add_run('(Circle one) {donor_experience}')
    doc.add_paragraph('4. Frequency of Donations (if known): {donation_frequency}')

    # Physical Attributes
    doc.add_heading('Physical Attributes:', level=2).bold = True
    doc.add_paragraph('1. Height: {height} (in centimetres or feet/inches)')
    doc.add_paragraph('2. Weight: {weight} (in kilograms or pounds)')
    doc.add_paragraph('3. Educational Qualifications: {education}')
    doc.add_paragraph('4. Mother Tongue: {mother_tongue}')
    doc.add_paragraph('5. Skin Colour: {skin_colour}')
    doc.add_paragraph('6. Hair Colour: {hair_colour}')
    doc.add_paragraph('7. Eye Colour: {eye_colour}')
    doc.add_paragraph('8. Religion: {religion}')
    doc.add_paragraph('9. Occupation: {occupation}')

    # Consent and Legal Acknowledgment
    doc.add_heading('Consent and Legal Acknowledgment:', level=2).bold = True
    doc.add_paragraph('1. I understand that my genetic material will be used for assisted reproductive purposes.')
    doc.add_paragraph('2. I consent to the storage and use of my sperm/semen for fertility treatments.')
    doc.add_paragraph('3. I acknowledge that I am voluntarily providing this information, this shall be used for the legal purpose.')
    doc.add_paragraph('4. Furthermore, I declare I have never donated my semen to any ART clinic or bank, nor through any other means, and I will not donate my semen in the future.')
    doc.add_paragraph('Signature: ___________________________ Date: {date}')
    doc.save('templates_docx/donor_info.docx')

def create_all_templates():
    if not os.path.exists('templates_docx'):
        os.makedirs('templates_docx')
    create_form_15_template()
    create_medical_history_template()
    create_donor_info_template()

if __name__ == '__main__':
    create_all_templates()