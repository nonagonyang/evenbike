const haversine = require("haversine-distance");
const fetch = require("node-fetch");

// fetch bikedocks , bike numbers, dock numbers, dock_id, dockname
async function getAllDocks() {
  let response = await fetch("https://api.tfl.gov.uk/BikePoint/");
  let data = await response.json();
  let docks = data.map(
    ({ lat, lon, id, commonName, additionalProperties }) => ({
      lat,
      lon,
      id,
      name: commonName,
      numBikes: parseInt(additionalProperties[6].value),
      numDocks: parseInt(additionalProperties[8].value),
      occupancy:
        parseInt(additionalProperties[6].value) /
        parseInt(additionalProperties[8].value),
      numEmptyDocks: parseInt(additionalProperties[7].value),
    })
  );
  //   console.log(docks);
  return docks;
}

async function getNearbyDocks(point1) {
  const docks = await getAllDocks();
  const res = [];
  for (let i = 0; i < docks.length; i++) {
    let point2 = { lat: docks[i]["lat"], lng: docks[i]["lon"] };
    let haversine_km = (haversine(point1, point2) / 1000).toFixed(2);
    if (haversine_km < 0.5) {
      res.push(docks[i]);
    }
  }
  res.sort((a, b) => a.occupancy - b.occupancy);
  //   console.log(res, res.length);
  return res;
}
const point1 = { lat: 51.519914, lng: -0.136039 };
// getNearbyDocks(point1);

module.exports = { getNearbyDocks };
