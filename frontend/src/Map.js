import react from "react";
import MapContainer from "./MapContainer";
import { useLoadScript } from "@react-google-maps/api";
//TODO put in .env?
const GOOGLE_API_KEY = "AIzaSyCNGG0nzNIlYjL15hrgINOtz6wVj3IVIUo";

//Loading the map
function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCNGG0nzNIlYjL15hrgINOtz6wVj3IVIUo",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <MapContainer />;
}

export default Map;
