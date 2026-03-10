const CURRENT_USER_KEY = "parkease_currentUser"
const PAYMENTS_KEY = "parkease_payments"

let selectedStation = null
let progress = 0
let chargingInterval = null

document.addEventListener("DOMContentLoaded", () => {

const user = JSON.parse(localStorage.getItem(CURRENT_USER_KEY))

if(!user){

alert("Login required")
window.location.href="index.html"
return

}

})

/* ==============================
STATION SELECTION
============================== */

function selectStation(station){

const user = getCurrentUser()

if(!user){
alert("Please login first")
return
}

selectedStation = station

let energy = calculateEnergy(station)
let cost = calculateCost(station)

document.getElementById("membershipId").innerText = user.membershipId || "N/A"
document.getElementById("vehiclePlate").innerText = user.plateNumber || user.plate || "N/A"
document.getElementById("stationId").innerText = station
document.getElementById("chargingEnergy").innerText = energy + " kWh"
document.getElementById("chargingFee").innerText = "$" + cost.toFixed(2)

// document.getElementById("paymentBox").style.display="block"
document.getElementById("paymentModal").style.display="flex"

}

/* ==============================
ENERGY CALCULATION
============================== */

// function calculateEnergy(station){

// if(station==="A") return 25
// if(station==="B") return 18
// if(station==="C") return 40

// }
function calculateEnergy(station){

switch(station){
case "A": return 25
case "B": return 18
case "C": return 40
default: return 0
}

}

/* ==============================
COST CALCULATION
============================== */

// function calculateCost(station){

// if(station==="A") return 20
// if(station==="B") return 15
// if(station==="C") return 30

// }
function calculateCost(station){

switch(station){
case "A": return 20
case "B": return 15
case "C": return 30
default: return 0
}

}

/* ==============================
CONFIRM PAYMENT
============================== */

function confirmPayment(){

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
date:new Date().toISOString()

}

let payments = JSON.parse(localStorage.getItem(PAYMENTS_KEY)) || []

payments.push(payment)

localStorage.setItem(PAYMENTS_KEY, JSON.stringify(payments))

document.getElementById("transactionId").innerText = transactionId

// document.getElementById("paymentBox").style.display="none"
// document.getElementById("paymentModal").style.display="flex"
// document.getElementById("confirmationBox").style.display="block"
document.getElementById("paymentModal").style.display="none"
document.getElementById("confirmationModal").style.display="flex"

startCharging()

}

/* ==============================
CANCEL PAYMENT
============================== */

function cancelPayment(){

// document.getElementById("paymentBox").style.display="none"
// document.getElementById("paymentModal").style.display="flex"
document.getElementById("paymentModal").style.display="none"

}

function closeConfirmation(){
document.getElementById("confirmationModal").style.display="none"
}

/* ==============================
START CHARGING
============================== */

function startCharging(){

progress = 0

document.getElementById("chargingStatus").innerText="Charging..."

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
//if no field selected

if(!selectedStation){
alert("Please select a charging station first")
return
}

/* ==============================
GET USER
============================== */

function getCurrentUser(){

return JSON.parse(localStorage.getItem(CURRENT_USER_KEY))

}