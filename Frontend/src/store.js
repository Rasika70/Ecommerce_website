/* import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import productsReducer from "./slices/productsSlice";
import productReducer from './slices/productSlice';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import userReducer from './slices/userSlice'
import wishlistReducer from './slices/wishlistSlice';


const reducer = combineReducers({
    productsState: productsReducer,
    productState: productReducer ,
    authState: authReducer,
    cartState: cartReducer,
    orderState: orderReducer,
    userState: userReducer,
    wishlistState: wishlistReducer  
})


const store = configureStore({
    reducer,
    middleware: [thunk]
})

export default store; */

import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import productReducer from './slices/productSlice';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import userReducer from './slices/userSlice'
import wishlistReducer from './slices/wishlistSlice';

const store = configureStore({
    reducer: {
        productsState: productsReducer,
        productState: productReducer,
        authState: authReducer,
        cartState: cartReducer,
        orderState: orderReducer,
        userState: userReducer,
        wishlistState: wishlistReducer
    },
    // Other configuration options if needed
});

export default store;
