import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Company from "@/shared/assets/company.png";

const customIcon = new L.Icon({
  iconUrl: Company,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const customIcon2 = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface Location {
  lat: number;
  lng: number;
  name?: string;
}

interface NearbyPlace {
  name: string;
  location: Location;
  types: string[];
}

const MapClick = ({
  setLocation,
}: {
  setLocation: (loc: Location) => void;
}) => {
  useMapEvents({
    click(e) {
      setLocation({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });
  return null;
};

interface Params {
  setLocation: (loc: Location) => void;
  location: string;
  locations: NearbyPlace[]; // Array of predefined locations with optional name
  width?: number;
}

export const MapLocations = ({
  location,
  setLocation,
  locations,
  width,
}: Params) => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate backend delay (replace with actual API call if needed)
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const center = location
    ? location.split(",").map(Number)
    : [-17.37242843568179, -66.16250126879922];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center w-[500px] sm:w-[600px]  justify-center h-[200px] lg:h-[200px] rounded-lg shadow-lg bg-gray-200 animate-pulse">
        <div className="h-full w-full bg-gray-300 rounded-lg"></div>
      </div>
    );
  }

  return (
    <MapContainer
      /* @ts-ignore */
      center={center}
      zoom={13}
      className="w-full h-[200px] lg:w-[500px] xl:w-[600px] rounded-lg shadow-lg"
      style={{
        width,
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapClick setLocation={setLocation} />

      {/* Render all predefined locations as markers */}
      {locations.map((loc, index) => (
        <Marker
          key={index}
          position={[loc.location.lat, loc.location.lng]}
          icon={customIcon}
        >
          <Popup>{loc.name || "Unnamed location"}</Popup>
        </Marker>
      ))}

      {/* Render the user-selected location marker */}
      {location && (
        <Marker
          /* @ts-ignore */
          position={location.split(",").map(Number)}
          icon={customIcon2}
        />
      )}
    </MapContainer>
  );
};
