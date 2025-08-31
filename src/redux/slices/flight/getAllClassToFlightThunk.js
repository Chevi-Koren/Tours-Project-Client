import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllClassToFlightThunk = createAsyncThunk('fetchClassToFlightThunk',
    async () => {
        try {
            const response = await fetch("http://localhost:5041/api/ClassToFlight/GetAll");
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Faild to find classToFlightThunk");
        }
    }
)