import { configureStore } from "@reduxjs/toolkit";
import jokeReducer from "../slices/jokeSlice";

const store = configureStore({
    reducer: {
        joke: jokeReducer
    }
});


export default store;