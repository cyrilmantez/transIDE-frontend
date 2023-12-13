import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: { token: null, username: null, officesTokens:[]},
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        login: (state, action) => {
            state.value.token = action.payload.token;
            state.value.username = action.payload.username;
            state.value.officesTokens = action.payload.officesTokens
          },
        logout: (state) => {
            state.value.token = null;
            state.value.username = null;
            state.value.officesTokens = []
          },
    },
});

export const {login, logout} = usersSlice.actions;
export default usersSlice.reducer;