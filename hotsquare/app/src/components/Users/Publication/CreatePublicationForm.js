import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { VIEW_PROFILE } from '../ProfileScreenMode';


export default function CreatePublicationForm({
  propertyOwnerId,
  changeScreenMode,
}) {
  const [publication, setPublication] = useState({
    title: '',
    propertyType: '',
    location: '',
    price: null,
    size: null,
    bedrooms: null,
    bathrooms: null,
    description: '',
    images: [],
    features: {},
    coordinates: {},
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const field = event.target.name;

    if ('features' === field) {
      const feature = event.target.dataset.feature;
      const value = event.target.checked;

      setPublication({
        ...publication, 
        [field]: {
          ...publication[field],
          [feature]: value
        }
      });
    } 
    else if ('energyCertificate' === field) {
      const certificate = event.target.dataset.feature;
      const value = event.target.checked;

      setPublication({
        ...publication, 
        'features': {
          ...publication['features'],
          'energyCertificate': { [certificate]: value }
        }
      });
    }
    else if ('latitude' === field || 'longitude' === field) {
      const value = event.target.value;

      setPublication({
        ...publication, 
        'coordinates': {
          ...publication['coordinates'],
          [field]: value
        }
      });

      if ('-' !== value && isNaN(value)) {
        setErrors({
          ...errors,
          [field]: 'Please provide a valid ' + field
        });
      } else {
        if (!!errors[field]) {
          setErrors({
            ...errors,
            [field]: null
          });
        }
      }
    }
    else {
      const value = event.target.value;
      setPublication({
        ...publication, 
        [field]: value
      });

      if (('bedrooms' === field || 'bathrooms' === field) && value < 0) {
        setErrors({
          ...errors,
          [field]: 'Field ' + field + ' must be a positive integer'
        });
      } else if (('price' === field || 'size' === field) && !(!isNaN(value) && Number(value) > 0)) {
        setErrors({
          ...errors,
          [field]: 'Please provide a valid ' + field
        });
      } else {
        if (!!errors[field]) {
          setErrors({
            ...errors,
            [field]: null
          });
        }
      }
    }
  }

  const handleCancel = (_) => {
    changeScreenMode(VIEW_PROFILE);
  }

  const handleSubmit = async event => { 
    event.preventDefault();

    const requiredFields = ['title', 'propertyType', 'location', 'latitude', 'longitude', 'price', 'size', 'description'];
    let requiredErrors = errors;

    for (const field of requiredFields) {
      if (('latitude' === field || 'longitude' === field) 
          && (undefined === publication['coordinates'][field] || '' === publication['coordinates'][field])) {
        requiredErrors = {
          ...requiredErrors,
          [field]: 'Please provide a valid ' + field
        }
      }
      else if (null === publication[field] || '' === publication[field]) {
        requiredErrors = {
          ...requiredErrors,
          [field]: 'Please provide a valid ' + field
        }
      }
    }

    if (Object.entries(requiredErrors).filter(([, value]) => value !== null).length > 0) {
      setErrors({ ...requiredErrors });
      return;
    }

    const result = await createPublication(publication, propertyOwnerId);
    if (!result) {
      setErrors({...errors, server: 'Server not responding...'});
      return;
    }
    
    switch (result.code) {
      case 200:
          changeScreenMode(VIEW_PROFILE);
          break;
      case 400: case 401:
          setErrors({...errors, server: result.message});
          console.log(result.error);
          break;
      default:
          console.log('Something went wrong');
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Form.Group className='mb-3' as={Col} md={8} lg={9} controlId='formTitle'>
          <Form.Label>Title</Form.Label>
          <Form.Control type='text' name='title' placeholder='Enter title' onChange={handleChange} isInvalid={!!errors.title} />
          <Form.Control.Feedback type='invalid'>
            {errors.title}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3' as={Col} md={4} lg={3} controlId='formType'>
          <Form.Label>Property Type</Form.Label>
          <Form.Select name='propertyType' defaultValue='default' onChange={handleChange} isInvalid={!!errors.propertyType}>
            <option disabled value='default'>Select property type</option>
            {['bedroom', 'residence', 'apartment', 'flat', 'studio', 'chalet', 'duplex', 'penthouse', 'house'].map((type) => 
              <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
            )}
          </Form.Select>
          <Form.Control.Feedback type='invalid'>
            {errors.propertyType}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Form.Group className='mb-3' controlId='formLocation'>
        <Form.Label>Location</Form.Label>
        <Form.Control type='text' name='location' placeholder='Enter location' onChange={handleChange} isInvalid={!!errors.location} />
        <Form.Control.Feedback type='invalid'>
          {errors.location}
        </Form.Control.Feedback>
      </Form.Group>

      <Row>
        <Form.Group className='mb-3' as={Col} md={6} controlId='formLatitude'>
          <Form.Label>Latitude</Form.Label>
          <Form.Control type='text' name='latitude' placeholder='Enter latitude' onChange={handleChange} isInvalid={!!errors.latitude} />
          <Form.Control.Feedback type='invalid'>
            {errors.latitude}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3' as={Col} md={6} controlId='formLongitude'>
          <Form.Label>Longitude</Form.Label>
          <Form.Control type='text' name='longitude' placeholder='Enter longitude' onChange={handleChange} isInvalid={!!errors.longitude} />
          <Form.Control.Feedback type='invalid'>
            {errors.longitude}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row>
        <Form.Group className='mb-3' as={Col} md={6} lg={4} controlId='formPrice'>
          <Form.Label>Price (€)</Form.Label>
          <Form.Control type='text' name='price' placeholder='Enter price' onChange={handleChange} isInvalid={!!errors.price} />
          <Form.Control.Feedback type='invalid'>
            {errors.price}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3' as={Col} md={6} lg={4} controlId='formSize'>
          <Form.Label>Size (m<sup>2</sup>)</Form.Label>
          <Form.Control type='text' name='size' placeholder='Enter size' onChange={handleChange} isInvalid={!!errors.size} />
          <Form.Control.Feedback type='invalid'>
            {errors.size}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3' as={Col} md={6} lg={2} controlId='formBedrooms'>
          <Form.Label>Bedrooms</Form.Label>
          <Form.Control type='number' min={0} name='bedrooms' placeholder='Enter bedrooms' onChange={handleChange} isInvalid={!!errors.bedrooms} />
          <Form.Control.Feedback type='invalid'>
            {errors.bedrooms}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3' as={Col} md={6} lg={2} controlId='formBathrooms'>
          <Form.Label>Bathrooms</Form.Label>
          <Form.Control type='number' min={0} name='bathrooms' placeholder='Enter bathrooms' onChange={handleChange} isInvalid={!!errors.bathrooms} />
          <Form.Control.Feedback type='invalid'>
            {errors.bathrooms}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row>
        <Form.Group className='mb-3' as={Col} md={8} controlId='formDescription'>
          <Form.Label>Description</Form.Label>
          <Form.Control as='textarea' rows={7} name='description' placeholder='Enter description' onChange={handleChange} isInvalid={!!errors.description} />
          <Form.Control.Feedback type='invalid'>
            {errors.description}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3' as={Col} md={4} controlId='formFeatures'>
          <Row>
            <Col>
              <Form.Label>Features</Form.Label>
              {['hasSwimmingPool', 'hasGarden', 'hasAirConditioning', 'hasBoxRoom', 'hasTerrace', 'billsIncluded'].map((feature) => {
                const featureLabel = feature.replace('has','').replace(/[A-Z]/g, ' $&').trim();
                return (
                  <Form.Check key={feature} label={featureLabel} name='features' type='checkbox' data-feature={feature} onChange={handleChange} isInvalid={!!errors.features} />
                );
              })}
            </Col>
            <Col>
              <Form.Label className='d-block mt-4'>Energy Certificate:</Form.Label>
              {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((certificate) => 
                <Form.Check inline key={certificate} label={certificate} name='energyCertificate' type='radio' data-feature={certificate} onChange={handleChange} isInvalid={!!errors.features} />
              )}
            </Col>
            <Form.Control.Feedback type='invalid'>
              {errors.features}
            </Form.Control.Feedback>
          </Row>
        </Form.Group>
      </Row>

      <Col className='text-end'>
        <Form.Text className='text-muted me-3'>
          {errors.server}
        </Form.Text>
        <Button type='submit' className='me-2'>Save</Button>
        <Button type='reset' variant='secondary' onClick={handleCancel}>Cancel</Button>
      </Col>
    </Form>
  );
}

async function createPublication(publication, propertyOwnerId) {

  publication['coordinates']['latitude'] = parseFloat(publication['coordinates']['latitude']);
  publication['coordinates']['longitude'] = parseFloat(publication['coordinates']['longitude']);

  publication['price'] = parseFloat(publication['price']);
  publication['size'] = parseFloat(publication['size']);

  publication['bedrooms'] = publication['bedrooms'] ? parseInt(publication['bedrooms']) : -1;
  publication['bathrooms'] = publication['bathrooms'] ? publication['bathrooms'] : '-1';

  if (publication['images'].length <= 0) {
    publication['thumbnail'] = 'https://www.fparceirosazoia.pt/photos/shares/default/default.jpg';
  } else {
    publication['thumbnail'] = publication['images'][0];
  }

  publication['url'] = '';
  publication['source'] = {'type': 'internal', 'value': propertyOwnerId};
  publication['realAddress'] = true;

  return fetch('http://localhost:4000/listings/publicate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(publication)
  })
    .then(data => {
      return data.json();
    })
    .catch(err => {
      console.log(err);
      return null;
    });
}
