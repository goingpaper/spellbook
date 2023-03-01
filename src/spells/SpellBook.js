import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import SpellBookHeader from './SpellBookHeader';
import SpellDetails from './SpellDetails';
import SpellList from './SpellList';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function SpellBook() {
    return (
        <ThemeProvider theme={darkTheme}>
            <div className="spellbook">
                <Container maxWidth="md">
                    <Paper variant="outlined">
                        <SpellBookHeader />
                        <Routes>
                            <Route path="/" element={<SpellList />} />
                            <Route path="/favourites" element={<SpellList showFavourites={true} />} />
                            <Route path="/spells/:spellIndex" element={<SpellDetails />} />
                        </Routes>
                    </Paper>
                </Container>
            </div>
        </ThemeProvider>
    )
}


export default SpellBook;