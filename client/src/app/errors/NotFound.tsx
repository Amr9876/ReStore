import { Container, Paper, Typography, Divider, Button } from '@mui/material'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <Container component={Paper} sx={{height: 400}}>
        <Typography gutterBottom variant='h4'>Oops - we could not find what your looking for</Typography>
        <Divider />
        <Button fullWidth component={Link} to='/catalog'>Go back to shop</Button>
    </Container>
  )
}

export default NotFound