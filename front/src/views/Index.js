import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

function Index() {
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h1>Bienvenido al sistema de tickets</h1>

            <p>{user ? "ya iniciaste sesion" : "Favor ingresar"} </p>

            <Link className="btn btn-primary" to="/login">
              {user ? "Ir al sistema" : "ir a login"}
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Index;
