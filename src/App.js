import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import storage from './img/storage.png';
import './App.css';

import LoginPage from './components/Login.js'
import Header from './components/Header'
import { Container, Row } from 'react-bootstrap'
import Storage from './components/Storage'


export default class App extends Component {

  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    });
  }

  checkLoginStatus() {
        if (
          this.state.loggedInStatus === "NOT_LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "LOGGED_IN"
          });
        } else if (
          (this.state.loggedInStatus === "LOGGED_IN")
        ) {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN"
          });
        }
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  render () {
    return (
      <Container className="main">

        <BrowserRouter>
          <Switch>
            <Route
              exact
              path={"/"}
              render={props => (
                <LoginPage {...props}
                           handleLogin={this.handleLogin}
                           handleLogout={this.handleLogout}
                           loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
            <Route
              exact
              path={"/products"}
              render={props => (
                <Storage
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </Container>
    );
  }

}
