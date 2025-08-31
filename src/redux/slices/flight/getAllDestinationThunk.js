import { createAsyncThunk } from "@reduxjs/toolkit";


export const getAllDestinationThunk = createAsyncThunk('fetchAllDestnationThunk',
    async () => {
        try {
            const response = await fetch("http://localhost:5041/api/Destinition/GetAll");
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Faild to find Destinition");
            return [];
        }
    }
)