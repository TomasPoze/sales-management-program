import HTTP from '.'

export default {
  getUser() {
    return HTTP.get('/user')
  },
  updateUser(user){
    let data = new FormData();
    data.set("name",user.name);
    data.set("last_name",user.lastName);
    data.set("email",user.email);
    data.set("password",user.password);
    return HTTP.post('/user/info',data);
  }
}