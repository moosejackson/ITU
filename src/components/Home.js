import React, {Component} from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch} from "react-router-dom";
import Central from './Central'
import Storage from './Storage'
import Inventura from './Inventura'

import './Home.css';
import Header from './Header'


const homeLinks = () => (
  <div>
    <Header/>
    <Row >
      <Col md={3} float="center" className="sklad align-middle">
        <Central />
      </Col>
      <Col md={{ span: 2, offset: 2 }}>
        <div className="centerBlock">
          <Button variant="primary" class="linkButton">
            <Link to={`/inventura`} class="link">
              Provést inventuru
            </Link>
          </Button>
          <Button variant="primary" class="linkButton">
            <Link to={`/products`} class="link">
              Skladové položky
            </Link>
          </Button>
        </div>
      </Col>
    </Row>
  </div>
)

export default class Home extends Component {

  render() {
    return (
        <Container>
          <Router>
            <Switch>
              <Route
                path={"/home"}
                component={homeLinks}
              />
              <Route
                path={"/products"}
                component={Storage}
              />
              <Route
                path={"/inventura"}
                component={Inventura}
              />
            </Switch>
          </Router>
        </Container>
    );
  }
}
