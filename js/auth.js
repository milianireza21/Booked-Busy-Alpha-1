const USERS_KEY = 'bookedBusyUsers';
const CURRENT_USER_KEY = 'bookedBusyCurrentUser';

let isSignupMode = false;

// Initialize authentication on page load
function initAuth() {
  const currentUser = localStorage.getItem(CURRENT_USER_KEY);
  
  if (currentUser) {
    showLanding();
  } else {
    showAuthModal();
  }
  
  setupAuthEventListeners();
}

function setupAuthEventListeners() {
  const authForm = document.getElementById('authForm');
  const switchToSignup = document.getElementById('switchToSignup');
  const switchToSignin = document.getElementById('switchToSignin');
  const logoutBtn = document.getElementById('logoutBtn');
  
  if (authForm) {
    authForm.addEventListener('submit', handleAuthSubmit);
  }
  
  if (switchToSignup) {
    switchToSignup.addEventListener('click', (e) => {
      e.preventDefault();
      toggleSignupMode();
    });
  }
  
  if (switchToSignin) {
    switchToSignin.addEventListener('click', (e) => {
      e.preventDefault();
      toggleSignupMode();
    });
  }
  
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }
}

function toggleSignupMode() {
  isSignupMode = !isSignupMode;
  const authFormTitle = document.getElementById('authFormTitle');
  const authSubmitBtn = document.getElementById('authSubmitBtn');
  const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');
  const signupToggle = document.getElementById('signupToggle');
  const signinToggle = document.querySelector('.auth-toggle:not(#signupToggle)');
  
  if (isSignupMode) {
    authFormTitle.textContent = 'Create Account';
    authSubmitBtn.textContent = 'Sign Up';
    confirmPasswordGroup.style.display = 'block';
    if (signinToggle) signinToggle.style.display = 'none';
    if (signupToggle) signupToggle.style.display = 'block';
  } else {
    authFormTitle.textContent = 'Sign In';
    authSubmitBtn.textContent = 'Sign In';
    confirmPasswordGroup.style.display = 'none';
    if (signinToggle) signinToggle.style.display = 'block';
    if (signupToggle) signupToggle.style.display = 'none';
  }
}

function handleAuthSubmit(e) {
  e.preventDefault();
  
  const email = document.getElementById('authEmail').value.trim();
  const password = document.getElementById('authPassword').value;
  const confirmPassword = document.getElementById('authConfirmPassword').value;
  
  if (!email || !password) {
    alert('Please fill in all fields');
    return;
  }
  
  if (isSignupMode) {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    signupUser(email, password);
  } else {
    signinUser(email, password);
  }
}

function signupUser(email, password) {
  let users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  
  if (users.some(u => u.email === email)) {
    alert('An account with this email already exists');
    return;
  }
  
  const newUser = {
    id: String(Date.now()),
    email: email,
    password: btoa(password), // Simple encoding (not secure for production)
    createdAt: new Date().toISOString(),
    theme: 'default',
    calendars: [
      {
        id: String(Date.now()),
        name: 'My Calendar',
        isDefault: true,
        color1: '#efbfd2',
        color2: '#f4d7e5'
      }
    ]
  };
  
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
  
  showLanding();
}

function signinUser(email, password) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const user = users.find(u => u.email === email && u.password === btoa(password));
  
  if (!user) {
    alert('Invalid email or password');
    return;
  }
  
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  showLanding();
}

function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
  // Reset form
  document.getElementById('authForm').reset();
  isSignupMode = false;
  document.getElementById('authFormTitle').textContent = 'Sign In';
  document.getElementById('authSubmitBtn').textContent = 'Sign In';
  document.getElementById('confirmPasswordGroup').style.display = 'none';
  document.getElementById('signupToggle').style.display = 'none';
  document.querySelector('.auth-toggle:not(#signupToggle)').style.display = 'block';
  showAuthModal();
}

function showAuthModal() {
  const authModal = document.getElementById('authModal');
  const landingShell = document.getElementById('landingShell');
  
  if (authModal) authModal.style.display = 'flex';
  if (landingShell) landingShell.style.display = 'none';
}

function showLanding() {
  const authModal = document.getElementById('authModal');
  const landingShell = document.getElementById('landingShell');
  
  if (authModal) authModal.style.display = 'none';
  if (landingShell) landingShell.style.display = 'block';
}

// Check authentication when trying to access calendar pages
function protectCalendarPages() {
  const currentPage = window.location.pathname.split('/').pop();
  const calendarPages = ['p1year.html', 'p2month.html', 'p3week.html', 'p4day.html'];
  
  if (calendarPages.includes(currentPage)) {
    const currentUser = localStorage.getItem(CURRENT_USER_KEY);
    if (!currentUser) {
      window.location.href = 'index.html';
    }
  }
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAuth);
} else {
  initAuth();
}

// Protect calendar pages
protectCalendarPages();
