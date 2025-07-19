document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('coupleForm');
    if (!form) return;

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

    // Initialize progress
    updateProgressBar();

    // Event listeners
    form.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('input', updateProgressBar);
    });

    // Form validation
    form.addEventListener('submit', (event) => {
        const errors = [];
        const errorList = document.getElementById('errorList');
        const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));

        // Required fields
        ['female_name', 'female_dob', 'female_aadhaar', 'male_name', 'male_dob', 'ivf_name', 'doctor_name'].forEach(field => {
            if (!form[field].value) errors.push(`${field.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())} is required.`);
        });

        // Pattern validations
        if (form.female_aadhaar.value && !/^\d{12}$/.test(form.female_aadhaar.value)) {
            errors.push('Female Aadhaar Number must be 12 digits.');
        }
        if (form.pin_code.value && !/^\d{6}$/.test(form.pin_code.value)) {
            errors.push('PIN Code must be 6 digits.');
        }

        // Number range validations
        ['female_age', 'male_age'].forEach(field => {
            if (form[field].value && (parseInt(form[field].value) < 18 || parseInt(form[field].value) > 100)) {
                errors.push(`${field.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())} must be between 18 and 100.`);
            }
        });

        // Date validations
        ['female_dob', 'male_dob'].forEach(field => {
            if (form[field].value && form[field].value > today) {
                errors.push(`${field.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())} cannot be in the future.`);
            }
        });

        if (errors.length > 0) {
            event.preventDefault();
            errorList.innerHTML = errors.map(error => `<li>${error}</li>`).join('');
            errorModal.show();
        }
    });
});