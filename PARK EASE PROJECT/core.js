function requireLogin() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = "index.html";
        return null;
    }
    return user;
}

function getPaymentKey() {
    const user = getCurrentUser();
    return "parkease_payments_" + user.id;
}

function getPayments() {
    const key = getPaymentKey();
    return JSON.parse(localStorage.getItem(key)) || [];
}

function savePayment(service, amount) {

    const key = getPaymentKey();
    const payments = getPayments();

    payments.push({
        id: Date.now(),
        service,
        amount: Number(amount),
        date: new Date().toISOString().split("T")[0]
    });

    localStorage.setItem(key, JSON.stringify(payments));
}



const PAYMENTS_KEY = "parkease_payments";

function getPayments() {
    return JSON.parse(localStorage.getItem(PAYMENTS_KEY)) || [];
}

function savePayments(payments) {
    localStorage.setItem(PAYMENTS_KEY, JSON.stringify(payments));
}

function savePayment(service, amount) {

    const user = getCurrentUser();
    if (!user) return;

    const payments = getPayments();

    const payment = {
        id: "TXN" + Date.now(),
        userId: user.id,
        service,
        amount: Number(amount),
        status: "Completed",
        date: new Date().toISOString()
    };

    payments.push(payment);
    savePayments(payments);

    return payment;
}

function requireLogin(){
    if(!getCurrentUser()){
        window.location.href="index.html";
    }
}