if (document.getElementById("bookingForm")) {

    document.getElementById("bookingForm").addEventListener("submit", function(e) {
        e.preventDefault();

        const hours = document.getElementById("hours").value;
        const ratePerHour = 5000; // 5000 shs per hour

        const total = hours * ratePerHour;

        document.getElementById("bookingResult").innerText =
            "Booking Confirmed! Total Cost: shs." + total;

        const bookingData = {
            hours: hours,
            total: total,
            date: new Date().toLocaleString()
        };

        localStorage.setItem("parkease_booking", JSON.stringify(bookingData));
    });
}