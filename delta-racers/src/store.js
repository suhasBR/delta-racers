import {configureStore} from '@reduxjs/toolkit';
import userReducer from './reducers/user';
import componentReducer from "./reducers/components";


export const store = configureStore({
    reducer: {
       user : userReducer,
       component: componentReducer
    },
})