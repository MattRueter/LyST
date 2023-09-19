import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import {FormControl, Select, InputLabel, MenuItem, Avatar } from '@mui/material';
import FilterMenu from './FilterMenu';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../../../Redux/reducers/themeReducer';
import { logout } from '../../../Redux/reducers/user_reducer';

function Navbar ({toggleDisplay}) {
    const dispatch = useDispatch();
    const state = useSelector((state) =>state.themeReducer.theme)
    const theme = state;
    const user = useSelector((state) => state.userReducer.username[0]);
   
    const toggleTheme = (e) => {
        const selectedValue = e.target.value;
        if(selectedValue === "logout"){
            dispatch(logout());
        }else if(selectedValue !== ""){
            dispatch(changeTheme(selectedValue))
        }
    };

    return(
        <>
        <nav>            
            <div className="navSection">
                <FilterMenu/>
            </div>

            <button className ={"primaryButton"} onClick={toggleDisplay}><PlaylistAddOutlinedIcon fontSize="large" /></button>

            <div className="navSection">                
                <Avatar sx={{bgcolor:"lightblue"}} >{user}</Avatar>
                <FormControl variant="standard"  size="small">
                    <InputLabel  id="demo-simple-select-label" ><SettingsTwoToneIcon sx={theme.labels}/></InputLabel>
                    <Select onChange={toggleTheme} value="">
                        <InputLabel value="" sx={theme.labels}>Theme:</InputLabel>
                        <MenuItem value="dark">Dark</MenuItem>
                        <MenuItem value="light">Light</MenuItem>
                        <MenuItem value="cherry">Cherry</MenuItem>
                        <InputLabel sx={theme.labels}>_______________________</InputLabel>
                        <MenuItem  value="logout">Logout</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </nav>
        </>
    )
}

export default Navbar;