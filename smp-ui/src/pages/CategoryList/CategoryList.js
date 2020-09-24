import React, { useEffect, useState } from 'react';
// import './styles.css'
import categoryApi from '../../api/categoryApi';
import Container from '@material-ui/core/Container';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Secured from '../../components/Secured/Secured'


export default () => {

  const [categories, setCategories] = useState([]);


  useEffect(() => {
    categoryApi.fetchCategories()
      .then(response => setCategories(response.data))
  }, [])

  return (
    <Container>

      <table className="tableM">
        <thead>
          <tr>
            <th>Id</th>
            <th>Category</th>
            <Secured role="ADMIN">
              <th>Option</th>
            </Secured>
            <Secured role="EMPLOYEE">
              <th>Option</th>
            </Secured>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td><NavLink to={`/products/${category.id}`}>{category.category} </NavLink></td>
              <Secured role="ADMIN">
                <td>
                  <NavLink to={`/category/${category.id}`}>
                    Redaguoti
                  </NavLink>
                </td>
              </Secured>
              <Secured role="EMPLOYEE">
                <td>
                  <NavLink to={`/category/${category.id}`}>
                    Redaguoti
                  </NavLink>
                </td>
              </Secured>
            </tr>
          ))}
        </tbody>
      </table>
      <Secured role="ADMIN">
        <NavLink className="noDec" to="/category/new">
          <Button variant="contained" color="primary" className="center">
            Prideti Kategorija
        </Button>
        </NavLink>
      </Secured>
      <Secured role="EMPLOYEE">
        <NavLink className="noDec" to="/category/new">
          <Button variant="contained" color="primary" className="center">
            Prideti Kategorija
        </Button>
        </NavLink>
      </Secured>
    </Container>
  )
}
