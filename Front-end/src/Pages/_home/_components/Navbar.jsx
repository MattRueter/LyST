import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import AddBoxTwo from '@mui/icons-material/AddBox';
import {FormControl, Select, InputLabel, Menu,Popper, Paper,MenuItem, Button,Avatar, MenuList } from '@mui/material';
import FilterMenu from './FilterMenu';



function Navbar ({toggleDisplay}) {
    const user = "M"
    const time = "15:34"

    const toggleTheme = (e) => {
        const theme = e.target.value;
        const root = document.documentElement;
     
        root.className = theme;

    };

    return(
        <>
        <nav>
            
            <div className="navSection">
                <div>{time}</div>
                <FilterMenu/>                          
            </div>

            <button onClick={toggleDisplay}><PlaylistAddOutlinedIcon fontSize="large" color="primary"/></button>

            <div className="navSection">
                <Avatar sx={{bgcolor:"lightblue"}} >{user}</Avatar>

                <FormControl sx={{width:"40%" }} size="small">
                    <InputLabel sx={{fontSize:"medium"}} id="demo-simple-select-label" variant="standard">Settings</InputLabel>
                    <Select  onChange={toggleTheme} value="">
                        <InputLabel sx={{color:"lightblue"}}>Theme:</InputLabel>
                        <MenuItem value="dark">Dark</MenuItem>
                        <MenuItem value="light">Light</MenuItem>
                        <InputLabel sx={{color:"lightblue"}}>_______________________</InputLabel>
                        <MenuItem value="logout">Logout</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </nav>
        </>
    )
};

export default Navbar;