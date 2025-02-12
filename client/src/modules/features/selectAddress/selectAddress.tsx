import { MapContainer, TileLayer, useMapEvents, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState, useEffect } from "react";


const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export type Location = {
  lat: number;
  lng: number;
};

const MapInitializer = () => {
  const map = useMap();
  useEffect(() => {
    (window as any).myMap = map;
  }, [map]);
  return null;
};

const MapClick = ({ setLocation }: { setLocation: (loc: Location) => void }) => {
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

export const SelectAddress = () => {
  const [location, setLocation] = useState<Location | null>();

  return (
    <div className="flex flex-col">
      <MapContainer
        center={[-17.37242843568179, -66.16250126879922]}
        zoom={13}
        className="w-[100%] h-[200px] rounded-lg shadow-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapInitializer />
        <MapClick setLocation={setLocation} />
        {location && <Marker position={[location.lat, location.lng]} icon={customIcon} />}
      </MapContainer>
    </div>
  );
};
