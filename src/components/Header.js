import { useState } from "react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = ["Home", "About", "Schedule", "Membership", "Pricing"];

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">🌴 TropiGo</div>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          {links.map((link) => (
            <a key={link} href="#">
              {link}
            </a>
          ))}
          <button className="btn btn-primary explore-btn">Explore</button>
        </nav>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>
    </header>
  );
}

export default Header;
