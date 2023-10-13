import React from 'react'
import List from '../../Components/List/List'
import NavBar from '../../Components/NavBar/NavBar'
import Footer from '../../Components/Footer/Footer'

const FetchData = () => {
  return (
    <>
      <NavBar />
      <div className='container ' style={{ maxHeight: '100%', height: '81vh' }}>
        <h2 className='w-100 d-flex justify-content-center p-3'>
          Event Details
        </h2>
        <div className='row'>
          <List />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default FetchData
