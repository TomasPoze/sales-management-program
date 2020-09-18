import React, { useEffect, useState } from 'react';
// import './styles.css'
import { useParams } from 'react-router-dom';
import productApi from '../../api/productApi';
import {
  TableBody,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TablePagination,
  CircularProgress, Container
} from '@material-ui/core'

export default () => {

  const { id } = useParams({});
  const [productsPage, setProductsPage] = useState({ conten: [], });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    productApi.fetchProductsPaginated(id, page, rowsPerPage)
      .then(response => setProductsPage(response.data))
      .finally(() => setIsLoading(false));
  }, [id, page, rowsPerPage])

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
  }

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  }

  return (
    <>
      <Container>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ?
                <TableRow>
                  <TableCell colSpan="3">
                    <CircularProgress class="loader" />
                  </TableCell>
                </TableRow> :
                productsPage.content.map(product => (
                  <TableRow key={product.title}>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>{product.price}€</TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TablePagination
              rowsPerPageOptions={[20, 30, 50]}
              rowsPerPage={rowsPerPage}
              count={productsPage.totalElements}
              page={page}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              onChangePage={handleChangePage}
            />
          </Table>
        </TableContainer>
      </Container>
    </>
  )
}
