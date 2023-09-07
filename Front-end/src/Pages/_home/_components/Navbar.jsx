import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import AddBoxTwo from '@mui/icons-material/AddBox';
import {FormControl, Select, InputLabel, MenuItem, Avatar } from '@mui/material';
function Navbar ({toggleDisplay}) {
    //button to open add todo form
    // settings drop down menu -- logout, theme,
    // menu drop down menu - view options
    // clock
    // current user display
    const user = "M"
    const time = "15:34"

    return(
        <>
        <nav>
            <div className="navSection">
                <div>{time}</div>
                <FormControl className="dropMenu" sx={{width:"40%" }} size="small">
                    <InputLabel sx={{fontSize:"large"}} id="demo-simple-select-label" variant="standard">View</InputLabel>
                    <Select value="">
                        <InputLabel sx={{color:"lightblue"}}>View:</InputLabel>
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="priority">Priority</MenuItem>
                        <MenuItem value="date">Date</MenuItem>
                        <MenuItem value="project">Project</MenuItem>
                        <InputLabel sx={{color:"lightblue"}}>Status:</InputLabel>
                        <MenuItem value="completed">All</MenuItem>
                        <MenuItem value="completed">Uncompleted</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                    </Select>
                </FormControl>         
            </div>

            <button onClick={toggleDisplay}><AddBoxTwo fontSize="large" color="primary"  /></button>

            <div className="navSection">
                <Avatar sx={{bgcolor:"lightblue"}} >{user}</Avatar>

                <FormControl className="dropMenu" sx={{width:"40%" }} size="small">
                    <InputLabel sx={{fontSize:"medium"}} id="demo-simple-select-label" variant="standard">Settings</InputLabel>
                    <Select
                        value=""
                    >
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
/*
<select value="Settings" label="Settings">
    <option value="theme">Theme</option>
    <option value="logout">Logout</option>
</select>
*/            