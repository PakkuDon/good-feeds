// HTML markup copied from rendered content of <Map /> component
// Used to render what looks like an empty Leaflet map on server-side render
const MapPlaceholder = () => (
  <div
    className="leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom"
    style={{ position: "relative" }}
  >
    <div className="leaflet-top leaflet-left">
      <div className="leaflet-control-zoom leaflet-bar leaflet-control">
        <a
          className="leaflet-control-zoom-in"
          href="#"
          title="Zoom in"
          role="button"
          aria-label="Zoom in"
          aria-disabled="true"
        >
          <span aria-hidden="true">+</span>
        </a>
        <a
          className="leaflet-control-zoom-out"
          href="#"
          title="Zoom out"
          role="button"
          aria-label="Zoom out"
          aria-disabled="true"
        >
          <span aria-hidden="true">−</span>
        </a>
      </div>
    </div>
  </div>
);

export default MapPlaceholder;
