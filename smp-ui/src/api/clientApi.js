import HTTP from '.'

export default {
  getClient(){
    return HTTP.get('/client')
  },
  updateClient(client){
    let data = new FormData();
    data.set("email",client.email);
    data.set("title",client.title);
    data.set("address",client.address);
    data.set("code",client.code);
    data.set("bank_acc_nr",client.bankAccountNumber);
    return HTTP.post('/client/info',data);
  }

}