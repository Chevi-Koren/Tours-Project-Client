import { createSlice } from "@reduxjs/toolkit";

import { getAllFlightThunk } from "./getAllFlightThunk";

import { getFlightDetailsByIdThunk } from "./getFlightDetailsByIdThunk";
import { updateFlightThunk } from "./updateFlightThunk";
import { getAllDestinationThunk } from "./getAllDestinationThunk";
import { getAllClassToFlightThunk } from "./getAllClassToFlightThunk";
import { addDestantionThunk } from "./addDestantionThunk";
import { addFlightThunk } from "./addFlightThunk";
import { getThisFlightBySrcdesdateThunk } from "./getThisFlightBySrcdesdateThunk";
import { getClassToFlightbyClassthisFlightIdThunk } from "./getClassToFlightbyClassthisFlightIdThunk";
import { getThisFlightByFlightIdThunk } from "./getThisFlightByFlightIdThunk";
import { getAllThisFlightThunk } from "./getAllThisFlightThunk";
import { getAllFlightsWhisHanacahThunk } from "./getAllFlightsWhisHanacahThunk";
import { updateDestinationThunk } from "./updateDestinationThunk";
import { addThisFlightThunk } from "./addThisFlightThunk";
import { addOrderThunk } from "./addOrderThunk";
import { getAllCustomersThunk } from "./getAllCustomersThunk";
import { getAllOrdersThunk } from "./getAllOrdersThunk";
import { getAllOrdersByCustomerThunk } from "./getAllOrdersByCustomerThunk";
import { updateThisFlightThunk } from "./updateThisFlightThunk";
import { updateClassToFlight } from "./updateClassToFlight";
import { getOrderDetailByClassToFlightIdThunk } from "./getOrderDetailByClassToFlightIdThunk";
import { addClassToFlight } from "./addClassToFlight";
import { deleteFlight } from "./deleteFlight";

const INITIAL_STATE = {
    flightsArr: [],
    flightsWhisHanachaArr: [],
    orders: [],
    flightsDetailsArr: [],
    FullFlight: [],
    AllThisFlight: [],
    classToFlight: [],
    orderDetailByClassToFlight: [],
    destinitions: [],
    customers: [],
    thisFlight: [],
    ordersByCustomer: [],
    ordersFromServer: [],
    ordersToPdf: [],
    oneThisFlight: null,
    find: false,
    yourClassToFlight: null,
    price: 0,
    loading: false,
    error: '',
    status: false,
    classes: "",
    isAddFlight: 0,
    response: false,

}

