import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import LoginModal from './LoginModal';

function Header() {
  return (
    <Navbar variant='light' bg='light' className='w-100 d-flex '>
      <div className='w-100 p-3 d-flex justify-content-between'>
        <Navbar.Brand>
          GoalKeeper
        </Navbar.Brand>
        <LoginModal/>
      </div>
    </Navbar>
  )
}

export default Header;
