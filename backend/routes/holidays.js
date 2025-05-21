const express = require("express");
const axios = require("axios");
const router = express.Router();

const API_KEY = "HzKkWnbBbUiif7degV5kzyDAhTVsrNZw"; // get from calendarific.com
function checkPeakHour(date, isHoliday) {
  const jsDate = new Date(date);
const isWeekend = jsDate.getDay() === 0 || jsDate.getDay() === 6;

  return isHoliday||isWeekend;
}

router.get("/is-holiday", async (req, res) => {
  const { date, country = "IN" } = req.query;
    console.log(req.query);
  try {
    const response = await axios.get(
      `https://calendarific.com/api/v2/holidays?api_key=${API_KEY}&country=${country}&year=${new Date(
        date
      ).getFullYear()}&type=national`
    );

    const holidays = response.data.response.holidays;
    // console.log(holidays);
    const isHoliday = holidays.some(
      (h) => new Date(h.date.iso).toDateString() === new Date(date).toDateString()
    );
    const isPeakHour= checkPeakHour(date,isHoliday);
    res.json({ isPeakHour });
  } catch (err) {
    console.error("Holiday API failed", err);
    res.status(500).json({ error: "Failed to check holiday" });
  }
});

module.exports = router;
