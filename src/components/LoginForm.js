import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'; //asi zbytečný

import React, {Component} from 'react';
import { Container, Form } from 'react-bootstrap';
import Users from '../data/Users'




export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
//    this.findArrayElementByTitle = this.findArrayElementByTitle();
  }

  dismissError() {
    this.setState({error: ''});
  }

  handleSubmit(evt) {
    evt.preventDefault();

    if (!this.state.username) {
      return this.setState({error: 'Username is required'});
    }

    if (!this.state.password) {
      return this.setState({error: 'Password is required'});
    }

    var hash = require('object-hash');

    /**For debug reasons **/
    /*
        let psswd = hash(this.state.password);
        console.log(psswd);
    */

    const centreValues = Object.entries(Users).map(([title, value]) => ({title, value}));


    for (var i = 0; i < centreValues.length; i++) {
      if (this.state.username === centreValues[i].value.name) {
        if (hash(this.state.password) === centreValues[i].value.password) {
          this.props.handleSuccessfulAuth({loggedInStatus: "LOGGED_IN"});
          return this.setState({error: ''});
        } else {
          return this.setState({error: 'Špatné uživatelské jméno nebo heslo'});
        }
      }

    }
    console.log("Error");
    return this.setState({error: 'Špatné uživatelské jméno nebo heslo'});
  }


  handleUserChange(evt) {
    this.setState({
      username: evt.target.value,
    });
  };

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value,
    });
  }

  render() {
    return (
        <Container>
          <Form onSubmit={this.handleSubmit}>

            {
              this.state.error &&
              <h3 data-test="error" onClick={this.dismissError}>
                {this.state.error}
              </h3>
            }
            <Form.Group>
              <Form.Control type="text" placeholder="Uživatelské jméno" size="lg" value={this.state.username}
                            onChange={this.handleUserChange} required/>
            </Form.Group>

            <Form.Group>
              <Form.Control type="password" placeholder="Heslo" size="lg" value={this.state.password}
                            onChange={this.handlePassChange} required/>
            </Form.Group>

            <Form.Group>
              <Form.Control type="submit" value="Přihlásit se" data-test="submit" size="lg"/>
            </Form.Group>
          </Form>
        </Container>
    );
  }
}

