import React, {Component} from 'react';
import { Col, Container, Row } from 'react-bootstrap'
import Central from './Central'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'

import './Login.css';
import LoginForm from './LoginForm'
import storage from '../img/storage.png'

export default class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push("/products");
  }

  render() {

    return (
      <Container>
        <Row>
          <img src={storage} alt="Logo" className="logo "/>
        </Row>

        <Row >
          <Col md={3} float="center" className="sklad align-middle">
            <Central />
          </Col>
          <Col md={{ span: 2, offset: 2 }}>
            <div className="centerBlock">
              <FontAwesomeIcon icon={faUserCircle} size="6x" />
            </div>
          </Col>
        </Row>
        <Container  className="Login">
          <LoginForm handleSuccessfulAuth={this.handleSuccessfulAuth}/>
        </Container>

      </Container>
    );
  }
}
