import React, { useEffect, useState } from 'react';
// import './styles.css'
import categoryApi from '../../api/categoryApi';
import Container from '@material-ui/core/Container';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';


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
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.category}</td>
              <td>
                <NavLink to={`/category/${category.id}`}>
                  Redaguoti
                </NavLink>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
      <NavLink className="noDec" to="/category/new">
        <Button variant="contained" color="primary" className="center">
          Prideti Kategorija
        </Button>
      </NavLink>
    </Container>
  )
}
