import { createAsyncThunk } from "@reduxjs/toolkit";

export const addDestantionThunk = createAsyncThunk('addDestantionThunk',
    async(user) => {
        const response = await fetch("http://localhost:5041/api/Destinition/Add",
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
              throw new Error('faild to fetch to addDestination');
          }
    }
)