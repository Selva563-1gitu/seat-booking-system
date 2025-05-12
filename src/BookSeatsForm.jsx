import React, { useEffect, useState } from "react";
import "./BookSeatsForm.css";
import SeatSelector from "./components/SeatSelector";
function SeatsShowing() {
  const CustomerTableUrl = "http://localhost:1234/customertable";
  const TimingTableUrl = "http://localhost:1234/timingtable";

  const [cusId, setCusId] = useState("");
  const [cusName, setCusName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState("");
  const [availTimings, setAvailTimings] = useState("1230");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedHotel,setSelectedHotel]=useState("Hotel Surguru");

  const [availSeatsWhole, setAvailSeatsWhole] = useState([]);
  let [subAvailTimings, setSubAvailTimings] = useState(
    availTimings.substring(1, 4)
  );
  const [changes, setChanges] = useState(false);
  let timeCalculator = function (time) {
    if (time.substring(20, 22) == "pm") {
      if (time.substring(11, 13) == "12") return "00" + time.substring(14, 16);
      else return 12 + Number(time.substring(11, 13)) + time.substring(14, 16);
    } else return time.substring(11, 13) + time.substring(14, 16);
  };

  async function handleShow() {
    if (cusId != "") {
      setChanges(!changes);


      let result = await fetch(`${CustomerTableUrl}?customerId=${cusId}`);
      let data = await result.json();

      if (data.resultSelect.length > 0) {
        let resultofSelect = data.resultSelect[0];
        setCusId(resultofSelect.CUSTOMER_ID);
        setCusName(resultofSelect.CUSTOMER_NAME);
        setAge(resultofSelect.AGE);
        setGender(resultofSelect.GENDER);
        setAvailTimings(timeCalculator(resultofSelect.DATE_TIME));
        setDate(resultofSelect.DATE_TIME.substring(0, 10));
      }
      if (data.resultSelectedSeats.length > 0) {
        let tempArray = [];
        data.resultSelectedSeats.forEach((element) => {
          tempArray.push(element.COLUMN_VALUE);
        });
        setSelectedSeats(tempArray);
      }
      
      console.log("everything fine");
    } else {
      alert("Please fill out Customer Id field!!");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      (cusId != "",
      cusName != "",
      gender != "",
      age != "",
      date != "",
      availTimings != "",
      selectedSeats.length != 0)
    ) {
      setChanges(!changes);
      let dataToBeSent = {
        cusId,
        cusName,
        age,
        gender,
        availTimings,
        date,
        selectedSeats,
      };
      let postHeaders = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToBeSent),
      };
      let result = await fetch(CustomerTableUrl, postHeaders);
      if (result.status === 200) {
        alert("Successfully submitted");
      } else {
        alert("Error: while submitting");
      }
    } else {
      alert("Please fill all the fields!!!");
    }
  }
  // useEffect(() => {
  //   let fetchTimingWhole = async () => {
  //     let result = await fetch(TimingTableUrl);
  //     let data = await result.json();
  //     if (data.length > 0) {
  //       const transformed = data.reduce(
  //         (acc, { RESTAURANT_NAME, TIMING_ID, COLUMN_VALUE }) => {
  //           if (!acc[RESTAURANT_NAME]) {
  //             acc[RESTAURANT_NAME] = {}; // Initialize restaurant object
  //           }
  //           if (!acc[RESTAURANT_NAME][TIMING_ID]) {
  //             acc[RESTAURANT_NAME][TIMING_ID] = []; // Initialize timing array
  //           }
  //           acc[RESTAURANT_NAME][TIMING_ID].push(COLUMN_VALUE); // Add seat number
  //           return acc;
  //         },
  //         {}
  //       );
  //       // console.log(availSeatsWhole);
  //       setAvailSeatsWhole(transformed);
  //     }
  //   };
  //   fetchTimingWhole();
  // }, [changes]);
  return (
    <div className="seat-showing">
      <form>
        <h1>Seat Booking Form</h1>

        <div className="splitter">
          <label htmlFor="">Customer Id:</label>
          <div>
            <input
              type="number"
              name="cus_name"
              value={cusId}
              onChange={(e) => {
                setCusId(e.target.value);
              }}
            />
            <input type="button" value="Show Details" onClick={handleShow} />
          </div>
        </div>

        <div className="splitter">
          <label htmlFor="">Customer Name:</label>
          <input
            type="text"
            name="cus_name"
            value={cusName}
            onChange={(e) => {
              setCusName(e.target.value);
            }}
          />
        </div>
        <div className="splitter">
          <label htmlFor="">Gender:</label>
          <div>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender == "male" ? true : false}
              onChange={(e) => {
                setGender(e.target.value);
              }}
            />
            Male
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender == "female" ? true : false}
              onChange={(e) => {
                setGender(e.target.value);
              }}
            />
            Female
          </div>
        </div>
        <div className="splitter">
          <label htmlFor="">Age:</label>
          <input
            type="number"
            name="cus_name"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
        </div>
        <div className="splitter">
          <label htmlFor="">Date:</label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>
        <div className="splitter">
          <label htmlFor="">Hotel Choices</label>
          <select name="hotels" id="hotels" value={selectedHotel} onChange={e=>{setSelectedHotel(e.target.value);}}>
            <option value="Hotel Surguru">Hotel Surguru</option>
            <option value="Shenbaga Hotel">
              Shenbaga Hotel & Convention Centre
            </option>
            <option value="Anandha Inn">Anandha Inn</option>
            <option value="Le Pondy">Le Pondy</option>
            <option value="Accord Puducherry">Accord Puducherry</option>
          </select>
        </div>
        <div className="splitter">
          <label htmlFor="">Avaliable Timings</label>
          <select
            name="avail_timings"
            value={availTimings}
            onChange={(e) => {
              setAvailTimings(e.target.value);
            }}
          >
            {/* <label htmlFor="">Afternoon</label> */}
            {/* <option value="">Choose</option> */}
            <option value="1230">12:30</option>
            <option value="0100">01:00</option>
            <option value="0130">01:30</option>
            <option value="0200">02:00</option>
            <option value="0230">02:30</option>
            <option value="0300">03:00</option>
            <option value="0330">03:30</option>
            <option value="0400">04:00</option>
            <option value="0430">04:30</option>
            <option value="0500">05:00</option>
            <option value="0530">05:30</option>
          </select>
        </div>
        
        <div className="splitter">
          <label htmlFor="">Avaliable Seats:</label>
          <SeatSelector
            rows={5}
            cols={5}
            bookedSeats={!Array.isArray(availSeatsWhole)?availSeatsWhole[selectedHotel]?availSeatsWhole[selectedHotel][+availTimings]?availSeatsWhole[selectedHotel][+availTimings]:[]:[]:[]}
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
          />
        </div>
        <div className="splitter">
          <div className="buttondiv">
            <input type="button" value="Submit" onClick={handleSubmit} />
          </div>
          <div className="buttondiv">
            <input
              type="button"
              value="Clear"
              onClick={(e) => {
                e.preventDefault();
                setChanges(!changes);
                setCusId("");
                setCusName("");
                setAge("");
                setDate("");
                setGender("");
                setSelectedSeats([]); //
                setAvailTimings(""); //
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default SeatsShowing;
