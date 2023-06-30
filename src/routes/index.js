import { LazyHome, LazyCourses, LazyNosotres, LazyDonations } from "../lazy-components";
import { Link, Route, useMatch, useResolvedPath } from "react-router-dom";



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
    {
        name: "Donar",
        path: "/donar",
        component: <LazyDonations />,
        exact: true
    },
]

const Paths = (props) => routes.map((item, idx) => <Route key={idx} path={item.path} element={item.component} />);

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
        <li className={`menu__link ${isActive ? 'active' : ''}`} >
            <Link {...props} to={to}>{children}</Link>
        </li>
    )
}

const Links = (props) => routes.map((item, idx) => <CustomLink className={item.path.toLowerCase().slice(1)} key={idx} to={item.path} {...props}>{item.name}</CustomLink>);

export { Paths, Links }