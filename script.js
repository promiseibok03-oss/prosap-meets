// Form Toggle Functionality
const toggleFormLinks = document.querySelectorAll('.toggle-form');
const formWrappers = document.querySelectorAll('.form-wrapper');

toggleFormLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetForm = link.getAttribute('data-form');
        
        // Hide all forms
        formWrappers.forEach(form => {
            form.classList.remove('active');
        });
        
        // Show target form
        const targetElement = document.getElementById(`${targetForm}-form`);
        if (targetElement) {
            targetElement.classList.add('active');
        }
    });
});

// Form Submission Handlers
const signupForm = document.querySelector('#signup-form .auth-form');
const loginForm = document.querySelector('#login-form .auth-form');

// Sign Up Form Handler
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        
        // Validation
        if (!name) {
            showAlert('Please enter your full name', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showAlert('Please enter a valid email address', 'error');
            return;
        }
        
        if (password.length < 8) {
            showAlert('Password must be at least 8 characters long', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            showAlert('Passwords do not match', 'error');
            return;
        }
        
        // Simulate sign up (replace with API call)
        console.log('Sign up attempt:', { name, email, password });
        showAlert(`Welcome, ${name}! Please check your email to verify your account.`, 'success');
        
        // Reset form
        signupForm.reset();
        
        // In production, redirect to email verification page or login
        setTimeout(() => {
            // Redirect to main page or verification page
            // window.location.href = '/email-verification';
        }, 2000);
    });
}

// Login Form Handler
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        const remember = document.getElementById('remember-checkbox').checked;
        
        // Validation
        if (!isValidEmail(email)) {
            showAlert('Please enter a valid email address', 'error');
            return;
        }
        
        if (!password) {
            showAlert('Please enter your password', 'error');
            return;
        }
        
        // Simulate login (replace with API call)
        console.log('Login attempt:', { email, password, remember });
        showAlert('Logging in...', 'success');
        
        // In production, authenticate with backend
        setTimeout(() => {
            // Store remember-me preference
            if (remember) {
                localStorage.setItem('rememberEmail', email);
            } else {
                localStorage.removeItem('rememberEmail');
            }
            
            // Redirect to main dashboard
            // window.location.href = '/dashboard';
            showAlert('Login successful! Redirecting to dashboard...', 'success');
        }, 1500);
    });
}

// Google OAuth Button Handlers
const googleButtons = document.querySelectorAll('.btn-google');

googleButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // In production, initialize Google OAuth flow
        console.log('Google OAuth initiated');
        showAlert('Google Sign-In coming soon!', 'info');
        
        // Placeholder for Google OAuth
        // window.location.href = '/auth/google';
    });
});

// Email Validation Helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Alert System
function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    // Add to body
    document.body.appendChild(alert);
    
    // Animate in
    setTimeout(() => {
        alert.classList.add('show');
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        alert.classList.remove('show');
        setTimeout(() => {
            alert.remove();
        }, 300);
    }, 5000);
}

// Add Alert Styles Dynamically
const alertStyles = document.createElement('style');
alertStyles.textContent = `
    .alert {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 500;
        z-index: 9999;
        opacity: 0;
        transform: translateX(400px);
        transition: all 0.3s ease;
        max-width: 400px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        word-wrap: break-word;
    }
    
    .alert.show {
        opacity: 1;
        transform: translateX(0);
    }
    
    .alert-success {
        background: linear-gradient(135deg, #00d66a, #00a84f);
        color: white;
    }
    
    .alert-error {
        background: linear-gradient(135deg, #ff4757, #ff1744);
        color: white;
    }
    
    .alert-info {
        background: linear-gradient(135deg, #00d4ff, #0099ff);
        color: white;
    }
    
    @media (max-width: 480px) {
        .alert {
            left: 20px;
            right: 20px;
            max-width: none;
        }
    }
`;
document.head.appendChild(alertStyles);

// Pre-fill email if remember-me was used
window.addEventListener('load', () => {
    const savedEmail = localStorage.getItem('rememberEmail');
    if (savedEmail) {
        const loginEmailInput = document.getElementById('login-email');
        if (loginEmailInput) {
            loginEmailInput.value = savedEmail;
        }
    }
});

// Log app initialization
console.log('🚀 Prosap Meets - Authentication System Initialized');
