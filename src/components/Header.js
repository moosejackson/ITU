import React from 'react';
import storage from '../img/storage.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './Storage.css'
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap'

import './Header.css';


function Header() {
  return (
    <Container className="header">
      <Row>
        <Col>
          <img src={storage} alt="Logo" className="logo "/>
        </Col>

        <Col className="search" md={{ span:6 }}>
          <InputGroup className="search">
            <FormControl
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button variant="light" className="searchButton">
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>

        <Col>
          <div className="leftBlock">
            <FontAwesomeIcon icon={faUserCircle} size="6x" />
          </div>
        </Col>

      </Row>

    </Container>
  )
}

export default Header;
