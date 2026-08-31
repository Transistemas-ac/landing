import { lazy, Suspense } from "react";
import { Route, useMatch, useResolvedPath } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import LoadingScreen from "../views/LoadingScreen";

const HomeView = lazy(() => import("../views/Home"));
const CoursesView = lazy(() => import("../views/Courses"));
const CourseLandingView = lazy(() => import("../views/CourseLanding"));
const EquiposView = lazy(() => import("../views/Equipos"));
const HormonizacionView = lazy(() => import("../views/Hormonizacion"));
const HormonizacionProvinciaView = lazy(() =>
  import("../views/HormonizacionProvincia")
);

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
    name: "Hormonización",
    path: "/hormonizacion",
    element: getRouteElement(HormonizacionView),
    className: "hormonizacion",
    showInNavbar: true,
  },
  {
    name: "Equipos",
    path: "/equipos",
    element: getRouteElement(EquiposView),
    className: "equipos",
  },
  {
    name: "Hormonización por provincia",
    path: "/hormonizacion/:provinciaSlug",
    element: getRouteElement(HormonizacionProvinciaView),
    className: "hormonizacion",
    showInNavbar: false,
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
