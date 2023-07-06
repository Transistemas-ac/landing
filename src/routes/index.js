import { LazyHome, LazyCourses, LazyNosotres, LazyDonations } from '../lazy-components';
import { Link, Route, useMatch, useResolvedPath } from 'react-router-dom';

const routes = [
    {
        name: 'Inicio',
        path: '/',
        component: <LazyHome />,
        exact: true,
        class: 'home'
    },
    {
        name: 'Cursos y talleres',
        path: '/cursos',
        component: <LazyCourses />,
        exact: true,
        class: 'courses'
    },
    {
        name: 'Nosotres',
        path: '/nosotres',
        component: <LazyNosotres />,
        exact: true,
        class: 'nosotres'
    },
    {
        name: 'Donar',
        path: '/donar',
        component: <LazyDonations />,
        exact: true,
        class: 'donate'
    },
]

const Paths = (props) => routes.map((item, idx) => <Route key={idx} path={item.path} element={item.component} exact={item.exact} />);

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
        <li className={`navbar__link ${isActive ? 'active' : ''}`} >
            <Link {...props} to={to}>{children}</Link>
        </li>
    )
}

const NavbarLinks = (props) =>
    routes.map(
        (item, idx) =>
            <CustomLink key={idx} className={item.class} to={item.path} {...props}>{item.name}</CustomLink>
    );

export { Paths, NavbarLinks }