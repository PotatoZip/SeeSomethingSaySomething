import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { footerLinks, galleryItems, heroStats, steps } from '../data/homePageData';

function HomePage() {
  const galleryRef = useRef(null);
  const [activePopup, setActivePopup] = useState(null);

  const activeFooterLink = useMemo(
    () => footerLinks.find((item) => item.key === activePopup) ?? null,
    [activePopup]
  );

  const scrollGallery = (direction) => {
    if (!galleryRef.current) {
      return;
    }

    const card = galleryRef.current.querySelector('.gallery-card');
    const cardWidth = card ? card.getBoundingClientRect().width : 0;
    const gap = 22;
    const distance = cardWidth + gap;

    galleryRef.current.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth'
    });
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="hero-kicker">NAJPROSTSZY SPOSÓB NA NAPRAWĘ OKOLICY</p>
          <h1>
            Zmień swoje
            <br />
            miasto
            <br />
            <span>jednym kliknięciem.</span>
          </h1>
          <p className="hero-text">
            Widzisz problem? Zrób zdjęcie. See Something? Say Something! zajmie się resztą,
            łącząc Cię bezpośrednio z odpowiednimi służbami miejskimi.
          </p>
          <div className="hero-actions">
            <Link to="/send-request" className="primary-button">
              ⊕ Zgłoś usterkę
            </Link>
          </div>
        </div>

        <div className="hero-visual" aria-label="City dashboard preview">
          <div className="dashboard-frame">
            <div className="dashboard-topbar">
              <span />
              <span />
              <span />
            </div>
            <div className="dashboard-grid">
              <div className="dashboard-card card-wide" />
              <div className="dashboard-card card-line card-left" />
              <div className="dashboard-card card-chart card-right">
                <div className="chart-bars">
                  {Array.from({ length: 14 }).map((_, index) => (
                    <span
                      key={`top-bar-${index}`}
                      style={{ height: `${36 + ((index * 11) % 56)}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="dashboard-card card-chart card-bottom">
                <div className="chart-bars chart-bars-secondary">
                  {Array.from({ length: 18 }).map((_, index) => (
                    <span
                      key={`bottom-bar-${index}`}
                      style={{ height: `${24 + ((index * 7) % 60)}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="hero-badge">
            <span className="badge-icon">⟳</span>
            <div>
              <p>OSTATNIO NAPRAWIONO</p>
              <strong>Naprawa oświetlenia: 100%</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section" aria-label="Key metrics">
        {heroStats.map((item) => (
          <article className="stat-item" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </article>
        ))}
      </section>

      <section className="steps-section">
        <div className="section-heading">
          <h2>Wystarczy parę sekund</h2>
          <p>
            Zaprojektowaliśmy ten proces tak, aby był maksymalnie prosty. Ty zgłaszasz,
            my działamy.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((step) => (
            <article className="step-card" key={step.title}>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="gallery-section">
        <div className="section-heading section-heading-row">
          <div>
            <h2>Galeria Zmian</h2>
            <p>
              Zobacz konkretne efekty zgłoszeń naszych użytkowników. Twoja okolica może wyglądać
              tak samo.
            </p>
          </div>

          <div className="gallery-nav" aria-label="Gallery navigation">
            <button type="button" aria-label="Previous gallery item" onClick={() => scrollGallery('left')}>
              <GalleryArrow direction="left" />
            </button>
            <button type="button" aria-label="Next gallery item" onClick={() => scrollGallery('right')}>
              <GalleryArrow direction="right" />
            </button>
          </div>
        </div>

        <div className="gallery-track" ref={galleryRef}>
          {galleryItems.map((item) => (
            <article className="gallery-card" key={item.title}>
              <div className="gallery-images">
                <div className="gallery-image before">
                  <img src={item.before} alt={`${item.title} - przed`} />
                  <span>PRZED</span>
                </div>
                <div className="gallery-image after">
                  <img src={item.after} alt={`${item.title} - po`} />
                  <span>PO</span>
                </div>
              </div>
              <div className="gallery-copy">
                <h3>{item.title}</h3>
                <p>{item.location}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <Link to="/" className="brand-link footer-brand">
          <span className="brand-mark">⌂</span>
          <span>See Something? Say Something!</span>
        </Link>

        <p>© 2024 Civic Integrity Portal. Wszystkie prawa zastrzeżone.</p>

        <div className="footer-links">
          {footerLinks.map((link) => (
            <button key={link.key} type="button" className="footer-link-button" onClick={() => setActivePopup(link.key)}>
              {link.title}
            </button>
          ))}
        </div>

        <div className="footer-actions" aria-label="Footer actions">
          <button type="button" aria-label="Language options">
            <GlobeIcon />
          </button>
          <button type="button" aria-label="Share">
            <ShareIcon />
          </button>
        </div>
      </footer>

      {activeFooterLink ? (
        <div className="popup-backdrop" role="presentation" onClick={() => setActivePopup(null)}>
          <div className="popup-card" role="dialog" aria-modal="true" aria-labelledby="popup-title" onClick={(event) => event.stopPropagation()}>
            <div className="popup-header">
              <div>
                <p className="popup-kicker">MOCKED DATA</p>
                <h3 id="popup-title">{activeFooterLink.title}</h3>
              </div>
              <button type="button" className="popup-close" aria-label="Close popup" onClick={() => setActivePopup(null)}>
                ×
              </button>
            </div>
            <p className="popup-description">{activeFooterLink.description}</p>
            <ul className="popup-list">
              {activeFooterLink.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function GalleryArrow({ direction }) {
  return direction === 'left' ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 18 9 12l6-6" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18" />
      <path d="M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 9 9 12l5 3" />
      <circle cx="18" cy="5" r="2" />
      <circle cx="6" cy="12" r="2" />
      <circle cx="18" cy="19" r="2" />
      <path d="M8 12h8M17 6.5 7 11M17 17.5 7 13" />
    </svg>
  );
}

export default HomePage;
