import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

function Domains() {
  const navigate = useNavigate();
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
      <h2 style={{ fontSize: "40px" }}>Select your Domain...</h2>
      <ul style={{ display: "flex", flexWrap: "wrap" }}>
        {domains.map((domain, index) => (
          <li
            className="domain"
            style={{
              backgroundColor:
                selectedDomain === domain.id
                  ? "var(--primary-background-color)"
                  : "#fff",
              width:"auto"
            }}
            key={index}
            onClick={(e) => {
              setSelectedDomain(domain.id);
            }}
          >
            <p
              style={{
                color: selectedDomain === domain.id ? "white" : "black",
              }}
            >
              {domain.name}
            </p>
          </li>
        ))}
      </ul>
      <div className="buttondiv">
        <div></div>
        <button
          className="nextbutton"
          onClick={(e) => {
            if (selectedDomain === "") {
              alert("Select Domain!!");
            } else {
              navigate(`${selectedDomain}`);
            }
          }}
        >
          Next ⏭️
        </button>
      </div>
    </div>
  );
}

export default Domains;
