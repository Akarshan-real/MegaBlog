import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UXState = {
    loading: boolean,
    theme : "dark" | "light"
};

const initialState: UXState = {
    loading: true,
    theme : "dark"
};

const uxSlice = createSlice({
    name: "ux",
    initialState: initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setTheme : (state,action : PayloadAction<UXState["theme"]>) => {
            state.theme = action.payload;
        }
    }
});

export const { setLoading , setTheme } = uxSlice.actions;

export default uxSlice.reducer;