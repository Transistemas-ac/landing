import { useEffect, useMemo, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import maplibreGL from "@maplibre/maplibre-gl-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { splitEmails } from "../utils/saludFunctions";
import openfreemapLabelsEs from "../data/openfreemap-labels-es.json";

const ARGENTINA_CENTER = [-38.4161, -63.6167];
const ARGENTINA_ZOOM = 4;

const SpanishLabelsOverlay = () => {
  const map = useMap();

  useEffect(() => {
    const layer = maplibreGL({
      style: openfreemapLabelsEs,
      pane: "overlayPane",
      attribution:
        '&copy; <a href="https://www.openfreemap.org/">OpenFreeMap</a> &copy; <a href="https://www.openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    layer.addTo(map);
    return () => {
      map.removeLayer(layer);
    };
  }, [map]);

  return null;
};

const createTransIcon = (selected = false, title = "") =>
  L.divIcon({
    className: "trans-marker-icon",
    html: `<span class="trans-marker-flag ${selected ? "selected" : ""}"></span>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -18],
    title
  });

const FitBounds = ({ coords }) => {
  const map = useMap();
  const previous = useRef("");

  useEffect(() => {
    const key = coords.map(({ lat, lng }) => `${lat},${lng}`).join("|");
    if (key === previous.current) return;
    previous.current = key;

    if (!coords.length) return;
    const fit = () => {
      if (coords.length === 1) {
        map.setView([coords[0].lat, coords[0].lng], 13);
      } else {
        map.fitBounds(
          coords.map(({ lat, lng }) => [lat, lng]),
          { padding: [40, 40], maxZoom: 12 }
        );
      }
    };
    map.invalidateSize();
    setTimeout(fit, 0);
  }, [coords, map]);

  return null;
};

const FlyToSelected = ({ points, selectedIndex }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedIndex == null) return;
    const point = points.find(({ index }) => index === selectedIndex);
    if (!point || !point.coords) return;
    const { lat, lng } = point.coords;
    const zoom = Math.max(map.getZoom(), 12);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      map.setView([lat, lng], zoom);
    } else {
      map.flyTo([lat, lng], zoom, { duration: 0.6 });
    }
  }, [selectedIndex, points, map]);

  return null;
};

const SaludMarker = ({ index, coords, item, selected, onSelect }) => {
  const markerRef = useRef(null);

  useEffect(() => {
    const element = markerRef.current?.getElement();
    if (element) {
      element.setAttribute("aria-label", item.nombre);
    }
  }, [item.nombre]);

  useEffect(() => {
    if (!markerRef.current) return;
    if (selected) {
      markerRef.current.openPopup();
    } else {
      markerRef.current.closePopup();
    }
  }, [selected]);

  return (
    <Marker
      ref={markerRef}
      position={[coords.lat, coords.lng]}
      icon={createTransIcon(selected, item.nombre)}
      eventHandlers={{
        click: () => onSelect(index)
      }}
    >
      <Popup
        maxWidth={380}
        eventHandlers={{
          open: (event) => {
            const closeButton = event.target
              .getElement()
              ?.querySelector(".leaflet-popup-close-button");
            closeButton?.setAttribute("aria-label", "Cerrar");
            closeButton?.setAttribute("title", "Cerrar");
          }
        }}
      >
        <div className="salud-popup">
          <h3 className="salud-popup-title">{item.nombre}</h3>
          <p className="salud-popup-especialidad">{item.especialidad}</p>
          <p className="salud-popup-row">
            <strong>Dirección:</strong> {item.direccion}, {item.ciudad}
          </p>
          {item.telefono && (
            <p className="salud-popup-row">
              <strong>Teléfono:</strong> {item.telefono}
            </p>
          )}
          {item.correo && (
            <p className="salud-popup-row salud-popup-row-emails">
              <strong>Correo:</strong>{" "}
              <span className="salud-popup-emails">
                {splitEmails(item.correo).map((email) => (
                  <a key={email} href={`mailto:${email}`}>
                    {email}
                  </a>
                ))}
              </span>
            </p>
          )}
        </div>
      </Popup>
    </Marker>
  );
};

function SaludMap({ points, selectedIndex, onSelect }) {
  const coords = useMemo(
    () => points.map(({ coords }) => coords).filter(Boolean),
    [points]
  );

  return (
    <MapContainer
      center={ARGENTINA_CENTER}
      zoom={ARGENTINA_ZOOM}
      scrollWheelZoom
      className="salud-map-container"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SpanishLabelsOverlay />
      <FitBounds coords={coords} />
      <FlyToSelected points={points} selectedIndex={selectedIndex} />
      {points.map(
        ({ index, coords, item }) =>
          coords && (
            <SaludMarker
              key={index}
              index={index}
              coords={coords}
              item={item}
              selected={selectedIndex === index}
              onSelect={onSelect}
            />
          )
      )}
    </MapContainer>
  );
}

export default SaludMap;