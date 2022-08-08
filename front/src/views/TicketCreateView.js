import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Container, FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

import Loader from "../components/Loader";
import { ticketCreate } from "../actions/ticketActions";
import HeaderAdmin from "../components/HeaderAdmin";
import Swal from "sweetalert2";
import moment from "moment/min/moment-with-locales";
import axios from "axios";
import Select from "react-select";

function TicketCreateView({}) {
  const [date, setTime] = useState(Date.now());
  const [proyectos, setProyectos] = useState([]);
  const [ticket, setTicket] = useState({
    titulo: "",
    descripcion: "",
    estado: "",
  });
  const { titulo, descripcion } = ticket;
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const ticketCreateResponse = useSelector((state) => state.ticketCreate);
  const { loading, error } = ticketCreateResponse;
  const { user } = userLogin;
  const options = [
    { value: "Abierto", label: "Abierto" },
    { value: "Pendiente", label: "Pendiente" },
    { value: "En proceso", label: "En proceso" },
    { value: "Resuelto", label: "Resuelto" },
    { value: "Cerrado", label: "Cerrado" },
  ];
  const getProyectos = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const response = await axios.get("/api/tickets/proyectos/", config);
    setProyectos(response.data);
    return response.data;
  };

  const getTicket = (e) => {
    setTicket({
      ...ticket,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (!user) {
      window.location.href = "/";
      return;
    }
    getProyectos();

    const interval = setInterval(
      () =>
        setTime(moment().utcOffset("+05:30").format("DD-MM-YYYY hh:mm:ss a")),
      1000
    );
    return () => {
      clearInterval(interval);
    };
  }, [user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (ticket.descripcion.length === 0 || ticket.titulo.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Todos los campos son obligatorios!",
      });
      return;
    }
    Swal.fire({
      title: "Confirmacion",
      text: "Crear ticket para el proyecto!" + ticket.proyecto_id,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, crear ticket",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(ticket);
        dispatch(ticketCreate(ticket));
        Swal.fire(
          "Ticket generado con exito!",
          "Tau ticket se a generado con exito, pronto lo gestionaremos",
          "success"
        );
        window.location.href = "/tickets";
        return;
      }
    });
  };

  return (
    <>
      <HeaderAdmin />

      <Container className="mt-3">
        {user != null && user.is_superuser ? (
          <>
            {loading && <Loader />}
            <FormContainer>
              {error && <Message variant="danger">{error}</Message>}
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="titulo">
                  <Form.Label>Titulo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Titulo"
                    value={titulo}
                    name="titulo"
                    onChange={getTicket}
                  ></Form.Control>
                </Form.Group>
                <FormGroup controlId="estado">
                  <Form.Label>Estado</Form.Label>
                  <Select
                    options={options}
                    placeholder="Estado"
                    name="estado"
                    onChange={(e) => setTicket({ ...ticket, estado: e.value })}
                  />
                </FormGroup>
                <Form.Group controlId="descripcion">
                  <Form.Label>Descripcion</Form.Label>
                  <textarea
                    rows="5"
                    cols="50"
                    name="descripcion"
                    className="form-control textarea"
                    placeholder="Detalle situacion del ticket"
                    value={descripcion}
                    onChange={getTicket}
                  ></textarea>
                </Form.Group>
                <Form.Group controlId="fechaCreacion">
                  <Form.Label>Fecha de creacion</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={date}
                    value={date}
                    disabled
                  ></Form.Control>
                </Form.Group>
                <Button type="submit" variant="dark btn-block">
                  Crear
                </Button>
              </Form>
            </FormContainer>
          </>
        ) : (
          <Alert variant="danger">
            No tienes permisos para acceder a esta seccion
          </Alert>
        )}
      </Container>
    </>
  );
}

export default TicketCreateView;
