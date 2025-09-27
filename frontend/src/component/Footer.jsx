import React from 'react'
import '../styleSheets/footer.css'

export default function Footer() {
  return (
    <footer className="footer-root">
      <div className="footer-top">
        <div className="footer-cta">
          <h2 className="footer-title">Have a cool idea? Let’s collaborate.</h2>
          <a className="footer-button" href="#contact">Get in touch</a>
        </div>

        <div className="footer-meta">
          <div className="meta-block">
            <h3 className="meta-heading">Location</h3>
            <p className="meta-text">Internet, Planet Earth</p>
          </div>
          <div className="meta-block">
            <h3 className="meta-heading">Contact</h3>
            <p className="meta-text">hello@balanceo.app</p>
          </div>
          <div className="meta-block">
            <h3 className="meta-heading">Helpful Links</h3>
            <ul className="meta-links">
              <li><a href="#privacy">Privacy</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-divider" />

      <section className="footer-banner" aria-label="Balanceo banner">
        <div className="banner-overlay" />
        <div className="banner-content">
          <h1 className="banner-word" aria-hidden="true">BALANCEO</h1>
          <ul className="banner-notes">
            <li>Early access beta</li>
            <li>Track income and expenses in seconds</li>
            <li>Smart insights and tidy visuals</li>
            <li>Secure by default</li>
          </ul>
        </div>
      </section>

      <div className="footer-bottom">
        <p className="copyright">© {new Date().getFullYear()} Balanceo</p>
        <p className="made-with">Made with care</p>
      </div>
    </footer>
  )
}

