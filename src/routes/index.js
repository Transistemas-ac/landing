import { LazyHome, LazyCourses, LazyNosotres } from "../views/lazyViews";
import { Link, Route } from "react-router-dom";


const routes = [
    {
        name: "Inicio",
        path: "/",
        component: <LazyHome />,
        exact: true
    },
    {
        name: "Cursos y talleres",
        path: "/cursos",
        component: <LazyCourses />,
        exact: true
    },
    {
        name: "Nosotres",
        path: "/nosotres",
        component: <LazyNosotres />,
        exact: true
    },
]

const Paths = (props) => routes.map((item, idx) => <Route key={idx} path={item.path} element={item.component} />);
const Links = (props) => routes.map((item, idx) => <li key={idx} className="menu__link" {...props}> <Link to={item.path}>{item.name}</Link></li>);

export { Paths, Links }