import React, {Component} from 'react';
import { Container } from 'react-bootstrap'
import Products from './Products'
import Header from './Header'

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './Storage.css'


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
