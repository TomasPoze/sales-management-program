import React, { useEffect, useState } from 'react';
// import './styles.css'
import orderApi from '../../api/orderApi';
import salesReportApi from '../../api/salesReportApi';
import Container from '@material-ui/core/Container';


export default () => {

  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredReports, setFilteredReports] = useState([]);

  useEffect(()=>{
    salesReportApi.fetchSaleReports()
      .then(resp => setReports(resp.data))
  },[])

  useEffect(() => {
    setFilteredReports(
      reports.filter((report) =>
        report.salesDate.includes(search))
    )
  }, [search, reports])

  return (
    <Container>
      <select
        name="orderStatus"
        as="select"
        variant="outlined"
        label="orderStatus"
        placeholder="orderStatus"
        onChange={(e) => setSearch(e.target.value)}
      >
        <option value="" disabled selected>Filtravimas pagal menesi</option>
        <option value="01" >01</option>
        <option value="02">02</option>
        <option value="03">03</option>
        <option value="04">04</option>
        <option value="05">05</option>
        <option value="06">06</option>
        <option value="07">07</option>
        <option value="08">08</option>
        <option value="09">09</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
      </select>
      <hr />
      <div>
        <table className="tableM">
          <thead>
            <tr>
              <th>Id</th>
              <th>Report Date</th>
              <th>Sales Quantity</th>
              <th>Total Sales Sum</th>
              <th>Paid Invoices Sum</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>

            {filteredReports.map(report => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.salesDate}</td>
                <td>{report.salesQuantity}</td>
                <td>{report.totalSalesSum}</td>
                <td>{report.paidIvoicesSum}</td>
                <td>{report.profit}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </Container>
  )
}
