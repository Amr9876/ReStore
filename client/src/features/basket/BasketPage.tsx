import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";
import { addBasketItemAsync, removeBasketItemAsync, setBasket } from "./basketSlice";
import BasketSummary from "./BasketSummary";

function BasketPage() {

  const { basket, status } = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();

  if(!basket) return <Typography variant="h3">Your basket is empty</Typography>

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope="row">
                  <Box display='flex' alignItems='center'>
                    <img src={item.pictureUrl} alt={item.name} style={{height: 50, marginRight: 20}} />
                    <Typography color='inherit' sx={{textDecoration: 'none'}} component={Link} to={`/catalog/${item.productId}`}>{item.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">{currencyFormat(item.price)}</TableCell>
                <TableCell align="center">
                  <LoadingButton loading={status === 'pendingRemoveItem' + item.productId + 'rem'} 
                                onClick={() => dispatch(removeBasketItemAsync({ 
                                  productId: item.productId, quantity: 1, name: 'rem' 
                                }))}
                                color='error'>
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton loading={status === 'pendingAddItem' + item.productId} 
                                onClick={() => dispatch(addBasketItemAsync({ productId: item.productId }))} 
                                color='success'>
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">{((item.price / 100) * item.quantity).toFixed(2)}</TableCell>
                <TableCell align="right">
                  <LoadingButton loading={status === 'pendingRemoveItem' + item.productId + 'del'} 
                                 onClick={() => dispatch(removeBasketItemAsync({ 
                                   productId: item.productId, quantity: item.quantity, name: 'del'
                                 }))}
                                color='error'>
                      <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container style={{margin: '1rem'}}>
        <Grid item xs={5} />
        <Grid item xs={7}>
          <BasketSummary />
          <Button component={Link} 
                  to='/checkout'
                  variant='contained'
                  size='large'
                  fullWidth>
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default BasketPage