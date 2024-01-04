"use client"

import "leaflet/dist/leaflet.css"
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { Restaurant } from "./page";

const customMarkerIcon = L.icon({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
})

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const Map = ({ locations }: { locations: Restaurant[] }) => (
  <MapContainer center={[-37.8136, 144.9631]} zoom={12}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
    />
    {locations.map(location => (
      <Marker key={`location-${location.id}`} position={[location.latitude, location.longitude]} icon={customMarkerIcon}>
        <Popup>
          <strong>{location.name}</strong>
          <p>{location.description}</p>
        </Popup>
      </Marker>
    ))}
  </MapContainer>
)

export default Map