import { Box, Button, Grid, Typography } from "@mui/material"
import { Link } from "react-router-dom"

function NotLoggedInPage() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4} />
      <Grid item xs={4}>
        <Box sx={{ m: 1 }} display='flex' justifyContent='center' flexDirection='column'>
          <Typography component="h1" variant="h4" color='red'>YOUR NOT LOGGED IN!</Typography>
          <center>
            <Link style={{ textDecoration: 'none', color: 'white' }} to='/login'>
              <Button variant='contained' color='error'>
                Login
              </Button>
            </Link>
          </center>
        </Box>
      </Grid>
      <Grid item xs={4} />
    </Grid>
  )
}

export default NotLoggedInPage