import imgErrorElectricity from "../assets/svg/electricity-error.svg";
import Seo from "../components/Seo";

function ErrorPage({ title = "Algo salió mal, intentá de nuevo o regresá más tarde" }) {
  return (
    <div className="error-page">
      <Seo
        title="Página no encontrada"
        description="La página que buscás no existe o ya no está disponible. Volvé al inicio de Transistemas para conocer nuestros cursos y servicios."
        path="/404"
        noindex
      />
      <img
        className="error-page-img"
        src={imgErrorElectricity}
        alt="Ilustración de error 404"
        loading="lazy"
        decoding="async"
      />

      <h1 className="error-page-text">
        {title}
      </h1>
    </div>
  );
}

export default ErrorPage;
