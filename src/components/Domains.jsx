import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

function Domains() {
  const navigate=useNavigate();
  const [selectedDomain, setSelectedDomain] = useState("");
  const domains = [
    {
      name: "Restaurant",
      id: "restaurant",
    },
    {
      name: "Domain2",
      id: "domain2",
    },
    {
      name: "Domain3",
      id: "domain3",
    },
    {
      name: "Domain4",
      id: "domain4",
    },
  ];

  return (
    <div className="container">
      <h2 style={{ fontSize: "80px" }}>Select your Domain...</h2>
      <ul style={{ display: "flex", flexWrap: "wrap" }}>
        {domains.map((domain, index) => (
          <li
            className={
              selectedDomain === domain.id ? "selected domain" : "domain"
            }
            key={index}
            onClick={(e) => {
              setSelectedDomain(domain.id);
            }}
          >
            {domain.name}
          </li>
        ))}
      </ul>
      <buttondiv
        style={{
          display: "grid",
          gridTemplateColumns: "500px 500px",
          gap: "40px",
        }}
      >
        <div></div>
        <button className="nextbutton" onClick={e=>{
            if(selectedDomain===""){
              alert("Select Domain!!");
            }
            else{
              navigate(`${selectedDomain}`)
            }
          }}>Next ⏭️</button>
      </buttondiv>
    </div>
  );
}

export default Domains;
