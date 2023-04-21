import { lazy, Suspense } from "react";
import LoadingScreen from "../views/LoadingScreen";

const Home = lazy(() => import('../views/Home'))
const Courses = lazy(() => import('../views/Courses'))
const Nosotres = lazy(() => import('../views/Nosotres'))

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

// import loadable from '../utils/loadable';

// const LazyHome = loadable({
//     loader: () => lazy(() => import('./Home')),
//     Loading: LoadingScreen
// })

// const LazyCourses = loadable({
//     loader: () => lazy(() => import('./Courses')),
//     Loading: LoadingScreen
// })

// const LazyNosotres = loadable({
//     loader: () => lazy(() => import('./Nosotres')),
//     Loading: LoadingScreen
// })

export { LazyHome, LazyCourses, LazyNosotres }
