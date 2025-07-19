document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('donorForm');
    if (!form) return;

    const numChildrenInput = document.getElementById('num_children');
    const childrenAgesDiv = document.getElementById('children_ages');
    const smokingRadios = document.getElementsByName('smoking');
    const alcoholRadios = document.getElementsByName('alcohol');
    const drugRadios = document.getElementsByName('drug_use');
    const smokingDetails = document.getElementById('smoking_details');
    const alcoholDetails = document.getElementById('alcohol_details');
    const today = new Date().toISOString().split('T')[0];

    // Initialize Bootstrap tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    // Set max date for date inputs
    document.querySelectorAll('input[type="date"]').forEach(input => {
        input.setAttribute('max', today);
    });

    // Update progress bar
    function updateProgressBar() {
        const totalFields = form.querySelectorAll('input, select, textarea').length;
        const filledFields = Array.from(form.querySelectorAll('input, select, textarea')).filter(field => field.value.trim() !== '').length;
        const progress = (filledFields / totalFields) * 100;
        const progressBar = document.getElementById('progressBar');
        progressBar.style.width = `${progress}%`;
        progressBar.setAttribute('aria-valuenow', progress);
    }

    // Update children fields
    function updateChildrenFields() {
        if (!numChildrenInput || !childrenAgesDiv) return;
        const existingAges = {};
        for (let i = 1; i <= 20; i++) {
            const input = document.querySelector(`input[name=child_${i}_age]`);
            if (input && input.value) {
                existingAges[`child_${i}_age`] = input.value;
            }
        }
        const num = parseInt(numChildrenInput.value) || 0;
        childrenAgesDiv.innerHTML = '';
        if (num > 20) {
            alert('Number of children cannot exceed 20.');
            numChildrenInput.value = 20;
            return;
        }
        for (let i = 1; i <= num; i++) {
            const div = document.createElement('div');
            div.className = 'mb-2';
            const existingValue = existingAges[`child_${i}_age`] || '';
            div.innerHTML = `
                <label for="child_${i}_age" class="form-label">Child ${i} Age</label>
                <input type="number" class="form-control" id="child_${i}_age" name="child_${i}_age" value="${existingValue}" min="0" max="100" title="Age must be between 0 and 100" data-bs-toggle="tooltip" data-bs-placement="right">
            `;
            childrenAgesDiv.appendChild(div);
            new bootstrap.Tooltip(div.querySelector('input'));
        }
        updateProgressBar();
    }

    // Toggle smoking details
    function updateSmokingDetails() {
        if (smokingDetails) {
            smokingDetails.classList.toggle('d-none', !document.getElementById('smoking_yes')?.checked);
        }
        updateProgressBar();
    }

    // Toggle alcohol details
    function updateAlcoholDetails() {
        if (alcoholDetails) {
            alcoholDetails.classList.toggle('d-none', !document.getElementById('alcohol_yes')?.checked);
        }
        updateProgressBar();
    }

    // Initialize visibility and progress
    updateSmokingDetails();
    updateAlcoholDetails();
    updateChildrenFields();

    // Event listeners
    if (numChildrenInput) {
        numChildrenInput.addEventListener('change', updateChildrenFields);
    }
    smokingRadios.forEach(radio => radio.addEventListener('change', updateSmokingDetails));
    alcoholRadios.forEach(radio => radio.addEventListener('change', updateAlcoholDetails));
    drugRadios.forEach(radio => radio.addEventListener('change', updateProgressBar));
    form.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('input', updateProgressBar);
    });

    // Form validation
    form.addEventListener('submit', (event) => {
        const errors = [];
        const errorList = document.getElementById('errorList');
        const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));

        // Required fields
        if (!form.full_name.value) errors.push('Full Name is required.');
        if (!form.aadhaar_number.value) errors.push('Aadhaar Number is required.');
        if (!form.date_of_discussion.value) errors.push('Date of Discussion is required.');
        if (!form.date_of_consultancy.value) errors.push('Date of Consultancy is required.');

        // Pattern validations
        if (form.aadhaar_number.value && !/^\d{12}$/.test(form.aadhaar_number.value)) {
            errors.push('Aadhaar Number must be 12 digits.');
        }
        if (form.contact_number.value && !/^\d{10}$/.test(form.contact_number.value)) {
            errors.push('Contact Number must be 10 digits.');
        }
        if (form.pin_code.value && !/^\d{6}$/.test(form.pin_code.value)) {
            errors.push('PIN Code must be 6 digits.');
        }
        if (form.email_address.value && !/^[\w\.-]+@[\w\.-]+\.\w+$/.test(form.email_address.value)) {
            errors.push('Invalid email address.');
        }
        if (form.height.value && !/^\d+(\.\d+)? (cm|ft)$/.test(form.height.value)) {
            errors.push('Height must be in format "number cm" or "number ft".');
        }
        if (form.weight.value && !/^\d+(\.\d+)? (kg|lbs)$/.test(form.weight.value)) {
            errors.push('Weight must be in format "number kg" or "number lbs".');
        }

        // Number range validations
        if (form.num_children.value && (parseInt(form.num_children.value) < 0 || parseInt(form.num_children.value) > 20)) {
            errors.push('Number of children must be between 0 and 20.');
        }
        if (form.smoking_yes?.checked && (!form.smoking_frequency.value || !form.cigarettes_per_day.value)) {
            errors.push('Smoking Frequency and Cigarettes per Day are required if smoking is Yes.');
        }
        if (form.alcohol_yes?.checked && (!form.alcohol_frequency.value || !form.alcohol_amount.value)) {
            errors.push('Alcohol Frequency and Amount are required if alcohol consumption is Yes.');
        }

        // Date validations
        ['date_of_birth', 'last_medical_exam', 'date_of_discussion', 'date_of_consultancy'].forEach(field => {
            if (form[field].value && form[field].value > today) {
                errors.push(`${field.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())} cannot be in the future.`);
            }
        });

        // Blood test result validations
        ['hiv_results', 'hbv_results', 'hcv_results', 'vdrl_results'].forEach(field => {
            if (form[field].value && !['Negative', 'Positive', 'Pending', ''].includes(form[field].value)) {
                errors.push(`${field.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())} must be 'Negative', 'Positive', or 'Pending'.`);
            }
        });

        // Child age validations
        const numChildren = parseInt(form.num_children.value) || 0;
        for (let i = 1; i <= numChildren; i++) {
            const ageInput = document.querySelector(`input[name=child_${i}_age]`);
            if (ageInput && ageInput.value) {
                const age = parseInt(ageInput.value);
                if (isNaN(age) || age < 0 || age > 100) {
                    errors.push(`Child ${i} Age must be between 0 and 100.`);
                }
            }
        }

        if (errors.length > 0) {
            event.preventDefault();
            errorList.innerHTML = errors.map(error => `<li>${error}</li>`).join('');
            errorModal.show();
        }
    });
});