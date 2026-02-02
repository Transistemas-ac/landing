import metrics from "../data/Metrics";

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
