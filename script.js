document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Initialize Google Map (Basic Implementation)
    function initMap() {
        // This would be replaced with actual Google Maps API implementation
        // For demo purposes, we'll just show a placeholder message
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
            mapContainer.innerHTML = `
                <div style="padding: 2rem; text-align: center; color: var(--gray-color);">
                    <i class="fas fa-map-marker-alt" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>Google Maps integration would appear here</p>
                    <small>(Requires valid API key)</small>
                </div>
            `;
        }
    }

    window.initMap = initMap;

    // Form validation and submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Reset previous states
        clearErrors();
        formStatus.style.display = 'none';

        // Validate form
        const isValid = validateForm();

        if (isValid) {
            // Simulate form submission
            simulateSubmission()
                .then(() => {
                    showSuccess('Message sent successfully!');
                    contactForm.reset();
                })
                .catch(() => {
                    showError('Failed to send message. Please try again.');
                });
        }
    });

    // Form validation logic
    function validateForm() {
        let isValid = true;

        // Name validation
        const nameField = document.getElementById('name');
        if (!nameField.value.trim()) {
            showError(nameField, 'Full name is required');
            isValid = false;
        }

        // Email validation
        const emailField = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailField.value.trim()) {
            showError(emailField, 'Email address is required');
            isValid = false;
        } else if (!emailRegex.test(emailField.value)) {
            showError(emailField, 'Please enter a valid email address');
            isValid = false;
        }

        // Inquiry type validation
        const inquiryField = document.getElementById('inquiry');
        if (!inquiryField.value) {
            showError(inquiryField, 'Please select an inquiry type');
            isValid = false;
        }

        // Message validation
        const messageField = document.getElementById('message');
        if (!messageField.value.trim()) {
            showError(messageField, 'Message is required');
            isValid = false;
        }

        return isValid;
    }

    function showError(field, message) {
        const formGroup = field.closest('.form-group');
        if (formGroup) {
            formGroup.classList.add('error');
            const errorElement = formGroup.querySelector('.error-message');
            if (errorElement) {
                errorElement.textContent = message;
                errorElement.style.display = 'block';
            }
        }
    }

    function clearErrors() {
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
            const errorElement = group.querySelector('.error-message');
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        });
    }

    function simulateSubmission() {
        return new Promise((resolve, reject) => {
            // Simulate API request delay
            setTimeout(() => {
                // In real implementation, replace with actual fetch/axios call
                const isSuccess = Math.random() > 0.2; // 80% success rate simulation
                isSuccess ? resolve() : reject();
            }, 1000);
        });
    }

    function showSuccess(message) {
        formStatus.className = 'success';
        formStatus.textContent = message;
        formStatus.style.display = 'block';
    }

    function showError(message) {
        formStatus.className = 'error';
        formStatus.textContent = message;
        formStatus.style.display = 'block';
    }
});