import React, { useContext } from 'react';
import './Header.css'
import { NavLink } from "react-router-dom";
import { setCredentials } from '../../api'
import { UserContext } from '../../App';

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