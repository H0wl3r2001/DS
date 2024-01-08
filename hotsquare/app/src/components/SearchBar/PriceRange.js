import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form'

function PriceRange({ formData , handleChange}){


    return (
        <Navbar collapseOnSelect expand='lg' bg='light' variant='light' className='searchbar p-3 my-3 rounded'>
            <Navbar.Brand>Maximum price</Navbar.Brand>
            <Form className="w-100">
                <Form.Range value = {formData.priceField} max = "7500" name="priceField" onChange = {handleChange}/>
                <Form.Control value = {formData.priceField} name="priceFieldText" onChange = {handleChange}/>
            </Form>
        </Navbar>
        
    );
}

export default PriceRange
