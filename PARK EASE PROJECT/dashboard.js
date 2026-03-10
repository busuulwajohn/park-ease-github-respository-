document.addEventListener("DOMContentLoaded", () => {

    const USERS_KEY = "parkease_users";
    const CURRENT_USER_KEY = "parkease_currentUser";

    let currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));

    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    /* ===============================
       LOAD USER INFO
    ================================= */

    document.getElementById("userName").innerText = currentUser.fullName;
    document.getElementById("userEmail").innerText = currentUser.email;
    document.getElementById("userPlate").innerText = currentUser.plate;

    document.getElementById("welcomeMessage").innerText =
        "Welcome Back, " + currentUser.fullName;

    /* ===============================
       SIDEBAR TOGGLE
    ================================= */

    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");

    if(menuToggle){
        menuToggle.addEventListener("click", () => {
            sidebar.classList.toggle("hidden");
        });
    }

    /* ===============================
       LOAD PAYMENTS
    ================================= */

    const payments =
        JSON.parse(localStorage.getItem("parkease_payments")) || [];

    const userPayments = payments.filter(
        p => p.userEmail === currentUser.email
    );

    const totalRevenue = userPayments.reduce(
        (sum, p) => sum + p.amount,
        0
    );

    const totalTransactions = userPayments.length;

    const today = new Date().toDateString();

    const activeToday = userPayments.filter(p =>
        new Date(p.date).toDateString() === today
    ).length;

    if(document.getElementById("totalRevenue"))
        document.getElementById("totalRevenue").innerText = "$" + totalRevenue.toFixed(2);

    if(document.getElementById("totalTransactions"))
        document.getElementById("totalTransactions").innerText = totalTransactions;

    if(document.getElementById("activeServices"))
        document.getElementById("activeServices").innerText = activeToday;

    /* ===============================
       SERVICE BREAKDOWN
    ================================= */

    const breakdown = {};
    userPayments.forEach(p => {
        breakdown[p.service] = (breakdown[p.service] || 0) + 1;
    });

    const list = document.getElementById("serviceBreakdown");

    if (list) {

        list.innerHTML = "";

        for (let service in breakdown) {

            const li = document.createElement("li");
            li.innerText = service + ": " + breakdown[service];

            list.appendChild(li);
        }
    }

    /* ===============================
       CLOCK
    ================================= */

    function updateClock() {

        const time = new Date().toLocaleString("en-UG", {
            timeZone: "Africa/Kampala"
        });

        const clock = document.getElementById("nycClock");

        if(clock) clock.innerText = time;

    }

    setInterval(updateClock, 1000);
    updateClock();


    /* ===============================
       PROFILE SYSTEM
    ================================= */

    const sidebarProfilePic = document.getElementById("sidebarProfilePic");
    const profileModal = document.getElementById("profileModal");
    const closeProfile = document.getElementById("closeProfile");

    const profilePreview = document.getElementById("profilePreview");
    const profileUpload = document.getElementById("profileUpload");

    const editName = document.getElementById("editName");
    const editEmail = document.getElementById("editEmail");
    const editPhone = document.getElementById("editPhone");
    const editVehicle = document.getElementById("editVehicle");
    const saveProfile = document.getElementById("saveProfile");

    /* LOAD PROFILE DATA */

    if (editName) editName.value = currentUser.fullName;
    if (editEmail) editEmail.value = currentUser.email;
    if (editPhone) editPhone.value = currentUser.phone;
    if (editVehicle) editVehicle.value = currentUser.plate;

    if (currentUser.profilePic) {

        if(sidebarProfilePic) sidebarProfilePic.src = currentUser.profilePic;
        if(profilePreview) profilePreview.src = currentUser.profilePic;
    }

    /* OPEN PROFILE */

    if(sidebarProfilePic){
        sidebarProfilePic.addEventListener("click", () => {
            profileModal.style.display = "flex";
        });
    }

    /* CLOSE PROFILE */

    if(closeProfile){
        closeProfile.addEventListener("click", () => {
            profileModal.style.display = "none";
        });
    }

    /* PROFILE IMAGE */

    if(profileUpload){
        profileUpload.addEventListener("change", () => {

            const file = profileUpload.files[0];
            if (!file) return;

            const reader = new FileReader();

            reader.onload = function (e) {

                profilePreview.src = e.target.result;
                sidebarProfilePic.src = e.target.result;

                currentUser.profilePic = e.target.result;

                localStorage.setItem(
                    CURRENT_USER_KEY,
                    JSON.stringify(currentUser)
                );

                updateUsersList();
            };

            reader.readAsDataURL(file);
        });
    }

    /* SAVE PROFILE */

    if(saveProfile){
        saveProfile.addEventListener("click", () => {

            currentUser.fullName = editName.value;
            currentUser.email = editEmail.value;
            currentUser.phone = editPhone.value;
            currentUser.plate = editVehicle.value;

            localStorage.setItem(
                CURRENT_USER_KEY,
                JSON.stringify(currentUser)
            );

            updateUsersList();

            document.getElementById("userName").innerText = currentUser.fullName;
            document.getElementById("userEmail").innerText = currentUser.email;
            document.getElementById("userPlate").innerText = currentUser.plate;

            document.getElementById("welcomeMessage").innerText =
                "Welcome Back, " + currentUser.fullName;

            alert("Profile updated successfully");

            profileModal.style.display = "none";
        });
    }

    /* UPDATE USERS DATABASE */

    function updateUsersList() {

        let users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

        const index = users.findIndex(
            u => u.email === currentUser.email
        );

        if (index !== -1) {

            users[index] = currentUser;

            localStorage.setItem(
                USERS_KEY,
                JSON.stringify(users)
            );
        }
    }

});