import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import Footer from '../../Components/Footer/Footer'
import { useNavigate, Link } from 'react-router-dom'
import moment from 'moment'

const View = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const startDate = moment(data.Date).format('YYYY-MM-DD')

  const id = sessionStorage.getItem('viewId')
  console.log(id, 'id')
  console.log(data, 'dattaa')
  // console.log(data.id, 'tableid')
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
      <center>
        <div style={{ maxHeight: '100%', height: '80vh' }}>
          <h1>Your Event Details</h1>

          <div className='mb-2'>
            <strong>
              <b>Id :</b>&nbsp;&nbsp; {data.id}
            </strong>
          </div>
          <div className='mb-2'>
            <strong>
              <b>Event :</b>
              &nbsp;&nbsp; {data.eventname}
            </strong>
          </div>
          <div className='mb-2'>
            <strong>
              <b>Venue : </b>&nbsp;&nbsp;
              {data.venue}
            </strong>
          </div>
          <div className='mb-2'>
            <strong>
              <b>Date :</b> &nbsp;&nbsp;{startDate}
            </strong>
          </div>
          <div className='mb-2'>
            <strong>
              <b>Time :</b> &nbsp;&nbsp;{data.time}
            </strong>
          </div>
          <div className='mb-2'>
            <strong>
              <b>Description : &nbsp;&nbsp;</b>
              {data.description}
            </strong>
          </div>
          <button
            className='btn btn-warning'
            onClick={() => handleEdit(data.id)}
          >
            Edit
          </button>
          <Link to='/event' className='btn btn-info ms-5'>
            Back
          </Link>
        </div>
      </center>
      <Footer />
    </>
  )
}

export default View
