// ================================
// SERVICES SYSTEM (PER USER)
// ================================

function getPayments() {
    return JSON.parse(localStorage.getItem("parkease_payments")) || [];
}

function savePayments(payments) {
    localStorage.setItem("parkease_payments", JSON.stringify(payments));
}

// Save payment PER USER
function savePayment(service, amount) {

    const currentUser = getCurrentUser();
    if (!currentUser) return;

    let payments = getPayments();

    const payment = {
        id: "TXN" + Date.now(),
        userEmail: currentUser.email,
        service: service,
        amount: Number(amount),
        status: "Completed",
        date: new Date().toLocaleString()
    };

    payments.push(payment);
    savePayments(payments);

    return payment;
}

// Generic form processor
function activateService(formId, hoursId, planId, resultId, serviceName) {

    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const hoursElement = hoursId ? document.getElementById(hoursId) : null;
        const rate = Number(document.getElementById(planId).value);

        let total = rate;

        if (hoursElement) {
            const hours = Number(hoursElement.value);
            total = hours * rate;
        }

        const payment = savePayment(serviceName, total);

        document.getElementById(resultId).innerHTML =
            `Payment Successful<br>
             ID: ${payment.id}<br>
             Amount: $${total}`;
    });
}


document.addEventListener("DOMContentLoaded", () => {

    requireLogin();

    activateService("parkingForm", "parkingHours", "parkingPlan", "parkingResult", "Parking");
    activateService("chargingForm", "chargingHours", "chargingPlan", "chargingResult", "Charging");
    activateService("washForm", null, "washPlan", "washResult", "Car Wash");
    activateService("bookingForm", "bookingHours", "bookingPlan", "bookingResult", "Booking");
});

function activateService(formId, hoursId, planId, resultId, serviceName){

    const form = document.getElementById(formId);
    if(!form) return;

    form.addEventListener("submit", function(e){
        e.preventDefault();

        const rate = Number(document.getElementById(planId).value);
        let total = rate;

        if(hoursId){
            const hours = Number(document.getElementById(hoursId).value);
            total = hours * rate;
        }

        const payment = savePayment(serviceName,total);

        document.getElementById(resultId).innerHTML =
            `Payment Successful <br>
             ID: ${payment.id} <br>
             Amount: UGX ${total.toLocaleString()}`;
    });
}