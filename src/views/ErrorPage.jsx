import imgErrorElectricity from "../assets/svg/electricity-error.svg";

function ErrorPage({ title = "Algo salió mal, intentá de nuevo o regresá más tarde" }) {
  return (
    <div className="error-page">
      <img
        className="error-page-img"
        src={imgErrorElectricity}
        alt="imagen de enchufe error"
      />

      <h1 className="error-page-text">
        {title}
      </h1>
    </div>
  );
}

export default ErrorPage;
