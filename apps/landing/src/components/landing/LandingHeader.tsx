import { assets, links } from "./landingData";

export function LandingHeader() {
  return (
    <header className="landing-header">
      <div className="header-inner">
        <a className="brand" href="#" aria-label="DayTrail home">
          <img className="brand-mark" src={assets.brandMark} alt="" width="44" height="44" />
          <span className="brand-copy">
            <strong>DayTrail</strong>
            <span>Retrace your workday.</span>
          </span>
        </a>

        <nav className="nav" aria-label="Primary navigation">
          <a href="#proof">Why DayTrail</a>
          <a href="#privacy">Privacy</a>
          <a className="nav-download" href={links.releases}>
            Download
          </a>
        </nav>
      </div>
    </header>
  );
}
