import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';

function SearchBar({ formData , handleChange}) {

  return (
    <Navbar collapseOnSelect expand='lg' bg='light' variant='light' className='searchbar p-3 my-3 rounded'>
      <Navbar.Brand>Search</Navbar.Brand>
      <Form className="w-100">
        <Form.Control type="search" placeholder="Location" className="my-2" aria-label="Search" name="searchField" value={formData.searchField} onChange={handleChange}/>
      </Form>
    </Navbar>
  );
}

export default SearchBar