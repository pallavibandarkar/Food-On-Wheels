import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import "./Map.css"

const Map = ({ location,address,name }) => {
  const { lat, lng } = location;
  console.log("lat",location.lat)
  console.log("lng",location.lng)
  console.log(location)

  return (
    <div style={{ marginTop: "20px", borderRadius: "8px", border: "1px solid #ccc" }} className="Map">
      <MapContainer
        center={[lng,lat]} // Latitude and Longitude of the location
        zoom={10} // Initial zoom level
        style={{ width: "100%", height: "400px" }}
      >
        {/* TileLayer to display the map */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Marker and Popup */}
        <Marker position={[lng,lat]} icon={new L.Icon.Default()}>
          <Popup>
            <h2>{address}</h2><br/><b>{name}</b>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
