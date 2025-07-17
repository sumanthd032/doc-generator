document.addEventListener('DOMContentLoaded', () => {
    const numChildrenInput = document.getElementById('num_children');
    const childrenAgesDiv = document.getElementById('children_ages');
    const form = document.getElementById('oocyteDonorForm');

    function updateChildrenFields() {
        // Collect existing child age values before clearing
        const existingAges = {};
        for (let i = 1; i <= 20; i++) {
            const input = document.querySelector(`input[name=child_${i}_age]`);
            if (input && input.value) {
                existingAges[`child_${i}_age`] = input.value;
            }
        }

        // Clear and update children fields
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
                <input type="number" class="form-control" id="child_${i}_age" name="child_${i}_age" value="${existingValue}" min="0" max="100" title="Age must be between 0 and 100">
            `;
            childrenAgesDiv.appendChild(div);
        }
    }

    function validateForm(event) {
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
            event.preventDefault();
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert alert-danger alert-dismissible fade show';
            alertDiv.innerHTML = `<ul>${errors.map(e => `<li>${e}</li>`).join('')}</ul><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
            form.prepend(alertDiv);
            setTimeout(() => alertDiv.remove(), 5000);
        }
    }

    numChildrenInput.addEventListener('input', updateChildrenFields);
    form.addEventListener('submit', validateForm);

    // Initialize fields
    updateChildrenFields();
});