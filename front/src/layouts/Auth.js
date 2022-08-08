import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginView from "../views/LoginViews";
import { Container } from "react-bootstrap";
export default function Auth() {
  return (
    <>
      <Container>
        <Switch>
          <Route path="/auth/login" component={LoginView} />
        </Switch>
      </Container>
    </>
  );
}
