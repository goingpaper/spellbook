import { configureStore } from '@reduxjs/toolkit'
import favouritesReducer from './spells/favouritesSlice'
import textFilterReducer from './spells/textFilterSlice';

export default configureStore({
  reducer: {
    favourites: favouritesReducer,
    textFilter: textFilterReducer
  },
});