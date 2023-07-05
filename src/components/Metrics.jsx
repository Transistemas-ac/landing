import metrics from "../utils/Metrics";
import { snackbar } from './Snackbar';

const Items = () => metrics.map((item, idx) =>
(<div key={idx} className="metrics__item">
    <h1 className="metrics__value">{item.value}</h1>
    <h2 className="metrics__title">{item.title}</h2>
</div>)
)

function Metrics(props) {
    return (
        <>
            <div className="metrics">
                {/* <div className="metrics__item">
                    <h1 className="metrics__value">20</h1>
                    <h2 className="metrics__title">Cursos Dictados</h2>
                </div> */}

                <Items />
            </div>
        </>
    );
}

export default Metrics;



