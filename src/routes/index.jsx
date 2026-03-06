import { lazy, Suspense } from "react";
import { Route, useMatch, useResolvedPath } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import LoadingScreen from "../views/LoadingScreen";

const Home = lazy(() => import("../views/Home"));
const Courses = lazy(() => import("../views/Courses"));
const Servicios = lazy(() => import("../views/Servicios"));
const Equipos = lazy(() => import("../views/Equipos"));

const routes = [
  {
    name: "Inicio",
    path: "/",
    component: (
      <Suspense fallback={<LoadingScreen />}>
        <Home />
      </Suspense>
    ),
    exact: true,
    class: "home",
  },
  {
    name: "Cursos",
    path: "/cursos",
    component: (
      <Suspense fallback={<LoadingScreen />}>
        <Courses />
      </Suspense>
    ),
    exact: true,
    class: "courses",
  },
  {
    name: "Servicios",
    path: "/servicios",
    component: (
      <Suspense fallback={<LoadingScreen />}>
        <Servicios />
      </Suspense>
    ),
    exact: true,
    class: "courses",
  },
  {
    name: "Equipos",
    path: "/equipos",
    component: (
      <Suspense fallback={<LoadingScreen />}>
        <Equipos />
      </Suspense>
    ),
    exact: true,
    class: "equipos",
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
