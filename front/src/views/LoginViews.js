import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ".././login.css";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

import Loader from "../components/Loader";
import { login } from "../actions/userActions";
import Swal from "sweetalert2";

function LoginView({}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { user, isFetching, errorMessage } = userLogin;

  useEffect(() => {
    if (user) {
      window.location.href = "tickets";
      return;
    }
  }, [user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (username.length === 0 || password.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Todos los campos son obligatorios!",
      });
      return;
    }
    dispatch(login(username, password));
  };

  return (
    <>
      <div className="sidenav">
        <div className="login-main-text">
          <h2>Sistema Gestion de tickets</h2>
          <p>Accede a la plataforma con tus credenciales.</p>
        </div>
      </div>
      <div className="main">
        <div className="col-md-6 col-sm-12">
          <div className="login-form">
            {isFetching && <Loader />}

            {errorMessage && <Message variant="danger">{errorMessage}</Message>}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="username">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su nombre de usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese su password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" variant="dark btn-block">
                Iniciar sesion
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginView;
