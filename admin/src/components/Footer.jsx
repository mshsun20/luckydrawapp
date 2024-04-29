import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Server from '../Server'
import smlogo from '../images/lckydrwimg/NewLogo-01.png'

const Footer = () => {
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
        <div className="mainftr">
          <footer className="bg-body-tertiary">
            <div className="row">
              <div className="col-2 mb-3">
                <NavLink to="/admin/home" className="d-flex align-items-center justify-content-between link-body-emphasis text-decoration-none" style={{flexFlow:'row wrap'}}>
                  <div className="brndlgo" style={{width:'50%',padding:'0.5rem'}}><img src={smlogo} alt="SM Logo" style={{width:'100%',maxWidth:'10rem',minWidth:'5rem'}} /></div>
                  <span className="text-body-secondary" style={{padding:'0.5rem'}}>Dashboard &copy; {new Date().getFullYear()}</span>
                </NavLink>
              </div>

              <div className="col mb-3"></div>

              <div className="col-6 col-md-2 mb-3 p-3">
                <h5>Setup & Play</h5>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2"><NavLink className="nav-link p-0 text-body-secondary" to="/admin/accounts">Accounts</NavLink></li>
                  <li className="nav-item mb-2"><NavLink className="nav-link p-0 text-body-secondary" to="/admin/contests">Contests</NavLink></li>
                  <li className="nav-item mb-2"><NavLink className="nav-link p-0 text-body-secondary" to="/admin/tickets">Tickets</NavLink></li>
                  <li className="nav-item mb-2"><NavLink className="nav-link p-0 text-body-secondary" to="/admin/ranks">Ranks</NavLink></li>
                  <li className="nav-item mb-2"><NavLink className="nav-link p-0 text-body-secondary" to="/admin/gifts">Gift Items</NavLink></li>
                  <li className="nav-item mb-2"><NavLink className="nav-link p-0 text-body-secondary" to="/admin/prizes">Prizes</NavLink></li>
                  <li className="nav-item mb-2"><NavLink className="nav-link p-0 text-body-secondary" to="/admin/winners">Winners</NavLink></li>
                </ul>
              </div>

              <div className="col-6 col-md-2 mb-3 p-3">
                <h5>Masters & Mappings</h5>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2"><NavLink className="nav-link p-0 text-body-secondary" to="/admin/master/status">Status Master</NavLink></li>
                  <li className="nav-item mb-2"><NavLink className="nav-link p-0 text-body-secondary" to="/admin/master/org">Organisation Master</NavLink></li>
                  <li className="nav-item mb-2"><NavLink className="nav-link p-0 text-body-secondary" to="/admin/master/loc">Location Master</NavLink></li>
                  <li className="nav-item mb-2"><NavLink className="nav-link p-0 text-body-secondary" to="/admin/master/type">Type Master</NavLink></li>
                  <li className="nav-item mb-2"><NavLink className="nav-link p-0 text-body-secondary" to="/admin/map/cat">Category Mapping</NavLink></li>
                  <li className="nav-item mb-2"><NavLink className="nav-link p-0 text-body-secondary" to="/admin/map/subcat">Sub Category Mapping</NavLink></li>
                </ul>
              </div>

              <div className="col-6 col-md-2 mb-3 p-3">
                <h5>All Users</h5>
                <ul className="nav flex-column">
                  {
                    (usrdta)&&((usrdta.usr_type === 'Developer')||(usrdta.usr_type === 'Super Admin')||(usrdta.usr_type === 'Administrator'))&&(
                      <li className="nav-item mb-2"><NavLink to='/admin/users' className='nav-link p-0 text-body-secondary'>All Users List</NavLink></li>
                    )
                  }
                  <li className="nav-item mb-2"><NavLink to={`/admin/user/me/${usrdta&&usrdta._id}`} className='dropdown-item'>My Profile</NavLink></li>
                  <li className="nav-item mb-2"><NavLink className='nav-link p-0 text-body-secondary' onClick={hndlgout}>Logout</NavLink></li>
                </ul>
              </div>

              <div className="col-md-5 col-md-2 mb-3 p-3">
                <form>
                  <h5>Subscribe to our newsletter</h5>
                  <p>Monthly digest of what's new and exciting from us.</p>
                  <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                    <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                    <input id="newsletter1" type="text" className="form-control" placeholder="Email address" />
                    <button className="btn btn-primary" type="button">Subscribe</button>
                  </div>
                </form>
              </div>
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
              <p>Shyam Metalics&copy; {new Date().getFullYear()}, Inc. All rights reserved.</p>
              <ul className="list-unstyled d-flex">
                <li className="ms-3"><NavLink className="link-body-emphasis" to="#"><svg className="bi" width="24" height="24">twitter</svg></NavLink></li>
                <li className="ms-3"><NavLink className="link-body-emphasis" to="#"><svg className="bi" width="24" height="24">instagram</svg></NavLink></li>
                <li className="ms-3"><NavLink className="link-body-emphasis" to="#"><svg className="bi" width="24" height="24">facebook</svg></NavLink></li>
              </ul>
            </div>
          </footer>
        </div>
    </>
  )
}

export default Footer