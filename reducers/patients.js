import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: []
  
};

export const patientsSlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {
        addPatient : (state, action) => {
            state.value.push(action.payload)
        },
        updatePatient : (state, action) => {
            state.value = state.value.filter(e => e._id !== action.payload)
            state.value.push(action.payload)
        },
        deletePatient : (state, action) => {
            state.value = state.value.filter(e => e._id !== action.payload)
        },
    },
});

export const {addPatient, updatePatient, deletePatient} = patientsSlice.actions;
export default patientsSlice.reducer;