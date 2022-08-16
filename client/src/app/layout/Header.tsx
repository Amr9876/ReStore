import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material"
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";
import { useAppSelector } from "../store/configureStore";

interface Props {
    lightMode: boolean
    handleThemeChange: () => void;
}

const midLinks = [
  {title: 'catalog', path: '/catalog'},
]

const rightLinks = [
  {title: 'login', path: '/login'},
  {title: 'register', path: '/register'},
]

const navStyles = {
  color: 'inherit', 
  typography: 'h6',
  '&:hover': {
    color: 'grey.500'
  },
  '&.active': {
    color: 'text.secondary'
  }
}

const toolBarStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

function Header({ lightMode, handleThemeChange }: Props) {

  const { basket } = useAppSelector(state => state.basket);
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar position='static' sx={{mb: 4}}>
        <Toolbar sx={toolBarStyles}>

          <Box display='flex' alignItems='center'>
            <Typography variant='h6' 
                        component={NavLink} 
                        to='/'
                        sx={{...navStyles, textDecoration: 'none'}}>
                RE-STORE
            </Typography>
            <Switch checked={lightMode} 
                    onClick={handleThemeChange}
                    color='default' />            
          </Box>
 
          <List sx={{display: 'flex'}}>
            {midLinks.map(({ title, path }) => (
              <ListItem component={NavLink}
                        to={path}
                        key={path}
                        sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>

          <Box display='flex' alignItems='center'>
            <IconButton component={Link} to='/basket' size='large' sx={{color: 'inherit'}}>
              <Badge badgeContent={itemCount} color='secondary'>
                <ShoppingCart />
              </Badge>
            </IconButton>
            <List sx={{display: 'flex'}}>
              {rightLinks.map(({ title, path }) => (
                <ListItem component={NavLink}
                          to={path}
                          key={path}
                          sx={navStyles}>
                  {title.toUpperCase()}
                </ListItem>
              ))}
            </List>
          </Box>
 
        </Toolbar>
    </AppBar>
  )
}

export default Header