import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Paths } from "./routes";
import Navbar from "./components/Navbar";
import ErrorPage from "./views/ErrorPage";
import { SnackbarContainer } from "./components/Snackbar";

import useDisplay from "./hooks/useDisplay";
import DisplayContext from "./context/DisplayProvider";
import ScrollToTop from "./components/ScrollToTop";

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
