import React, {Component} from 'react';
import { Container, Form } from 'react-bootstrap'

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
  }

  dismissError() {
    this.setState({ error: '' });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    if (!this.state.username) {
      return this.setState({ error: 'Username is required' });
    }

    if (!this.state.password) {
      return this.setState({ error: 'Password is required' });
    }

    this.props.handleSuccessfulAuth({loggedInStatus: "LOGGED_IN"});

    return this.setState({ error: '' });
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
              <button onClick={this.dismissError}>✖</button>
              {this.state.error}
            </h3>
          }
          <Form.Group>
            <Form.Control type="text" placeholder="Uživatelské jméno" size="lg" value={this.state.username} onChange={this.handleUserChange} required />
          </Form.Group>

          <Form.Group>
            <Form.Control type="password" placeholder="Heslo" size="lg" value={this.state.password} onChange={this.handlePassChange} required />
          </Form.Group>

          <Form.Group>
            <Form.Control type="submit" value="Přihlásit se" data-test="submit" size="lg" />
          </Form.Group>
        </Form>
      </Container>
    );
  }
}
