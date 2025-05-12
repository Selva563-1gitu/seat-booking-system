import React, { useEffect, useState } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';

const SeatSelector = ({ layoutData, selectedSeats, setSelectedSeats, bookedSeats = [] }) => {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    setSeats(layoutData);
  }, [layoutData]);

  const handleSeatClick = (seatId) => {
    if (bookedSeats.includes(seatId)) return; // Prevent selecting booked seats

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  return (
    <Stage width={500} height={500}>
      <Layer>
        {seats.map((item) => {
          if (item.type === "seat") {
            const seatLabel = item.id.split("-")[1]; // e.g., "S1", "S2"
            const isSelected = selectedSeats.includes(item.id);
            const isBooked = bookedSeats.includes(item.id);

            return (
              <React.Fragment key={item.id}>
                <Rect
                  x={item.x}
                  y={item.y}
                  width={30}
                  height={30}
                  cornerRadius={8}
                  fill={
                    isBooked ? "red" :
                    isSelected ? "green" : "lightblue"
                  }
                  stroke="black"
                  strokeWidth={1}
                  onClick={() => handleSeatClick(item.id)}
                />
                <Text
                  x={item.x + 6}
                  y={item.y + 7}
                  text={seatLabel}
                  fontSize={12}
                  fill={
                    isBooked ? "white" :
                    isSelected ? "white" : "black"
                  }
                />
              </React.Fragment>
            );
          }

          if (item.type === "table") {
            return (
              <React.Fragment key={item.id}>
                <Rect
                  x={item.x}
                  y={item.y}
                  width={item.width}
                  height={item.height}
                  fill="darkslategray"
                  cornerRadius={4}
                />
                <Text
                  x={item.x + item.width / 2 - 10}
                  y={item.y + item.height / 2 - 8}
                  text={item.label}
                  fontSize={12}
                  fill="white"
                />
              </React.Fragment>
            );
          }

          return null;
        })}
      </Layer>
    </Stage>
  );
};

export default SeatSelector;
