import HTTP from '.'

export default {
  createPdf(id){
    
    return HTTP.get(`/pdf/${id}`,({
      responseType: 'arraybuffer'
    }))
  }
}