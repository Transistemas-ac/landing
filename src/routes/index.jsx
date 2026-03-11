import { lazy, Suspense } from "react";
import { Route, useMatch, useResolvedPath } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import LoadingScreen from "../views/LoadingScreen";

const HomeView = lazy(() => import("../views/Home"));
const CoursesView = lazy(() => import("../views/Courses"));
const CourseLandingView = lazy(() => import("../views/CourseLanding"));
const ServiciosView = lazy(() => import("../views/Servicios"));
const EquiposView = lazy(() => import("../views/Equipos"));

const getRouteElement = (Component) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component />
  </Suspense>
);

const routes = [
  {
    name: "Inicio",
    path: "/",
    element: getRouteElement(HomeView),
    className: "home",
  },
  {
    name: "Cursos",
    path: "/cursos",
    element: getRouteElement(CoursesView),
    className: "courses",
  },
  {
    name: "Curso",
    path: "/cursos/:courseSlug",
    element: getRouteElement(CourseLandingView),
    className: "course-landing",
    showInNavbar: false,
  },
  {
    name: "Servicios",
    path: "/servicios",
    element: getRouteElement(ServiciosView),
    className: "services",
  },
  {
    name: "Equipos",
    path: "/equipos",
    element: getRouteElement(EquiposView),
    className: "equipos",
  },
];

const Paths = () =>
  routes.map(({ path, element }) => <Route key={path} path={path} element={element} />);

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={`navbar-link ${isActive ? "active" : ""}`}>
      <HashLink {...props} to={to}>
        {children}
      </HashLink>
    </li>
  );
}

const NavbarLinks = (props) =>
  routes
    .filter(({ showInNavbar = true }) => showInNavbar)
    .map(({ name, path, className }) => (
      <CustomLink key={path} className={className} to={path} {...props}>
        {name}
      </CustomLink>
    ));

export { Paths, NavbarLinks };
