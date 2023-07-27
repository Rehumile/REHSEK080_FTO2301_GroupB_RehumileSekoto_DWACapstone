import * as React from 'react';
import { useState, useEffect } from 'react';
import {useNavigate, Link} from 'react-router-dom'
import {Tabs, Tab} from '@mui/material'
import {AppBar, Box, Toolbar, Typography} from '@mui/material'
import '../NavbarComponent/Navbar.css'
import { useTheme, useMediaQuery } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import NavDrawer from './NavDrawer';

export default function Navbar({handleFavNavigation, handleLoginNavigation}) {

// state for keeping the value of the tab
const [tabValue, setTabValue] = useState(0)


  //setting state for opening and closing drawer
  const [openDrawer, setOpenDrawer] = React.useState(true)
  const theme = useTheme()

    //breakpoints.down --> this mean from smaller screen downwards
    const isMatch = useMediaQuery(theme.breakpoints.down("sm"))


//  handle change 
 const handleChange = (event, newValue) => {
   setTabValue(newValue)
 
  
 }

 
//section for routing
 const navigate = useNavigate();
 useEffect(()=> {
    if(tabValue ===0 ) navigate('/')
    if(tabValue===1) {
      navigate('/favourites')
    handleFavNavigation()
    }
    if(tabValue === 2) navigate('/signup')
    handleLoginNavigation()
 },[tabValue])

  return (
    <Box sx={{ flexGrow: 1 }}>
      
      <AppBar className='navbar' position="fixed" sx={{height: '6rem', width: '100%'}}>
    
            {/*icon for podcast */}
<div className='nav--container'>
<div className='title--image'>
             <Link to="/">
                <img src='./public/images/sound.png' className='podcast--logo'/>
                </Link>  
           <p>Podcast Hub</p> 
          </div>
        {!isMatch && <Tabs 
          className='tabs'
          textColor="secondary"
          value={tabValue} 
          onChange={handleChange} 
          sx={{
            "& button": { borderRadius: 2 },
            "& button:hover": { backgroundColor: "#008033" },
            "& button:focus": { backgroundColor: "white" },
            ml: '15rem'
  
          }}
          >
              <Tab icon={<HomeIcon />} iconPosition="top" sx={{color: 'white'}} label="Home"/>
            <Tab icon={<FavoriteIcon />}  iconPosition="top" sx={{color: 'white',}} label="Favourites"/>
              <Tab icon={<PersonIcon />}iconPosition="top" sx={{color: 'white'}}  label="Login"/>
            </Tabs>}
            <MenuIcon onClick={setOpenDrawer} sx={{m:'auto', cursor: "pointer", pr:'1rem', mr: '3.5rem'}} />
          
       </div>
      </AppBar>
      {isMatch && <NavDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}/>}
     
    </Box>
  );
}
// 