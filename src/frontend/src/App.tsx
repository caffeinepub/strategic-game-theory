import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import HomePage from './pages/HomePage';
import AboutGameTheoryPage from './pages/AboutGameTheoryPage';
import InteractiveModelsPage from './pages/InteractiveModelsPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import LearningResourcesPage from './pages/LearningResourcesPage';
import QuizSimulationPage from './pages/QuizSimulationPage';
import ContactFeedbackPage from './pages/ContactFeedbackPage';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutGameTheoryPage,
});

const modelsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/models',
  component: InteractiveModelsPage,
});

const caseStudiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/case-studies',
  component: CaseStudiesPage,
});

const resourcesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/resources',
  component: LearningResourcesPage,
});

const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/quiz',
  component: QuizSimulationPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactFeedbackPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  modelsRoute,
  caseStudiesRoute,
  resourcesRoute,
  quizRoute,
  contactRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
