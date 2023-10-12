import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NavBar from '../../Components/NavBar/NavBar'
import Footer from '../../Components/Footer/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import Input from '../../Components/Input/Input'
import CloudDoneIcon from '@mui/icons-material/CloudDone'

const BookEvents = () => {
  const navigate = useNavigate()
  const [name, setName] = useState(false)
  const [duplicate, setDuplicate] = useState(false)
  const [data, setData] = useState({
    id: '',
    eventname: '',
    venue: '',
    Date: '',
    time: '',
    description: '',
  })

  const textValidate = (input) => {
    const regex = /^[a-zA-Z\-]+$/
    if (!regex.test(input)) {
      toast.error('Only text allowed and avoid spaces')
    }
    setName(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (name && duplicate) {
      console.log(' request came')
      axios
        .post('http://localhost:8081/bookevent', data)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => console.log(err))
    } else {
      toast.error('Please enter correct details')
    }
    navigate('/event')
  }
  const handleDuplicate = (id) => {
    axios
      .get(`http://localhost:8081/bookevent`)
      .then((res) => {
        console.log(res, 'res')
        res.data.map((item) => {
          if (item.id == data.id) {
            toast.error('Duplicacy occurred')
            setDuplicate(false)
          } else if (item.Date == data.Date) {
            toast.error('Duplicacy occurred')
            setDuplicate(false)
          } else if (item.time == data.time) {
            toast.error('Duplicacy occurred')
            setDuplicate(false)
          } else {
            setDuplicate(true)
          }
        })
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      <NavBar />
      <div
        className='d-flex w-100 justify-content-center align-items-center'
        style={{ maxHeight: '100%', height: '81vh' }}
      >
        <form>
          <div className='mb-2'>
            <label htmlFor='title'>Id:</label>
            <Input
              type={'number'}
              name={'id'}
              className={'form-control'}
              value={data.id}
              TrackChange={(d) => setData({ ...data, id: d.target.value })}
              onBlur={() => handleDuplicate()}
              required
            />
          </div>

          <div className='mb-2'>
            <label htmlFor='pages'>Event:</label>
            <Input
              type={'text'}
              name={'eventname'}
              className={'form-control'}
              value={data.eventname}
              TrackChange={(d) =>
                setData({ ...data, eventname: d.target.value })
              }
              onBlur={(e) => textValidate(data.eventname)}
              required
            />
          </div>

          <div className='mb-2'>
            <label htmlFor='author'>Venue:</label>
            <Input
              type={'text'}
              name={'venue'}
              className={'form-control'}
              value={data.venue}
              TrackChange={(d) => setData({ ...data, venue: d.target.value })}
              onBlur={(e) => textValidate(data.venue)}
              required
            />
          </div>

          <div className='mb-2'>
            <label htmlFor='category'>Date:</label>
            <Input
              type={'date'}
              name={'Date'}
              className={'form-control'}
              value={data.Date}
              TrackChange={(d) => setData({ ...data, Date: d.target.value })}
              onBlur={() => handleDuplicate()}
              required
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='category'>Time:</label>
            <Input
              type={'time'}
              name={'Date'}
              className={'form-control'}
              value={data.time}
              TrackChange={(d) => setData({ ...data, time: d.target.value })}
              onBlur={(d) => handleDuplicate()}
              required
            />
          </div>

          <div className='mb-2'>
            <label htmlFor='category'>Description:</label>
            <Input
              type={'text'}
              name={'description'}
              className={'form-control'}
              placeholder={'Please Enter Summary'}
              required
              value={data.description}
              TrackChange={(d) =>
                setData({ ...data, description: d.target.value })
              }
              onBlur={(e) => textValidate(data.description)}
            />
          </div>
          <button
            type='submit'
            onClick={(E) => handleSubmit(E)}
            className='btn btn-success'
          >
            <CloudDoneIcon />
          </button>
          <Link to='/home' className='btn btn-info ms-5'>
            Back
          </Link>
        </form>
      </div>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default BookEvents
