import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row className="py-5">

          {/* Brand */}
          <Col md={5} className="mb-4 mb-md-0">
            <h3 className="footer-brand">
             Classora
            </h3>

            <p className="footer-description">
              Learn Class 10 Science, Mathematics and English
              in one place.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={3} sm={6} className="mb-4 mb-md-0">
            <h5 className="footer-title">
              Quick Links
            </h5>

            <ul className="footer-links">
              <li>
                <a href="#home">Home</a>
              </li>

              <li>
                <a href="#subjects">Subjects</a>
              </li>

              <li>
                <a href="#about">About</a>
              </li>

              <li>
                <a href="#login">Login</a>
              </li>
            </ul>
          </Col>

          {/* Subjects */}
          <Col md={4} sm={6}>
            <h5 className="footer-title">
              Subjects
            </h5>

            <ul className="footer-links">
              <li>
                <a href="#science">Science</a>
              </li>

              <li>
                <a href="#mathematics">Mathematics</a>
              </li>

              <li>
                <a href="#english">English</a>
              </li>
            </ul>
          </Col>

        </Row>

        {/* Developer Information */}
        <div className="developer-info">
          <p>
            Developed by{" "}
            <span>Sarfaraz Ahamed</span>
          </p>

          <p>
            Contact:{" "}
            <a href="tel:+917795760561">
              +91 7795760561
            </a>
          </p>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">

          <p>
            © 2026 Classora. All rights reserved.
          </p>

          <p>
            Learn Today. Build Tomorrow.
          </p>

        </div>

      </Container>
    </footer>
  );
}

export default Footer;