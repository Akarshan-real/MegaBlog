import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import uxSlice from "./uxSlice";
import postSlice from "./postSlice";

const rootReducer = combineReducers({
    auth: authSlice,
    ux: uxSlice,
    allUserSlugs: postSlice,
});

const persistConfig = {
    key : "root",
    storage,
    whitelist : ["auth","allUserSlugs"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware : (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck : {
                ignoredActions : [FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER],
            },
        })
    }
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default store;