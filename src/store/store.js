import { configureStore } from "@reduxjs/toolkit";
import todoSlice from './slices/todosSlice';
const store = configureStore({
    reducer:{
        todos:todoSlice
    }
})

export default store;