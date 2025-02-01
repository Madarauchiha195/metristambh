// Form validation and submission handling
function handleSubmit(event) {
    event.preventDefault();
    
    // Reset error messages
    clearErrors();
    
    // Get form elements
    const form = event.target;
    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();
    
    // Validate form
    let isValid = true;
    
    if (firstName.length < 2) {
        showError('firstNameError', 'First name must be at least 2 characters');
        isValid = false;
    }
    
    if (lastName.length < 2) {
        showError('lastNameError', 'Last name must be at least 2 characters');
        isValid = false;
    }
    
    if (!isValidEmail(email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (subject.length < 5) {
        showError('subjectError', 'Subject must be at least 5 characters');
        isValid = false;
    }
    
    if (message.length < 10) {
        showError('messageError', 'Message must be at least 10 characters');
        isValid = false;
    }
    
    if (isValid) {
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const buttonText = submitButton.querySelector('.cf-button-text');
        const spinner = submitButton.querySelector('.cf-spinner');
        
        submitButton.disabled = true;
        buttonText.textContent = 'SENDING...';
        spinner.classList.remove('cf-hidden');
        
        // Simulate form submission
        setTimeout(() => {
            // Reset form and loading state
            form.reset();
            submitButton.disabled = false;
            buttonText.textContent = 'SUBMIT';
            spinner.classList.add('cf-hidden');
            
            // Show success message
            showToast('Message sent successfully!', 'success');
        }, 2000);
    }
    
    return false;
}

// Helper functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.classList.add('cf-error-message');
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.cf-error-message');
    errorElements.forEach(element => element.textContent = '');
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toast.className = 'cf-toast';
    toast.classList.add(type);
    toastMessage.textContent = message;
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Form input validation on blur
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('blur', function() {
        const id = this.id;
        const value = this.value.trim();
        
        switch(id) {
            case 'firstName':
            case 'lastName':
                if (value.length < 2) {
                    showError(`${id}Error`, `${id === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters`);
                }
                break;
            case 'email':
                if (!isValidEmail(value)) {
                    showError('emailError', 'Please enter a valid email address');
                }
                break;
            case 'subject':
                if (value.length < 5) {
                    showError('subjectError', 'Subject must be at least 5 characters');
                }
                break;
            case 'message':
                if (value.length < 10) {
                    showError('messageError', 'Message must be at least 10 characters');
                }
                break;
        }
    });
    
    // Clear error message when user starts typing
    input.addEventListener('input', function() {
        const errorElement = document.getElementById(`${this.id}Error`);
        if (errorElement) {
            errorElement.textContent = '';
        }
    });
});