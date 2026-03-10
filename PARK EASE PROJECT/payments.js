
document.addEventListener("DOMContentLoaded", () => {
    if (!getCurrentUser()) {
        window.location.href = "login.html";
    }
});




const payments = JSON.parse(localStorage.getItem("parkease_payments")) || [];
const table = document.getElementById("paymentTable");

if (table) {

    if (payments.length === 0) {
        table.innerHTML = "<tr><td colspan='5'>No payments made yet.</td></tr>";
    }

    payments.forEach(payment => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${payment.transactionId}</td>
            <td>${payment.service}</td>
            <td>$${payment.amount}</td>
            <td>${payment.status}</td>
            <td>${payment.date}</td>
        `;

        table.appendChild(row);
    });
}



document.addEventListener("DOMContentLoaded", renderPayments);

function renderPayments() {

    const payments = getPayments();
    const table = document.getElementById("paymentTable");

    table.innerHTML = "";

    if (payments.length === 0) {
        table.innerHTML = "<tr><td colspan='5'>No records found</td></tr>";
        return;
    }

    payments.forEach(p => {
        table.innerHTML += `
            <tr>
                <td>${p.service}</td>
                <td>${formatCurrency(p.amount)}</td>
                <td>${p.date}</td>
                <td>${p.time}</td>
                <td>#${p.id}</td>
            </tr>
        `;
    });
}