import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    joke: '',
    jokes: [],
    loading: false,
    error: ''
}

export const fetchJoke = createAsyncThunk('joke/fetch', async () => {
    const response = await axios.get('https://api.chucknorris.io/jokes/random');
    return response.data;
});

const jokeSlice = createSlice({
    name: 'joke',
    initialState,
    reducers: {
        addJoke(state, action) {
            const joke = action.payload;
            const fetchedJokes = JSON.parse(localStorage.getItem('jokes')) || [];
            let exists = fetchedJokes.find(item => item === joke);
            if(exists) {
                alert('Joke already saved');
            }else{
                const updatedJokes = [joke, ...fetchedJokes];
                state.jokes = [joke, ...state.jokes];
                localStorage.setItem('jokes', JSON.stringify(updatedJokes));
                alert('Joke saved');
            }
        },
        fetchJokes(state,action) {
            const fetchedJokes = JSON.parse(localStorage.getItem('jokes')) || [];
            state.jokes = fetchedJokes;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchJoke.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchJoke.fulfilled, (state, action) => {
            state.loading = false;
            state.joke = action.payload.value;
        });
        builder.addCase(fetchJoke.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});


const jokeReducer = jokeSlice.reducer;

export const { addJoke, fetchJokes } = jokeSlice.actions;

export default jokeReducer;
