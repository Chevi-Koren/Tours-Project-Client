import { createAsyncThunk } from "@reduxjs/toolkit";

export const addFlightThunk = createAsyncThunk('fetchAddFlightThunk',
    async(flight) => {
        const response = await fetch("http://localhost:5041/api/Flight/Add",
            {
                method: 'POST',
                body: JSON.stringify(flight),
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
              throw new Error('faild to fetch to addFlight');
          }
    }
)