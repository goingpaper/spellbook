import { createSlice } from '@reduxjs/toolkit'

export const textFilterSlice = createSlice({
    name: 'textFilter',
    initialState: {
        text: ""
    },
    reducers: {
        updateText: (state, action) => {
            state.text = action.payload;
        }
    },
});

export const { updateText } = textFilterSlice.actions;

export default textFilterSlice.reducer;