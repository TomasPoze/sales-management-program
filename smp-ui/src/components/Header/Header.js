import React, { useContext } from 'react';
import './Header.css'
import { NavLink } from "react-router-dom";
import { setCredentials } from '../../api'
import { UserContext } from '../../App';
import Secured from '../Secured/Secured';

export default () => {

  const { user, logout, loggedIn } = useContext(UserContext)

  const logoutClick = (e) => {
    e.preventDefault()
    setCredentials(null)
    logout()
  }

  const loggedInBlock = loggedIn() ?
    (
      <>
        <Secured role="ADMIN">
          <NavLink to="/invoices">
            <span>Uzsakumu Saskaitos</span>
          </NavLink>
          <NavLink to="/orders">
            <span>Klientu Uzsakymai</span>
          </NavLink>
          <NavLink to="/users">
            <span>Naudotojų sąrašas</span>
          </NavLink>
        </Secured>

        <Secured role="CLIENT">
          <NavLink to="/client/orders">
            <span>Uzsakymai</span>
          </NavLink>
        </Secured>

        <Secured role="EMPLOYEE">
        <NavLink to="/orders">
            <span>Klientu Uzsakymai</span>
          </NavLink>
          <NavLink to="/users">
            <span>Naudotojų sąrašas</span>
          </NavLink>
        </Secured>
        <NavLink to="/user/info">
          <span>{user.name} {user.lastName}</span>
        </NavLink>
                &nbsp;
        <a href="#" onClick={logoutClick}>Atsijungti</a>
      </>
    ) : <></>

  return (
    <div className="header-container">

      <div className="site-name">SMP</div>

      <div className="header-bar">
        {loggedInBlock}
      </div>
    </div>
  )
}