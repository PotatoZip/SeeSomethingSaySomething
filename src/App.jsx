import { NavLink, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SendRequestPage from './pages/SendRequestPage';
import GaleryPage from './pages/GaleryPage';

function App() {
  return (
    <>
      <nav aria-label="Main navigation">
        <NavLink to="/" end>
          Home
        </NavLink>{' '}
        <NavLink to="/send-request">Send Request</NavLink>{' '}
        <NavLink to="/galery">Galery</NavLink>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/send-request" element={<SendRequestPage />} />
          <Route path="/galery" element={<GaleryPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
