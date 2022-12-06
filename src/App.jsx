import Home from './views/Home';
import Nosotres from './views/Nosotres';
import Courses from './views/Courses';
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
					<Route exact path="/nosotres" element={<Nosotres />} />
					<Route exact path="/cursos" element={<Courses />} />
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
