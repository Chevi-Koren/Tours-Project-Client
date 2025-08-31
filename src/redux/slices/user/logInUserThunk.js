import { createAsyncThunk } from "@reduxjs/toolkit";


export const logInUserThunk = createAsyncThunk('fetchUserThunk',
async ({name, lastName, pass}) => {
    try {
        const response = await fetch(`http://localhost:5041/api/Customers/GetById/${name}/${lastName}/${pass}`);
        if(response.status === 204)
            return null;
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error("Faild to find logIn");
    }
    
}


)