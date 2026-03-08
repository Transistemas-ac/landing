import metrics from "../data/Metrics";

const Items = () =>
  metrics.map((item, idx) => (
    <div key={idx} className="metrics-item">
      <h1 className="metrics-value">{item.value}</h1>
      <h2 className="metrics-title">{item.title}</h2>
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
