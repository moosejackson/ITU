import React from 'react';
import storage from '../img/storage.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import './Storage.css'
import { Container, Row, Col } from 'react-bootstrap'

import './Header.css';


function Header() {
  return (
    <Container className="header">
      <Row>
        <Col>
          <img src={storage} alt="Logo" className="logo "/>
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
