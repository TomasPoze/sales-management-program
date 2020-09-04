import React, { useContext } from "react"
import { Redirect, Route, useLocation } from "react-router-dom";
import { UserContext } from "../../App";

export default ({ children, role, ...props }) => {

  const { user, loggedIn } = useContext(UserContext)
  const location = useLocation()

  const authorized = role ? user?.roles.includes(role) : loggedIn()

  return (
    <Route {...props}>
      {
        authorized ?
          children :
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: location
              }
            }}
          />
      }
    </Route>
  )
}