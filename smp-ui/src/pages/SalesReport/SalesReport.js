import React, { useEffect, useState } from 'react';
import salesReportApi from '../../api/salesReportApi';
import Container from '@material-ui/core/Container';
import csvApi from '../../api/csvApi'

export default () => {

  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredReports, setFilteredReports] = useState([]);

  useEffect(() => {
    salesReportApi.fetchSaleReports()
      .then(resp => setReports(resp.data))
  }, [])

  useEffect(() => {
    setFilteredReports(
      reports.filter((report) =>
        report.salesDate.includes(search))
    )
  }, [search, reports])

  const createCsv = () => {
    csvApi.createCsv()
      .then((resp) => {
        const url = window.URL.createObjectURL(new Blob([resp.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `sales.csv`)
        document.body.appendChild(link);
        link.click();
      })
  }

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
          <button onClick={() => createCsv()}>Download</button>
      </div>
    </Container>
  )
}
