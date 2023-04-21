import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Paths } from "./routes";

import Topbar from "./components/Topbar";
import ErrorPage from "./views/ErrorPage";
import { DisplayContext, useDisplay } from './utils/DisplayProvider';

function App() {

	const display = useDisplay();

	return (
		<div className="app">
			<DisplayContext.Provider value={display}>
				<Router>
					<Topbar />

					<Routes>
						{Paths()}
						<Route path="*" element={<ErrorPage />} />
					</Routes>
				</Router>
			</DisplayContext.Provider>
		</div>
	);
}

export default App;
