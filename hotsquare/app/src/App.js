import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NavbarMenu from './components/Navbar/NavbarMenu';
import SearchListings from './components/Listing/SearchListings';
import ListingDetail from './components/Listing/ListingDetail';
import Register from './components/Authentication/Register'
import Login from './components/Authentication/Login';
import UserProfile from './components/Users/UserProfile';
import EditProfile from './components/Users/EditProfile';

import useToken from './components/Authentication/useToken';


function App(){

  //Saves the user's token in the state
  const {token, setToken} = useToken();

  //Allows the user to got o this routes if tey are logged in
  //! Place on another place if gets too big
  let routes = () => {
    if(!token){
      return(
        <Routes>
          <Route exact path='/' element={<SearchListings />} />
          <Route path='/listings/:id' element={<ListingDetail />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
        </Routes>
      )
    } else {
      return(
        <Routes>
          <Route exact path='/' element={<SearchListings />} />
          <Route path='/listings/:id' element={<ListingDetail />} />
          <Route path="/profile" element={<UserProfile setToken={setToken}/>} />
          <Route path='/profile/:id' element={<UserProfile />} />
          <Route path='/edit_profile' element={<EditProfile setToken={setToken}/>} />
        </Routes>
      )
    }
  }
  
  return (
    <Router>
      <NavbarMenu token={token} setToken={setToken}/>
      <Container>
        {routes()}
      </Container>
    </Router>
  );

}

export default App;
