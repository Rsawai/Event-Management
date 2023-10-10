import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NavBar from '../../Components/NavBar/NavBar'
import Footer from '../../Components/Footer/Footer'
import { Link, useNavigate } from 'react-router-dom'

const BookEvents = () => {
  const navigate = useNavigate()
  const [name, setName] = useState(false)
  const [data, setData] = useState({
    id: '',
    eventname: '',
    venue: '',
    Date: '',
    time: '',
    description: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post('http://localhost:8081/bookevent', data)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err))
  }
  const handleDuplicate = (id) => {
    axios
      .get(`http://localhost:8081/view/${id}`)
      .then((res) => {
        if (res.data[0].id == data.id) {
          alert('id is duplicate')
        }
        console.log(res, 'done')
      })
      .catch((err) => console.log(err))
  }

  const submitForm = (e) => {
    e.preventDefault()

    navigate('/event')
  }

  return (
    <>
      <NavBar />
      <div
        className='d-flex w-100 justify-content-center align-items-center'
        style={{ maxHeight: '100%', height: '81vh' }}
      >
        <form onSubmit={() => submitForm()}>
          <div className='mb-2'>
            <label htmlFor='title'>Id:</label>
            <input
              type='number'
              name='id'
              className='form-control'
              required
              value={data.id}
              onChange={(d) => setData({ ...data, id: d.target.value })}
              onBlur={() => handleDuplicate(data.id)}
            />
          </div>

          <div className='mb-2'>
            <label htmlFor='pages'>Event:</label>
            <input
              type='text'
              name='eventname'
              className='form-control'
              required
              value={data.eventname}
              onChange={(d) => setData({ ...data, eventname: d.target.value })}
            />
          </div>

          <div className='mb-2'>
            <label htmlFor='author'>Venue:</label>
            <input
              type='text'
              name='venue'
              className='form-control'
              required
              value={data.venue}
              onChange={(d) => setData({ ...data, venue: d.target.value })}
            />
          </div>

          <div className='mb-2'>
            <label htmlFor='category'>Date:</label>
            <input
              type='date'
              name='Date'
              className='form-control'
              value={data.Date}
              required
              onChange={(d) => setData({ ...data, Date: d.target.value })}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='category'>Time:</label>
            <input
              type='time'
              name='Date'
              className='form-control'
              value={data.time}
              required
              onChange={(d) => setData({ ...data, time: d.target.value })}
            />
          </div>

          <div className='mb-2'>
            <label htmlFor='category'>Description:</label>
            <input
              type='text'
              name='description'
              className='form-control'
              placeholder='Please Enter Summary'
              required
              value={data.description}
              onChange={(d) =>
                setData({ ...data, description: d.target.value })
              }
            />
          </div>
          <button
            type='submit'
            onClick={(e) => handleSubmit(e)}
            className='btn btn-success'
          >
            Submit
          </button>
          <Link to='/home' className='btn btn-info ms-5'>
            Back
          </Link>
        </form>
      </div>
      <Footer />
    </>
  )
}

export default BookEvents
