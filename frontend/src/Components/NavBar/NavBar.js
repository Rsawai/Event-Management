import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { useNavigate, NavLink } from 'react-router-dom'
import Logo from './eliteLogo.png'

import LogoutIcon from '@mui/icons-material/Logout'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const NavBar = () => {
  const navigate = useNavigate()

  const user = localStorage.getItem('User')
  const email = localStorage.getItem('EmailKey')
  // console.log('user is this', user)

  const handleDelete = () => {
    localStorage.setItem('LoginKey', false)
    navigate('/login')
  }
  const handleNavigate = () => {
    navigate(`/editprofile/${email}`)
  }

  return (
    <>
      <Navbar expand='lg' className='bg-danger-subtle mb-2'>
        <Container>
          <NavLink to='/about'>
            <img src={Logo} alt='brand' style={{ width: '30%' }} />
          </NavLink>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mx-auto'>
              <Navbar.Text
                onClick={() => handleNavigate()}
                className='mx-2'
                style={{ cursor: 'pointer' }}
              >
                <AccountCircleIcon /> Edit Profile
              </Navbar.Text>
              <Navbar.Text className='mx-2' style={{}}>
                Welcome :<span>{user}</span>
              </Navbar.Text>
            </Nav>
            <Nav></Nav>
            <Nav>
              <button
                className='btn btn-outline-dark rounded '
                onClick={handleDelete}
              >
                Logout <LogoutIcon />
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar
