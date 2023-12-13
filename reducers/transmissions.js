import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: []
  
};

export const transmissionsSlice = createSlice({
    name: 'transmissions',
    initialState,
    reducers: {
        addTransmission : (state, action) => {
            state.value.push(action.payload)
        },
    },
});

export const {addTransmission} = transmissionsSlice.actions;
export default transmissionsSlice.reducer;