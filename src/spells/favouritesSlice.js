import { createSlice } from '@reduxjs/toolkit'

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    map: {}
  },
  reducers: {
    addFavourite: (state, action) => {
      state.map[action.payload.index] = action.payload;
    },
    removeFavourite: (state, action) => {
      delete state.map[action.payload];
    }
  },
});

export const { addFavourite, removeFavourite } = favouritesSlice.actions;

export default favouritesSlice.reducer;