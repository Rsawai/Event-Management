import React, { useState } from 'react'
import ClipArt from '../LogIn/ClipArt.jpg'

import Input from '../../Components/Input/Input'
import LockSharpIcon from '@mui/icons-material/LockSharp'
import NoEncryptionSharpIcon from '@mui/icons-material/NoEncryptionSharp'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

const Register = () => {
  const navigate = useNavigate()

  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  })
  const [name, setName] = useState(false)
  const [em, setEm] = useState(false)
  const [pass, setPass] = useState(false)

  // Saving Data in value object################################################################
  const SaveDetails = (item) => {
    setValues({ ...values, [item.target.name]: item.target.value })
    console.log('data saved')
  }

  // Name Validation purpose#####################################################

  const NameVal = (inputs) => {
    const name_pattern = /\b([A-Z][a-z]+)/
    if (!name_pattern.test(inputs)) {
      toast.error('First Letter Must Be Capital & No Numbers', {
        position: 'top-center',
      })
    } else {
      setName(true)
    }
  }

  // email validation purpose##############################################################

  const emailVal = (inputs) => {
    axios
      .get('http://localhost:8081/')
      .then((res) => {
        res.data.map((structure) => {
          console.log(structure.email, 'email')

          if (structure.email == inputs) {
            toast.error('This Email already exists')
            setEm(false)
          }
        })
      })

      .catch((err) => console.log(err))

    const em_pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

    if (!em_pattern.test(inputs)) {
      toast.error('Please Enter Valid Email', { position: 'top-center' })
    } else {
      setEm(true)
    }
  }

  // password validation purpose##########################################################

  const PassVal = (inputs) => {
    const pass_pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&$])(?=.{8,})/

    if (!pass_pattern.test(inputs)) {
      toast.error('Please Enter Valid Password', { position: 'top-center' })
    } else {
      setPass(true)
    }
  }

  // Password hidden feature################################################################

  const [type, setType] = useState(true)
  const [icon, setIcon] = useState(<NoEncryptionSharpIcon />)
  const handleToggle = () => {
    if (type === false) {
      setIcon(<NoEncryptionSharpIcon />)
      setType(true)
    } else {
      setIcon(<LockSharpIcon />)
      setType(false)
    }
  }

  // Submit The Form#####################################################################
  const submitForm = (e) => {
    e.preventDefault()
    alert(`Welcome, "${values.firstname}" Your Account Has Been Created.`)
    navigate('/login')
  }

  // post the details into the database#################################################

  function handleForm(e) {
    if (name && em && pass) {
      console.log('data came', values)
      axios
        .post('http://localhost:8081/', values)
        .then((res) => {
          console.log('data posted')
        })
        .catch((error) => {
          console.log('error found')
        })
    } else {
      toast.error('Please Enter Valid Inputs')
    }
  }

  return (
    <div
      className='vh-100'
      style={{
        backgroundImage:
          'url("https://img.freepik.com/premium-vector/office-worker_1308-82594.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '17% 70%',
        backgroundPositionY: '20%',
      }}
    >
      <div className='container h-100'>
        <div className='row d-flex justify-content-center align-items-center h-100'>
          <div className='card text-black' style={{ borderRadius: '25px' }}>
            {/* helps to align an image */}
            <div className='card-body p-md-5'>
              <div className='row justify-content-center'>
                {/* adjusts all the input column sizes */}
                <div className='col-md-10 col-lg-10 col-xl-5 order-2'>
                  <p className='text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4'>
                    Sign Up
                  </p>
                  <form
                    className='mx-1 mx-md-4'
                    onSubmit={(e) => submitForm(e)}
                  >
                    <div className='flex-fill mb-3'>
                      <label className='form-label' htmlFor='First-Name'>
                        Your First Name <span className='text-danger'>*</span>
                      </label>
                      <Input
                        type={'text'}
                        className={'form-control'}
                        placeholder={'Rosy'}
                        name={'firstname'}
                        value={values.firstname}
                        TrackChange={SaveDetails}
                        onBlur={() => NameVal(values.firstname)}
                      />
                    </div>

                    <div className='flex-fill mb-3'>
                      <label className='form-label' htmlFor='Last-Name'>
                        Your Last Name <span className='text-danger'>*</span>
                      </label>
                      <Input
                        type={'text'}
                        className={'form-control'}
                        placeholder={'Desuza'}
                        name={'lastname'}
                        value={values.lastname}
                        TrackChange={SaveDetails}
                        onBlur={() => NameVal(values.lastname)}
                      />
                    </div>

                    <div className='flex-fill mb-3'>
                      <label className='form-label' htmlFor='Email'>
                        Email-Id <span className='text-danger'>*</span>
                      </label>
                      <Input
                        type={'email'}
                        className={'form-control'}
                        placeholder={'rosydsuza@gmail.com'}
                        name={'email'}
                        value={values.email}
                        TrackChange={SaveDetails}
                        onBlur={() => emailVal(values.email)}
                      />
                    </div>

                    <div className='flex-fill mb-4'>
                      <label className='form-label' htmlFor='Password'>
                        Password <span className='text-danger'>*</span>
                      </label>
                      <i onClick={handleToggle}>
                        <abbr
                          title='helps to change the password visibility'
                          style={{ cursor: 'pointer' }}
                        >
                          {icon}
                        </abbr>
                      </i>
                      <Input
                        type={type ? 'password' : 'text'}
                        className={'form-control'}
                        placeholder={'********'}
                        name={'password'}
                        value={values.password}
                        TrackChange={SaveDetails}
                        onBlur={() => PassVal(values.password)}
                      />
                      <small className='text-muted'>
                        Atleast One(UpperCase, LowerCase, Number & Special
                        Character) Minimum-length(8).
                      </small>
                    </div>

                    <div className='d-flex justify-content-center mx-4 mb-3 mb-lg-4'>
                      <button
                        type='submit'
                        class='btn btn-primary btn-lg'
                        onClick={handleForm}
                      >
                        Register
                      </button>
                    </div>

                    <p className='text-center'>
                      Already Register ?
                      <Link
                        to={'/login'}
                        style={{ textDecoration: 'none', color: 'green' }}
                      >
                        &nbsp;&nbsp;Click here to Log-In
                      </Link>
                    </p>
                  </form>
                </div>
                <div className='col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2'>
                  <img
                    src={ClipArt}
                    className='img-fluid'
                    alt='event management'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Register
