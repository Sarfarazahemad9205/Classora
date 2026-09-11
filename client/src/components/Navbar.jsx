import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AppNavbar() {
  const { user } = useAuth();

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>

        {/* Logo */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="navbar-brand-custom"
        >
         Classora
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">

          {/* Main Navigation */}
          <Nav className="mx-auto navbar-links">

            <Nav.Link
              as={Link}
              to="/"
              className="navbar-link"
            >
              Home
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/subjects"
              className="navbar-link"
            >
              Subjects
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/about"
              className="navbar-link"
            >
              About
            </Nav.Link>

            {/* Admin - Only visible to Admin */}
            {user?.role === "admin" && (
              <Nav.Link
                as={Link}
                to="/admin"
                className="navbar-link"
              >
                Admin
              </Nav.Link>
            )}

          </Nav>

          {/* Authentication */}
          <Nav className="align-items-center">

            {/* Login */}
            <Nav.Link
              as={Link}
              to="/login"
              className="px-4 py-2 me-2 rounded-3 text-white fw-semibold"
              style={{
                backgroundColor: "#6f42c1",
              }}
            >
              Login
            </Nav.Link>

            {/* Register */}
            <Nav.Link
              as={Link}
              to="/register"
              className="px-3 py-2 text-white fw-semibold"
            >
              Register
            </Nav.Link>

          </Nav>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default AppNavbar;