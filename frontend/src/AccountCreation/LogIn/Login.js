import React, { useState } from 'react'
import ClipArt from './ClipArt.jpg'
import Input from '../../Components/Input/Input'
import LockSharpIcon from '@mui/icons-material/LockSharp'
import NoEncryptionSharpIcon from '@mui/icons-material/NoEncryptionSharp'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true

  // handle toggle do one component
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

  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const takeEmail = values.email
  const takepass = values.password

  const SaveDetails = (item) => {
    setValues({ ...values, [item.target.name]: item.target.value })
    console.log('data saved')
  }

  function handleForm(e) {
    e.preventDefault()
    axios
      .post('http://localhost:8081/login', values)
      .then((res) => {
        console.log(res, 'output came')
        if (res.data.Status === 'Success') {
          console.log(res, 'result')
          console.log(res.data.name, 'name')
          localStorage.setItem('User', res.data.name)

          navigate('/home')
          localStorage.setItem('LoginKey', true)
        } else {
          alert('Something fishyy')
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <div
      className='vh-100'
      style={{
        backgroundImage:
          'url("https://img.freepik.com/free-vector/confident-woman-wearing-yellow-uniform_1308-41651.jpg?w=2000")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '17% 75%',
        backgroundPositionY: '28%',
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
                    Log In
                  </p>
                  <form className='mx-1 mx-md-4' onSubmit={handleForm}>
                    <div className='d-flex flex-row align-items-center mb-4'>
                      <div className='flex-fill mb-2'>
                        <label className='form-label' htmlFor='Email'>
                          Email-Id
                        </label>
                        <Input
                          type={'email'}
                          className={'form-control'}
                          placeholder={'rosydsuza@gmail.com'}
                          name={'email'}
                          value={takeEmail}
                          TrackChange={SaveDetails}
                        />
                      </div>
                    </div>

                    <div className='d-flex flex-row align-items-center mb-4'>
                      <div className='flex-fill mb-2'>
                        <i onClick={handleToggle}>
                          <abbr
                            title='helps to change the password visibility'
                            style={{ cursor: 'pointer', left: '28%' }}
                          >
                            {icon}
                          </abbr>
                        </i>
                        <label className='form-label' htmlFor='Password'>
                          Password
                        </label>

                        <Input
                          type={type ? 'password' : 'text'}
                          className={'form-control'}
                          placeholder={'********'}
                          name={'password'}
                          value={takepass}
                          TrackChange={SaveDetails}
                        />
                      </div>
                    </div>

                    <p
                      className='text-center mb-5'
                      style={{ color: '#666864' }}
                    >
                      Dear User Your Data Is Safe With Us.
                    </p>

                    <div className='d-flex justify-content-center mx-4 mb-3 mb-lg-4'>
                      <button type='submit' class='btn btn-primary btn-lg'>
                        Register
                      </button>
                    </div>

                    <p className='text-center'>
                      Don't Have Your Account ?
                      <Link
                        to={'/'}
                        style={{ textDecoration: 'none', color: 'green' }}
                      >
                        &nbsp;&nbsp;Click here to Register
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
    </div>
  )
}

export default Login
