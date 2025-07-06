import { HashRouter as Router, Route, Routes } from "react-router-dom";
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
        <Router>
          <ScrollToTop />
          <Navbar />

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

export default App;
