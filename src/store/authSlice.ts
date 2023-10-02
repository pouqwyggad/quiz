import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {ILogin} from "../interfaces/AuthResponse";
import api from "../api";

export const loginAsync = createAsyncThunk<ILogin, { email: string; password: string, rememberMe: boolean }, {}>(
    "auth/login",

    async ({email, password, rememberMe}) => {
        try {
            const response = await api.post<ILogin>('/auth/login', {email, password, rememberMe});

            const userData = {
                "name": response.data.name,
                "email": response.data.email,
                "avatar": response.data.avatar
            }

            const token = response.data.token

            localStorage.setItem("userData", JSON.stringify(userData))
            localStorage.setItem("token", JSON.stringify(token))

            return response.data;
        } catch (error) {
            // @ts-ignore
            throw error.response.data;
        }
    }
)

export const logoutAsync = createAsyncThunk(
    "auth/logout",

    async () => {
        try {
            localStorage.clear()

            return await api.delete('/auth/me');
        } catch (error) {
            // @ts-ignore
            throw error.response.data;
        }
    }
)

interface User {
    name: string;
    email: string;
    avatar: string;
}

interface AuthState {
    user: User;
    loading: boolean;
    error: any;
    isAuth: boolean;
}


const initialState: AuthState = {
    user: {
        name: "",
        email: "",
        avatar: "",
    },
    loading: false,
    error: null,
    isAuth: false
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // logout: (state) => {
        //     state.user = null;
        // },
    },
    extraReducers: {
        [loginAsync.fulfilled.toString()]: (state, action) => {
            state.user = action.payload
            state.error = null
            state.isAuth = true
        },
        [logoutAsync.fulfilled.toString()]: (state, action) => {
            state.isAuth = false
            state.error = null
            state.user = {
                name: "",
                email: "",
                avatar: "",
            };
        }
    }
})

export const {} = authSlice.actions

export default authSlice.reducer