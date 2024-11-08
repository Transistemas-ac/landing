import imgErrorElectricity from "../assets/svg/electricity-error.svg";

function ErrorPage() {
  return (
    <div className="error-page">
      <img
        className="error-page__img"
        src={imgErrorElectricity}
        alt="imagen de enchufe error"
      />

      <h1 className="error-page__text">
        Algo salió mal, intentá de nuevo o regresá más tarde
      </h1>
    </div>
  );
}

export default ErrorPage;
