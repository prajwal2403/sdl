// login.js
document.addEventListener('DOMContentLoaded', function () {
    // Initialize saved username if remember me was checked
    const savedUsername = localStorage.getItem('rememberedUsername');
    if (savedUsername) {
        document.getElementById('username').value = savedUsername;
        document.getElementById('rememberMe').checked = true;
    }

    document.getElementById('loginForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const rememberMe = document.getElementById('rememberMe').checked;
        const errorMessage = document.getElementById('errorMessage');
        const successMessage = document.getElementById('successMessage');
        const loginText = document.getElementById('loginText');
        const loadingSpinner = document.getElementById('loadingSpinner');

        // Hide any existing messages
        errorMessage.style.display = 'none';
        successMessage.style.display = 'none';

        // Validate input
        if (!username || !password) {
            errorMessage.textContent = 'Please enter both username and password.';
            errorMessage.style.display = 'block';
            return;
        }

        // Show loading state
        loginText.textContent = 'Logging in...';
        loadingSpinner.style.display = 'inline-block';

        // Simulate API call delay
        setTimeout(() => {
            // Test user credentials
            const testUsers = [
                { username: 'testuser', password: 'password123' },
                { username: 'admin', password: 'admin123' }
            ];

            const user = testUsers.find(user =>
                user.username === username && user.password === password
            );

            if (user) {
                // Handle remember me
                if (rememberMe) {
                    localStorage.setItem('rememberedUsername', username);
                } else {
                    localStorage.removeItem('rememberedUsername');
                }

                // Show success message
                successMessage.textContent = 'Login successful! Redirecting...';
                successMessage.style.display = 'block';

                // Store login state
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('currentUser', username);

                // Redirect after short delay
                setTimeout(() => {
                    window.location.href = 'main.html';
                }, 1000);
            } else {
                errorMessage.textContent = 'Invalid username or password.';
                errorMessage.style.display = 'block';
                loginText.textContent = 'Login';
                loadingSpinner.style.display = 'none';
            }
        }, 1000);
    });
});

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.querySelector('.password-toggle i');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

// Protect routes
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (!isLoggedIn && !window.location.href.includes('login.html')) {
        window.location.href = 'login.html';
    }
}

// Run auth check when page loads
checkAuth();