import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../api";
import axios from "axios";


export const resetPasswordAsync = createAsyncThunk<{}, { email: string }, {}>(
    "resetPassword/reset",

    async (email) => {
        try {

            // console.log(email)
            // console.log({
            //     email: "usmanov2838@gmail.com",
            //     "from": "test-front-admin <ai73a@yandex.by>",
            //     "message": "<div> password recovery link: <a href='http://localhost:3000/auth/set-new-password/$token$'>link</a></div>"
            // })
            const response = await api.post("/auth/forgot",
                {
                    email: "usmanov2838@gmail.com",
                    from: "test-front-admin <ai73a@yandex.by>",
                    message: "<div> password recovery link: <a href='http://localhost:3000/auth/set-new-password/$token$'>link</a></div>"
                });

            console.log(response)

            console.log(response.data)
            return response.data
        } catch (e) {
            // @ts-ignore
           console.log(e)
        }
    }
)


const initialState = {
    error: null
};

const resetPasswordSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        // logout: (state) => {
        //     state.user = null;
        // },
    },
    extraReducers: {
        [resetPasswordAsync.fulfilled.toString()]: (state, action) => {
            console.log(action.payload)
        }
    }
})
export const {} = resetPasswordSlice.actions
export default resetPasswordSlice.reducer