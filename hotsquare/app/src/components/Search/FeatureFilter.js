import React from 'react';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';

function FeatureFilter({ formData , handleChange }) {

  return (
    <Accordion className='w-100' defaultActiveKey="1">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Features</Accordion.Header>
        <Accordion.Body>
          <Form className="w-100">
          <Form.Group className="mb-3">
            {Object.keys(formData.booleanFeatures).map((key) => (
              <Form.Check 
                key = {key}
                type='checkbox' 
                className="my-2" 
                name= {key}
                checked = {formData.booleanFeatures[key] 
                  ? formData.booleanFeatures[key]
                  : false} 
                label={key.replace('has','').replace('bills','Bills').replace(/[A-Z]/g, ' $&').trim()}
                onChange={handleChange}/>
            ))}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Energetic Certificate</Form.Label>
            <div key={`inline-checkbox`} className="mb-3">
              {Object.keys(formData.energyCertificate).map((key) => (
                <Form.Check
                  inline
                  key = {key}
                  type="checkbox"
                  name={`energyCertificate-${key}`}
                  checked = {formData.energyCertificate[key] 
                              ? formData.energyCertificate[key]
                              : false} 
                  label={key}
                  onChange={handleChange}/>
              ))}
            </div>
          </Form.Group>       
        </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default FeatureFilter;