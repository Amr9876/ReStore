import { Container, Paper, Typography, Divider, Button } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom';

function ServerError() {

  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as any;

  return (
    <Container component={Paper}>
        {state ? (
            <>
                <Typography gutterBottom color='error' variant='h3'>{state.title}</Typography>
                <Divider />
                <Typography>{state.detail || 'Internal Server error'}</Typography>
            </>
        ) : <Typography gutterBottom variant='h5'>Server Error</Typography>}              

        <Button onClick={() => navigate('/catalog')}>Go back to the store</Button>
    </Container>
  )
}
 
export default ServerError