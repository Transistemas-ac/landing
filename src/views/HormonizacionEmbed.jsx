import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import SaludListItem from "../components/SaludListItem";
import CsvDownloadButton from "../components/CsvDownloadButton";
import { Salud, getCoords, provincias } from "../utils/saludFunctions";

const SaludMap = lazy(() => import("../components/SaludMap"));

const scrollItemIntoView = (index) => {
  document
    .getElementById(`salud-item-${index}`)
    ?.scrollIntoView({ behavior: "auto", block: "nearest" });
};

function HormonizacionEmbed() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const points = useMemo(
    () =>
      Salud.map((item, index) => ({
        index,
        item,
        coords: getCoords(item)
      })),
    []
  );

  useEffect(() => {
    const reportHeight = () => {
      const height = document.documentElement.scrollHeight;
      window.parent?.postMessage(
        { type: "transistemas-embed-height", height },
        "*"
      );
    };

    reportHeight();
    const observer = new ResizeObserver(reportHeight);
    observer.observe(document.documentElement);
    window.addEventListener("resize", reportHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", reportHeight);
    };
  }, []);

  const handleSelect = (index) => {
    setSelectedIndex(index);
    scrollItemIntoView(index);
  };

  return (
    <div className="hormonizacion-embed">
      <Seo
        title="Mapa de hormonización de Argentina"
        path="/hormonizacion/embed"
        noindex
      />

      <header className="hormonizacion-embed-header">
        <h1 className="hormonizacion-embed-title">
          Mapa de hormonización de Argentina
        </h1>
        <div className="hormonizacion-embed-actions">
          <Link
            className="hormonizacion-embed-link"
            to="/hormonizacion"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver listado completo
          </Link>
          <CsvDownloadButton
            className="hormonizacion-csv-button"
            items={Salud}
            filename="centros-hormonizacion.csv"
          >
            Descargar CSV
          </CsvDownloadButton>
        </div>
      </header>

      <div className="hormonizacion-embed-layout">
        <div className="hormonizacion-list">
          {provincias.map((provincia) => {
            const items = Salud.filter(
              (item) => item.provincia === provincia
            );
            return (
              <section
                key={provincia}
                className="hormonizacion-provincia"
              >
                <h2 className="hormonizacion-provincia-title">
                  {provincia}
                  <span className="hormonizacion-provincia-count">
                    {items.length}{" "}
                    {items.length === 1 ? "centro" : "centros"}
                  </span>
                </h2>
                {items.map((item) => {
                  const index = Salud.indexOf(item);
                  return (
                    <SaludListItem
                      key={index}
                      index={index}
                      item={item}
                      headingLevel="h3"
                      selected={selectedIndex === index}
                      onSelect={handleSelect}
                    />
                  );
                })}
              </section>
            );
          })}
        </div>
        <aside className="hormonizacion-map" aria-label="Mapa de centros">
          <Suspense
            fallback={
              <div className="hormonizacion-map-loading">Cargando mapa…</div>
            }
          >
            <SaludMap
              points={points}
              selectedIndex={selectedIndex}
              onSelect={setSelectedIndex}
            />
          </Suspense>
        </aside>
      </div>
    </div>
  );
}

export default HormonizacionEmbed;