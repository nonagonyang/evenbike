import react from "react";
import { v4 as uuid } from "uuid";
import "./DockOptions.css";
// show recommended dock options
//TODO replace idx with dock's id, because the dock_id is unique
function DockOptions({ docks, id }) {
  return (
    <select className="DockOptions" id={id}>
      {docks.map((d, idx) => (
        <option key={idx}>
          {d.name} has {d.numBike} bikes
        </option>
      ))}
    </select>
  );
}
export default DockOptions;
