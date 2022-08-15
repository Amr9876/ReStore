import { Backdrop, Box, CircularProgress } from "@mui/material"

function LoadingComponent() {
  
  const styles = {
    justifyContent: "center",
    position: "fixed",
    top: '60%'
  }

  return (
    <Backdrop open={true} invisible={true}>
        <Box display='flex' 
             justifyContent='center' 
             alignItems='center'
             height='100vh'>
            
            <CircularProgress size={100} color='inherit' />

        </Box>
    </Backdrop>
  )
}

export default LoadingComponent