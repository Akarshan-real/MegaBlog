import { createSlice } from "@reduxjs/toolkit";
import type { Models } from "appwrite";

type AuthState = {
    status: boolean,
    userData: Models.User<Models.Preferences> | null;
};

const initialState: AuthState = {
    status: false,
    userData: null
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;