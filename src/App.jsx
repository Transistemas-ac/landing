<<<<<<< HEAD
import Card from './components/Card';
import cardImageCarousel from './media/svg/carousel-image-0.svg';
import cardImageCapacitaciones from './media/svg/capacitacionesImg.svg'
import cardImageAcompañamiento from './media/svg/acompañamientoImage.svg'
import Button from './components/Button';

function App() {
	return (
		<div className="App">
			<h1>Hello World</h1>

			<Card 
				img={cardImageCarousel}
				title="Cursos y talleres"
				description="Brindamos capacitaciones en Testing, Diseño UX/UI y Desarrollo web para personas de la comunidad LGTBI+."
				link="Saber mas"
			/>

			<Card
				img={cardImageCapacitaciones}
				title="Capacitaciones"
				description="Facilitamos capacitaciones en diversidad, género y discapacidad para empresas y organizaciones."
				link="Saber mas"
			/>

			<Card
				img={cardImageAcompañamiento}
				title="Acompañamiento"
				description="Colaboramos con personas de la comunidad a sortear situaciones complejas."
				link="Saber mas"
			/>

			<Button></Button>

=======
import Home from './views/Home';
import Topbar from './components/Topbar';

function App() {
	return (
		<div className="app">
			<Topbar />
			<Home />
>>>>>>> MartinBBranch
		</div>
	);
}

export default App;
