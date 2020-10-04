import HTTP from '.'

export default {
  fetchSaleReports(){
    return HTTP.get('/sales/report')
  },
}