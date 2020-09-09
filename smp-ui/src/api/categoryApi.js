import HTTP from '.'

export default {
  getCategoryById(id) {
    return HTTP.get(`/category/${id}`)
  },
  fetchCategories() {
    return HTTP.get('/category/categories')
  },
  deleteProductById(id){
    return HTTP.get(`/category/delete/${id}`)
  },
  createCategory(productCategory){
    let data = new FormData();
    data.set("category",productCategory.category);
    return HTTP.post('/category/new',data)
  },
  updateCategory(id,productCategory){
    let data = new FormData();
    data.set("category",productCategory.category);
    return HTTP.post(`/category/update/${id}`,data)
  }
}