export const flightsSlice = createSlice({

    name: 'flights',
    initialState: INITIAL_STATE,
    reducers: {
     
            chooseClass: (state, action) => {
                state.classes = action.payload;
            },

            getFlightDetailsById: (state, action) => {
                state.FullFlight = state.flightsArr.filter(x => x.id === action.payload) 
                },
            savaYourChooseFlight: (state, action) => {
                state.thisYourChousFlight = action.payload;
            },
            savaClassToFlight: (state, action) => {
               state.orders.push(action.payload)
            },
            savaYourChooseFlightDetails: (state, action) => {
                state.thisYourChooseThisFlight = action.payload;
            },
            deleteOrder: (state, action) => {
                let i = state.orders.indexOf(action.payload)
                state.orders.splice(i, 1)
            },
            changeNOS: (state, action) => {
                let o = state.orders.find(x => x.id === action.payload.id);
                o.nOS = action.payload.nOS;
            },
            changeWight: (state, action) => {
                let o = state.orders.find(x => x.id === action.payload.id);
                o.overWight = action.payload.overWight;
            },
            savePriceToPay: (state, action) => {
                state.price = action.payload
            },
            changeResponse: (state, action) => {
                state.response = false
            },

           
    },
        extraReducers: (builder) => {

            //GetAll
            builder.addCase(getAllFlightThunk.pending, (state) => {
            })

            builder.addCase(getAllFlightThunk.fulfilled, (state, action) => {
                state.flightsArr = action.payload;
            })

            builder.addCase(getAllFlightThunk.rejected, (state) => {
            })

            
            //GetAllClassToFlight
            builder.addCase(getAllClassToFlightThunk.pending, (state) => {
            })

            builder.addCase(getAllClassToFlightThunk.fulfilled, (state, action) => {
                state.classToFlight = action.payload;
            })

            builder.addCase(getAllClassToFlightThunk.rejected, (state) => {
            })


            //UpdateFlight
            builder.addCase(updateFlightThunk.pending, (state) => {
            })

            builder.addCase(updateFlightThunk.fulfilled, (state, action) => {
                state.flightsArr = action.payload

                
            })

            builder.addCase(updateFlightThunk.rejected, (state) => {
            })


            //GetFlightDetails
            builder.addCase(getFlightDetailsByIdThunk.pending, (state) => {
            })

            builder.addCase(getFlightDetailsByIdThunk.fulfilled, (state, action) => {
                state.flightsDetailsArr = action.payload;
            })

            builder.addCase(getFlightDetailsByIdThunk.rejected, (state) => {
            })

            //GetDestinitionDetails
            builder.addCase(getAllDestinationThunk.pending, (state) => {
            })

            builder.addCase(getAllDestinationThunk.fulfilled, (state, action) => {
                state.destinitions = action.payload;
            })

            builder.addCase(getAllDestinationThunk.rejected, (state) => {
            })


            //AddFlight
            builder.addCase(addFlightThunk.pending, (state) => {
            })

            builder.addCase(addFlightThunk.fulfilled, (state, action) => {
                state.flightsArr = action.payload
            })

            builder.addCase(addFlightThunk.rejected, (state) => {
            })

            //GetBySrcDesDateThisFlight
            builder.addCase(getThisFlightBySrcdesdateThunk.pending, (state) => {
                state.find = false;
            })

            builder.addCase(getThisFlightBySrcdesdateThunk.fulfilled, (state, action) => {
                state.find = true;
                state.thisFlight = action.payload

            })

            builder.addCase(getThisFlightBySrcdesdateThunk.rejected, (state) => {
                state.find = true;
            })

            //GetClassToFlightbyClassthisFlightId
            builder.addCase(getClassToFlightbyClassthisFlightIdThunk.pending, (state) => {
            })

            builder.addCase(getClassToFlightbyClassthisFlightIdThunk.fulfilled, (state, action) => {
                state.yourClassToFlight = action.payload
            })

            builder.addCase(getClassToFlightbyClassthisFlightIdThunk.rejected, (state) => {
            })

            
            //GetThisFlightByFlightIdThunk
            builder.addCase(getThisFlightByFlightIdThunk.pending, (state) => {
            })

            builder.addCase(getThisFlightByFlightIdThunk.fulfilled, (state, action) => {
                state.flightsDetailsArr = action.payload;
            })

            builder.addCase(getThisFlightByFlightIdThunk.rejected, (state) => {
            })

            //GetAllThisFlightThunk
            builder.addCase(getAllThisFlightThunk.pending, (state) => {
            })

            builder.addCase(getAllThisFlightThunk.fulfilled, (state, action) => {
                state.AllThisFlight = action.payload;
            })

            builder.addCase(getAllThisFlightThunk.rejected, (state) => {
            })

            //GetAllFlightsWhisHanacahThunk
            builder.addCase(getAllFlightsWhisHanacahThunk.pending, (state) => {
            })

            builder.addCase(getAllFlightsWhisHanacahThunk.fulfilled, (state, action) => {
                state.flightsWhisHanachaArr = action.payload;
            })

            builder.addCase(getAllFlightsWhisHanacahThunk.rejected, (state) => {
            })

            //UpdateDestination
            builder.addCase(updateDestinationThunk.pending, (state) => {
            })

            builder.addCase(updateDestinationThunk.fulfilled, (state, action) => {
                state.destinitions = action.payload;
            })

            builder.addCase(updateDestinationThunk.rejected, (state) => {
            })

            //AddDestination
            builder.addCase(addDestantionThunk.pending, (state) => {
            })

            builder.addCase(addDestantionThunk.fulfilled, (state, action) => {
                state.destinitions = action.payload;
            })

            builder.addCase(addDestantionThunk.rejected, (state) => {
            })

            //AddThisFlight
            builder.addCase(addThisFlightThunk.pending, (state) => {
            })

            builder.addCase(addThisFlightThunk.fulfilled, (state, action) => {
                state.AllThisFlight = action.payload;
                state.oneThisFlight = action.payload;
            })

            builder.addCase(addThisFlightThunk.rejected, (state) => {
            })

            
            //UppdateThisFlight
            builder.addCase(updateThisFlightThunk.pending, (state) => {
            })

            builder.addCase(updateThisFlightThunk.fulfilled, (state, action) => {
                state.AllThisFlight = action.payload;
            })

            builder.addCase(updateThisFlightThunk.rejected, (state) => {
            })

            //AddOrder
            builder.addCase(addOrderThunk.pending, (state) => {
                state.ordersToPdf = []
                state.orders.forEach(order => {
                    state.ordersToPdf.push(order)
                })
            })

            builder.addCase(addOrderThunk.fulfilled, (state, action) => {
                state.orders.splice(0, state.orders.length)

            })

            builder.addCase(addOrderThunk.rejected, (state) => {
                state.orders.splice(0, state.orders.length)
            })

            //GetAllCustomers
            builder.addCase(getAllCustomersThunk.pending, (state) => {
            })

            builder.addCase(getAllCustomersThunk.fulfilled, (state, action) => {
                state.customers = action.payload;  
            })

            builder.addCase(getAllCustomersThunk.rejected, (state) => {
            })

            //GetAllOrders
            builder.addCase(getAllOrdersThunk.pending, (state) => {
            })

            builder.addCase(getAllOrdersThunk.fulfilled, (state, action) => {
                state.ordersFromServer = action.payload;  
            })

            builder.addCase(getAllOrdersThunk.rejected, (state) => {
            })

            //GetAllOrdersByCustomerThunk
            builder.addCase(getAllOrdersByCustomerThunk.pending, (state) => {
            })

            builder.addCase(getAllOrdersByCustomerThunk.fulfilled, (state, action) => {
                state.ordersByCustomer = action.payload;  
            })

            builder.addCase(getAllOrdersByCustomerThunk.rejected, (state) => {
            })

            //UpdateClassToFlight
            builder.addCase(updateClassToFlight.pending, (state) => {
            })

            builder.addCase(updateClassToFlight.fulfilled, (state, action) => {
                state.classToFlight = action.payload;  
            })

            builder.addCase(updateClassToFlight.rejected, (state) => {
            })

            //GetOrderDetailByClassToFlightId
            builder.addCase(getOrderDetailByClassToFlightIdThunk.pending, (state) => {
            })

            builder.addCase(getOrderDetailByClassToFlightIdThunk.fulfilled, (state, action) => {
                state.orderDetailByClassToFlight = action.payload;  
            })

            builder.addCase(getOrderDetailByClassToFlightIdThunk.rejected, (state) => {
            })

            //AddClassToFlight
            builder.addCase(addClassToFlight.pending, (state) => {
            })

            builder.addCase(addClassToFlight.fulfilled, (state, action) => {
                state.response = true;
            })

            builder.addCase(addClassToFlight.rejected, (state) => {
                state.response = false;
            })

            //DeleteFlight
            builder.addCase(deleteFlight.pending, (state) => {
            })

            builder.addCase(deleteFlight.fulfilled, (state, action) => {
                state.AllThisFlight = action.payload;
            })

            builder.addCase(deleteFlight.rejected, (state) => {
            })
                
    
                        
            
          
        }

    
});
export const { chooseClass, getFlightDetailsById, savaYourChooseFlight, savaYourChooseFlightDetails, savaClassToFlight, deleteOrder, savePriceToPay, changeResponse, changeNOS, changeWight} = flightsSlice.actions;