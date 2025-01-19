// Function to toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling.querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Function to show popup message
function showPopup(message, isSuccess) {
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';

    const popup = document.createElement('div');
    popup.className = `custom-popup ${isSuccess ? 'success-popup' : 'error-popup'}`;
    popup.textContent = message;

    document.body.appendChild(overlay);
    document.body.appendChild(popup);

    // If success, redirect after showing message
    if (isSuccess) {
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    } else {
        // If error, just remove the popup after delay
        setTimeout(() => {
            overlay.remove();
            popup.remove();
        }, 2000);
    }
}

// Function to validate email format
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Function to validate phone number
function isValidPhone(phone) {
    return /^\d{10}$/.test(phone);
}

// Function to store user data
function storeUserData(userData) {
    // Get existing users or initialize empty array
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if username already exists
    if (users.some(user => user.username === userData.username)) {
        return false;
    }

    // Add new user
    users.push(userData);

    // Save back to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    return true;
}

// Add form submit event listener
document.getElementById('registrationForm').addEventListener('submit', function (e) {
    // Prevent default form submission
    e.preventDefault();

    const registerBtn = document.querySelector('button[type="submit"]');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const registerText = document.getElementById('registerText');

    // Get form values
    const formData = {
        fullName: document.getElementById('fullName').value.trim(),
        username: document.getElementById('username').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        address: document.getElementById('address').value.trim(),
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirmPassword').value
    };

    // Validate inputs
    if (formData.password !== formData.confirmPassword) {
        showPopup('Passwords do not match!', false);
        return;
    }

    if (!isValidEmail(formData.email)) {
        showPopup('Please enter a valid email address!', false);
        return;
    }

    if (!isValidPhone(formData.phone)) {
        showPopup('Please enter a valid 10-digit phone number!', false);
        return;
    }

    // Show loading state
    registerBtn.disabled = true;
    loadingSpinner.style.display = 'inline-block';
    registerText.textContent = 'Registering...';

    // Simulate API call
    setTimeout(() => {
        // Remove confirmPassword from data to be stored
        delete formData.confirmPassword;

        // Try to store user data
        if (storeUserData(formData)) {
            // Show success message and redirect
            showPopup('Registration successful! Redirecting to login...', true);

            // Clear the form
            document.getElementById('registrationForm').reset();
        } else {
            showPopup('Username already exists!', false);

            // Reset button state
            registerBtn.disabled = false;
            loadingSpinner.style.display = 'none';
            registerText.textContent = 'Register';
        }
    }, 1500);
});

// Optional: Add input validation as user types
document.getElementById('phone').addEventListener('input', function (e) {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
});