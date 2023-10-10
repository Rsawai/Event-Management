import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import NavBar from '../../Components/NavBar/NavBar'
import Carousal from '../../Components/Carousal/Carousal'
import Footer from '../../Components/Footer/Footer'
import FetchData from '../FetchData/FetchData'
import Ballons from './bubbles.jpg'
import Events from './Events.jpg'
import AboutUs from './Aboutus.jpg'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true

  // const [auth, setAuth] = useState(false)
  useEffect(() => {
    axios
      .get('http://localhost:8081/home')
      .then((res) => {
        if (res.data.Status === 'Success') {
          // setAuth(true)
        } else {
          // setAuth(false)
          alert(res.data.Error)
        }
      })
      .then((err) => console.log(err))
  })

  return (
    <>
      <NavBar />
      <Carousal />
      <div className='d-flex justify-content-center align-items-center row'>
        <div className='card mt-5 mx-5 mb-5 ' style={{ width: '20rem' }}>
          <img src={Events} alt='Card image cap'></img>
          <div className='card-body'>
            <h3>Book Your Event</h3>
            <p>
              Tell us about your event details and we will plan it for you, just
              the way you want.
            </p>
            <button
              className='btn btn-outline-primary'
              onClick={() => {
                navigate('/bookevent')
              }}
            >
              Book Event
            </button>
          </div>
        </div>

        <div className='card mt-5 mx-5 mb-5' style={{ width: '20rem' }}>
          <img src={Ballons} alt='Card image cap'></img>
          <div className='card-body'>
            <h3>Your Events</h3>
            <p>
              You can view all the details of your events, and make any changes
              if you wish to.
            </p>
            <button
              className='btn btn-outline-primary'
              onClick={() => {
                navigate('/event')
              }}
            >
              Booked Events
            </button>
          </div>
        </div>
        <div className='card mt-5 mx-5 mb-5' style={{ width: '20rem' }}>
          <img src={AboutUs} alt='Card image cap'></img>
          <div className='card-body'>
            <h3>About Us</h3>
            <p>
              You might be curious or interested to know about us. Check out our
              journey.
            </p>
            <button
              className='btn btn-outline-primary'
              onClick={() => {
                navigate('/about')
              }}
            >
              About Us
            </button>
          </div>
        </div>
      </div>
      {/* <FetchData /> */}
      <Footer />
    </>
  )
}

export default Home
