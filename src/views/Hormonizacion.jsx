import { lazy, Suspense, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import Breadcrumb from "../components/Breadcrumb";
import Footer from "../components/Footer";
import SaludListItem from "../components/SaludListItem";
import HormonizacionGuide from "../components/HormonizacionGuide";
import CsvDownloadButton from "../components/CsvDownloadButton";
import Button from "../components/Button";
import EmbedInstructions from "../components/EmbedInstructions";
import Contact from "../components/Contact";
import {
  Salud,
  getCoords,
  getProvinciaSlug,
  provincias
} from "../utils/saludFunctions";
import { SITE_URL } from "../utils/seo";
import { buildBreadcrumbSchema } from "../utils/breadcrumb";

const SaludMap = lazy(() => import("../components/SaludMap"));

const breadcrumbItems = [
  { name: "Inicio", url: `${SITE_URL}/` },
  { name: "Hormonización", url: `${SITE_URL}/hormonizacion` }
];

const provinciasSchema = (provincias) => ({
  "@type": "ItemList",
  name: "Centros de salud con hormonización por provincia en Argentina",
  itemListOrder: "https://schema.org/ItemListUnordered",
  numberOfItems: provincias.length,
  itemListElement: provincias.map((provincia, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: `Hormonización en ${provincia}`,
    url: `${SITE_URL}/hormonizacion/${getProvinciaSlug(provincia)}`
  }))
});

const scrollItemIntoView = (index) => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  document.getElementById(`salud-item-${index}`)?.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "nearest"
  });
};

function Hormonizacion() {
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

  const handleSelect = (index) => {
    setSelectedIndex(index);
    scrollItemIntoView(index);
  };

  const selectedItem = useMemo(() => {
    if (selectedIndex == null) return null;
    return points.find((point) => point.index === selectedIndex)?.item || null;
  }, [points, selectedIndex]);

  return (
    <div className="hormonizacion">
      <Seo
        title="Hormonización en Argentina — Centros de salud LGBTIQ+"
        description={`Hormonización gratuita en Argentina: mapa y listado de ${Salud.length} centros de salud públicos con hormonización y atención integral para la comunidad LGBTIQ+ en las ${provincias.length} provincias. Buscá el centro más cercano a tu localidad.`}
        path="/hormonizacion"
        schema={[
          {
            ...provinciasSchema(provincias),
            "@id": `${SITE_URL}/hormonizacion#provincias`
          },
          buildBreadcrumbSchema(breadcrumbItems)
        ]}
      />

      <div className="hormonizacion-section">
        <Breadcrumb items={breadcrumbItems} />

        <p className="visually-hidden" role="status">
          {selectedItem ? `Centro seleccionado: ${selectedItem.nombre}` : ""}
        </p>

        <div className="hormonizacion-header">
          <h1 className="hormonizacion-title">Hormonización en Argentina</h1>
          <p className="hormonizacion-description">
            Mapa y listado de {Salud.length} centros de salud públicos que
            brindan hormonización gratuita y atención integral para la comunidad
            LGBTIQ+ en Argentina. Seleccioná un punto en el mapa o un centro del
            listado para ver su información.
          </p>
          <nav className="hormonizacion-provincias-nav" aria-label="Provincias">
            {provincias.map((provincia) => (
              <Link
                key={provincia}
                className="hormonizacion-provincias-link"
                to={`/hormonizacion/${getProvinciaSlug(provincia)}`}
              >
                {provincia}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hormonizacion-layout">
          <div className="hormonizacion-list">
            {provincias.map((provincia) => {
              const items = Salud.filter(
                (item) => item.provincia === provincia
              );
              return (
                <section
                  key={provincia}
                  id={`provincia-${getProvinciaSlug(provincia)}`}
                  className="hormonizacion-provincia"
                >
                  <h2 className="hormonizacion-provincia-title">
                    <Link to={`/hormonizacion/${getProvinciaSlug(provincia)}`}>
                      {provincia}
                    </Link>
                    <span className="hormonizacion-provincia-count">
                      {items.length} {items.length === 1 ? "centro" : "centros"}
                    </span>
                  </h2>
                  {items.map((item) => {
                    const index = Salud.indexOf(item);
                    return (
                      <SaludListItem
                        key={index}
                        index={index}
                        item={item}
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

      <div className="hormonizacion-embed-wrap">
        <EmbedInstructions />
        <div className="hormonizacion-download-column">
          <Button
            type="anchor"
            href="/hormonizacion-centros.pdf"
            download
            className="hormonizacion-download-button"
          >
            Descargar listado completo (PDF)
          </Button>
          <Button
            type="anchor"
            href="/hormonizacion-centros.xlsx"
            download
            className="hormonizacion-download-button"
          >
            Descargar listado completo (XLSX)
          </Button>
          <CsvDownloadButton
            className="hormonizacion-download-button"
            items={Salud}
            filename="centros-hormonizacion.csv"
          >
            Descargar listado completo (CSV)
          </CsvDownloadButton>
          <Button
            type="anchor"
            href="/hormonizacion-centros.json"
            download
            className="hormonizacion-download-button"
          >
            Descargar listado completo (JSON)
          </Button>
        </div>
      </div>

      <HormonizacionGuide />

      <div className="hormonizacion-contact">
        <h2 className="contact-section-title">
          ¿Tenés alguna correción o dato para sumar?
        </h2>
        <Contact next={`${SITE_URL}/hormonizacion`} />
      </div>

      <Footer />
    </div>
  );
}

export default Hormonizacion;
