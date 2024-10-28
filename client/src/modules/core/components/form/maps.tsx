import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";
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

export type Location = {
  lat: number;
  lng: number;
};

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
  location: Location | null;
}

export const Map = ({ location, setLocation }: Params) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Seleciona la ubicacion</h1>
      <MapContainer
        center={[-17.37242843568179, -66.16250126879922]}
        zoom={13}
        className="w-full h-96 rounded-lg shadow-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClick setLocation={setLocation} />
        {location && (
          <Marker position={[location.lat, location.lng]} icon={customIcon} />
        )}
      </MapContainer>
    </div>
  );
};
