import { Nav } from 'react-bootstrap'
import React from 'react'

export default function Items(category) {
  return (
    <Nav.Item className="item" key={ category }>
      <Nav.Link  eventKey={ category }>
        { category === "" ? "Všechny položky" : category}
      </Nav.Link>
    </Nav.Item>
  )
}
