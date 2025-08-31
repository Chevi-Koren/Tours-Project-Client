import { createAsyncThunk } from "@reduxjs/toolkit";


export const getAllCustomersThunk = createAsyncThunk('fetchAllCustomersThunk',
    async () => {
        try {
            const response = await fetch("http://localhost:5041/api/Customers/GetAll");
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Faild to find Customers");
        }
    }
)