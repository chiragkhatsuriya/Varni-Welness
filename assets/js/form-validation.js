// Form Validation
class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (!this.form) return;
        
        this.fields = this.form.querySelectorAll('[data-validate]');
        this.submitButton = this.form.querySelector('[type="submit"]');
        this.init();
    }
    
    init() {
        // Add event listeners to form fields
        this.fields.forEach(field => {
            // Validate on blur (when user leaves field)
            field.addEventListener('blur', () => this.validateField(field));
            
            // Clear error when user starts typing
            field.addEventListener('input', () => {
                if (field.classList.contains('error')) {
                    this.clearError(field);
                }
            });
        });
        
        // Validate all fields on form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            this.fields.forEach(field => {
                if (!this.validateField(field)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                this.submitForm();
            } else {
                // Scroll to first error
                const firstError = this.form.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }
            }
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.getAttribute('name') || 'This field';
        const fieldType = field.getAttribute('type');
        const isRequired = field.hasAttribute('required');
        const minLength = field.getAttribute('minlength') || 0;
        const maxLength = field.getAttribute('maxlength') || Infinity;
        const pattern = field.getAttribute('pattern');
        
        // Clear previous errors
        this.clearError(field);
        
        // Check required field
        if (isRequired && !value) {
            return this.setError(field, `${fieldName} is required`);
        }
        
        // Skip further validation if field is empty and not required
        if (!isRequired && !value) return true;
        
        // Check min length
        if (value.length < minLength) {
            return this.setError(field, `${fieldName} must be at least ${minLength} characters`);
        }
        
        // Check max length
        if (value.length > maxLength) {
            return this.setError(field, `${fieldName} must be less than ${maxLength} characters`);
        }
        
        // Check pattern
        if (pattern) {
            const regex = new RegExp(pattern);
            if (!regex.test(value)) {
                const customMessage = field.getAttribute('data-pattern-message');
                return this.setError(field, customMessage || `Please enter a valid ${fieldName.toLowerCase()}`);
            }
        }
        
        // Email validation
        if (fieldType === 'email' && !this.isValidEmail(value)) {
            return this.setError(field, 'Please enter a valid email address');
        }
        
        // Password confirmation
        if (field.hasAttribute('data-confirm')) {
            const originalField = this.form.querySelector(`[name="${field.getAttribute('data-confirm')}"]`);
            if (originalField && originalField.value !== value) {
                return this.setError(field, 'Passwords do not match');
            }
        }
        
        // If all validations pass
        this.setSuccess(field);
        return true;
    }
    
    setError(field, message) {
        const formGroup = field.closest('.form-group') || field.parentElement;
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        field.classList.add('error');
        formGroup.classList.add('has-error');
        formGroup.appendChild(errorElement);
        
        return false;
    }
    
    clearError(field) {
        const formGroup = field.closest('.form-group') || field.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        field.classList.remove('error');
        formGroup.classList.remove('has-error');
    }
    
    setSuccess(field) {
        const formGroup = field.closest('.form-group') || field.parentElement;
        field.classList.remove('error');
        formGroup.classList.remove('has-error');
        formGroup.classList.add('has-success');
    }
    
    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
    
    async submitForm() {
        if (this.submitButton) {
            const originalText = this.submitButton.innerHTML;
            this.submitButton.disabled = true;
            this.submitButton.innerHTML = '<div class="spinner"></div> Sending...';
            
            try {
                // Here you would typically send form data to your server
                const formData = new FormData(this.form);
                const formObject = {};
                
                formData.forEach((value, key) => {
                    formObject[key] = value;
                });
                
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                this.showSuccessMessage();
                
                // Reset form
                this.form.reset();
                
            } catch (error) {
                console.error('Form submission error:', error);
                this.showErrorMessage('An error occurred. Please try again.');
            } finally {
                if (this.submitButton) {
                    this.submitButton.disabled = false;
                    this.submitButton.innerHTML = originalText;
                }
            }
        }
    }
    
    showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.textContent = this.form.getAttribute('data-success-message') || 'Thank you! Your message has been sent successfully.';
        
        // Insert success message after form
        this.form.parentNode.insertBefore(successMessage, this.form.nextSibling);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.add('fade-out');
            setTimeout(() => {
                successMessage.remove();
            }, 300);
        }, 5000);
    }
    
    showErrorMessage(message) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'form-error';
        errorMessage.textContent = message;
        
        // Insert error message before form
        this.form.parentNode.insertBefore(errorMessage, this.form);
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            errorMessage.classList.add('fade-out');
            setTimeout(() => {
                errorMessage.remove();
            }, 300);
        }, 5000);
    }
}

// Initialize form validators when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        new FormValidator('contactForm');
    }
    
    // Initialize newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        new FormValidator('newsletter-form');
    }
    
    // Initialize registration form if it exists
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        new FormValidator('register-form');
    }
    
    // Initialize login form if it exists
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        new FormValidator('login-form');
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = FormValidator;
}
