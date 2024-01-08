import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import LoadingListings from "./LoadingListings";
import PriceRange from "../SearchBar/PriceRange";
import NoResultsFound from './NoResultsFound';
import Listings from "./Listings";
import SearchBar from "../Search/SearchBar";
import Filter from '../Search/Filter';
import Map from "../Map/Map";
import {FaListUl} from "react-icons/fa";
import {FiMap} from "react-icons/fi";

function SearchListings() {

  const [data, setData] = useState(null);
  const [isMapView, setIsMapView] = useState(false);
  const [formData, setFormData] = useState({ 
    searchField: "" , 
    priceField: 3750,
    booleanFeatures: {
      hasSwimmingPool: false, 
      hasGarden: false, 
      hasAirConditioning: false, 
      hasBoxRoom: false, 
      hasTerrace: false, 
      billsIncluded: false
    }, 
    energyCertificate: {
      A: false, B: false, C: false,
      D: false, E: false, F: false,
      G: false
    }});

  useEffect(() => {
    // clean up controller
    let isSubscribed = true;

    // Try to communicate with sever API
    fetch("http://localhost:4000/listings", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => (isSubscribed ? setData(json) : null))
      .catch((_) => {
        if (isSubscribed) setData([]);
      });

    // cancel subscription to useEffect
    return () => (isSubscribed = false);
  }, [data]);

  const hasBooleanFeatures = (features, propertyFeatures) => {
    let res  = true;
    Object.keys(features).forEach(key => {
      if (features[key] && (!propertyFeatures.hasOwnProperty(key) || !propertyFeatures[key])) {
        res = false;
      }
    })
    return res;
  }

  const hasEnergyCertificate = (certificate, propertyFeatures) => {
    if (Object.values(certificate).every(x => x === false)) return true;

    let res  = false;
    Object.keys(certificate).forEach(key => {
      if (propertyFeatures.hasOwnProperty('energyCertificate') &&
          propertyFeatures.energyCertificate.includes(key) && certificate[key]) {
        res = true;
      }
    })
    return res;
  }

  function filterData() {
    return data.filter(
      property => {
        return (property.title.toLowerCase()
          .includes(formData.searchField.toLowerCase()) ||
          property.location.toLowerCase()
          .includes(formData.searchField.toLowerCase())) &&
          hasBooleanFeatures(formData.booleanFeatures, property.features) &&
          hasEnergyCertificate(formData.energyCertificate, property.features) &&
          (property.price <= formData.priceField || 
          (property.price >= formData.priceField && formData.priceField == 7500));
      }
    );
  }

  const handleChange = (e) => {
    if (e.target.name === "searchField") {
      setFormData({ ...formData, searchField: e.target.value });
    }
    else if (e.target.name === 'priceField' || e.target.name === 'priceFieldText'){
      setFormData({...formData, priceField: e.target.value});
    } 
    else if (e.target.name.includes('energyCertificate')) {
      const code = e.target.name.substring(e.target.name.indexOf('-') + 1);
      setFormData({...formData, energyCertificate: {...formData.energyCertificate, [code] : e.target.checked}});
    }
    else {
      Object.keys(formData.booleanFeatures).forEach( feature => {
        if (e.target.name === feature) {  
          setFormData({...formData, booleanFeatures: {...formData.booleanFeatures, [feature] : e.target.checked} });
        }
      });
    }
  };


  const changeView = (event) => {
    // toggle map shown state
    setIsMapView((current) => !current);
  };

  const filteredData = data ? filterData() : null;

  const isLoading = !filteredData;
  const noResults = filteredData && filteredData.length === 0;
    
  return (
    <>
      <Row>
        <Col lg={3} md={4}>
          <SearchBar formData={formData} handleChange={handleChange} />
          <PriceRange formData={formData} handleChange={handleChange} />
          <Filter formData={formData} handleChange={handleChange} />
        </Col>
        
        <Col lg={9} md={8}>
          { isLoading ? <LoadingListings/>
          : noResults ? <NoResultsFound/> 
          : isMapView ? (
            <div id="listings-map" className="map-listings">
              <Map data={filteredData} />
            </div>
          ) 
          : <Listings filteredData={filteredData} />}
        </Col>
      </Row>
      
      {filteredData === null
        ? null
        : <>
          {isMapView
          ?
            <div className="view-type">
              <Button type="button" onClick={changeView} className="btn btn-primary rounded-pill">
                <FaListUl size='25px'>
                </FaListUl>
                {' '} Show on List
              </Button>
            </div>
          :
            <div className="view-type">
              <Button type="button" onClick={changeView} className="btn btn-primary rounded-pill">
                <FiMap size='25px'>
                </FiMap>
                {' '} Show on Map
              </Button>
            </div>
          }
        </>
      }
    </>
  );
}

export default SearchListings;
