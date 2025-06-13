"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import MarkerClusterGroup from "react-leaflet-cluster";

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
  <MapContainer center={[-37.8136, 144.9631]} zoom={14} minZoom={8}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Powered by Esri'
      url="https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
    />
    {locations.length === 0 && (
      <div
        style={{ zIndex: 1500 }}
        className="absolute top-0 left-0 h-full w-full flex flex-wrap justify-center content-center"
      >
        <div className="p-4 text-black bg-white">
          <p className="font-bold">No results found</p>
          <p>Please check your filters and try again.</p>
        </div>
      </div>
    )}
    <MarkerClusterGroup
      chunkedLoading
      showCoverageOnHover={false}
      maxClusterRadius={40}
    >
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
            {location.status !== "Operational" && (
              <div className="bg-red-800 text-white">
                <b>Status: </b> {location.status}
              </div>
            )}
            <p>
              <b>Address:</b> {location.address}
            </p>
            <p>{location.description}</p>
            <p>
              <b>Options:</b> {location.options.join(", ") || "N/A"}
            </p>
            <ul>
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
    </MarkerClusterGroup>
  </MapContainer>
);

export default Map;
