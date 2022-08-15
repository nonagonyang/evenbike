import react from "react";
import MapContainer from "./MapContainer";
import { useLoadScript } from "@react-google-maps/api";
//TODO put in .env?
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

//Loading the map
function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <MapContainer />;
}

export default Map;
