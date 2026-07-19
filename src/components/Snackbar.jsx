import iconClose from "../assets/svg/icon_close.svg";

const SnackbarContainer = () => <div id="snackbar-container"></div>;

const Snackbar = ({ message, type, root }) => {
  return (
    <div className={`snack ${type}`}>
      <p className="snack-message">{message}</p>
      <img
        className="snack-close"
        src={iconClose}
        alt="icono de cerrar snackbar"
        onClick={() => root.unmount()}
      />
    </div>
  );
};

export { SnackbarContainer };
export default Snackbar;
