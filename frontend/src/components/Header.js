import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import AppContext from '../AppContext';
import LoginModal from './LoginModal';

function Header() {
  const context = React.useContext(AppContext);

  return (
    <Navbar variant='light' bg='light' className='w-100' expand='lg'>
      <Container>
        <Navbar.Brand href='/'>
          GoalKeeper
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <Nav.Link href='/about'>About Us</Nav.Link>
            {context.accessToken && <>
              <Nav.Link href='/goals'>Goals</Nav.Link>
              <Nav.Link href='/settings'>Settings</Nav.Link>
            </>}
            <div className='ms-5 d-md-none d-lg-inline-block'/>
            <LoginModal/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;
