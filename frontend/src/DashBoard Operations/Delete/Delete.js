import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'
import NavBar from '../../Components/NavBar/NavBar'
import moment from 'moment'

const Delete = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])

  // const { id } = useParams()

  const id = sessionStorage.getItem('deleteId')
  console.log(id, 'id')
  console.log(data, 'dattaa')

  const startDate = moment(data.Date).format('YYYY-MM-DD')

  useEffect(() => {
    axios
      .get(`http://localhost:8081/delete/${id}`)
      .then((res) => setData(res.data[0]))
      .catch((error) => console.log(error))
  }, [])

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8081/delete/${id}`)
      .then((res) => {
        console.log('deleted')
        navigate('/event')
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      <NavBar />
      <center className='mb-2' style={{ maxHeight: '100%', height: '81vh' }}>
        <h1>Your data will be deleted.</h1>

        <div>
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
        <div className='mb-5'>
          <strong>
            <b>Description : &nbsp;&nbsp;</b>
            {data.description}
          </strong>
        </div>
        <button className='btn btn-danger' onClick={() => handleDelete()}>
          Delete
        </button>
        <Link to='/event' className='btn btn-info ms-5'>
          Back
        </Link>
      </center>
      <Footer />
    </>
  )
}

export default Delete
