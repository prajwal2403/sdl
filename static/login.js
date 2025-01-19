// Function to toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const icon = document.querySelector('.password-toggle i');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Function to show messages
function showMessage(message, isSuccess) {
    const errorDiv = document.getElementById('errorMessage');
    const successDiv = document.getElementById('successMessage');

    if (isSuccess) {
        successDiv.textContent = message;
        successDiv.style.display = 'block';
        errorDiv.style.display = 'none';
    } else {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        successDiv.style.display = 'none';
    }
}

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const loginBtn = document.querySelector('button[type="submit"]');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const loginText = document.getElementById('loginText');

    // Get form values
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Show loading state
    loginBtn.disabled = true;
    loadingSpinner.style.display = 'inline-block';
    loginText.textContent = 'Logging in...';

    // Get stored users
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Find user
    const user = users.find(u => u.username === username && u.password === password);

    // Simulate API call
    setTimeout(() => {
        if (user) {
            // Login successful
            showMessage('Login successful! Redirecting...', true);

            // Store login state if remember me is checked
            if (rememberMe) {
                localStorage.setItem('loggedInUser', username);
            }

            // Redirect to dashboard or home page
            setTimeout(() => {
                window.location.href = 'main.html'; // Change this to your dashboard page
            }, 1500);
        } else {
            // Login failed
            showMessage('Invalid username or password!', false);
            loginBtn.disabled = false;
            loadingSpinner.style.display = 'none';
            loginText.textContent = 'Login';
        }
    }, 1500);
});

// Check for remembered user
window.addEventListener('load', function () {
    const rememberedUser = localStorage.getItem('loggedInUser');
    if (rememberedUser) {
        document.getElementById('username').value = rememberedUser;
        document.getElementById('rememberMe').checked = true;
    }
});