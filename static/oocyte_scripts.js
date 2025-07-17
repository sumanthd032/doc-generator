document.addEventListener('DOMContentLoaded', () => {
    const numChildrenInput = document.getElementById('num_children');
    const childrenAgesDiv = document.getElementById('children_ages');
    const form = document.getElementById('oocyteDonorForm');
    const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
    const errorList = document.getElementById('errorList');
    const progressBar = document.getElementById('progressBar');

    function updateChildrenFields() {
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
            showErrors(['Number of children cannot exceed 20.']);
            numChildrenInput.value = 20;
            return;
        }
        for (let i = 1; i <= num; i++) {
            const div = document.createElement('div');
            div.className = 'mb-3';
            const existingValue = existingAges[`child_${i}_age`] || '';
            div.innerHTML = `
                <label for="child_${i}_age" class="form-label">Child ${i} Age</label>
                <input type="number" class="form-control" id="child_${i}_age" name="child_${i}_age" value="${existingValue}" min="0" max="100" title="Age must be between 0 and 100" data-bs-toggle="tooltip" data-bs-placement="right">
            `;
            childrenAgesDiv.appendChild(div);
        }
        initializeTooltips();
    }

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
        if (!form.full_name.value) errors.push('Full Name is required.');
        if (!form.aadhaar_number.value) errors.push('Aadhaar Number is required.');
        if (!form.date_of_discussion.value) errors.push('Date of Discussion is required.');
        if (!form.date_of_consultancy.value) errors.push('Date of Consultancy is required.');
        if (form.aadhaar_number.value && !/^\d{12}$/.test(form.aadhaar_number.value)) errors.push('Aadhaar Number must be 12 digits.');
        if (form.num_children.value && (parseInt(form.num_children.value) < 0 || parseInt(form.num_children.value) > 20)) errors.push('Number of children must be between 0 and 20.');
        const today = new Date().toISOString().split('T')[0];
        ['date_of_birth', 'date_of_discussion', 'date_of_consultancy'].forEach(field => {
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

    numChildrenInput.addEventListener('input', () => {
        updateChildrenFields();
        updateProgress();
    });
    form.addEventListener('input', updateProgress);
    form.addEventListener('submit', validateForm);

    // Initialize
    updateChildrenFields();
    updateProgress();
    initializeTooltips();

    // Show modal if errors exist from server-side
    if (window.location.hash === '#errorModal') {
        errorModal.show();
    }
});