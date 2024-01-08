"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { Restaurant } from "./page";

// Resolves an issue where Leaflet icons are not available in Next.js
// Taken from https://github.com/Leaflet/Leaflet/issues/4968#issuecomment-483402699
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = ({ locations }: { locations: Restaurant[] }) => (
  <MapContainer center={[-37.8136, 144.9631]} zoom={12}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Powered by Esri'
      url="https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
    />
    {locations.map((location) => (
      <Marker
        key={`location-${location.id}`}
        position={[location.latitude, location.longitude]}
      >
        <Popup>
          <strong>{location.name}</strong>
          <div className="text-xs text-gray-600">
            Listing updated at {new Date(location.updatedAt).toDateString()}
          </div>
          <p>
            <b>Address:</b> {location.address}
          </p>
          <p>{location.description}</p>
          <p>
            <b>Dietary options:</b> {location.dietaryOptions.join(", ")}
          </p>
          <ul className="list-disc list-inside">
            {location.links.map((link) => (
              <li key={`${location.id}-${link.label}`}>
                <a href={link.url} target="_blank">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </Popup>
      </Marker>
    ))}
  </MapContainer>
);

export default Map;
