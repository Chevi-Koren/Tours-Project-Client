import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllThisFlightThunk = createAsyncThunk('fetchAllThisFlightThunk',
    async () => {
        try {
            const response = await fetch(`http://localhost:5041/api/ThisFlight/GetAll`);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Faild to find getAllThisFlightThunk");
        }
    }
)