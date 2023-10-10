import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link, NavLink } from 'react-router-dom'
import moment from 'moment'

const List = () => {
  // const { id } = useParams()
  const navigate = useNavigate()
  const [userdata, setUserData] = useState([])
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  // console.log('em', id)
  const fetchData = async () => {
    try {
      const result = await axios('http://localhost:8081/event')
      console.log(result.data)
      setUserData(result.data)
    } catch (err) {
      console.log(err)
    }
  }

  const ViewData = (id) => {
    sessionStorage.setItem('viewId', id)
    navigate(`/view/${id}`)
  }
  const EditData = (id2) => {
    sessionStorage.setItem('editId', id2)
    navigate(`/edit/${id2}`)
  }
  const handleDelete = (id) => {
    alert('Are you sure?')
    sessionStorage.setItem('deleteId', id)

    navigate(`/delete/${id}`)
  }

  const handleCreate = () => {
    navigate('/bookevent')
  }

  return (
    <div className='container'>
      {/* <h3>User Details</h3> */}
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
                🏠
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
                    Delete
                  </button>
                  <button
                    onClick={() => ViewData(user.id)}
                    className='ms-3 btn btn-info'
                  >
                    View
                  </button>
                  <button
                    onClick={() => EditData(user.id)}
                    className='ms-3 btn btn-warning'
                  >
                    Edit
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default List
