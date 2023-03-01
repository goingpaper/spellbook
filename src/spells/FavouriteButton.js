import * as React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { IconButton } from '@mui/material';

function FavouriteButton({ favouriteOrUnfavourite, favouriteCallback, unfavouriteCallback }) {
    return (
        favouriteOrUnfavourite ?
            <IconButton size="small" color="error" onClick={unfavouriteCallback}>
                <HeartBrokenIcon />
            </IconButton > :
            <IconButton size="small" color="success" onClick={favouriteCallback}>
                <FavoriteIcon />
            </IconButton >
    )
}
export default FavouriteButton;