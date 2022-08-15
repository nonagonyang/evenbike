import React, { useRef, useState, userEffect } from "react";
import Map from "./Map";
import DockOptions from "./DockOptions";
import "./Trip.css";

function Trip() {
  //todo pass docks rec result here to generate list of docks
  const docks1 = [
    { name: "dock1", numBike: 9 },
    { name: "dock2", numBike: 23 },
  ];
  const docks2 = [
    { name: "dock10", numBike: 0 },
    { name: "dock20", numBike: 7 },
  ];

  return (
    <div className="Trip">
      <h1>Trip Page</h1>
      <h2>Map goes here</h2>
      <Map />
      <DockOptions docks={docks1} id="fromdocks" />
      <DockOptions docks={docks2} id="todocks" />
      <button className="Trip-StartBnt">Start Cycling</button>
      <button className="Trip-EndBnt">End Cycling</button>
    </div>
  );
}

export default Trip;
