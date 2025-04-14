import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRestaurant } from "../contexts/RestaurantProvider";
import { useCustomerDetail } from "../contexts/CustomerProvider";

function CustomerDetails() {
  const navigate=useNavigate();
  const {cusName, setCusName} = useCustomerDetail();
  const {gender, setGender} = useCustomerDetail();
  const {age, setAge} = useCustomerDetail();
  const {mobile, setMobile} = useCustomerDetail();
  const {selectedRestaurant,selectedTimeSlot,noOfSeats}=useRestaurant();
  return (
    <div className="container">
        <div style={{display:"flex",flexDirection:"column"}}>
            <div className="splitter"><label>Restaurant </label><>{selectedRestaurant.name}</></div>
            <div className="splitter"><label>Time Slot </label><>{selectedTimeSlot.time}</></div>
            <div className="splitter"><label>No. Of Seats </label><>{noOfSeats}</></div>
            
        </div>
      <h2 style={{ fontSize: "80px" }}>Enter Your Details...</h2>
      <form style={{width:"100%",fontSize:"24px",display:"flex",flexDirection:"column",alignItems:"center",marginBottom:"40px"}}>
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
            name="age"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
        </div>
        <div className="splitter">
          <label htmlFor="">Mobile No:</label>
          <input
            type="text"
            name="mobile"
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value);
            }}
          />
        </div>
      </form>
      
      <buttondiv
          style={{
            display: "grid",
            gridTemplateColumns: "400px 500px 500px",
            gap: "40px",
          }}
        >
          <Link to="/react-app-demo/domains/restaurant">
            <button className="nextbutton">⏮️ Previous</button>
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              setCusName("");
              setAge("");
              setGender("");
              setMobile("");
            }}
            className="nextbutton"
          >
            Clear
          </button>
          <button className="nextbutton" onClick={e=>{
            if(cusName===""||age===""||gender===""||mobile===""){
              alert("Fill all the Fields");
            }
            else{
              navigate("/react-app-demo/domains/bookSeats")
            }
          }}>Next ⏭️</button>
        </buttondiv>

    </div>
  );
}

export default CustomerDetails;
