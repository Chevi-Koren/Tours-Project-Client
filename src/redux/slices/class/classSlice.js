
import { createSlice } from "@reduxjs/toolkit";
import { getAllClassThunk } from "./getAllClassThunk";

const INITIAL_STATE = {
    classes: []
}



export const classSlice = createSlice({


    name: 'classs',
    initialState: INITIAL_STATE,
    reducers: {
       
    },

    extraReducers: (builder) => {

        builder.addCase(getAllClassThunk.pending, (state) => {
        })

        builder.addCase(getAllClassThunk.fulfilled, (state, action) => {
           state.classes = action.payload;
        })

        builder.addCase(getAllClassThunk.rejected, (state) => {
        })

    }

});
export const {} = classSlice.actions;