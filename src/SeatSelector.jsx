import React, { useState, useRef, useEffect } from "react";
import "./SeatSelector.css"; // Import external CSS

const SeatSelector = ({ bookedSeats = [] ,selectedSeats,setSelectedSeats}) => {
  
  const [showSelector, setShowSelector] = useState(false);
  const inputRef = useRef(null);
  const selectorRef = useRef(null);
  useEffect(()=>{
    console.log(bookedSeats);
    // console.log(selectedSeats)
  },[bookedSeats])

  const layout1 = [
    [1, 2, 3, 4, 5, 6, "",25, 26, 27, 28, 29, 30],
    ["", "", "", "", "", "", "","","", "", "","", ""], // Aisle
    [12, 11, 10, 9, 8, 7,"",31, 32, 33, 34, 35, 36],
    [13, 14, 15, 16, 17, 18,"",37, 38, 39, 40, 41, 42],
    ["", "", "", "", "", "", "","","", "", "", "",""], // Aisle
    [24, 23, 22, 21, 20, 19,"",43, 44, 45, 46, 47, 48]
  ];
  const layout2 = [
    [1, 2, 3, 4, 5, 6, "",25, 26, 27, 28, 29, 30],
    ["", "", "", "", "", "", "","","", "", "","", ""], // Aisle
    [12, 11, 10, 9, 8, 7,"",31, 32, 33, 34, 35, 36],
    [13, 14, 15, 16, 17, 18,"",37, 38, 39, 40, 41, 42],
    ["", "", "", "", "", "", "","","", "", "", "",""], // Aisle
    [24, 23, 22, 21, 20, 19,"",43, 44, 45, 46, 47, 48]
  ];
  const layout3 = [
    [1, 2, 3, 4, 5, 6, "",25, 26, 27, 28, 29, 30],
    ["", "", "", "", "", "", "","","", "", "","", ""], // Aisle
    [12, 11, 10, 9, 8, 7,"",31, 32, 33, 34, 35, 36],
    [13, 14, 15, 16, 17, 18,"",37, 38, 39, 40, 41, 42],
    ["", "", "", "", "", "", "","","", "", "", "",""], // Aisle
    [24, 23, 22, 21, 20, 19,"",43, 44, 45, 46, 47, 48]
  ];
  const layout4 = [
    [1, 2, 3, 4, 5, 6, "",25, 26, 27, 28, 29, 30],
    ["", "", "", "", "", "", "","","", "", "","", ""], // Aisle
    [12, 11, 10, 9, 8, 7,"",31, 32, 33, 34, 35, 36],
    [13, 14, 15, 16, 17, 18,"",37, 38, 39, 40, 41, 42],
    ["", "", "", "", "", "", "","","", "", "", "",""], // Aisle
    [24, 23, 22, 21, 20, 19,"",43, 44, 45, 46, 47, 48]
  ];

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat) || seat === "") return;
    setSelectedSeats((prevSelected) =>
      prevSelected.includes(seat)
        ? prevSelected.filter((s) => s !== seat)
        : [...prevSelected, seat]
    );
  };

  const handleClickOutside = (event) => {
    if (
      selectorRef.current &&
      !selectorRef.current.contains(event.target) &&
      inputRef.current !== event.target
    ) {
      setShowSelector(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="seat-picker-container">
      <input
        type="text"
        ref={inputRef}
        readOnly
        value={selectedSeats.join(", ")}
        placeholder="Select Seats"
        onClick={() => setShowSelector(true)}
        className="seat-input"
      />

      {showSelector && (
        <div className="seat-container" ref={selectorRef}>
          {layout1.map((row, rowIndex) => (
            <div key={rowIndex} className="seat-row">
              {row.map((seat, seatIndex) => (
                <button
                  key={`${rowIndex}-${seatIndex}`}
                  className={`seat ${
                    seat === "" ? "empty" :
                    
                    selectedSeats.includes(seat) ? "selected" :
                    bookedSeats.includes(seat) ? "booked" : "available"
                  }`}
                  onClick={(e) =>{e.preventDefault(); handleSeatClick(seat)}}
                  disabled={bookedSeats.includes(seat) || seat === ""}
                >
                  {seat !== "" ? seat : ""}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SeatSelector;
