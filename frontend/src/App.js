import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './AccountCreation/LogIn/Login'
import Register from './AccountCreation/Register/Register'
import Home from './DashBoard Operations/HOme/Home'
import ProtectedRoute from './Components/ProtectedRoute'
import About from './DashBoard Operations/AboutUs/ABout'
import BookEvents from './DashBoard Operations/BookEvents/BookEvents'
import FetchData from './DashBoard Operations/FetchData/FetchData'
import View from './DashBoard Operations/View/View'
import Edit from './DashBoard Operations/Edit/Edit'

import EditProfile from './DashBoard Operations/EditProfile/EditProfile'
import axios from 'axios'

function App() {
  axios.defaults.withCredentials = true
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route exact path='/home' element={<Home />} />

            <Route path='/about' element={<About />}></Route>

            <Route path='/bookevent' element={<BookEvents />}></Route>
            <Route path='/event' element={<FetchData />} />
            <Route path='/view/:id' element={<View />} />
            <Route path='/edit/:id' element={<Edit />} />

            <Route path='/editprofile/:email' element={<EditProfile />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
