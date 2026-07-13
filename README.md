# 🍽️ Restaurant Seat Booking System — v1 (Oracle + ODBC Edition)

> **This is the "learning" version.** It exists to document a working, end-to-end
> integration between Node.js and Oracle Database over ODBC — DSN configuration,
> raw SQL, transactional booking logic, all of it. It is **not** the version meant
> for deployment; see [v2](#) for the Docker-ready, MongoDB-only build.

---

## Why two versions?

Getting a Node.js backend talking to Oracle through a Windows System DSN (via the
`odbc` package) was one of the harder infrastructure problems in this project —
driver installation, DSN configuration, connection string quirks, SQL dialect
differences from what I was used to. I wanted that work preserved and visible
rather than deleted the moment it became inconvenient for deployment.

This version is kept as-is: a real dual-database system (MongoDB for
restaurants/availability, Oracle for customer bookings) that only runs where a
matching ODBC DSN can be configured — practically speaking, Windows, or a Linux
box with `unixODBC` + Oracle Instant Client + a manually built DSN.

**For actually running/deploying this project, use v2.** It's functionally
equivalent from the customer's point of view but drops the Oracle/ODBC
dependency entirely so it can ship as a single Docker image.

---

## 🏗️ Architecture

```
┌─────────────┐        REST / WebSocket        ┌──────────────────┐
│   React     │ ─────────────────────────────► │   Express API    │
│  Frontend   │ ◄───────────────────────────── │   (Node.js)      │
└─────────────┘                                └─────────┬────────┘
                                                         │
                            ┌────────────────────────────┼─────────────────────────────┐
                            │                            │                             │
                  ┌─────────▼─────────┐       ┌──────────▼──────────┐       ┌──────────▼──────────┐
                  │     MongoDB       │       │   Oracle Database   │       │   External APIs     │
                  │  Restaurants,     │       │   (via ODBC + DSN)  │       │  Foursquare Places, │
                  │  availability,    │       │   customer_table:   │       │  Calendarific,      │
                  │  menus            │       │   bookings          │       │  Gmail (Nodemailer) │
                  └───────────────────┘       └─────────────────────┘       └─────────────────────┘
```

A full diagram is included at `docs/highlevelarchitecture.pdf`.

**Why split the data this way?** Restaurant discovery, menus, seat maps, and
live availability are document-shaped and benefit from MongoDB's flexibility
and geospatial queries (`2dsphere` index on restaurant location). Customer
booking records were deliberately routed through Oracle to practice
enterprise-style relational modeling, DSN-based connectivity, and raw SQL
under a Node.js application layer.

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Backend | Node.js, Express |
| Primary DB | MongoDB (Mongoose) |
| Secondary DB | Oracle Database (via `odbc` + System DSN) |
| Real-time | Socket.IO (live seat updates) |
| Email | Nodemailer (Gmail SMTP) |
| External APIs | Foursquare Places API, Calendarific Holiday API |

---

## ✨ Features

- Nearby restaurant discovery via Foursquare Places API, cached into MongoDB
- Seat-level table booking with live availability sync over WebSockets
- Customer identity lookup / repeat-customer detection (Oracle)
- Peak-hour detection using public holiday + weekend logic
- Food ordering against a booked table, stored as JSON in Oracle
- Admin dashboard endpoint for viewing all bookings
- Automated booking confirmation emails

---

## 📋 Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Oracle Database (Instant Client) reachable from your machine
- A configured **ODBC System DSN** pointing at that Oracle instance
  - Windows: via *ODBC Data Source Administrator*
  - Linux: `unixODBC` + Oracle Instant Client + manual `odbc.ini` / `odbcinst.ini`
    (expect friction here — this is exactly the pain point v2 removes)
- A Foursquare API key
- A Calendarific API key
- A Gmail account with an App Password for SMTP

---

## ⚙️ Setup

### 1. Clone and install

```bash
git clone https://github.com/Selva563-1gitu/seat-booking-system

#Frontend
npm install

#Backend 
cd backend
npm install
```

### 2. Configure the Oracle DSN

Create a System DSN named `MyOracleDB` pointing at your Oracle instance. The
app connects with:

```js
odbc.connect(`DSN=MyOracleDB;UID=uid;PWD=pwd`)
```

> ⚠️ Don't hardcode credentials as shown in the current source — move `UID`/`PWD`
> into environment variables before you push credentials anywhere public.

### 3. Create the Oracle table

```sql
CREATE TABLE customer_table (
  id                NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  cusname           VARCHAR2(100),
  age               NUMBER,
  gender            VARCHAR2(20),
  mobile            VARCHAR2(20),
  restaurantbooked  VARCHAR2(200),
  timing            DATE,
  selected_seats    VARCHAR2(500),
  email             VARCHAR2(200),
  price             NUMBER
);
```

### 4. Environment variables

Create a `.env` file in the project root:

```env
PORT=3001
MONGO_URI=mongodb://localhost:27017/restaurant_booking
GMAIL_USER=..
GMAIL_PASS=..
```

### 5. Run

```bash

#Seperate run for Frontend and Backend
npm start
```

Server boots on `http://localhost:3001`.

---

## 📡 API Reference

| Method | Route | Description | Data source |
|---|---|---|---|
| `POST` | `/api/nearby-restaurants` | Fetch + cache nearby restaurants | Foursquare → MongoDB |
| `GET` | `/api/nearby-restaurants` | List cached restaurants | MongoDB |
| `GET` | `/api/restaurant-menu/:id` | Get menu by Foursquare ID | MongoDB |
| `POST` | `/api/restaurant-menu-by-name` | Get menu by restaurant name | MongoDB |
| `GET` | `/is-holiday` | Peak-hour / holiday check | Calendarific |
| `POST` | `/api/check-customer` | Look up returning customer | Oracle |
| `POST` | `/api/get-customer-bookings` | Bookings by mobile number | Oracle |
| `GET` | `/api/customer-bookings` | Bookings by email + phone | Oracle |
| `POST` | `/api/customer-entry` | Create a new booking | Oracle + MongoDB + Email |
| `POST` | `/api/save-food-order` | Attach a food order to a booking | Oracle |
| `GET` | `/api/admin/bookings` | All bookings (admin view) | Oracle |

---

## 📁 Folder Structure

```
.
├── activitychart.drawio
├── backend
│   ├── index.js
│   ├── mailer.js
│   ├── models
│   │   ├── RestaurantAvailability.js
│   │   └── Restaurant.js
│   ├── package.json
│   ├── package-lock.json
│   ├── routes
│   │   ├── admin.js
│   │   ├── customer.js
│   │   ├── holidays.js
│   │   └── nearbyRestaurants.js
│   └── socket.js
├── build
├── ccoverview.drawio
├── er-diagram.pdf
├── flowchart.drawio
├── FLOW.drawio
├── flowgraph.drawio
├── highlevelarchitecture.drawio
├── highlevelarchitecture.pdf
├── module1.drawio
├── package.json
├── package-lock.json
├── public
│   ├── background-image.jpg
│   ├── favicon.ico
│   ├── images
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   ├── robots.txt
│   └── seats-arrangements.pdf
├── README.md
├── README-v1-oracle-odbc.md
├── RestaurantBookingsql
├── sample.drawio
├── seat-alignment.drawio
├── se-lab-ppt.pptx
├── src
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── BookSeatsForm.css
│   ├── BookSeatsForm.jsx
│   ├── components
│   │   ├── AdminAnalytics.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── BookingSummary.jsx
│   │   ├── BookSeats.jsx
│   │   ├── components.css
│   │   ├── CustomerDetails.jsx
│   │   ├── Domains.jsx
│   │   ├── FoodOrdering.jsx
│   │   ├── MainPage.jsx
│   │   ├── MapPage.jsx
│   │   ├── Navbar.css
│   │   ├── Navbar.jsx
│   │   ├── Payment.jsx
│   │   ├── Restaurents.jsx
│   │   ├── SeatSelector.css
│   │   ├── SeatSelector.jsx
│   │   ├── TimeSlots.jsx
│   │   └── UserProfile.jsx
│   ├── contexts
│   │   ├── CustomerProvider.js
│   │   └── RestaurantProvider.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── newfile.jsx
│   ├── pages
│   ├── reportWebVitals.js
│   ├── RestaurantBookingApp.jsx
│   └── setupTests.js
├── taskchart.drawio
├── testing.drawio
├── Untitled Diagram.drawio
└── Usecase.drawio

15 directories, 123 files
```

---

## ⚠️ Known Limitations (by design)

- **Not containerizable as-is.** ODBC + a Windows/Linux-specific DSN doesn't
  translate cleanly into a portable Docker image — that's the whole reason v2
  exists.
- Queries in `customer.js`/`admin.js` build SQL via string interpolation
  rather than parameterized queries. Fine for a learning sandbox; not
  something to carry into production.
- API keys are hardcoded in a few files for convenience during development —
  rotate and externalize them before any public deployment.

---

## 👤 Author

Selvaganapathi S
