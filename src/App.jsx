import { Link, NavLink, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SendRequestPage from './pages/SendRequestPage';
import GaleryPage from './pages/GaleryPage';

function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link to="/" className="brand-link" aria-label="See Something? Say Something! home">
          <span className="brand-mark">⌂</span>
          <span>See Something? Say Something!</span>
        </Link>

        <nav className="site-nav" aria-label="Main navigation">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
          <NavLink to="/galery" className={({ isActive }) => (isActive ? 'active' : '')}>
            Galeria zmian
          </NavLink>
        </nav>

        <Link to="/send-request" className="header-cta">
          Zgłoś teraz
        </Link>
      </header>

      <main className="page-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/send-request" element={<SendRequestPage />} />
          <Route path="/galery" element={<GaleryPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
