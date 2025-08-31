import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllOrdersByCustomerThunk = createAsyncThunk('fetchAllOrdersByCustomerThunk',
    async (id) => {
        try {
            const response = await fetch(`http://localhost:5041/api/Orders/GetByCustomerId/${id}`);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Faild to find getAllOrdersByCustomer");
        }
    }
)