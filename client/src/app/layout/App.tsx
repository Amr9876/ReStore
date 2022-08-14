import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";

function App() {
  const [lightMode, setLightMode] = useState(false);
  const paletteType = lightMode ? "light" : "dark";

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212"
      }
    }
  });

  function handleThemeChange() {
    setLightMode(!lightMode);
  }
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header lightMode={lightMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Catalog />
      </Container>
    </ThemeProvider>
  )
}

export default App
