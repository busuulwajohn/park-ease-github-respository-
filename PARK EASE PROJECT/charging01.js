document.addEventListener("DOMContentLoaded", () => {

const CURRENT_USER_KEY = "parkease_currentUser"
const PAYMENTS_KEY = "parkease_payments"

let currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY))

if(!currentUser){
window.location.href = "index.html"
return
}

/* ==============================
WELCOME MESSAGE
============================== */

const welcome = document.getElementById("welcomeMessage")

if(welcome){
welcome.innerText = "Charging Vehicle: " + currentUser.plate
}

/* ==============================
LOAD PAYMENTS
============================== */

let payments = JSON.parse(localStorage.getItem(PAYMENTS_KEY)) || []

/* ==============================
CHARGING FORM
============================== */

const form = document.getElementById("chargingForm")

form.addEventListener("submit", e => {

e.preventDefault()

const chargerType = document.getElementById("chargerType").value
const duration = parseInt(document.getElementById("duration").value)

/* PRICE CALCULATION */

let rate = 0

if(chargerType === "Standard") rate = 0.20
if(chargerType === "Fast") rate = 0.35
if(chargerType === "Ultra Fast") rate = 0.50

const energy = duration * 0.5
const cost = energy * rate

const payment = {

id: Date.now(),

userEmail: currentUser.email,

service: "EV Charging (" + chargerType + ")",

duration: duration,

energy: energy,

amount: cost,

date: new Date().toISOString()

}

payments.push(payment)

localStorage.setItem(PAYMENTS_KEY, JSON.stringify(payments))

alert("Charging Started. Cost: $" + cost.toFixed(2))

loadChargingHistory()
updateChargingStats()

})

/* ==============================
CHARGING HISTORY
============================== */

function loadChargingHistory(){

const table = document.getElementById("chargingHistoryTable")

if(!table) return

table.innerHTML = ""

const userPayments = payments.filter(p => p.userEmail === currentUser.email)

userPayments.forEach(p => {

if(!p.service.includes("Charging")) return

const row = document.createElement("tr")

row.innerHTML = `

<td>${new Date(p.date).toLocaleDateString()}</td>
<td>${p.service}</td>
<td>${p.duration} mins</td>
<td>$${p.amount.toFixed(2)}</td>

`

table.appendChild(row)

})

}

/* ==============================
LIVE STATS
============================== */

function updateChargingStats(){

const active = payments.filter(p => 
p.service.includes("Charging")
).length

const today = new Date().toDateString()

const energyToday = payments
.filter(p => new Date(p.date).toDateString() === today)
.reduce((sum,p)=> sum + (p.energy || 0),0)

document.getElementById("activeCharging").innerText = active
document.getElementById("energyToday").innerText = energyToday.toFixed(1) + " kWh"

}

loadChargingHistory()
updateChargingStats()

})


let progress = 0
let chargingInterval

function startCharging(station){

const user = getCurrentUser()

if(!user){

alert("Login first")
window.location.href="login.html"
return

}

document.getElementById("vehiclePlate").textContent = user.plateNumber
document.getElementById("membershipId").textContent = user.membershipId
document.getElementById("stationId").textContent = station
document.getElementById("chargingStatus").textContent = "Charging..."

progress = 0

clearInterval(chargingInterval)

chargingInterval = setInterval(()=>{

progress += 5

document.getElementById("chargeProgress").style.width = progress + "%"

if(progress >= 100){

clearInterval(chargingInterval)

document.getElementById("chargingStatus").textContent = "Charging Complete"

saveTransaction(station)

}

},1000)

}

function saveTransaction(station){

const user = getCurrentUser()

const users = JSON.parse(localStorage.getItem("parkease_users"))

const index = users.findIndex(u => u.id === user.id)

const transaction = {

type:"Charging",
station:station,
date:new Date().toLocaleString(),
amount:20

}

if(!users[index].transactions){

users[index].transactions=[]

}

users[index].transactions.push(transaction)

localStorage.setItem("parkease_users",JSON.stringify(users))

}