import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '../../app/store/configureStore';
import BasketSummary from '../basket/BasketSummary';
import BasketTable from '../basket/BasketTable';

function Review() {
  
  const { basket } = useAppSelector(state => state.basket);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      {basket &&
      <BasketTable items={basket.items} isBasket={false} />}
      <Grid container style={{margin: '1rem'}}>
        <Grid item xs={5} />
        <Grid item xs={7}>
          <BasketSummary />
        </Grid>
      </Grid>
    </>
  );
}

export default Review;