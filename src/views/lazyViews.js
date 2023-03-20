import { lazy, Suspense } from "react";

import LoadingScreen from "./LoadingScreen";

const Home = lazy(() => import('./Home'));
const Courses = lazy(() => import('./Courses'));
const Nosotres = lazy(() => import('./Nosotres'));


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

export { LazyHome, LazyCourses, LazyNosotres }
