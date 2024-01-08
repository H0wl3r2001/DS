import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BsPersonCircle } from "react-icons/bs";

const NavbarMenu = ({token, setToken}) => {

  //If the user is logged in, show the logout and account button
  //Else show the login and register buttons
  let buttons = () => {
    if (token) {
      return (
        <>
          <Nav.Link href='/profile'>
            <BsPersonCircle className='me-2' />Profile
          </Nav.Link> 
          <Nav.Link href="/" onClick={e => {setToken(undefined)}}>Logout</Nav.Link>
        </>
      )
    } else {
      return (
        <>
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>
        </>
      )
    }
  }
  
  return (
    <Navbar collapseOnSelect expand='lg' bg='white' variant='white' className='py-3 mb-3'>
      <Container>
        <Navbar.Brand href='/' className='hotsquare-navbrand'>HotSquare</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ms-auto'>
            <Nav.Link href='/'>Home</Nav.Link>
            <Nav.Link href='#about'>About</Nav.Link>
            {buttons()}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarMenu;
