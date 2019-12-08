import React, {Component} from 'react';
import { Col, Container, FormControl, Row, Button, InputGroup } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next';

import Categories from '../data/Categories'
import Central from './Central'
import Products from './Products'


import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import './Storage.css'
import Header from './Header'

const columns = [{
  dataField: 'name',
  text: ' Name'
}];

export default class Storage extends Component{
  render() {
    return (
      <Container>
        <Header/>
        <Products/>
      </Container>
    )
  }
}
