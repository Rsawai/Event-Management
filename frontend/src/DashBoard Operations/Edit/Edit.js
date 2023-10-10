import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'
import NavBar from '../../Components/NavBar/NavBar'
import moment from 'moment'
const Edit = () => {
  const navigate = useNavigate()

  axios.defaults.withCredentials = true
  const [data, setData] = useState({
    id: '',
    eventname: '',
    venue: '',

    description: '',

    Date: '',
    time: '',
  })
  // const { id } = useParams()
  const startDate = moment(data.Date).format('YYYY-MM-DD')
  console.log(data.Date, 'dateeee', startDate)

  const id = sessionStorage.getItem('editId')
  console.log(id, 'id')
  console.log(data, 'dattaa')
  console.log(data.id, 'tableid')

  useEffect(() => {
    console.log('aal')
    axios
      .get(`http://localhost:8081/edit/${id}`)
      .then((res) =>
        setData({
          ...data,
          id: res.data[0].id,
          eventname: res.data[0].eventname,
          venue: res.data[0].venue,
          Date: res.data[0].Date,
          time: res.data[0].time,
          description: res.data[0].description,
        })
      )
      .catch((error) => console.log(error))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('aaya')

    axios
      .put(`http://localhost:8081/edit/${id}`, data)
      .then((res) => {
        console.log(res, 'entered in the territory')
      })
      .catch((error) => console.log(error, 'did entered in the territory'))
    // navigate('/home')
  }

  return (
    <>
      <NavBar />
      <div className='d-flex vw-100 justify-content-center align-items-center'>
        <div
          style={{ maxHeight: '100%', height: '81vh' }}

          // className='d-flex justify-content-center align-items-center'
          // style={{
          //   background:
          //     'linear-gradient(to left, rgba(120, 160, 144, 1), rgba(120, 75, 162, 1))',
          //   bottom: '10',
          // }}
        >
          <h1 className=' mb-5'>Edit Your Events</h1>
          <form>
            <div className='mb-2'>
              <label htmlFor='title'>
                Id: <span style={{ color: 'red' }}> *</span>
              </label>
              <input
                type='number'
                name='id'
                className='form-control'
                required
                value={data.id}
                onChange={(d) => setData({ ...data, id: d.target.value })}
              />
            </div>

            <div className='mb-2'>
              <label htmlFor='pages'>
                Event: <span style={{ color: 'red' }}> *</span>
              </label>
              <input
                type='text'
                name='eventname'
                className='form-control'
                required
                value={data.eventname}
                onChange={(d) =>
                  setData({ ...data, eventname: d.target.value })
                }
              />
            </div>

            <div className='mb-2'>
              <label htmlFor='author'>
                Venue: <span style={{ color: 'red' }}> *</span>
              </label>
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
              <label htmlFor='category'>
                Date:<span style={{ color: 'red' }}> *</span>
              </label>
              <input
                type='date'
                name='startDate'
                className='form-control'
                value={startDate}
                required
                onChange={(d) => setData({ ...data, Date: d.target.value })}
              />
              <small>date needs to be selected</small>
            </div>
            <div className='mb-2'>
              <label htmlFor='category'>
                Time: <span style={{ color: 'red' }}> *</span>
              </label>
              <input
                type='time'
                name='time'
                className='form-control'
                placeholder='Please Enter time'
                required
                value={data.time}
                onChange={(d) => setData({ ...data, time: d.target.value })}
              />
            </div>

            <div className='mb-2'>
              <label htmlFor='category'>
                Description: <span style={{ color: 'red' }}> *</span>
              </label>
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
            <Link
              to='/event'
              className='btn btn-success'
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </Link>
            <Link to='/event' className='btn btn-warning ms-5'>
              Back
            </Link>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Edit
