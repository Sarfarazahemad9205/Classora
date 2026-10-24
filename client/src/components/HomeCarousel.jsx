import Icon from "./Icon";
import { Link } from "react-router-dom";
import scienceImage from "../assets/science.png";
import mathematicsImage from "../assets/mathematics.png";
import englishImage from "../assets/english.png";

const orbitCards = [
  { name: "Science", image: scienceImage, className: "orbit-card orbit-card--science", mark: "01" },
  { name: "Mathematics", image: mathematicsImage, className: "orbit-card orbit-card--math", mark: "02" },
  { name: "English", image: englishImage, className: "orbit-card orbit-card--english", mark: "03" },
];

function HomeCarousel() {
  return (
    <section className="learning-hero" id="home" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow hero-glow--one" aria-hidden="true" />
      <div className="hero-glow hero-glow--two" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="hero-eyebrow"><Icon name="sparkle" size={15} /> LEARN WITH CLARITY</span>
          <h1 id="hero-title">Big goals start<br />with <em>one good</em> lesson.</h1>
          <p className="hero-description">A calmer, clearer way to learn Class 10. Find your subject, follow each chapter, and build confidence one concept at a time.</p>
          <div className="hero-actions">
            <Link className="hero-primary" to="/subjects">Explore subjects <Icon name="arrow" size={17} /></Link>
            <a className="hero-secondary" href="#how-it-works"><Icon name="book" size={17} /> How it works</a>
          </div>
          <div className="hero-proof"><span className="proof-icon"><Icon name="cap" size={18} /></span><span><strong>One focused place</strong><small>Science · Mathematics · English</small></span></div>
        </div>
        <div className="hero-art" aria-label="Explore Science, Mathematics and English learning resources">
          <div className="art-orbit art-orbit--outer" aria-hidden="true" />
          <div className="art-orbit art-orbit--inner" aria-hidden="true" />
          <div className="art-core"><span className="core-ring"><Icon name="cap" size={42} /></span><small>YOUR LEARNING<br />JOURNEY</small></div>
          {orbitCards.map((card) => <Link key={card.name} to="/subjects" className={card.className} style={{ backgroundImage: `linear-gradient(180deg, transparent 36%, rgba(8, 21, 42, .9)), url(${card.image})` }}><span className="orbit-mark">{card.mark}</span><strong>{card.name}</strong><span className="orbit-link">Explore <Icon name="arrow" size={13} /></span></Link>)}
          <div className="floating-note"><span className="note-dot" /> Small steps. Strong foundations.</div>
        </div>
      </div>
      <a className="hero-scroll" href="#welcome"><span>SCROLL TO EXPLORE</span><Icon name="down" size={14} /></a>
    </section>
  );
}

export default HomeCarousel;

