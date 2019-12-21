import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Col, Container, Row, InputGroup, FormControl, Button, Nav } from 'react-bootstrap'

import Products from '../data/Products'
import Central from './Central'
import Items from './categoryItems'

import './Products.css'

let catFilter;
let input;

const columns = [{
  dataField: 'id',
  text: 'ID'
}, {
  dataField: 'name',
  text: ' Název'
}, {
  dataField: 'category',
  text: 'Kategorie',
  filter: textFilter({
    getFilter: (filter) => {
      // catFilter was assigned once the component has been mounted.
      catFilter = filter;
    }
  })
}, {
  dataField: 'subcategory',
  text: 'Podkat.'
}, {
  dataField: 'location',
  text: 'Lokace'
}, {
  dataField: 'onStock',
  text: 'Na skladě'
}, {
  dataField: 'price',
  text: 'Cena'
}];

const handleCategory = (selectedKey) => {
  catFilter(selectedKey);
};

const MySearch = (props) => {
  const handleClick = () => {
    props.onSearch(input.value);
  };

  return (
    <div>
      <InputGroup className="custom-search">
        <FormControl
          placeholder="Vyhledat"
          aria-label="Search"
          aria-describedby="basic-addon2"
          ref={ n => input = n }
          onChange={ handleClick }
          className="searchBox"
        />
        <InputGroup.Append>
          <Button variant="light" className="searchButton" onClick={ handleClick }>
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
};

export default class ProductTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: [""],
    };
    this.getCategories = this.getCategories.bind(this);
  }

  getCategories () {
    let usedCategories = Products.map(product => product.category);
    let results = (usedCategories) => usedCategories.filter((v,i) => usedCategories.indexOf(v) === i);
    this.setState({categories: results(usedCategories)});
  }

  componentDidMount() {
    this.getCategories();
  }

  render() {

    let categoryItems = this.state.categories.map( (category) => {
      return Items(category)
    })

    return (
      <Row >
        <Col md={3} float="center" className="sklad align-middle border border-secondary categories">
          <Central />
          <Container className="category">
            <Nav justify
                 variant="pills"
                 onSelect={(selectedKey) => handleCategory(selectedKey)}
                 className="flex-column">
              <Nav.Item className="item">
                <Nav.Link eventKey="">
                  Všechny položky
                </Nav.Link>
              </Nav.Item>
              { categoryItems }
            </Nav>
          </Container>
        </Col>
        <Col float="center" className="sklad align-middle border border-secondary">
          <ToolkitProvider
            keyField="id"
            data={ Products }
            columns={ columns }
            search
          >
            {
              props => (
                <div>
                  <MySearch { ...props.searchProps } />
                  <hr />
                  <BootstrapTable
                    { ...props.baseProps}
                    pagination={ paginationFactory() }
                    cellEdit={ cellEditFactory({ mode: 'dbclick' })  }
                    filter={ filterFactory() }
                  />
                </div>
              )
            }
          </ToolkitProvider>
        </Col>
      </Row>
    )
  }
}
