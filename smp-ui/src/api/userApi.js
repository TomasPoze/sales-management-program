import HTTP from '.'

export default {
  getUser() {
    return HTTP.get('/user')
  },
  fetchUsers() {
    return HTTP.get('/user/users')
  },
  getUserById(id){
    return HTTP.get(`/user/${id}`)
  },
  deleteUserById(id){
    return HTTP.get(`/user/${id}/delete`)
  },
  updateUser(user) {
    let data = new FormData();
    data.set("name", user.name);
    data.set("last_name", user.lastName);
    data.set("email", user.email);
    data.set("password", user.password);
    return HTTP.post('/user/info', data);
  },
  createUser(user) {
    let data = new FormData();
    data.set("username", user.name);
    data.set("password", user.password);
    data.set("email", user.email);
    data.set("name", user.name);
    data.set("last_name", user.lastName);
    data.set("role", user.role);
    return HTTP.post('/user/create', data)
  },
  updateOtherUser(id,user){
    let data = new FormData();
    data.set("username", user.name);
    data.set("password", user.password);
    data.set("email", user.email);
    data.set("name", user.name);
    data.set("last_name", user.lastName);
    data.set("role", user.role);
    return HTTP.post(`/user/update/${id}`,data)
  },
}