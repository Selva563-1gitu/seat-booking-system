import React from 'react'
import { Link } from 'react-router'

function MainPage() {
  return (
    <div className='container'>
        <h1 style={{fontSize:"80px"}}>Welcome to Seat Booking System</h1>
        <Link to="/react-app-demo/domains"><button className='nextbutton'>Get Started</button></Link></div>
  )
}

export default MainPage