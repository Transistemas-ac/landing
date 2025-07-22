const metrics = [
  { value: 26, title: "Cursos dictados" },
  { value: 500, title: "Ayudas sociales" },
  { value: 19, title: "Voluntaries" },
  { value: 1789, title: "Egresades" },
  { value: "+350", title: "Personas consiguieron trabajo registrado" },
];

const Items = () =>
  metrics.map((item, idx) => (
    <div key={idx} className="metrics__item">
      <h1 className="metrics__value">{item.value}</h1>
      <h2 className="metrics__title">{item.title}</h2>
    </div>
  ));

function Metrics() {
  return (
    <>
      <div className="metrics">
        <Items />
      </div>
    </>
  );
}

export default Metrics;
