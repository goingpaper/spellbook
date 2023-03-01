import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFavourite, removeFavourite } from './favouritesSlice';
import { Divider, Grid, IconButton, TablePagination, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import FavouriteButton from './FavouriteButton';
import { getSpells } from '../api/spells';

function SpellsList({ showFavourites }) {
    const dispatch = useDispatch();
    const [spells, setSpells] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const favouritesList = useSelector((state) => state.favourites.map);
    const filterText = useSelector((state) => state.textFilter.text);

    useEffect(() => {
        if (showFavourites) {
            setSpells(Object.values(favouritesList));
            setPage(0);
        } else {
            getSpells().then(data => { setSpells(data.results) });
        }
    }, [showFavourites, favouritesList]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredSpells = spells.length > 0 && filterText !== "" ? spells.filter((spell) => spell.name.toLowerCase().includes(filterText.toLowerCase())) : spells;
    if (page * rowsPerPage > filteredSpells.length) {
        setPage(0);
    }
    return (
        <Grid container direction="column" justifyContent="center">
            <Grid
                spacing={2}
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                wrap="nowrap"
                sx={{ marginTop: 0, overflowY: "auto", height: "53vh", maxHeight: "53vh", paddingLeft: "2rem", paddingRight: "2rem" }}>
                {
                    filteredSpells.length == 0 ?
                        <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                            sx={{ height: "53vh" }}>
                            {"No Spells"}
                        </Grid> :
                        filteredSpells.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(spell =>
                            <Grid
                                container
                                item
                                justifyContent="center"
                                sx={{ maxHeight: "4rem" }}
                                key={spell.index}
                                data-testid="spell-row">
                                <Grid
                                    container
                                    item
                                    alignItems="center"
                                    xs={6}>
                                    <Typography
                                        gutterBottom
                                        variant="body"
                                        component="div"
                                        sx={{ whiteSpace: "nowrap", overflowX: "hidden", textOverflow: "ellipsis" }}>
                                        {spell.name}
                                    </Typography>
                                </Grid>
                                <Grid container item xs={6} justifyContent="flex-end">
                                    <IconButton size="small" color="primary" component={RouterLink} to={`/spells/${spell.index}`}>
                                        <InfoIcon />
                                    </IconButton >
                                    <FavouriteButton
                                        favouriteOrUnfavourite={favouritesList[spell.index] != null}
                                        favouriteCallback={() => dispatch(addFavourite(spell))}
                                        unfavouriteCallback={() => dispatch(removeFavourite(spell.index))}
                                    />
                                </Grid>
                            </Grid>
                        )
                }
            </Grid >
            <Divider />
            <TablePagination
                component="div"
                count={filteredSpells.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Grid>

    );
}

export default SpellsList;