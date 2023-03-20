import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Paths } from "./routes";

import Topbar from "./components/Topbar";
import ErrorPage from "./views/ErrorPage";

function App() {
	return (
		<div className="app">
			<Router>
				<Topbar />

				<Routes>
					{Paths()}
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
