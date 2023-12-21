/* eslint-disable no-unused-vars */
import React from 'react'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Propose from './pages/Propose.jsx'
import Completed from './pages/Completed.jsx'
import Form from './components/Form.jsx'
import EditForm from './pages/EditForm.jsx'
import CityPage from './pages/CityPage.jsx'
import Navbar from './components/Navbar.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import { UserProvider } from './context/userContext.jsx'
const App = () => {
  return (
    <UserProvider>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/propose' element={<Propose />} />
        <Route exact path='/completed' element={<Completed />} />
        <Route exact path='/edit/:id' element={<EditForm />} />
        <Route exact path='/create' element={<Form />} />
        <Route exact path='/city/:id' element={<CityPage />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
      </Routes>
      {/* </NavProvider> */}
    </UserProvider>
  )
}

export default App