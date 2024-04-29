import React from 'react'
import { NavLink } from 'react-router-dom'
import smlogo from '../images/lckydrwimg/web-05.png'

const Logo = () => {
  return (
    <>
    <div className='navicon'>
      <NavLink to='/' className='navlnk'><img src={smlogo} alt="SM Logo" /></NavLink>
    </div>
    </>
  )
}

export default Logo