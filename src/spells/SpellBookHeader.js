import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { updateText } from './textFilterSlice';

const FixedPaddingButton = styled(Button)(({ theme }) => ({
    padding: "6px 16px"
}));

function SpellBookHeader() {
    const location = useLocation();
    const filterText = useSelector((state) => state.textFilter.text);
    const dispatch = useDispatch();

    return <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h5" component="div" sx={{ mr: 2 }}>
                    {"Alex's Spell Book"}
                </Typography>
                <FixedPaddingButton variant={location.pathname == "/" ? "contained" : "text"} color="primary" component={RouterLink} to="/">
                    {"Spells"}
                </FixedPaddingButton>
                <FixedPaddingButton variant={location.pathname == "/favourites" ? "contained" : "text"} color="primary" component={RouterLink} to="/favourites">
                    {"Favourites"}
                </FixedPaddingButton>
                {!location.pathname.includes("/spells") &&
                    <TextField
                        id="filled-basic"
                        label="Search"
                        variant="filled"
                        value={filterText}
                        onChange={(event) => dispatch(updateText(event.target.value))}
                        sx={{ marginLeft: "auto" }} />
                }
            </Toolbar>
        </AppBar>
    </Box>
}


export default SpellBookHeader;