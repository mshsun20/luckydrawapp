import React from 'react'
import { NavLink } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Navbar = () => {
  return (
    <>
        <div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/home">Dashboard</NavLink>
            </li>
            <li className="nav-item">
              <Nav className='flex-nowrap'>
                <NavDropdown title="Setup & Play" className="nav-item dropdown" id="collapsible-nav-dropdown">
                  <NavLink className="dropdown-item" to="/admin/accounts">Accounts</NavLink>
                  <NavLink className="dropdown-item" to="/admin/contests">Contests</NavLink>
                  <NavLink className="dropdown-item" to="/admin/tickets">Tickets</NavLink>
                  <NavLink className="dropdown-item" to="/admin/ranks">Ranks</NavLink>
                  <NavLink className="dropdown-item" to="/admin/gifts">Gift Items</NavLink>
                  <NavLink className="dropdown-item" to="/admin/prizes">Prizes</NavLink>
                  <NavLink className="dropdown-item" to="/admin/winners">Winners</NavLink>
                </NavDropdown>
              </Nav>
            </li>
            <li className="nav-item">
              <Nav className='flex-nowrap'>
                <NavDropdown title="Masters & Mappings" className="nav-item dropdown" id="collapsible-nav-dropdown">
                  <NavLink className="dropdown-item" to="/admin/master/status">Status Master</NavLink>
                  <NavLink className="dropdown-item" to="/admin/master/org">Organisation Master</NavLink>
                  <NavLink className="dropdown-item" to="/admin/master/loc">Location Master</NavLink>
                  <NavLink className="dropdown-item" to="/admin/master/type">Type Master</NavLink>
                  <NavLink className="dropdown-item" to="/admin/map/cat">Category Mapping</NavLink>
                  <NavLink className="dropdown-item" to="/admin/map/subcat">Sub Category Mapping</NavLink>
                </NavDropdown>
              </Nav>
            </li>
          </ul>
        </div>
    </>
  )
}

export default Navbar