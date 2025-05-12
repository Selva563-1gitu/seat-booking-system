const nodemailer = require("nodemailer");

async function sendBookingEmail({ to, customerName, restaurantName, timeSlot,dateBooked, seats }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: '"Restaurant Booking" <your-email@gmail.com>',
    to: to,
    subject: "Your Restaurant Seat Booking Confirmation",
    html: `
      <h2>Booking Confirmed 🎉</h2>
      <p><strong>Name:</strong> ${customerName}</p>
      <p><strong>Restaurant:</strong> ${restaurantName}</p>
      <p><strong>Time Slot:</strong> ${timeSlot}</p>
      <p><strong>Date:</strong> ${dateBooked}</p>
      <p><strong>Seats:</strong> ${seats}</p>
      <p>We look forward to seeing you!</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return { success: true };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error };
  }
}

module.exports = sendBookingEmail;
