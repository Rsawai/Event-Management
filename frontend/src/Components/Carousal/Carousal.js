import React from 'react'
import Birthday from './Birthday.avif'
import Corporate from './Corporate.jpg'
import Wedding from './Wedding.avif'
import Carousel from 'react-bootstrap/Carousel'

const Carousal = () => {
  return (
    <>
      <Carousel className='mb-4'>
        <Carousel.Item>
          <img
            src={Birthday}
            style={{ maxWidth: '80vw', height: '50vh' }}
            className='d-block w-100 rounded mx-auto'
            alt='office'
          />
          <Carousel.Caption
            style={{ color: 'black', top: '10%', right: '50%' }}
          >
            <h2>We Plan, You Have Fun</h2>
            <p>Don't miss any moment of your Loved Ones.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={Corporate}
            style={{ maxWidth: '80vw', height: '50vh' }}
            alt='birthday'
            className='d-block w-100 rounded mx-auto'
          />
          <Carousel.Caption style={{ top: '10%', right: '70%' }}>
            <h2>An Extraordinary Experience Every Time </h2>
            <p>Precise coordination, extraordinary results.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={Wedding}
            style={{ maxWidth: '80vw', height: '50vh' }}
            className='d-block w-100 mx-auto'
            alt='wed'
          />
          <Carousel.Caption style={{ top: '30%', color: 'red' }}>
            <h3>We Build Your Dream Around You</h3>
            <p>Every story is beautiful, but yours should be unique.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  )
}

export default Carousal
