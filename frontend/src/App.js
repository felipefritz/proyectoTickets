import LoginView from "./views/LoginViews";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Index from "./views/Index";
import LoginViews from "./views/LoginViews";
import TicketListViews from "./views/TicketListViews";
import TicketCreateView from "./views/TicketCreateView";
import { Container } from "react-bootstrap";
import HeaderAdmin from "./components/HeaderAdmin";
function App() {
  return (
    <Router>
      {/* add routes without layouts */}
      <Container>
        <Route path={"/"} component={LoginViews} exact />
        <Route path={"/login"} component={LoginViews} exact />
      </Container>
      <Route path="/tickets/nuevo" component={TicketCreateView} exact />
      <Route path="/tickets" component={TicketListViews} exact />
    </Router>
  );
}

export default App;
