import HTTP from '.'

export default {
  fetchInvoices(){
    return HTTP.get('/invoice/invoices')
  },
  fetchInvoiceById(id){
    return HTTP.get(`/invoice/${id}`)
  },
  createInvoice(id){
    return HTTP.post(`/invoice/new/${id}`)
  },
  invoiceIsPaid(id){
    return HTTP.post(`/invoice/paid/${id}`)
  },
  createSalesReport(id){
    return HTTP.post(`/sales/create/${id}`)
  },
  updateSalesProfit(id){
    return HTTP.post(`/sales/paid/${id}`)
  }
}