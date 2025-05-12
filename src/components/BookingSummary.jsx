import React from 'react';
// import './BookingSummary.css';

const BookingSummary = () => {
  const bookings = [
    { id: 1, restaurant: 'Taco Bell', date: '2025-05-10', time: '7:00 PM' },
    { id: 2, restaurant: 'Pizza Hut', date: '2025-05-15', time: '8:30 PM' }
  ];
  return (
    <div className="booking-summary" id="summary">
      <h2>📅 Booking Summary</h2>
      <ul>
        {bookings.map((booking, index) => (
          <li key={index}>
            <strong>{booking.restaurant}</strong> <br />
            {booking.date} at {booking.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingSummary;
