import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type postArrayType = {
    slugs: string[],
    tempSlug : string | null
};

const initialState: postArrayType = {
    slugs: [],
    tempSlug: null
};

const postSlice = createSlice({
    name: "allUserSlugs",
    initialState: initialState,
    reducers: {
        setUserSlugs: (state, action: PayloadAction<postArrayType["slugs"]>) => {
            state.slugs = action.payload;
        },
        setTempSlug: (state, action: PayloadAction<postArrayType["tempSlug"]>) => {
            state.tempSlug = action.payload;
        }
    }
});

export const { setUserSlugs , setTempSlug } = postSlice.actions;

export default postSlice.reducer;