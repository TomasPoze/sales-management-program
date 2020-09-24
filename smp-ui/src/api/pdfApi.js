import HTTP from '.'

export default {
  createPdf(id) {
    return HTTP.get(`/pdf/${id}`, ({
      responseType: 'arraybuffer'
    }))
  },
  sendPdf(id){
    return HTTP.get(`/email/${id}`)
  }
}