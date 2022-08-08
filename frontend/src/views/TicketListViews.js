import React, { Fragment } from "react";
import {
  Col,
  Row,
  Container,
  Card,
  Table,
  Button,
  Badge,
} from "react-bootstrap";
import HeaderAdmin from "../components/HeaderAdmin";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

import { ticketList } from "../actions/ticketActions";
import moment from "moment/min/moment-with-locales";
import Paginate from "../components/Paginate";

function TicketListViews({ history }) {
  const options = [
    { value: "Abierto", label: "Abierto" },
    { value: "Pendiente", label: "Pendiente" },
    { value: "En proceso", label: "En proceso" },
    { value: "Resuelto", label: "Resuelto" },
    { value: "Cerrado", label: "Cerrado" },
  ];
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const searchString = "?search=";
  const pageString = "&page=";
  const {
    tickets,
    page,
    pages,
    error,
    loading: loadingTicket,
  } = useSelector((state) => state.ticketList);

  let search = history.location.search;
  useEffect(() => {
    if (!user) {
      window.location.href = "/";
      return;
    }
    if (query !== "") {
      dispatch(ticketList(searchString + query));
    } else {
      dispatch(ticketList(search));
    }
  }, [dispatch, history, user, query, search]);

  const handleChange = (event) => {
    event.preventDefault();
    setQuery(event.target.value);
    console.log(tickets);
    if (!event.target.value === "") {
      dispatch(ticketList(searchString + query));
    }
  };

  return (
    <>
      <HeaderAdmin />

      <Container fluid>
        <Row className="mt-3">
          <Col>
            <Card>
              <Card.Header>
                <Row>
                  <h3>Filtros</h3>
                  <Col md={6}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Buscar..."
                      value={query}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={3}>
                    {user && user.is_superuser ? (
                      <Link to="tickets/nuevo">
                        <Button variant="success" title="Nuevo ticket">
                          <i className="fas fa-plus"></i>
                        </Button>
                      </Link>
                    ) : null}
                  </Col>
                </Row>
              </Card.Header>
            </Card>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={3}>
            <Paginate page={page} pages={pages} search={search} />
          </Col>
        </Row>
        <Row className=" mb-3">
          {tickets.length > 0 &&
            tickets.map((ticket) => (
              <Col md={6} key={ticket.id}>
                <Card className="mt-3 mb-3 h-100">
                  <Card.Header className=" bg-dark text-light text-center">
                    ID:{" "}
                    <Badge pill variant="secondary">
                      {ticket.id}
                    </Badge>{" "}
                    / Proyecto: {ticket.proyecto}
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={3}>
                        <Card.Title>{ticket.titulo}</Card.Title>
                      </Col>
                      <Col md={9}>
                        <Badge pill variant="info">
                          {ticket.estado}
                        </Badge>
                      </Col>
                    </Row>

                    <hr />
                    <Card.Text className="bg-light">
                      {ticket.descripcion}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Row>
                      <Col md={6}>
                        <small className="text-muted">
                          Creado:{" "}
                          {moment(ticket.fecha_creacion)
                            .locale("es-es")
                            .format(" D / MMMM / YYYY")}
                        </small>
                      </Col>
                      <Col md={6}>
                        <Button variant="primary btn-sm" disabled>
                          Gestionar...en desarrollo{" "}
                        </Button>
                      </Col>
                    </Row>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
}

export default TicketListViews;
