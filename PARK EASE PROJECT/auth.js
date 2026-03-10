const USERS_KEY = "parkease_users";
const CURRENT_USER_KEY = "parkease_currentUser";


function validatePlate(plate) {
    return /^[A-Z]{2,3}\s?\d{3,4}[A-Z]?$/i.test(plate.trim());
}



/* ================= USERS ================= */

function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
}

function setCurrentUser(user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

function logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
    window.location.href = "index.html";
}

/* ================= REGISTER ================= */

function registerUser(data) {

    const users = getUsers();
    const email = data.email.toLowerCase().trim();

    if (users.some(u => u.email === email)) {
        alert("Email already registered.");
        return false;
    }

    const newUser = {
        id: Date.now(),
        fullName: data.fullName.trim(),
        email,
        phone: data.phone.trim(),
        plate: data.plate.trim().toUpperCase(),
        password: data.password,
        profilePic: null
    };

    users.push(newUser);
    saveUsers(users);

    return true;
}

/* ================= LOGIN ================= */

function loginUser(email, password) {

    const users = getUsers();

    const user = users.find(u =>
        u.email === email.toLowerCase().trim() &&
        u.password === password.trim()
    );

    if (!user) return false;

    setCurrentUser(user);
    return true;
}

/* ================= UPDATE PROFILE ================= */

function updateProfile(updatedData) {

    const users = getUsers();
    const currentUser = getCurrentUser();

    const index = users.findIndex(u => u.id === currentUser.id);

    users[index] = { ...users[index], ...updatedData };

    saveUsers(users);
    setCurrentUser(users[index]);

    return users[index];
}
