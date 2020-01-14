import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Col, Container, Row, InputGroup, FormControl, Button, Nav } from 'react-bootstrap'

import Products from '../data/Products'
import Central from './Central'
import Items from './categoryItems'

import './Products.css'

let catFilter;
let input;

const columns = [
  {
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
  }
];

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

const NoDataIndication = () => (
  <div className="spinner">
    <div className="rect1" />
    <div className="rect2" />
    <div className="rect3" />
    <div className="rect4" />
    <div className="rect5" />
  </div>
);

const Table = ({ data, page, sizePerPage, onTableChange, totalSize }) => (
    <ToolkitProvider
      keyField="id"
      data={ data }
      columns={ columns }
      search
    >
      {
        props => (
          <div>
            <MySearch { ...props.searchProps } />
            <hr />
            <BootstrapTable
              remote
              { ...props.baseProps}
              pagination={ paginationFactory({ page, sizePerPage, totalSize }) }
              onTableChange={ onTableChange }
              noDataIndication={ () => <NoDataIndication /> }
              cellEdit={ cellEditFactory({ mode: 'dbclick' })  }
              filter={ filterFactory() }
            />
          </div>
        )
      }
    </ToolkitProvider>
);


export default class ProductTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: [""],
      page: 1,
      data: Products.slice(0, 10),
      sizePerPage: 10
    };
    this.getCategories = this.getCategories.bind(this);
  }

  getCategories () {
    let usedCategories = Products.map(product => product.category);
    let results = (usedCategories) => usedCategories.filter((v,i) => usedCategories.indexOf(v) === i);
    this.setState({categories: results(usedCategories)});
  }

  handleTableChange = (type, { page, sizePerPage, filters }) => {

    let result = Products;

    // Handle column filters
    result = result.filter((row) => {
      let valid = true;
      for (const dataField in filters) {
        const { filterVal, filterType, comparator } = filters[dataField];

        if (filterType === 'TEXT') {
          if (comparator === Comparator.LIKE) {
            valid = row[dataField].toString().indexOf(filterVal) > -1;
          } else {
            valid = row[dataField] === filterVal;
          }
        }
        if (!valid) break;
      }
      return valid;
    });

    const currentIndex = (page - 1) * sizePerPage;
    setTimeout(() => {
      this.setState(() => ({
        page,
        data: result.slice(currentIndex, currentIndex + sizePerPage),
        sizePerPage
      }));
    }, 100);



    this.setState(() => ({ data: [] }));
  }

  componentDidMount() {
    this.getCategories();
  }

  render() {

    let categoryItems = this.state.categories.map( (category) => {
      return Items(category)
    })

    const { data, sizePerPage, page } = this.state;

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
          <Table
            data={data}
            page={ page }
            sizePerPage={ sizePerPage }
            totalSize={ Products.length }
            onTableChange={ this.handleTableChange }
          />
        </Col>
      </Row>
    )
  }
}
