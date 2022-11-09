import Dropdown from './components/Dropdown';
import Button from './components/Button';


function App() {
	return (
		<div className="App">

			<div className="questions">
				<h1 className='questions__title'>Preguntas frecuentes</h1>
				<Dropdown title="¿Cuanto cuestan los cursos?">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui reprehenderit illo exercitationem ut tenetur repudiandae et velit quis deserunt aut, numquam aliquid
				</Dropdown>

				<Dropdown title="¿Quienes pueden anotarse en los cursos?">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui reprehenderit illo exercitationem ut tenetur repudiandae et velit quis deserunt aut, numquam aliquid Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad illum voluptas impedit? Sed rerum itaque asperiores labore aliquid. Repellendus saepe quae, sunt alias eveniet totam optio id nemo quia corporis.
				</Dropdown>

				{/* Ejemplo pasando un elemento HTML */}
				<Dropdown title={<span style={{color: 'yellow'}}>¿Si termino el curso recibo un certificado?</span>}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui reprehenderit illo exercitationem ut tenetur repudiandae et velit quis deserunt aut, numquam aliquid
				</Dropdown>
			</div>


			<Button>Boton</Button>
		</div>
	);
}

export default App;
