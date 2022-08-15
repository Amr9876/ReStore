import { ButtonGroup, Container, Typography, Button, Alert, AlertTitle, List, ListItem, ListItemText } from "@mui/material"
import { useState } from "react"
import agent from "../../app/api/agent"

function AboutPage() {
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  function getValidationError() {
        agent.TestErrors.getValidationError()
                .then(() => console.log('should not see this'))
                .catch(error => setValidationErrors(error));
  }

  return (
    <Container>
      <Typography gutterBottom variant='h2'>Errors for testing purposes</Typography>
      <ButtonGroup fullWidth>
        <Button variant='contained' 
                onClick={() => agent.TestErrors.get400Error()}>Test 400 Error</Button>
        <Button variant='contained' 
                onClick={() => agent.TestErrors.get401Error()}>Test 401 Error</Button>
        <Button variant='contained' 
                onClick={() => agent.TestErrors.get404Error()}>Test 404 Error</Button>
        <Button variant='contained' 
                onClick={() => agent.TestErrors.get500Error()}>Test 500 Error</Button>
        <Button variant='contained' 
                onClick={getValidationError}>Test Validation Error</Button>
      </ButtonGroup>

      {validationErrors.length > 0 &&
        <Alert severity="error">
            <AlertTitle>Validation Errors</AlertTitle>
            <List>
                {validationErrors.map((error, index) => (
                    <ListItem key={index}>
                       <ListItemText>{error}</ListItemText>
                    </ListItem>
                ))}
            </List>
        </Alert>
      }

    </Container>
  )
}

export default AboutPage