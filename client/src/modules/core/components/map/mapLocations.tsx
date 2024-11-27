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
}

export const MapLocations = ({ location, setLocation, locations }: Params) => {
  const center = location
    ? location.split(",").map(Number)
    : [-17.37242843568179, -66.16250126879922];
  return (
    <MapContainer
      /* @ts-ignore */
      center={center}
      zoom={13}
      className="w-full h-[200px] lg:w-[500px] xl:w-[600px] rounded-lg shadow-lg"
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
          <Popup>{loc.name || "Unnamed location"}</Popup>{" "}
          {/* Show name on hover */}
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
