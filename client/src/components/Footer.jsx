import { Link } from "react-router-dom";
import Icon from "./Icon";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand-block"><Link to="/" className="site-brand footer-brand"><span className="brand-mark"><Icon name="book" size={19} /></span><span>Classora<small>LEARN WITH PURPOSE</small></span></Link><p>A thoughtful space to make Class 10 learning simpler, more organized, and easier to return to every day.</p><div className="footer-contact"><span>Created by <strong>Sarfaraz</strong></span><a href="tel:+917795760561">+91 7795760561</a></div></div>
        <div className="footer-column"><h2>Explore</h2><Link to="/">Home <Icon name="arrowUp" size={13} /></Link><Link to="/subjects">Subjects <Icon name="arrowUp" size={13} /></Link><Link to="/about">About Classora <Icon name="arrowUp" size={13} /></Link></div>
        <div className="footer-column"><h2>Your account</h2><Link to="/login">Log in <Icon name="arrowUp" size={13} /></Link><Link to="/register">Create account <Icon name="arrowUp" size={13} /></Link><Link to="/subjects">Study materials <Icon name="arrowUp" size={13} /></Link></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Classora</span><a href="#home">Back to top ↑</a><span>Learn today. Build tomorrow.</span></div>
    </footer>
  );
}

export default Footer;


