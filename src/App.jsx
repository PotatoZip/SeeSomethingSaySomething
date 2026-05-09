import { Link, NavLink, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SendRequestPage from './pages/SendRequestPage';
import GaleryPage from './pages/GaleryPage';

function App() {
  return (
    <div className="app-shell flex flex-col min-h-screen">
      {/* Global Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm border-b border-outline-variant/10 left-0">
        <div className="flex justify-between items-center h-16 px-6 lg:px-12 w-full max-w-[1440px] mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">account_balance</span>
            <span className="text-xl font-bold text-blue-900 font-headline tracking-tight hidden sm:block">
              See Something? Say Something!
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => 
                `font-bold font-headline transition-colors ${isActive ? 'text-blue-900 border-b-2 border-blue-900 pb-1' : 'text-slate-600 hover:text-blue-800'}`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/galery" 
              className={({ isActive }) => 
                `font-bold font-headline transition-colors ${isActive ? 'text-blue-900 border-b-2 border-blue-900 pb-1' : 'text-slate-600 hover:text-blue-800'}`
              }
            >
              Galeria zmian
            </NavLink>
          </div>
          <Link
            to="/send-request"
            className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-bold text-sm hover:opacity-90 transition-all shadow-sm flex items-center"
          >
            Zgłoś teraz
          </Link>
        </div>
      </nav>

      <main className="page-main flex-grow bg-background pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/send-request" element={<SendRequestPage />} />
          <Route path="/galery" element={<GaleryPage />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <footer className="w-full bg-slate-50 border-t border-slate-200 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center py-12 px-6 lg:px-12 w-full max-w-[1440px] mx-auto gap-8">
          <div className="flex flex-col gap-4 items-center md:items-start">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-2xl">account_balance</span>
              <span className="text-lg font-bold text-blue-900 font-headline tracking-tight">
                See Something? Say Something!
              </span>
            </div>
            <p className="text-slate-500 text-sm font-body m-0">
              © 2024 Civic Integrity Portal. Wszystkie prawa zastrzeżone.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a className="text-slate-500 hover:text-primary transition-colors text-sm font-body" href="#!">
              Prywatność
            </a>
            <a className="text-slate-500 hover:text-primary transition-colors text-sm font-body" href="#!">
              Regulamin
            </a>
            <a className="text-slate-500 hover:text-primary transition-colors text-sm font-body" href="#!">
              Pomoc
            </a>
          </div>
          <div className="flex gap-4">
            <a className="w-10 h-10 rounded-full bg-white border border-outline-variant flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all" href="#!">
              <span className="material-symbols-outlined text-xl">language</span>
            </a>
            <a className="w-10 h-10 rounded-full bg-white border border-outline-variant flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all" href="#!">
              <span className="material-symbols-outlined text-xl">share</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
