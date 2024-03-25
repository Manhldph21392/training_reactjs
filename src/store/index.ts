import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import authApi from "../api/auth";
import locationApi from "../api/location";
import { setUser } from "../slices/userSlices";
import productApi from "../api/product";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user"], // Chỉ lưu trữ thông tin của user
};

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    user: setUser, // Thêm reducer cho user vào rootReducer
});

const middleware = [
    authApi.middleware,
    locationApi.middleware,
    productApi.middleware,
];

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(middleware),
});

const persistor = persistStore(store);
export { store, persistor };
