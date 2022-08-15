import react, { useMemo, useState } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import "./MapContainer.css";
import { Autocomplete } from "@react-google-maps/api";
import { getGeocode, getLatLng } from "use-places-autocomplete";

function MapContainer() {
  // either display the user's location or display this default center
  const center = useMemo(() => ({ lat: 51.519914, lng: -0.136039 }), []);
  //once the user selected an address or dock, update and state
  const [selectedStart, setSelectedStart] = useState(null);
  const [selectedEnd, setSelectedEnd] = useState(null);
  const [selectedStartDock, setSelectedStartDock] = useState(null);
  const [selectedEndDock, setSelectedEndDock] = useState(null);

  const defaultBounds = {
    north: center.lat + 0.1,
    south: center.lat - 0.1,
    east: center.lng + 0.1,
    west: center.lng - 0.1,
  };

  const options = {
    bounds: defaultBounds,
    componentRestrictions: { country: "uk" },
  };

  let autocomplete = null;
  function onLoad(autocomplete) {
    console.log("autocomplete: ", autocomplete);
    autocomplete = autocomplete;
  }

  function onPlaceChanged() {
    if (autocomplete !== null) {
      console.log(autocomplete.getPlace());
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  }

  //Handle Selection after address autocomplete
  //Add a marker based on the selection
  async function handleKeyDown(event) {
    if (event.key === "Enter") {
      const address = event.target.value;
      const results = await getGeocode({ address });
      const { lat, lng } = getLatLng(results[0]);
      if (event.target.placeholder === "search a start") {
        setSelectedStart({ lat, lng });
      }
      if (event.target.placeholder === "search an end") {
        setSelectedEnd({ lat, lng });
      }
    }
  }

  //based on selected address
  //Call evenbike backend to get a list of recommended bike stops
  async function handleDockRec(selectedStart) {
    //TODO call backend to get recommended docks
    // return docks;
  }

  const [directions, setDirections] = useState("");
  //   DirectionsService.route(
  //     {
  //       origin: { lat: 51.519914, lng: -0.136039 },
  //       destination: { lat: 51.5232, lng: -0.1262 },
  //       travelMode: "BICYCLING",
  //     },
  //     (result, status) => {
  //       if (status) {
  //         setDirections(result);
  //       } else {
  //         console.error(`error fetching directions ${result}`);
  //       }
  //     }
  //   );
  function directionsCallback(response) {
    if (response !== null) {
      if (response.status === "OK") {
        setDirections(response.result);
      } else {
        console.error(`error fetching directions`);
      }
    }
  }

  return (
    <>
      <GoogleMap
        zoom={12}
        center={center}
        mapContainerClassName="MapContainer-googlemap"
      >
        <Marker position={center} />
        <Marker position={selectedStart} />
        <Marker position={selectedEnd} />
        {true && (
          <DirectionsService
            options={{
              destination: { lat: 51.519914, lng: -0.136039 },
              origin: { lat: 51.5232, lng: -0.1262 },
              travelMode: "BICYCLING",
            }}
            callback={directionsCallback}
          />
        )}

        {true && (
          <DirectionsRenderer
            // required
            options={{
              directions: { directions },
            }}
          />
        )}

        <Autocomplete
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
          options={options}
          className="MapContainer-autocomplete"
          id="autocomplete1"
        >
          <input
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="search a start"
            className="MapContainer-autocomplete-input"
            style={{
              position: "fixed",
              right: `100px`,
            }}
          />
        </Autocomplete>
        <Autocomplete
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
          options={options}
          className="MapContainer-autocomplete"
          id="autocomplete2"
        >
          <input
            name="start"
            type="text"
            placeholder="search an end"
            className="MapContainer-autocomplete-input"
            style={{ position: "fixed", right: `100px`, top: `200px` }}
          ></input>
        </Autocomplete>
      </GoogleMap>
    </>
  );
}

export default MapContainer;
