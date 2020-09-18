import HTTP from '.'

export default {
  getProduct(id){
    return HTTP.get(`/product/${id}`);
  },
  fetchProducts(){
    return HTTP.get('/product/products');
  },
  fetchProductsPaginated(id,pageNumber,pageSize){
    return HTTP.get(`/product/products/${id}?pageNumber=${pageNumber}&pageSize=${pageSize}`)
  },
  deleteProductById(id){
    return HTTP.get(`/product/delete/${id}`);
  },
  createProduct(product){
    let data = new FormData();
    data.set("title",product.title);
    data.set("sku",product.sku);
    data.set("price",product.price);
    data.set("purchase_cost",product.purchaseCost);
    data.set("category_id",product.categoryId);
    return HTTP.post('/product/new',data);
  },
  updateProduct(id,product){
    let data = new FormData();
    data.set("title",product.title);
    data.set("sku",product.sku);
    data.set("price",product.price);
    data.set("purchase_cost",product.purchaseCost);
    data.set("category_id",product.categoryId);
    return HTTP.post(`/product/update/${id}`,data);
  }
}