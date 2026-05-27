// DOM Elements
const signupForm = document.getElementById('signupForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const termsCheckbox = document.getElementById('terms');
const togglePasswordBtn = document.getElementById('togglePassword');
const googleSignupBtn = document.getElementById('googleSignup');
const githubSignupBtn = document.getElementById('githubSignup');
const alertContainer = document.getElementById('alertContainer');

// Error message elements
const fullNameError = document.getElementById('fullNameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const termsError = document.getElementById('termsError');

// Password strength meter
const strengthMeter = document.getElementById('strengthMeter');

// ============================================
// PASSWORD VISIBILITY TOGGLE
// ============================================
togglePasswordBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    togglePasswordBtn.textContent = type === 'password' ? '👁️' : '🙈';
});

// ============================================
// REAL-TIME VALIDATION
// ============================================

// Full Name Validation
fullNameInput.addEventListener('blur', () => validateFullName());
fullNameInput.addEventListener('input', () => {
    if (fullNameError.textContent) validateFullName();
});

function validateFullName() {
    const name = fullNameInput.value.trim();
    
    if (!name) {
        fullNameError.textContent = 'Full name is required';
        return false;
    }
    
    if (name.length < 2) {
        fullNameError.textContent = 'Name must be at least 2 characters';
        return false;
    }
    
    if (!/^[a-zA-Z\s'-]+$/.test(name)) {
        fullNameError.textContent = 'Name can only contain letters, spaces, hyphens, and apostrophes';
        return false;
    }
    
    fullNameError.textContent = '';
    return true;
}

// Email Validation
emailInput.addEventListener('blur', () => validateEmail());
emailInput.addEventListener('input', () => {
    if (emailError.textContent) validateEmail();
});

function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        emailError.textContent = 'Email is required';
        return false;
    }
    
    if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address';
        return false;
    }
    
    emailError.textContent = '';
    return true;
}

// Password Validation & Strength Meter
passwordInput.addEventListener('input', () => {
    validatePassword();
    updatePasswordStrength();
});

passwordInput.addEventListener('blur', () => validatePassword());

function validatePassword() {
    const password = passwordInput.value;
    
    if (!password) {
        passwordError.textContent = 'Password is required';
        return false;
    }
    
    if (password.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters';
        return false;
    }
    
    if (!/(?=.*[a-z])/.test(password)) {
        passwordError.textContent = 'Password must contain lowercase letters';
        return false;
    }
    
    if (!/(?=.*[A-Z])/.test(password)) {
        passwordError.textContent = 'Password must contain uppercase letters';
        return false;
    }
    
    if (!/(?=.*\d)/.test(password)) {
        passwordError.textContent = 'Password must contain numbers';
        return false;
    }
    
    if (!/(?=.*[@$!%*?&])/.test(password)) {
        passwordError.textContent = 'Password must contain special characters (@$!%*?&)';
        return false;
    }
    
    passwordError.textContent = '';
    return true;
}

// Password Strength Meter
function updatePasswordStrength() {
    const password = passwordInput.value;
    const strengthMeterEl = document.getElementById('strengthMeter');
    
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/(?=.*[a-z])(?=.*[A-Z])/.test(password)) strength++;
    if (/(?=.*\d)/.test(password)) strength++;
    if (/(?=.*[@$!%*?&])/.test(password)) strength++;
    
    strengthMeterEl.classList.remove('weak', 'medium', 'strong');
    
    if (strength < 2) {
        strengthMeterEl.classList.add('weak');
    } else if (strength < 4) {
        strengthMeterEl.classList.add('medium');
    } else {
        strengthMeterEl.classList.add('strong');
    }
}

// Confirm Password Validation
confirmPasswordInput.addEventListener('blur', () => validateConfirmPassword());
confirmPasswordInput.addEventListener('input', () => {
    if (confirmPasswordError.textContent) validateConfirmPassword();
});

function validateConfirmPassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    if (!confirmPassword) {
        confirmPasswordError.textContent = 'Please confirm your password';
        return false;
    }
    
    if (password !== confirmPassword) {
        confirmPasswordError.textContent = 'Passwords do not match';
        return false;
    }
    
    confirmPasswordError.textContent = '';
    return true;
}

