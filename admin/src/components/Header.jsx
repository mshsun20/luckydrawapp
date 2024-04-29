import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Topbar from './Topbar'
import Logo from './Logo'
import Navbar from './Navbar'
import axios from 'axios'
import Server from '../Server'

const Header = () => {
  const [usrdta, setUsrdta] = useState()
  const navig = useNavigate()

  const getUsrSess = async () => {
    const token = localStorage.getItem('user')

    if (token) {
      const res = await axios.get(`${Server}/user/sess/`+token)
      const dta = await res.data
      // console.log(dta)

      if (dta.statuscode === 220) {
        // console.log(dta.success)
        setUsrdta(dta.user)
      }
      else {
        console.warn(dta.error)
        localStorage.removeItem('user')
      }
    }
    else {
      navig('/admin/login')
    }
  }
  useEffect(() => {
    getUsrSess()
  }, [])

  const hndlgout = async (e) => {
    e.preventDefault()
    
    try {
      if (window.confirm(`Do you want to Log Out now ?`)) {
        setUsrdta(null)
        localStorage.removeItem('user')
        await axios.get(`${Server}/user/logout`)
        window.location.reload()
      }
      else {
        window.alert(`Still you are Logged In...`)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
        <div className='topheadr fixed-top'>
            <div className="topbar">
              <Topbar />
            </div>
            <div className="mainhdr container-fluid px-5 py-2 bg-body-tertiary">
              <nav className="hdrwrp navbar navbar-expand-lg bg-body-tertiary" style={{whiteSpace:'nowrap'}}>
                <div className="hdrcntnt container-fluid">
                  <NavLink className="lgolnk navbar-brand" to="/admin/home"><Logo /></NavLink>
                  <button className="nvtgglr navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="nvbr collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                    <Navbar />
                    {/* <form className="d-flex right" role="search">
                      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                      <button className="btn btn-outline-success" type="submit">Search</button>
                    </form> */}
                    <Nav className='nvmenu flex-nowrap'>
                      <NavDropdown title={`${(usrdta)&&((usrdta.usr_name)?((usrdta.usr_name).split(' ').reduce((result, word) => result+=word.slice(0,1),'').toString()):(usrdta.usr_unam))}`} className="nav-item dropdown" id="collapsible-nav-dropdown">
                        <NavLink to={`/admin/user/me/${usrdta&&usrdta._id}`} className='dropdown-item'>My Profile</NavLink>
                        <NavDropdown.Item className='dropdown-item' onClick={hndlgout}>Logout</NavDropdown.Item>
                      </NavDropdown>
                      {
                        (usrdta)&&((usrdta.usr_type === 'Developer')||(usrdta.usr_type === 'Super Admin')||(usrdta.usr_type === 'Administrator'))&&(
                          <NavDropdown title="All Users" className="nav-item dropdown" id="collapsible-nav-dropdown">
                            <NavLink to='/admin/users' className='dropdown-item'>Users List</NavLink>
                            <NavLink to="/admin/testapi" className='dropdown-item'>Test APIs</NavLink>
                          </NavDropdown>
                        )
                      }
                    </Nav>
                  </div>
                </div>
              </nav>
            </div>
        </div>
    </>
  )
}

export default Header