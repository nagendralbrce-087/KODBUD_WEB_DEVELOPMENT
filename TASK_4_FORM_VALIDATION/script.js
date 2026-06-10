function setError(inputId, errId, msg) {
  const input = document.getElementById(inputId);
  const err   = document.getElementById(errId);
  input.classList.remove('success');
  input.classList.add('error');
  err.textContent = msg;
}

function setSuccess(inputId, errId) {
  const input = document.getElementById(inputId);
  const err   = document.getElementById(errId);
  input.classList.remove('error');
  input.classList.add('success');
  err.textContent = '';
}

function validate() {
  let valid = true;

  const name     = document.getElementById('name').value.trim();
  const email    = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirm  = document.getElementById('confirmPassword').value;

  // Name
  if (!name) {
    setError('name', 'nameErr', 'Name is required.'); valid = false;
  } else if (name.length < 3) {
    setError('name', 'nameErr', 'Name must be at least 3 characters.'); valid = false;
  } else {
    setSuccess('name', 'nameErr');
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    setError('email', 'emailErr', 'Email is required.'); valid = false;
  } else if (!emailRegex.test(email)) {
    setError('email', 'emailErr', 'Enter a valid email address.'); valid = false;
  } else {
    setSuccess('email', 'emailErr');
  }

  // Password
  if (!password) {
    setError('password', 'passwordErr', 'Password is required.'); valid = false;
  } else if (password.length < 6) {
    setError('password', 'passwordErr', 'Password must be at least 6 characters.'); valid = false;
  } else {
    setSuccess('password', 'passwordErr');
  }

  // Confirm password
  if (!confirm) {
    setError('confirmPassword', 'confirmErr', 'Please confirm your password.'); valid = false;
  } else if (confirm !== password) {
    setError('confirmPassword', 'confirmErr', 'Passwords do not match.'); valid = false;
  } else {
    setSuccess('confirmPassword', 'confirmErr');
  }

  return valid;
}

document.getElementById('myForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const msg = document.getElementById('message');

  if (validate()) {
    msg.textContent = '✅ Registration successful!';
    msg.className = 'show-success';
    this.reset();
    ['name', 'email', 'password', 'confirmPassword'].forEach(id => {
      document.getElementById(id).classList.remove('success', 'error');
    });
  } else {
    msg.textContent = '❌ Please fix the errors above.';
    msg.className = 'show-error';
  }
});

// Live validation on blur
['name', 'email', 'password', 'confirmPassword'].forEach(id => {
  document.getElementById(id).addEventListener('blur', validate);
});