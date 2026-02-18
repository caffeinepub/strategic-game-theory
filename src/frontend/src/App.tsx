import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import HomePage from './pages/HomePage';
import AboutGameTheoryPage from './pages/AboutGameTheoryPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import LearningResourcesPage from './pages/LearningResourcesPage';
import ContactFeedbackPage from './pages/ContactFeedbackPage';
import SimulatorPage from './pages/SimulatorPage';
import PrisonersDilemmaPage from './pages/simulator/PrisonersDilemmaPage';
import AuctionBiddingPage from './pages/simulator/AuctionBiddingPage';
import MarketEntryPage from './pages/simulator/MarketEntryPage';
import SupplyChainBargainingPage from './pages/simulator/SupplyChainBargainingPage';
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

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactFeedbackPage,
});

const simulatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/simulator',
  component: SimulatorPage,
});

const prisonersDilemmaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/simulator/prisoners-dilemma',
  component: PrisonersDilemmaPage,
});

const auctionBiddingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/simulator/auction-bidding',
  component: AuctionBiddingPage,
});

const marketEntryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/simulator/market-entry',
  component: MarketEntryPage,
});

const supplyChainBargainingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/simulator/supply-chain-bargaining',
  component: SupplyChainBargainingPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  caseStudiesRoute,
  resourcesRoute,
  contactRoute,
  simulatorRoute,
  prisonersDilemmaRoute,
  auctionBiddingRoute,
  marketEntryRoute,
  supplyChainBargainingRoute,
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
