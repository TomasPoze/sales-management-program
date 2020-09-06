import { useContext } from "react"
import { UserContext } from "../../App";

export default ({ children, role }) => {
    const { user, loggedIn } = useContext(UserContext)
    const authorized = role ? user?.roles.includes(role) : loggedIn()

    return authorized ? children : ""
}
