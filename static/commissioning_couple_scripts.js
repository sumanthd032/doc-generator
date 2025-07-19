document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('commissioningCoupleForm');
    const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
    const errorList = document.getElementById('errorList');
    const progressBar = document.getElementById('progressBar');

    function updateProgress() {
        const inputs = form.querySelectorAll('input, textarea, select');
        let filled = 0;
        inputs.forEach(input => {
            if (input.value) filled++;
        });
        const total = inputs.length;
        const percentage = Math.round((filled / total) * 100);
        progressBar.style.width = `${percentage}%`;
        progressBar.setAttribute('aria-valuenow', percentage);
    }

    function showErrors(errors) {
        errorList.innerHTML = errors.map(e => `<li>${e}</li>`).join('');
        errorModal.show();
    }

    function initializeTooltips() {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.forEach(tooltipTriggerEl => {
            new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    function validateForm(event) {
        event.preventDefault();
        const errors = [];
        if (!form.female_name.value) errors.push('Female Name is required.');
        if (!form.male_name.value) errors.push('Male Name is required.');
        if (!form.female_aadhaar.value) errors.push('Female Aadhaar Number is required.');
        if (!form.female_dob.value) errors.push('Female Date of Birth is required.');
        if (!form.male_dob.value) errors.push('Male Date of Birth is required.');
        if (!form.ivf_name.value) errors.push('IVF Name is required.');
        if (!form.ivf_address.value) errors.push('IVF Address is required.');
        if (!form.doctor_name.value) errors.push('Doctor Name is required.');
        if (form.female_aadhaar.value && !/^\d{12}$/.test(form.female_aadhaar.value)) errors.push('Female Aadhaar Number must be 12 digits.');
        if (form.pin_code.value && !/^\d{6}$/.test(form.pin_code.value)) errors.push('PIN Code must be 6 digits.');
        if (form.female_age.value && (parseInt(form.female_age.value) < 18 || parseInt(form.female_age.value) > 100)) errors.push('Female Age must be between 18 and 100.');
        if (form.male_age.value && (parseInt(form.male_age.value) < 18 || parseInt(form.male_age.value) > 100)) errors.push('Male Age must be between 18 and 100.');
        const today = new Date().toISOString().split('T')[0];
        ['female_dob', 'male_dob'].forEach(field => {
            if (form[field].value && form[field].value > today) {
                errors.push(`${field.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())} cannot be in the future.`);
            }
        });

        if (errors.length > 0) {
            showErrors(errors);
        } else {
            form.submit();
        }
    }

    form.addEventListener('input', updateProgress);
    form.addEventListener('submit', validateForm);

    // Initialize
    updateProgress();
    initializeTooltips();

    // Show modal if errors exist from server-side
    if (window.location.hash === '#errorModal') {
        errorModal.show();
    }
});