import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import Footer from '../../Components/Footer/Footer'
import { useNavigate, Link } from 'react-router-dom'
import moment from 'moment'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { Modal } from 'react-bootstrap'

const View = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const [item, setItem] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const startDate = moment(data.Date).format('YYYY-MM-DD')

  const id = sessionStorage.getItem('viewId')

  // fetching the data to view #########################################################
  useEffect(() => {
    axios
      .get(`http://localhost:8081/view/${id}`)
      .then((res) => setData(res.data[0]))
      .catch((error) => console.log(error))

    fetchData()
  }, [id])

  const fetchData = async () => {
    try {
      const result = await axios('http://localhost:8081/event')
      console.log(result.data, 'data')

      setItem(result.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleEdit = (id) => {
    navigate(`/edit/${id}`)
  }

  const handleModal = () => {
    setModalOpen(true)
  }

  const sortedDate = (a, b) => {
    const dateA = new Date(a.Date)
    const dateB = new Date(b.Date)
    if (dateA > dateB) return 1
    else if (dateA < dateB) return -1
    return 0
  }

  // item.sort(sortedDate)
  console.log(item.sort(sortedDate), 'item')

  return (
    <>
      <NavBar />

      <div style={{ maxHeight: '100%', height: '80vh' }}>
        <h1 className='d-flex justify-content-center'>Your Event Details</h1>

        <div className='d-flex justify-content-center mt-4 '>
          <button
            className='btn btn-outline-primary'
            onClick={() => handleModal()}
          >
            View Upcoming Events
          </button>
        </div>

        <div className='d-flex justify-content-center mb-2 mt-5'>
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

      <Modal
        show={modalOpen}
        onHide={() => setModalOpen(!modalOpen)}
        className=' modal-lg'
      >
        <Modal.Header closeButton>
          <h3>Upcoming Events</h3>
        </Modal.Header>
        <Modal.Body>
          <h1 className='d-flex justify-content-center'>
            Your Upcoming Event Are
          </h1>
          <div style={{ overflow: 'auto' }}>
            <table className='table table-bordered table-striped  '>
              <thead>
                <tr>
                  <th scope='col'>Event Name</th>
                  <th scope='col'>Event Venue</th>
                  <th scope='col'>Event Date</th>
                  <th scope='col'>Event Time</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {item.map((items) => {
                  const eventDate = moment(items.Date).format('YYYY-MM-DD')
                  return (
                    <tr key={items.id}>
                      <td>{items.eventname}</td>
                      <td>{items.venue}</td>
                      <td>{eventDate}</td>
                      <td>{items.time}</td>
                      <td>{items.description}</td>
                      <td></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>

      <Footer />
    </>
  )
}

export default View
