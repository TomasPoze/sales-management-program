import React, { useEffect, useState } from 'react';
import './styles.css'
import productApi from '../../api/productApi';
import Container from '@material-ui/core/Container';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';


export default () => {

  const [products, setProducts] = useState([]);


  useEffect(() => {
    productApi.fetchProducts()
      .then(response => setProducts(response.data))
  }, [])

  return (
    <Container>

      <table className="tableM">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Sku</th>
            <th>Price</th>
            <th>Purchase Cost</th>
            <th>Category Id</th>
            <th>Category</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.sku}</td>
              <td>{product.price}</td>
              <td>{product.purchaseCost}</td>
              <td>{product.productCategory.id}</td>
              <td>{product.productCategory.category}</td>
              <td>
                <NavLink to={`/product/${product.id}`}>
                  Redaguoti
                </NavLink>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
      <NavLink className="noDec" to="/product/new">
        <Button variant="contained" color="primary" className="center">
          Prideti Produkta
        </Button>
      </NavLink>
    </Container>
  )
}
