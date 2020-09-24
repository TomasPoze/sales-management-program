import React, { useEffect, useState } from 'react';
import './styles.css'
import userApi from '../../api/userApi';
import Container from '@material-ui/core/Container';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';


export default () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        userApi.fetchUsers()
            .then(response => setUsers(response.data))
    }, [])

    return (
        <Container>

            <table className="tableM">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Role</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.name}</td>
                            <td>{user.lastName}</td>
                            <td>{user.roles[0].role}</td>
                            <td>
                                <NavLink to={`/user/${user.id}`}>
                                    Redaguoti
                                </NavLink>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            <NavLink className="noDec" to="/user/new">
                <Button variant="contained" color="primary" className="center">
                    Kurti Nauja
                </Button>
            </NavLink>
        </Container>
    )
}