// Terms Validation
termsCheckbox.addEventListener('change', () => {
    if (termsCheckbox.checked) {
        termsError.textContent = '';
    }
});

function validateTerms() {
    if (!termsCheckbox.checked) {
        termsError.textContent = 'You must agree to the Terms & Conditions';
        return false;
    }
    
    termsError.textContent = '';
    return true;
}

// ============================================
// FORM SUBMISSION
// ============================================
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isFullNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isTermsValid = validateTerms();
    
    if (!isFullNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid || !isTermsValid) {
        showAlert('Please fix all errors before submitting', 'error');
        return;
    }
    
    // Prepare data
    const signupData = {
        fullName: fullNameInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value,
    };
    
    try {
        // Disable button during submission
        const submitBtn = signupForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Creating Account...</span>';
        
        // Simulate API call (replace with actual backend)
        await simulateApiCall(signupData);
        
        showAlert(`Welcome, ${signupData.fullName}! Your account has been created successfully. Redirecting to login...`, 'success');
        
        // Reset form
        signupForm.reset();
        strengthMeter.classList.remove('weak', 'medium', 'strong');
        
        // Redirect after 2 seconds
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        
    } catch (error) {
        showAlert(`Error: ${error.message}`, 'error');
        const submitBtn = signupForm.querySelector('button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Create Account</span><span class="btn-arrow">→</span>';
    }
});

// Simulate API call
function simulateApiCall(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Check for duplicate email (simulated)
            if (data.email === 'exists@example.com') {
                reject(new Error('This email is already registered'));
            } else {
                console.log('✅ Sign up successful:', data);
                resolve(data);
            }
        }, 1500);
    });
}

// ============================================
// SOCIAL SIGN UP
// ============================================
googleSignupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showAlert('Google Sign-Up integration coming soon!', 'info');
    console.log('🔵 Google OAuth Sign-Up initiated');
    // In production: window.location.href = '/auth/google';
});

githubSignupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showAlert('GitHub Sign-Up integration coming soon!', 'info');
    console.log('⚫ GitHub OAuth Sign-Up initiated');
    // In production: window.location.href = '/auth/github';
});

// ============================================
// ALERT SYSTEM
// ============================================
function showAlert(message, type = 'info') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    alertContainer.appendChild(alert);
    
    // Trigger animation
    setTimeout(() => {
        alert.style.opacity = '1';
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        alert.style.opacity = '0';
        setTimeout(() => {
            alert.remove();
        }, 300);
    }, 5000);
}

// ============================================
// FORM FIELD INTERACTIONS
// ============================================

// Add focus effects
[fullNameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.borderColor = 'var(--primary-color)';
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.style.borderColor = 'var(--border-color)';
    });
});

// ============================================
// PAGE INITIALIZATION
// ============================================
window.addEventListener('load', () => {
    console.log('🚀 Prosap Meets - Sign Up Page Loaded');
    
    // Check if user is already logged in (optional)
    const token = localStorage.getItem('authToken');
    if (token) {
        // Redirect to dashboard if already logged in
        // window.location.href = 'dashboard.html';
    }
});

// ============================================
// AUTO-SAVE DRAFT (Optional)
// ============================================
const autoSaveInterval = setInterval(() => {
    const formData = {
        fullName: fullNameInput.value,
        email: emailInput.value,
    };
    
    localStorage.setItem('signupDraft', JSON.stringify(formData));
}, 30000); // Save every 30 seconds

// Restore draft on page load
window.addEventListener('load', () => {
    const draft = localStorage.getItem('signupDraft');
    if (draft) {
        const data = JSON.parse(draft);
        fullNameInput.value = data.fullName || '';
        emailInput.value = data.email || '';
    }
});

// Clear draft on successful submission
signupForm.addEventListener('submit', () => {
    localStorage.removeItem('signupDraft');
});

// Prevent accidental leave
window.addEventListener('beforeunload', (e) => {
    if (fullNameInput.value || emailInput.value || passwordInput.value) {
        e.preventDefault();
        e.returnValue = '';
    }
});