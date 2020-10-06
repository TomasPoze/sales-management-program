import HTTP from '.'

export default {
  createCsv(){
    return HTTP.get('/csv/download')
  }
}