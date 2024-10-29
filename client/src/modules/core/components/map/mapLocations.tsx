import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Initialize the marker icon for Leaflet (default marker in Leaflet doesn't load properly in React)
const customIcon = new L.Icon({
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
}

export const MapLocations = ({ location, setLocation, locations }: Params) => {
  return (
    <div className="flex flex-col">
      <h1 className="mb-4">Select the Location</h1>
      <MapContainer
        center={[-17.37242843568179, -66.16250126879922]}
        zoom={13}
        className="w-[500px] h-[200px] rounded-lg shadow-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClick setLocation={setLocation} />
        
        {/* Render all predefined locations as markers */}
        {locations.map((loc, index) => (
          <Marker key={index} position={[loc.location.lat, loc.location.lng]} icon={customIcon}>
            <Popup>{loc.name || "Unnamed location"}</Popup> {/* Show name on hover */}
          </Marker>
        ))}

        {/* Render the user-selected location marker */}
        {location && (
          <Marker position={location.split(',').map(Number)} icon={customIcon} />
        )}
      </MapContainer>
    </div>
  );
};