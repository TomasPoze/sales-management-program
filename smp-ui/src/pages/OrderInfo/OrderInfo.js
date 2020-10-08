import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import orderApi from '../../api/orderApi';

import './style.css'
import { Field, Form, Formik } from 'formik';
import { Button } from '@material-ui/core';

import commentApi from '../../api/commentApi';


export default () => {

  const { id } = useParams({});



  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    commentApi.fetchCommentsByOrderId(id)
      .then(resp => setComments(resp.data))
  }, [id])

  useEffect(() => {
    orderApi.fetchOrderById(id)
      .then(resp => setOrders(resp.data))
  }, [id])

  useEffect(() => {
    orderApi.fetchOrderProductsById(id)
      .then(resp => setProducts(resp.data))
  }, [id])

  const initialValues = {
    content: ''
  }

  const onSubmit = values => {
    commentApi.createComment(id, values)
    .then(() => {
      commentApi.fetchCommentsByOrderId(id)
      .then(resp => setComments(resp.data));
    })
  }

  return (
    <Container>
      <div>
        <h4>Užsakymo Nr: {orders.orderNumber}</h4>
        <hr />
        <h4>Užsakyti produktai:</h4>
        <table>
          <thead>
            <tr>
              <th>Product code</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price per unit</th>
              <th>Sum</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.product.sku}</td>
                <td>{product.product.title}</td>
                <td>{product.quantity}</td>
                <td>{product.productCostPerUnit}</td>
                <td>{product.productCost}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <span>Visa suma: {orders.totalSum}€</span>
      </div>
      <hr />
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          <Form>
            <div>
              <Field
                name="content"
                type="text"
                rows="6"
                cols="69"
                component="textarea"
                placeholder="Parašykite komentarą..."
                required
              />
            </div>
            <Button type="submit" variant="contained" color="primary" >
              Paskelbti komentarą
          </Button>
          </Form>
        </Formik>
      </div>
      <hr />
      <h2>Komentarai</h2>
      <div>
        {comments.map(comment => (
          <div className="commentBox" key={comment.id}>
            <span>{comment.commentDate}</span>
            <h4>{comment.user.name + " " + comment.user.lastName + ":"}</h4>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </Container>
  )
}