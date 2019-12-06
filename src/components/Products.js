import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import Products from '../data/Products'

const columns = [{
  dataField: 'id',
  text: 'ID'
}, {
  dataField: 'name',
  text: ' Name'
}, {
  dataField: 'category',
  text: 'Category'
}, {
  dataField: 'subcategory',
  text: 'Subcategory'
}, {
  dataField: 'location',
  text: 'Location'
}, {
  dataField: 'onStock',
  text: 'On stock'
}, {
  dataField: 'price',
  text: 'Price'
}];


export default () =>
  <BootstrapTable keyField='id' data={ Products } columns={ columns } />
