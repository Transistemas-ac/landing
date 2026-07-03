import metrics from "../data/Metrics";

const Items = () =>
  metrics.map((item, idx) => (
    <div key={idx} className="metrics-item">
      <p className="metrics-value">{item.value}</p>
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
