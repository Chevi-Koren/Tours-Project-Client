
import { createSlice } from "@reduxjs/toolkit";
import { logInUserThunk } from "./logInUserThunk";
import { addUserThunk } from "./addUserThunk";

// Load initial state from session storage
const loadStateFromSessionStorage = () => {
    try {
        const userWithoutOutId = JSON.parse(sessionStorage.getItem('userWithoutOutId')) || { firstName: '', lastName: '', email: '', phone: '', password: '' };
        const user = JSON.parse(sessionStorage.getItem('user'));
        const loading = sessionStorage.getItem('loading') === 'true';
        const error = sessionStorage.getItem('error') || '';
        const status = sessionStorage.getItem('status') === 'true';
        const statusUser = sessionStorage.getItem('statusUser') === 'true';
        const userId = parseInt(sessionStorage.getItem('userId')) || 0;
        const loction = sessionStorage.getItem('loction') || '';
        
        return {
            userWithoutOutId,
            user,
            loading,
            error,
            status,
            statusUser,
            userId,
            loction
        };
    } catch (err) {
        return {
            userWithoutOutId: { firstName: '', lastName: '', email: '', phone: '', password: '' },
            user: null,
            loading: false,
            error: '',
            status: false,
            statusUser: false,
            userId: 0,
            loction: ""
        };
    }
};

const INITIAL_STATE = loadStateFromSessionStorage();

export const userSlice = createSlice({
    name: 'users',
    initialState: INITIAL_STATE,
    reducers: {
        logIn: (state, action) => {
            state.userWithoutOutId = action.payload;
            // Save to session storage
            sessionStorage.setItem('userWithoutOutId', JSON.stringify(action.payload));
        },
        loct: (state, action) => {
            state.loction = action.payload;
            // Save to session storage
            sessionStorage.setItem('loction', action.payload);
        },
        signOut: (state, action) => {
            state.user = null;
            state.userWithoutOutId = { firstName: '', lastName: '', email: '', phone: '', password: '' };
            // Update session storage
            sessionStorage.removeItem('user');
            sessionStorage.setItem('userWithoutOutId', JSON.stringify({ firstName: '', lastName: '', email: '', phone: '', password: '' }));
        },
        setStatus: (state, action) => {
            state.status = false;
        },
        setUserId: (state, action) => {
            state.userId = action.payload;
            sessionStorage.setItem('userId', action.payload.toString());
        },
    },
    extraReducers: (builder) => {
        //LogIn
        builder.addCase(logInUserThunk.pending, (state) => {
            state.loading = true;
            sessionStorage.setItem('loading', 'true');
        })
        builder.addCase(logInUserThunk.fulfilled, (state, action) => {
            state.loading = false;
            sessionStorage.setItem('loading', 'false');
            
            if (action.payload === null) {
                state.status = true;
                sessionStorage.setItem('status', 'true');
            } else {
                state.user = action.payload;
                state.statusUser = true;
                // Save to session storage
                sessionStorage.setItem('user', JSON.stringify(action.payload));
                sessionStorage.setItem('statusUser', 'true');
            }
        })
        builder.addCase(logInUserThunk.rejected, (state) => {
            state.loading = false;
            state.error = 'Login failed';
            // Update session storage
            sessionStorage.setItem('loading', 'false');
            sessionStorage.setItem('error', 'Login failed');
        })
        //Add
        builder.addCase(addUserThunk.pending, (state) => {
            state.loading = true;
            sessionStorage.setItem('loading', 'true');
        })
        builder.addCase(addUserThunk.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
            // Save to session storage
            sessionStorage.setItem('user', JSON.stringify(action.payload));
            sessionStorage.setItem('loading', 'false');
        })
        builder.addCase(addUserThunk.rejected, (state) => {
            state.loading = false;
            state.error = 'Registration failed';
            // Update session storage
            sessionStorage.setItem('loading', 'false');
            sessionStorage.setItem('error', 'Registration failed');
        })
    }
});

export const { logIn, loct, signOut, setUserId, setStatus } = userSlice.actions;