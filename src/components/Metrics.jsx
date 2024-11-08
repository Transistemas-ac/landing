const metrics = [
  { value: 24, title: "Cursos dictados" },
  { value: 500, title: "Ayudas sociales" },
  { value: 18, title: "Voluntaries" },
  { value: 1770, title: "Egresades" },
  { value: "+350", title: "Personas consiguieron trabajo registrado" },
];

const Items = () =>
  metrics.map((item, idx) => (
    <div key={idx} className="metrics__item">
      <h1 className="metrics__value">{item.value}</h1>
      <h2 className="metrics__title">{item.title}</h2>
    </div>
  ));

function Metrics(props) {
  return (
    <>
      <div className="metrics">
        <Items />
      </div>
    </>
  );
}

export default Metrics;
