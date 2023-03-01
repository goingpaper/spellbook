import { Card, CardActions, CardContent, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addFavourite, removeFavourite } from './favouritesSlice';
import FavouriteButton from './FavouriteButton';
import { getSpell } from '../api/spells';

function SpellDetails() {
    const [spell, setSpell] = useState({});
    const { spellIndex } = useParams();
    const favouritesList = useSelector((state) => state.favourites.map);
    const dispatch = useDispatch();

    useEffect(() => {
        getSpell(spellIndex).then(data => setSpell(data));
    }, [spellIndex])

    return (
        <div>
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {spell.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {spell.desc}
                    </Typography>
                </CardContent>
                <CardActions>
                    <FavouriteButton
                        favouriteOrUnfavourite={favouritesList[spell.index] != null}
                        favouriteCallback={() => dispatch(addFavourite(spell))}
                        unfavouriteCallback={() => dispatch(removeFavourite(spell.index))}
                    />
                </CardActions>
            </Card>
        </div>
    )
}

export default SpellDetails;