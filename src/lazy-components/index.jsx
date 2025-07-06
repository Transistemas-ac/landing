import { lazy, Suspense } from "react";
import LoadingScreen from "../views/LoadingScreen";

const Home = lazy(() => import("../views/Home"));
const Courses = lazy(() => import("../views/Courses"));
const Nosotres = lazy(() => import("../views/Nosotres"));
const Donations = lazy(() => import("../views/Donations"));

const LazyHome = () => (
  <Suspense fallback={<LoadingScreen />}>
    <Home />
  </Suspense>
);

const LazyCourses = () => (
  <Suspense fallback={<LoadingScreen />}>
    <Courses />
  </Suspense>
);

const LazyNosotres = () => (
  <Suspense fallback={<LoadingScreen />}>
    <Nosotres />
  </Suspense>
);

const LazyDonations = () => (
  <Suspense fallback={<LoadingScreen />}>
    <Donations />
  </Suspense>
);

export { LazyHome, LazyCourses, LazyNosotres, LazyDonations };
