import React from 'react';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { DisplayContext, useDisplay } from './utils/DisplayProvider';
import { Paths } from "./routes";

import Navbar from "./components/Navbar";
import ErrorPage from "./views/ErrorPage";
import { SnackbarContainer } from './components/Snackbar';
function App() {

	const isMobile = useDisplay();

	return (
		<div className="app">
			<DisplayContext.Provider value={isMobile}>
				<Router>
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
