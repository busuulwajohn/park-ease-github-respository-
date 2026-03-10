const CURRENT_USER_KEY = "parkease_currentUser"
const PAYMENTS_KEY = "parkease_payments"

let selectedStation = null
let chargingInterval = null
let progress = 0

document.addEventListener("DOMContentLoaded", () => {

const user = JSON.parse(localStorage.getItem(CURRENT_USER_KEY))

if(!user){

alert("Please login first")
window.location.href="index.html"
return

}

})

/* ==========================
SELECT CHARGING STATION
========================== */

function selectStation(station){

const user = getCurrentUser()

if(!user){
alert("Login required")
return
}

selectedStation = station

const energy = calculateEnergy(station)
const cost = calculateCost(station)

document.getElementById("membershipId").innerText = user.membershipId
document.getElementById("vehiclePlate").innerText = user.plateNumber
document.getElementById("stationId").innerText = station
document.getElementById("chargingEnergy").innerText = energy + " kWh"
document.getElementById("chargingFee").innerText = "UGX " + cost.toLocaleString()

document.getElementById("paymentModal").style.display="flex"

}

/* ==========================
ENERGY CALCULATION
========================== */

function calculateEnergy(station){

switch(station){
case "A": return 25
case "B": return 18
case "C": return 40
default: return 0
}

}

/* ==========================
COST CALCULATION
========================== */

function calculateCost(station){

switch(station){
case "A": return 75000
case "B": return 50000
case "C": return 120000
default: return 0
}

}

/* ==========================
CONFIRM PAYMENT
========================== */

function confirmPayment(){

if(!selectedStation){

alert("Please select a station first")
return

}

const user = getCurrentUser()

const energy = calculateEnergy(selectedStation)
const cost = calculateCost(selectedStation)

const transactionId = "TX-" + Date.now()

const payment = {

id:transactionId,
userEmail:user.email,
service:"EV Charging",
station:selectedStation,
energy:energy,
amount:cost,
date:new Date().toLocaleString()

}

let payments = JSON.parse(localStorage.getItem(PAYMENTS_KEY)) || []

payments.push(payment)

localStorage.setItem(PAYMENTS_KEY, JSON.stringify(payments))

document.getElementById("transactionId").innerText = transactionId

document.getElementById("paymentModal").style.display="none"
document.getElementById("confirmationModal").style.display="flex"

startCharging()

}

/* ==========================
CANCEL PAYMENT
========================== */

function cancelPayment(){

document.getElementById("paymentModal").style.display="none"

}

/* ==========================
CLOSE CONFIRMATION
========================== */

function closeConfirmation(){

document.getElementById("confirmationModal").style.display="none"

}

/* ==========================
START CHARGING
========================== */

function startCharging(){

progress = 0

document.getElementById("chargingStatus").innerText = "Charging..."

clearInterval(chargingInterval)

chargingInterval = setInterval(()=>{

progress += 5

document.getElementById("chargeProgress").style.width = progress + "%"

if(progress >= 100){

clearInterval(chargingInterval)

document.getElementById("chargingStatus").innerText="Charging Complete"

}

},1000)

}

/* ==========================
GET CURRENT USER
========================== */

function getCurrentUser(){

return JSON.parse(localStorage.getItem(CURRENT_USER_KEY))

}