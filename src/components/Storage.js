import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Col, Container, FormControl, Row, Button, InputGroup } from 'react-bootstrap'
import Categories from '../data/Categories'
import Central from './Central'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import './Storage.css'
import Header from './Header'

export default class Storage extends Component{
  render() {
    return (
      <Container>
        <Header/>

        <Row >
          <Col md={3} float="center" className="sklad align-middle border border-secondary">
            <Central />
          </Col>
          <Col float="center" className="sklad align-middle">

          </Col>
        </Row>
        {JSON.stringify(Categories)}
      </Container>
    )
  }
}
