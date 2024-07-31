document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    const createPasswordInput = document.getElementById('passwordSignUp');
    const confirmPasswordInput = document.getElementById('confirmPasswordSignUp');
    const createPasswordToggle = document.querySelector('.password-toggle[data-target="passwordSignUp"]');
    const confirmPasswordToggle = document.querySelector('.password-toggle[data-target="confirmPasswordSignUp"]');

    const signInPasswordInput = document.getElementById('passwordSignIn');
    const signInPasswordToggle = document.getElementById('togglePasswordSignIn');

    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            container.classList.add("active");
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            container.classList.remove("active");
        });
    }

    // Function to toggle password visibility for Create Account
    function togglePasswordVisibility(input, toggle) {
        if (input && toggle) {
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);

            const icon = toggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-eye');
                icon.classList.toggle('fa-eye-slash');
            }
        }
    }

    // Event listeners for password toggle buttons
    if (createPasswordToggle) {
        createPasswordToggle.addEventListener('click', function(event) {
            event.preventDefault();
            togglePasswordVisibility(createPasswordInput, createPasswordToggle);
        });
    }

    if (confirmPasswordToggle) {
        confirmPasswordToggle.addEventListener('click', function(event) {
            event.preventDefault();
            togglePasswordVisibility(confirmPasswordInput, confirmPasswordToggle);
        });
    }

    if (signInPasswordToggle) {
        signInPasswordToggle.addEventListener('click', function(event) {
            event.preventDefault();
            togglePasswordVisibility(signInPasswordInput, signInPasswordToggle);
        });
    }

    const signInForm = document.querySelector('.form-container.sign-in form');

    if (signInForm) {
        signInForm.addEventListener('submit', function(event) {
            const email = signInForm.querySelector('input[type="email"]').value;
            const password = signInForm.querySelector('input[type="password"]').value;

            if (!email || !password) {
                event.preventDefault();
                alert('Required fields were not filled.');
            }
        });
    }

    const signUpForm = document.querySelector('.form-container.sign-up form');

    if (signUpForm) {
        signUpForm.addEventListener('submit', function(event) {
            const name = signUpForm.querySelector('input[type="text"]').value;
            const email = signUpForm.querySelector('input[type="email"]').value;
            const password = signUpForm.querySelector('#passwordSignUp').value;
            const confirmPassword = signUpForm.querySelector('#confirmPasswordSignUp').value;

            if (password !== confirmPassword) {
                event.preventDefault();
                alert('Passwords do not match!');
            } else if (!name || !email || !password || !confirmPassword) {
                event.preventDefault();
                alert('Required fields were not filled.');
            }
        });
    }
});
