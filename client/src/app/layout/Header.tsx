import { AppBar, Switch, Toolbar, Typography } from "@mui/material"

interface Props {
    lightMode: boolean
    handleThemeChange: () => void;
}

function Header({ lightMode, handleThemeChange }: Props) {
  return (
    <AppBar position='static' sx={{mb: 4}}>
        <Toolbar>
            <Typography variant='h6'>
                RE-STORE
            </Typography>
            <Switch checked={lightMode} 
                    onClick={handleThemeChange}
                    color='default' />
        </Toolbar>
    </AppBar>
  )
}

export default Header