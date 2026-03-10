const USERS_KEY = "parkease_users";
const CURRENT_USER_KEY = "parkease_currentUser";

/* ===============================
   GET USERS SAFE
================================= */
function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

/* ===============================
   SAVE USERS SAFE
================================= */
function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/* ===============================
   REGISTER USER
================================= */
function registerUser(formData) {

    let users = getUsers();

    const email = formData.email.toLowerCase().trim();
    const plate = formData.plate.toUpperCase().trim();

    //  email check
    if (users.some(u => u.email === email)) {
        alert("Email already registered.");
        return false;
    }

    // vehicle number plate check
    if (users.some(u => u.plate === plate)) {
        alert("MembershipID already registered.");
        return false;
    }

    const newUser = {
        id: Date.now(),
        fullName: formData.fullName.trim(),
        email: email,
        phone: formData.phone.trim(),
        plate: plate,
        password: formData.password
    };

    users.push(newUser);
    saveUsers(users);

    return true;
}

/* ===============================
   LOGIN USER
================================= */
function loginUser(email, password) {

    let users = getUsers();

    email = email.toLowerCase().trim();
    password = password.trim();

    const user = users.find(u =>
        u.email === email && u.password === password
    );

    if (!user) {
        return false;
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return true;
}

/* ===============================
   VALIDATIONS
================================= */
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    return /^\+?\d{10,15}$/.test(phone);
}

function validatePassword(password) {
    return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
}

function validatePlate(plate) {
    const regex = /^[A-Z]{2,3}[-\s]?\d{3,4}[A-Z]?$/;
    return regex.test(plate.toUpperCase().trim());
}

/* ===============================
   FORM HANDLERS
================================= */
document.addEventListener("DOMContentLoaded", function () {

    /* REGISTER */
    const registerForm = document.getElementById("registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const fullName = document.getElementById("fullName").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;
            const plate = document.getElementById("plate").value;
            const password = document.getElementById("password").value;

            if (!validateEmail(email))
                return alert("Invalid email format.");

            if (!validatePhone(phone))
                return alert("Invalid phone number.");

            if (!validatePlate(plate))
                return alert("Invalid MembershipID. Example: UBA 123A");

            if (!validatePassword(password))
                return alert("Weak password.");

            const success = registerUser({
                fullName,
                email,
                phone,
                plate,
                password
            });

            if (success) {
                alert("Registration successful!");
                window.location.href = "index.html";
            }
        });
    }

    /* LOGIN */
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            const success = loginUser(email, password);

            if (!success) {
                alert("Invalid credentials.");
                return;
            }

            window.location.href = "dashboard.html";
        });
    }

});