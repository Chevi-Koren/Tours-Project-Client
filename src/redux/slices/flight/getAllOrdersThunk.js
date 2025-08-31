import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllOrdersThunk = createAsyncThunk('fetchAllOrdersThunk',
    async () => {
        try {
            const response = await fetch("http://localhost:5041/api/Orders/GetAll");
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Faild to find getAllOrders");
        }
    }
)