import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'
import NavBar from '../../Components/NavBar/NavBar'
import moment from 'moment'
import BackupIcon from '@mui/icons-material/Backup'

import Input from '../../Components/Input/Input'

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

  const startDate = moment(data.Date).format('YYYY-MM-DD')
  console.log(data.Date, 'date', startDate, 'changed date')
  data.Date = startDate

  const id = sessionStorage.getItem('editId')

  console.log(data, 'dattaa')

  useEffect(() => {
    console.log('request came')
    axios
      .get(`http://localhost:8081/edit/${id}`)
      .then((res) => {
        const getData = res.data[0]
        setData(getData)
      })
      // )    )
      .catch((error) => console.log(error))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submit request came')

    const payload = data
    axios
      .put(`http://localhost:8081/edit/${id}`, payload)
      .then((res) => {
        console.log(res, 'success')
        navigate('/event')
      })
      .catch((error) => console.log(error, 'failed'))
  }

  return (
    <>
      <NavBar />
      <div className='d-flex vw-100 justify-content-center align-items-center'>
        <div style={{ maxHeight: '100%', height: '81vh' }}>
          <h1 className=' mb-5'>Edit Your Events</h1>
          <form>
            <div className='mb-2'>
              <label htmlFor='title'>
                Id: <span style={{ color: 'red' }}> *</span>
              </label>
              <Input
                type={'number'}
                name={'id'}
                className={'form-control'}
                required
                value={data.id}
                TrackChange={(d) => setData({ ...data, id: d.target.value })}
              />
            </div>

            <div className='mb-2'>
              <label htmlFor='pages'>
                Event: <span style={{ color: 'red' }}> *</span>
              </label>
              <Input
                type={'text'}
                name={'eventname'}
                className={'form-control'}
                required
                value={data.eventname}
                TrackChange={(d) =>
                  setData({ ...data, eventname: d.target.value })
                }
              />
            </div>

            <div className='mb-2'>
              <label htmlFor='author'>
                Venue: <span style={{ color: 'red' }}> *</span>
              </label>
              <Input
                type={'text'}
                name={'venue'}
                className={'form-control'}
                required
                value={data.venue}
                TrackChange={(d) => setData({ ...data, venue: d.target.value })}
              />
            </div>

            <div className='mb-2'>
              <label htmlFor='category'>
                Date:<span style={{ color: 'red' }}> *</span>
              </label>
              <Input
                type={'date'}
                name={'startDate'}
                className={'form-control'}
                value={startDate}
                required
                TrackChange={(d) => {
                  const sDate = moment(d.target.value).format('YYYY-MM-DD')
                  console.log(sDate, 'sDate')
                  setData({
                    ...data,
                    Date: sDate,
                  })
                }}
              />
            </div>
            <div className='mb-2'>
              <label htmlFor='category'>
                Time: <span style={{ color: 'red' }}> *</span>
              </label>
              <Input
                type={'time'}
                name={'time'}
                className={'form-control'}
                placeholder={'Please Enter time'}
                required
                value={data.time}
                TrackChange={(d) => setData({ ...data, time: d.target.value })}
              />
            </div>

            <div className='mb-2'>
              <label htmlFor='category'>
                Description: <span style={{ color: 'red' }}> *</span>
              </label>
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
              />
            </div>
            <button
              className='btn btn-success'
              onClick={(e) => handleSubmit(e)}
            >
              <BackupIcon />
            </button>
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
