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
│   React     │ ─────────────────────────────► │   Express API     │
│  Frontend   │ ◄───────────────────────────── │   (Node.js)       │
└─────────────┘                                 └─────────┬─────────┘
                                                            │
                              ┌─────────────────────────────┼─────────────────────────────┐
                              │                              │                              │
                    ┌─────────▼─────────┐         ┌──────────▼──────────┐        ┌──────────▼──────────┐
                    │     MongoDB        │         │   Oracle Database    │        │   External APIs      │
                    │  Restaurants,       │         │   (via ODBC + DSN)    │        │  Foursquare Places,   │
                    │  availability,      │         │   customer_table:     │        │  Calendarific,        │
                    │  menus              │         │   bookings            │        │  Gmail (Nodemailer)   │
                    └─────────────────────┘         └──────────────────────┘        └───────────────────────┘
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

## To run backend:

> node index

## To run frontend:

> npm start


