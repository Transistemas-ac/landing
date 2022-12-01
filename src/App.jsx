import Home from './views/Home';
import Workshops from './views/Workshops';
import Topbar from './components/Topbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorPage from './views/Error';

function App() {
	return (
		<div className="app">
			<Router>
				<Topbar />

				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/cursos" element={<Workshops />} />
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
