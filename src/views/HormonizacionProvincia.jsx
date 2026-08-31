import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import Breadcrumb from "../components/Breadcrumb";
import Footer from "../components/Footer";
import SaludMap from "../components/SaludMap";
import SaludListItem from "../components/SaludListItem";
import ErrorPage from "./ErrorPage";
import {
  Salud,
  getCoords,
  getItemsByProvincia,
  getProvinciaBySlug,
  getProvinciaSlug,
  provincias
} from "../utils/saludFunctions";
import { SITE_URL } from "../utils/seo";
import { buildBreadcrumbSchema } from "../utils/breadcrumb";

const scrollItemIntoView = (index) => {
  document
    .getElementById(`salud-item-${index}`)
    ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
};

const buildItemSchema = (items, provincia) => ({
  "@type": "ItemList",
  name: `Centros de salud con hormonización en ${provincia}`,
  itemListOrder: "https://schema.org/ItemListUnordered",
  numberOfItems: items.length,
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "MedicalClinic",
      name: item.nombre,
      medicalSpecialty: "https://schema.org/Endocrine",
      address: {
        "@type": "PostalAddress",
        streetAddress: item.direccion,
        addressLocality: item.ciudad,
        addressRegion: item.provincia,
        addressCountry: "AR"
      },
      ...(item.telefono && { telephone: item.telefono }),
      ...(item.correo && { email: item.correo })
    }
  }))
});

function HormonizacionProvincia() {
  const { provinciaSlug = "" } = useParams();
  const [selectedIndex, setSelectedIndex] = useState(null);

  const provincia = getProvinciaBySlug(provinciaSlug);

  const items = useMemo(
    () => (provincia ? getItemsByProvincia(provincia) : []),
    [provincia]
  );

  const points = useMemo(
    () =>
      items.map((item) => {
        const index = Salud.indexOf(item);
        return { index, item, coords: getCoords(item, index) };
      }),
    [items]
  );

  useEffect(() => {
    setSelectedIndex(null);
  }, [provincia]);

  if (!provincia) {
    return <ErrorPage title="Esta provincia no está disponible." />;
  }

  const path = `/hormonizacion/${provinciaSlug}`;
  const breadcrumbItems = [
    { name: "Inicio", url: `${SITE_URL}/` },
    { name: "Hormonización", url: `${SITE_URL}/hormonizacion` },
    { name: provincia, url: `${SITE_URL}${path}` }
  ];

  const handleSelect = (index) => {
    setSelectedIndex(index);
    scrollItemIntoView(index);
  };

  return (
    <div className="hormonizacion">
      <Seo
        title={`Hormonización en ${provincia} — Centros de salud LGBTIQ+`}
        description={`Encontrá los ${items.length} centros de salud con hormonización y atención integral para la comunidad LGBTIQ+ en ${provincia}. Dirección, teléfono y correo de contacto de cada uno en el mapa y listado.`}
        path={path}
        schema={[
          {
            ...buildItemSchema(items, provincia),
            "@id": `${SITE_URL}${path}#centros`
          },
          buildBreadcrumbSchema(breadcrumbItems)
        ]}
      />

      <div className="hormonizacion-section">
        <Breadcrumb items={breadcrumbItems} />

        <div className="hormonizacion-header">
          <h1 className="hormonizacion-title">
            Hormonización en {provincia}
          </h1>
          <p className="hormonizacion-description">
            {items.length} {items.length === 1 ? "centro de salud" : "centros de salud"}{" "}
            con hormonización y atención integral para la comunidad LGBTIQ+ en{" "}
            {provincia}. Seleccioná un punto en el mapa o un centro del listado
            para ver su información.
          </p>
          <nav className="hormonizacion-provincias-nav" aria-label="Provincias">
            {provincias.map((other) => {
              const active = other === provincia;
              return (
                <Link
                  key={other}
                  className={`hormonizacion-provincias-link ${
                    active ? "active" : ""
                  }`}
                  aria-current={active ? "page" : undefined}
                  to={active ? "/hormonizacion" : `/hormonizacion/${getProvinciaSlug(other)}`}
                >
                  {other}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="hormonizacion-layout">
          <div className="hormonizacion-list">
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
          </div>
          <aside className="hormonizacion-map" aria-label="Mapa de centros">
            <SaludMap
              points={points}
              selectedIndex={selectedIndex}
              onSelect={setSelectedIndex}
            />
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HormonizacionProvincia;