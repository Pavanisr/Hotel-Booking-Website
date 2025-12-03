# Hotel Booking Website

A full-stack Hotel Booking website built with **React**, **Node.js**, **Express**, and **PostgreSQL**, allowing users to browse hotels, book rooms, and manage their bookings. The project includes authentication, user profile management, and a dynamic hotel booking system.
### Default User View
![Default User Home](https://raw.githubusercontent.com/Pavanisr/Hotel-Booking-Website/main/hotel%2001.jpg)
### Logged-In User View
![Logged-In User Home](https://github.com/Pavanisr/Hotel-Booking-Website/blob/main/hotel2.jpg)


---

## Table of Contents

- [Project Overview](#project-overview)  
- [Features](#features)  
- [Technologies Used](#technologies-used)  
- [Installation](#installation)  
- [Usage](#usage)  
- [API Endpoints](#api-endpoints)  
- [Front-End Views](#front-end-views)  
- [Folder Structure](#folder-structure)  
- [License](#license)

---

## Project Overview

The Hotel Booking Website allows users to:

- Browse hotels by city code.
- View hotel details and pricing.
- Sign up or log in to book rooms.
- View and manage their bookings from their profile.
- Cancel upcoming bookings.

The website includes **responsive design** for both desktop and mobile users.

---

## Features

### Default User (Not Logged In)
- Browse hotels by city code.
- View hotel details: name, address, price per night.
- Prompt to log in when attempting to book a room.
- Search hotels by city code.
- Pagination with "See More" button.

### Logged-in User
- All features available to default users.
- Book hotels directly from a popup modal.
- Access profile page:
  - View user details: name, email, phone.
  - View all bookings with:
    - Hotel name, room type, price, check-in/out dates.
    - Status badge: Upcoming or Completed.
    - Cancel upcoming bookings.
- Logout functionality.

---

## Technologies Used

### Frontend
- React.js  
- React Router DOM  
- React Bootstrap  
- Axios  
- Context API for authentication  

### Backend
- Node.js  
- Express.js  
- PostgreSQL  
- JWT for authentication  
- CORS  

### Others
- CSS (Bootstrap + internal CSS)  
- Date handling with JavaScript  
- LocalStorage for token persistence  

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/hotel-booking-website.git
cd hotel-booking-website
