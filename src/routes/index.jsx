import {
  LazyHome,
  LazyCourses,
  LazyNosotres,
  LazyDonations,
} from "../lazy-components";
import { Route, useMatch, useResolvedPath } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const routes = [
  {
    name: "Inicio",
    path: "/",
    component: <LazyHome />,
    exact: true,
    class: "home",
  },
  {
    name: "Cursos y Talleres",
    path: "/cursos",
    component: <LazyCourses />,
    exact: true,
    class: "courses",
  },
  {
    name: "Nosotres",
    path: "/nosotres",
    component: <LazyNosotres />,
    exact: true,
    class: "nosotres",
  },
  {
    name: "Donar",
    path: "/donar",
    component: <LazyDonations />,
    exact: true,
    class: "donate",
  },
];

const Paths = (props) =>
  routes.map((item, idx) => (
    <Route
      key={idx}
      path={item.path}
      element={item.component}
      exact={item.exact}
    />
  ));

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={`navbar__link ${isActive ? "active" : ""}`}>
      <HashLink {...props} to={to}>
        {children}
      </HashLink>
    </li>
  );
}

const NavbarLinks = (props) =>
  routes.map((item, idx) => (
    <CustomLink key={idx} className={item.class} to={item.path} {...props}>
      {item.name}
    </CustomLink>
  ));

export { Paths, NavbarLinks };
