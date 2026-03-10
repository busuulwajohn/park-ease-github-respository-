# weekly-source-codes
javascript weekly source code
ParkEase Smart Parking & EV Charging System

ParkEase is a modern web-based smart parking and EV charging management platform designed to simplify how drivers locate parking spaces, manage memberships, and access electric vehicle charging services.

The system provides an interactive dashboard, real-time service interfaces, and transaction tracking features, delivering a seamless digital parking and charging experience.

🚗 Project Overview

ParkEase integrates multiple services into a single platform:

Smart parking management

Electric vehicle charging services

Membership-based user accounts

Transaction tracking

Interactive user dashboard

The application simulates a real-world smart mobility platform, enabling users to register, log in, manage their vehicles, book services, and monitor service usage through a visually appealing dashboard.

✨ Key Features
🔐 User Authentication

Account registration

Secure login system

Membership ID generation

Session persistence using localStorage

Profile management and editing

👤 Profile Management

Users can:

View personal profile information

Update account details

Upload profile images

Manage membership information

Register vehicle plate numbers

⚡ EV Charging Services

The charging service module allows users to:

Select EV charging stations

View power capacity and pricing

Confirm payments

Start simulated charging sessions

Track charging progress visually

Receive transaction confirmation IDs

Charging Stations Available:

Station	Type	Power	Fee
Station A	Fast Charging	150kW	UGX 75,000
Station B	Standard Charging	75kW	UGX 50,000
Station C	Ultra Charging	300kW	UGX 120,000
📊 Dashboard System

The dashboard provides an overview of the user account including:

Active services

Charging sessions

Parking services

Membership information

Quick navigation panel

Future upgrades include:

Live analytics charts

Charging statistics

Parking slot availability

Real-time service updates

🧾 Transaction Management

Every service generates a transaction record stored locally.

Each transaction contains:

Transaction ID

Service type

Station used

Energy consumed

Payment amount

Timestamp

Example:

TX-1711053223432
Service: EV Charging
Energy: 25kWh
Amount: UGX 75,000
🎨 UI Design

ParkEase uses a modern glassmorphism interface including:

Blur glass cards

Smooth hover animations

Gradient background themes

Responsive layouts

Modal popup interactions

Interface components include:

Service cards

Modal payment popups

Charging progress bars

Confirmation notifications

🧰 Technologies Used
Technology	Purpose
HTML5	Application structure
CSS3	Styling and animations
JavaScript (ES6)	Application logic
LocalStorage API	Data persistence
Responsive Grid Layout	Adaptive UI
📁 Project Structure
ParkEase/
│
├── index.html
├── dashboard.html
├── charging.html
├── parking.html
│
├── css/
│   ├── styles.css
│   ├── dashboard.css
│   └── charging.css
│
├── js/
│   ├── auth.js
│   ├── services.js
│   ├── charging.js
│   └── dashboard.js
│
├── assets/
│   ├── icons
│   ├── images
│   └── videos
│
└── README.md
🔑 Data Storage Model

The system uses LocalStorage to simulate backend storage.

Stored keys include:

parkease_users
parkease_currentUser
parkease_payments
parkease_bookings

This enables the application to:

Support multiple users

Track transactions

Maintain login sessions

🔄 Application Workflow

User registers an account

System generates membership ID

User logs into dashboard

User selects a service

Payment confirmation appears

Transaction is recorded

Service process begins

User can view history later

📱 Responsive Design

ParkEase is optimized for:

Desktop devices

Tablets

Mobile screens

The layout dynamically adjusts using CSS grid and responsive components.

🔮 Future Improvements

Upcoming enhancements planned for ParkEase include:

🌍 Live parking slot tracking

📊 Charging analytics dashboard

💳 Mobile money integration (MTN / Airtel)

🗺 Charging station map integration

📱 Progressive Web App support

🔔 Push notifications

☁ Cloud database backend

🧑‍💻 Developer

Project developed as a Smart Mobility Web Application Prototype demonstrating the use of front-end technologies to simulate real-world digital transportation services.

📜 License

This project is intended for educational and demonstration purposes.

⭐ Acknowledgements

Inspired by modern smart mobility systems including:

EV charging networks

Smart city parking platforms

Mobility-as-a-service applications

🚀 Getting Started

To run the project locally:

Download or clone the repository

Open the project folder

Launch index.html in your browser

Create an account

Explore the dashboard and services

📬 Contact

For collaboration or improvements, feel free to contribute to the project.

⚡ Park Smart. Charge Smart. Drive Smart.
Welcome to ParkEase
