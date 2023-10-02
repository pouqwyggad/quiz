import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {ILogin, IRegister} from "../interfaces/AuthResponse";
import api from "../api";

export const registerAsync = createAsyncThunk<boolean, { email: string, password: string }, {}>(
    "auth/register",

    async ({email, password}) => {
        try {
            console.log({email, password})
            const response = await api.post<IRegister>('/auth/register', {email, password});
            console.log(response)
            console.log(response.data)

            if (response) {
                return true
            }

            return false

        } catch (error) {
            // @ts-ignore
            throw error.response.data;
        }
    }
)

const initialState = {
    user: null,
    loading: false,
    error: null,
};

const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        // logout: (state) => {
        //     state.user = null;
        // },
    },
    extraReducers: {
        [registerAsync.fulfilled.toString()]: (state, action) => {
            state.user = action.payload
            // state.status = "resolved"
            state.error = null
        }
    }
})
export const {} = registerSlice.actions
export default registerSlice.reducer