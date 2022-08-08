import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import HeaderAdmin from "../components/HeaderAdmin";
import TicketViews from "../views/TicketViews";
import { Container } from "react-bootstrap";

export default function Admin() {
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;

  useEffect(() => {
    if (!user) {
      window.location.href = "/";
    }
  }, [user]);
  return (
    <>
      <Container>
        <HeaderAdmin />
        <Switch>
          <Route path="/tickets" component={TicketViews} />
        </Switch>
      </Container>
    </>
  );
}
