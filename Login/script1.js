document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');
    
    const createPasswordInput = document.querySelector('.sign-up input[type="password"]');
    const createPasswordToggle = document.querySelector('.sign-up .password-toggle');
    
    const signInPasswordInput = document.querySelector('.sign-in input[type="password"]');
    const signInPasswordToggle = document.querySelector('.sign-in .password-toggle');

    registerBtn.addEventListener('click', () => {
        container.classList.add("active");
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
    });

    // Function to toggle password visibility for Create Account
    function toggleCreatePasswordVisibility() {
        const type = createPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        createPasswordInput.setAttribute('type', type);

        // Toggle eye icon class
        if (type === 'password') {
            createPasswordToggle.querySelector('i').classList.remove('fa-eye-slash');
            createPasswordToggle.querySelector('i').classList.add('fa-eye');
        } else {
            createPasswordToggle.querySelector('i').classList.remove('fa-eye');
            createPasswordToggle.querySelector('i').classList.add('fa-eye-slash');
        }
    }

    // Event listener for Create Account password toggle button
    createPasswordToggle.addEventListener('click', function(event) {
        event.preventDefault();
        toggleCreatePasswordVisibility();
    });

    // Function to toggle password visibility for Sign In
    function toggleSignInPasswordVisibility() {
        const type = signInPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        signInPasswordInput.setAttribute('type', type);

        // Toggle eye icon class
        if (type === 'password') {
            signInPasswordToggle.querySelector('i').classList.remove('fa-eye-slash');
            signInPasswordToggle.querySelector('i').classList.add('fa-eye');
        } else {
            signInPasswordToggle.querySelector('i').classList.remove('fa-eye');
            signInPasswordToggle.querySelector('i').classList.add('fa-eye-slash');
        }
    }

    // Event listener for Sign In password toggle button
    signInPasswordToggle.addEventListener('click', function(event) {
        event.preventDefault();
        toggleSignInPasswordVisibility();
    });
});
