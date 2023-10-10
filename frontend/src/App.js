import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './AccountCreation/LogIn/Login'
import Register from './AccountCreation/Register/Register'
import Home from './DashBoard Operations/HOme/Home'
import ProtectedRoute from './Components/ProtectedRoute'
import NavBar from './Components/NavBar/NavBar'
import About from './DashBoard Operations/AboutUs/ABout'
import UpcomingEvents from './DashBoard Operations/UpcomingEvents/UpcomingEvents'
import BookEvents from './DashBoard Operations/BookEvents/BookEvents'
import FetchData from './DashBoard Operations/FetchData/FetchData'
import View from './DashBoard Operations/View/View'
import Edit from './DashBoard Operations/Edit/Edit'
import Delete from './DashBoard Operations/Delete/Delete'
import EditProfile from './DashBoard Operations/EditProfile/EditProfile'

// import Form from './Components/Form'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route exact path='/home' element={<Home />} />

            <Route path='/nav' element={<NavBar />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/upcomingevent' element={<UpcomingEvents />}></Route>
            <Route path='/bookevent' element={<BookEvents />}></Route>
            <Route path='/event' element={<FetchData />} />
            <Route path='/view/:id' element={<View />} />
            <Route path='/edit/:id' element={<Edit />} />
            <Route path='/delete/:id' element={<Delete />}></Route>
            <Route path='/editprofile' element={<EditProfile />}></Route>
          </Route>
          {/* <Route path='/event' element={<FetchData />} />
          <Route path='/bookevent' element={<Form />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
