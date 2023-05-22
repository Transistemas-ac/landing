import imgErrorCat from '../assets/svg/error-cat.svg';

function ErrorPage(){
    return (
        <div className="error-page">

            <img className="error-page__img" src={imgErrorCat} alt="imagen de gato error" />

            <h1 className="error-page__text">Algo salió mal, intentá de nuevo o regresá más tarde</h1>
        </div>
    );
}

export default ErrorPage;