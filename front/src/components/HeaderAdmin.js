import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { logout } from "../actions/userActions";
function HeaderAdmin() {
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout(user));
  };

  useEffect(() => {
    if (!user) {
      window.location.href = "/";
    }
  }, [user]);

  return (
    <header>
      <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Sistema gestion de tickets</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {user ? (
                <NavDropdown title={user.username} id="username">
                  <LinkContainer to="/">
                    <NavDropdown.Item>Inicio</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
export default HeaderAdmin;
