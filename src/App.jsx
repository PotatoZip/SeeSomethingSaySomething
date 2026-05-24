import { useEffect, Suspense, lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Hotjar from '@hotjar/browser';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { trackPageView } from './analytics';


const HomePage = lazy(() => import('./pages/HomePage'));
const SendRequestPage = lazy(() => import('./pages/SendRequestPage'));
const GaleryPage = lazy(() => import('./pages/GaleryPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const DashboardLayout = lazy(() => import('./pages/dashboard/DashboardLayout'));
const OverviewPage = lazy(() => import('./pages/dashboard/OverviewPage'));
const SettingsPage = lazy(() => import('./pages/dashboard/SettingsPage'));


const PageLoader = () => (
  <div className="flex-grow flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

function App() {
  const location = useLocation();

  useEffect(() => {
    const siteId = Number(import.meta.env.VITE_HOTJAR_SITE_ID);
    const hotjarVersion = Number(import.meta.env.VITE_HOTJAR_VERSION || 6);

    if (Number.isFinite(siteId) && siteId > 0) {
      Hotjar.init(siteId, hotjarVersion);
    } else {
      console.warn('Hotjar is not initialized. Set VITE_HOTJAR_SITE_ID in .env.');
    }
  }, []);

  useEffect(() => {
    trackPageView(`${location.pathname}${location.search}${location.hash}`);
  }, [location.pathname, location.search, location.hash]);
  
  return (
    <div className="app-shell flex flex-col min-h-screen">
      <Navbar />

      <main className="page-main flex-grow bg-background pt-16 flex flex-col">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/send-request" element={<SendRequestPage />} />
            <Route path="/galery" element={<GaleryPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<OverviewPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default App;
