import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { Paths } from "./routes";
import ErrorPage from "./views/ErrorPage";
import DisplayContext from "./context/DisplayProvider";
import useDisplay from "./hooks/useDisplay";
import { SnackbarContainer } from "./components/Snackbar";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";

function App() {
  const isMobile = useDisplay();

  return (
    <div className="app">
      <DisplayContext.Provider value={isMobile}>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Chrome />
          <Routes>
            {Paths()}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </DisplayContext.Provider>
      <SnackbarContainer />
    </div>
  );
}

function Chrome() {
  const { pathname } = useLocation();
  if (pathname === "/hormonizacion/embed") return null;

  return (
    <>
      <ScrollToTop />
      <Navbar />
    </>
  );
}

export default App;