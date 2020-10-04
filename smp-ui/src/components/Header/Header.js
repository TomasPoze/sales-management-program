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
        <NavLink to="/categories">
          <span>Kategorijos</span>
        </NavLink>

        <Secured role="ADMIN">
          <NavLink to="/products">
            <span>Visos prekės</span>
          </NavLink>
          <NavLink to="/sale/reports">
            <span>Pardavimų ataskaitos</span>
          </NavLink>
          <NavLink to="/invoices">
            <span>Užsakymų Sąskaitos</span>
          </NavLink>
          <NavLink to="/orders">
            <span>Klientų Užsakymai</span>
          </NavLink>
          <NavLink to="/users">
            <span>Naudotojų sąrašas</span>
          </NavLink>
        </Secured>

        <Secured role="CLIENT">
          <NavLink to="/client/orders">
            <span>Užsakymai</span>
          </NavLink>
        </Secured>

        <Secured role="ACCOUNTANT">
          <NavLink to="/sale/reports">
            <span>Pardavimų ataskaitos</span>
          </NavLink>
        </Secured>

        <Secured role="EMPLOYEE">
        <NavLink to="/products">
            <span>Visos prekės</span>
          </NavLink>
        <NavLink to="/orders">
            <span>Klientų Užsakymai</span>
          </NavLink>
          <NavLink to="/users">
            <span>Naudotojų sąrašas</span>
          </NavLink>
        </Secured>
        <NavLink to="/user/info">
          <span>{user.name} {user.lastName}</span>
        </NavLink>
                &nbsp;
        <button onClick={logoutClick}>Atsijungti</button>
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