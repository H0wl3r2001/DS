import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import FeatureFilter from '../Search/FeatureFilter';

function Filter({ formData , handleChange }) {

  return (
    <Navbar collapseOnSelect expand='lg' bg='light' variant='light' className='searchbar p-3 my-3 rounded'>
      <Navbar.Brand>Filter</Navbar.Brand>
      <FeatureFilter formData={formData} handleChange={handleChange} />
    </Navbar>
  );
}

export default Filter;