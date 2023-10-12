import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import Footer from '../../Components/Footer/Footer'
import { useNavigate, Link } from 'react-router-dom'
import moment from 'moment'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

const View = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const startDate = moment(data.Date).format('YYYY-MM-DD')

  const id = sessionStorage.getItem('viewId')

  useEffect(() => {
    axios
      .get(`http://localhost:8081/view/${id}`)
      .then((res) => setData(res.data[0]))
      .catch((error) => console.log(error))
  }, [id])

  const handleEdit = (id) => {
    navigate(`/edit/${id}`)
  }

  return (
    <>
      <NavBar />

      <div style={{ maxHeight: '100%', height: '80vh' }}>
        <h1 className='d-flex justify-content-center'>Your Event Details</h1>

        <div className='d-flex justify-content-center mb-2'>
          <strong>
            <b>Id :</b>&nbsp;&nbsp; {data.id}
          </strong>
        </div>
        <div className='d-flex justify-content-center mb-2'>
          <strong>
            <b>Event :</b>
            &nbsp;&nbsp; {data.eventname}
          </strong>
        </div>
        <div className='d-flex justify-content-center mb-2'>
          <strong>
            <b>Venue : </b>&nbsp;&nbsp;
            {data.venue}
          </strong>
        </div>
        <div className='d-flex justify-content-center mb-2'>
          <strong>
            <b>
              &nbsp;
              <CalendarMonthIcon /> :
            </b>
            &nbsp;&nbsp;{startDate}
          </strong>
        </div>
        <div className='d-flex justify-content-center mb-2'>
          <strong>
            <b>
              <AccessTimeIcon /> :
            </b>
            &nbsp;&nbsp;{data.time}
          </strong>
        </div>
        <div className='d-flex justify-content-center mb-2'>
          <strong>
            <b>Description : &nbsp;&nbsp;</b>
            {data.description}
          </strong>
        </div>
        <div className='d-flex justify-content-center mt-5'>
          <button
            className='btn btn-warning'
            onClick={() => handleEdit(data.id)}
          >
            <BorderColorIcon />
          </button>
          <Link to='/event' className='btn btn-info ms-5'>
            Back
          </Link>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default View
