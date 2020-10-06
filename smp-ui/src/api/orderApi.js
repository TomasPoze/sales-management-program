import HTTP from '.'

export default {
  fetchOrders() {
    return HTTP.get('/order/orders');
  },
  fetchOrderById(id) {
    return HTTP.get(`/order/${id}`)
  },
  fetchOrderProductsById(id) {
    return HTTP.get(`/order/products/${id}`)
  },
  fetchOrderProduct(id) {
    return HTTP.get(`/order/product/${id}`)
  },
  fetchClientOrders(id) {
    return HTTP.get(`/order/orders/${id}`)
  },
  updateOrder(id, order) {
    let data = new FormData();
    data.set("orderStatus", order.orderStatus)
    data.set("clientId", order.clientId)
    return HTTP.post(`/order/update/${id}`, data)
  },
  updateOrderProduct(id, orderProduct) {
    let data = new FormData();
    data.set("quantity", orderProduct.quantity);
    data.set("productId", orderProduct.productId);
    return HTTP.post(`/order/update/product/${id}`, data)
  },
  createOrder(orderRequest) {
    return HTTP.post('/order', orderRequest)
  },
  addOrderProuct(id, orderProduct) {
    let data = new FormData();
    data.set("productId", orderProduct.productId);
    data.set("quantity",orderProduct.quantity);
    return HTTP.post(`/order/add/${id}`, data)
  },
  deleteOrderById(id) {
    return HTTP.get(`/order/delete/${id}`)
  },
  deleteOrderProductById(id) {
    return HTTP.get(`/order/delete/item/${id}`)
  },
  updateAssignedWorker(id,order){
    let data = new FormData();
    data.set("userId",order.userId);
    return HTTP.post(`/order/update/user/${id}`,data)
  }
}