import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import styles from './EditProfile.module.scss'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { Link, useNavigate } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import Input from '../../Components/Input/Input'

import CheckIcon from '@mui/icons-material/Check'

const EditProfile = () => {
  const navigate = useNavigate()

  const [showModal, setShowModal] = useState(false)
  const email = localStorage.getItem('EmailKey')
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
  })
  const [ok, setOk] = useState()

  useEffect(() => {
    fetchDetails()
  }, [])

  const fetchDetails = () => {
    axios
      .get(`http://localhost:8081/editprofile/${email}`)
      .then((res) => {
        console.log(res)
        setValues(res.data[0])
      })
      .catch((err) => console.log(err))
  }

  const submitDetails = () => {
    alert('You will be logged out,please log in again...')
    const payload = values
    console.log(payload, 'payload')
    console.log('came')

    axios
      .patch(`http://localhost:8081/editprofile/${email}`, payload)
      .then((res) => {
        console.log('success')
        localStorage.setItem('LoginKey', false)
        navigate('/login')
      })

      .catch((err) => console.log(err))
  }

  return (
    <>
      <div className={styles.mainDiv}>
        <span>
          <AccountBoxIcon
            style={{
              height: '6rem',
              width: '6rem',
              marginRight: '15rem',
              marginTop: '1rem',
            }}
            className={styles.userIcon}
          />
        </span>
        <div className={styles.First}>
          <strong>
            <b>Firstname :</b>&nbsp;&nbsp; {values.firstname}&nbsp;&nbsp;
          </strong>
        </div>
        <div className={styles.Last}>
          <strong>
            <b>Lastname :</b>&nbsp;&nbsp; {values.lastname}&nbsp;&nbsp;
          </strong>
        </div>
        <div className={styles.Email}>
          <strong>
            <b>Email-Id :</b>&nbsp;&nbsp; {values.email}&nbsp;&nbsp;
          </strong>
        </div>

        <div className={styles.Buttons}>
          <Link onClick={() => setShowModal(true)} className='mx-5'>
            <ModeEditIcon />
          </Link>

          <button
            className=' btn btn-info ms-5'
            onClick={() => navigate('/home')}
          >
            Back
          </button>
        </div>
      </div>

      {/* #################################################################################### */}
      <Modal show={showModal} onHide={() => setShowModal(!showModal)}>
        <Modal.Header closeButton>
          Edit Details
          <span>{ok ? <ModeEditIcon onClick={() => setOk(false)} /> : ''}</span>
          <span>{!ok ? <CheckIcon onClick={() => setOk(true)} /> : ''} </span>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className='mb-2'>
              <label htmlFor='title'>Firstname:</label>
              <Input
                type={'text'}
                name={'id'}
                className={'form-control'}
                required
                value={values.firstname}
                TrackChange={(d) =>
                  setValues({ ...values, firstname: d.target.value })
                }
                disabled={ok}
              />
            </div>

            <div className='mb-2'>
              <label htmlFor='pages'>Lastname:</label>
              <Input
                type={'email'}
                name={'eventname'}
                className={'form-control'}
                required
                value={values.lastname}
                TrackChange={(d) =>
                  setValues({ ...values, lastname: d.target.value })
                }
                disabled={ok}
              />
            </div>

            <div className='mb-2'>
              <label htmlFor='author'>Email:</label>
              <Input
                type={'text'}
                name={'venue'}
                className={'form-control'}
                required
                value={values.email}
                TrackChange={(d) =>
                  setValues({ ...values, email: d.target.value })
                }
                disabled={ok}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-warning' onClick={() => submitDetails()}>
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditProfile
