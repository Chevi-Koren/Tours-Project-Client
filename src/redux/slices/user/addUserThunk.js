import { createAsyncThunk } from "@reduxjs/toolkit";

export const addUserThunk = createAsyncThunk('addUserThunk',
    async(user) => {
        const response = await fetch("http://localhost:5041/api/Customers/Add",
            {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                  'Content-Type': 'application/json'
                }
            }
        )
        if(response.ok){
            let data =  await response.json();
            return data;
        }
          else{
              throw new Error('faild to fetch to addCustomer');
          }
    }
)