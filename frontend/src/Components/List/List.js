import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import moment from 'moment'
import { Modal } from 'react-bootstrap'
import './List.css'
import HomeIcon from '@mui/icons-material/Home'
import DeleteIcon from '@mui/icons-material/Delete'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import EditNoteIcon from '@mui/icons-material/EditNote'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

const List = () => {
  const navigate = useNavigate()
  const [userdata, setUserData] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [data, setData] = useState([])

  const id = sessionStorage.getItem('deleteId')

  // displaying the list of events#################################################
  useEffect(() => {
    fetchData()
  }, [id])

  const fetchData = async () => {
    try {
      const result = await axios('http://localhost:8081/event')
      console.log(result.data)
      setUserData(result.data)
    } catch (err) {
      console.log(err)
    }
  }

  // view button############################################################
  const ViewData = (id) => {
    sessionStorage.setItem('viewId', id)
    navigate(`/view/${id}`)
  }

  // Edit button############################################################
  const EditData = (id2) => {
    sessionStorage.setItem('editId', id2)
    navigate(`/edit/${id2}`)
  }

  // delete button#######################################################
  const handleDelete = (id) => {
    alert('Are you sure?')
    sessionStorage.setItem('deleteId', id)
    setModalOpen(true)
    axios
      .get(`http://localhost:8081/delete/${id}`)
      .then((res) => setData(res.data[0]))
      .catch((error) => console.log(error))
  }

  // sending delete request to databse######################################
  const deleteData = () => {
    axios
      .delete(`http://localhost:8081/delete/${id}`)
      .then((res) => {
        console.log('deleted')
      })
      .catch((err) => console.log(err))
    setModalOpen(!modalOpen)
    navigate('/home')
  }

  return (
    <div className='container'>
      {/* displayed the list of events################################################# */}
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Event Name</th>
            <th>Event Venue</th>
            <th>Event Date</th>
            <th>Event Time</th>
            <th>
              Actions
              <Link
                to='/home'
                className='ms-3'
                style={{ textDecoration: 'none' }}
              >
                <HomeIcon />
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {userdata.map((user) => {
            const startDate = moment(user.Date).format('YYYY-MM-DD')
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.eventname}</td>
                <td>{user.venue}</td>
                <td>{startDate}</td>
                <td>{user.time}</td>
                <td>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className='ms-2 btn btn-danger'
                  >
                    {/* Delete */}
                    <DeleteIcon />
                  </button>
                  <button
                    onClick={() => ViewData(user.id)}
                    className='ms-3 btn btn-info'
                  >
                    {/* View */}
                    <RemoveRedEyeIcon />
                  </button>
                  <button
                    onClick={() => EditData(user.id)}
                    className='ms-3 btn btn-warning'
                  >
                    {/* Edit */}
                    <EditNoteIcon />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {/* ######################################################################################################### */}

      {/* Delete Modal########################################################################## */}
      <Modal show={modalOpen} onHide={() => setModalOpen(!modalOpen)}>
        <Modal.Header closeButton>Your data will be deleted.</Modal.Header>
        <Modal.Body>
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
              <b>
                <CalendarMonthIcon /> :
              </b>
              &nbsp;&nbsp;
              {moment(data.Date).format('YYYY-MM-DD')}
            </strong>
          </div>
          <div className='mb-2'>
            <strong>
              <b>
                <AccessTimeIcon /> :
              </b>{' '}
              &nbsp;&nbsp;{data.time}
            </strong>
          </div>
          <div className='mb-5'>
            <strong>
              <b>Description : &nbsp;&nbsp;</b>
              {data.description}
            </strong>
          </div>
          <button className='btn btn-danger' onClick={() => deleteData()}>
            Delete
          </button>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default List
