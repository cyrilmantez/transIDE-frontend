import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: { token: null, username: null, officesTokens:[], colorMode: false},
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        login: (state, action) => {
            state.value.token = action.payload.token;
            state.value.username = action.payload.username;
            state.value.officesTokens = action.payload.officesTokens;
            state.value.colorMode = action.payload.colorMode;
          },
        logout: (state) => {
            state.value.token = null;
            state.value.username = null;
            state.value.officesTokens = [];
            state.value.colorMode = false;
          },
        addPhoto: (state, action) => {
            state.value.photos.push(action.payload);
        },
        upDateOfficeByDefault : (state, action) => {
            state.value.officesTokens = action.payload
        },
    },
});

export const {login, logout, addPhoto,upDateOfficeByDefault} = usersSlice.actions;
export default usersSlice.reducer;