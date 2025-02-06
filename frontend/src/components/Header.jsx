import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Button,
  NavDropdown,
} from "react-bootstrap";

function Header() {
  return (
    <header>
      <Navbar data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">1HealthHub</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <>
              <NavDropdown title="Explore" id="nav-dropdown">
                <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
                <NavDropdown.Item eventKey="4.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="4.3">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            </>
            <Nav.Link href="#action2" className="ms-3">
              Become a Provider
            </Nav.Link>
            <Nav.Link href="/login" className="ms-3">
              <i className="fas fa-user"></i>Login
            </Nav.Link>
            <Button variant="outline-success" className="btn-sm ms-3">
              Join
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
