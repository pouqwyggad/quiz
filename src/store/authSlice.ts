import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {ILogin} from "../interfaces/AuthResponse";
import api from "../api";
import {AxiosError} from "axios";

export const loginAsync = createAsyncThunk<ILogin, { email: string; password: string, rememberMe: boolean }, {
    rejectValue: string
}>(
    "auth/login",

    async ({email, password, rememberMe}, {rejectWithValue}) => {
        try {
            const response = await api.post<ILogin>('/auth/login', {email, password, rememberMe})
            // const userData = {
            //     "name": response.data.name,
            //     "email": response.data.email,
            //     "avatar": response.data.avatar
            // }

            const token = response.data.token
            // localStorage.setItem("userData", JSON.stringify(userData))
            localStorage.setItem("token", JSON.stringify(token))

            return response.data
        } catch (e: any) {
            return rejectWithValue(e.response.data.error)
        }
    }
)
export const logoutAsync = createAsyncThunk(
    "auth/logout",

    async () => {
        localStorage.clear()
        return await api.delete('/auth/me')
    }
)

export const changeProfileNameAsync = createAsyncThunk<ILogin, { avatar: string, name: string }, {
    rejectValue: string
}>(
    "change/name",

    async ({avatar, name}, {rejectWithValue}) => {
        try {
            const res = await api.put('/auth/me', {name, avatar})

            return res.data.updatedUser
        } catch (e: any) {
            return rejectWithValue(e.response.data.error)
        }
    }
)

export const checkAuth = createAsyncThunk(
    "check/auth",

    async (_, {rejectWithValue}) => {
        try {
            const response = await api.post('/auth/me')

            console.log("checkAuth")
            console.log(response)
            return response.data
        } catch (e: any) {
            return rejectWithValue(e.response.data.error)
        }
    }
)

interface AuthState {
    user: ILogin;
    loading: boolean;
    error: any;
    isAuth: boolean;
}

const initialState: AuthState = {
    user: {
        _id: "",
        email: "",
        rememberMe: false,
        isAdmin: false,
        name: "",
        verified: false,
        publicCardPacksCount: 0,
        created: "",
        updated: "",
        __v: 0,
        token: "",
        tokenDeathTime: 0,
        avatar: "",
    },
    loading: false,
    error: null,
    isAuth: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                console.log(action.payload)
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.isAuth = true;
                localStorage.setItem("isAuth", JSON.stringify(state.isAuth))
                localStorage.setItem("userData", JSON.stringify(action.payload))
                state.user = action.payload
            })

            .addCase(logoutAsync.fulfilled, (state) => {
                state.isAuth = false
                state.error = null
                state.user = {
                    _id: "",
                    email: "",
                    rememberMe: false,
                    isAdmin: false,
                    name: "",
                    verified: false,
                    publicCardPacksCount: 0,
                    created: "",
                    updated: "",
                    __v: 0,
                    token: "",
                    tokenDeathTime: 0,
                    avatar: "",
                };
            })

            .addCase(changeProfileNameAsync.fulfilled, (state, action) => {
               console.log(action.payload)
                localStorage.setItem("userData", JSON.stringify(action.payload))
                state.user = action.payload
            })
            .addCase(changeProfileNameAsync.rejected, (state, action) => {
                console.log(action.payload)
            })

            .addCase(checkAuth.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.isAuth = false
                console.log(action)
                localStorage.setItem("isAuth", JSON.stringify(state.isAuth))
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = false
                state.isAuth = true
                console.log(action.payload)
                // console.log(action.payload.token)
                state.user = action.payload
                localStorage.setItem("token", action.payload.token)
                localStorage.setItem("userData", JSON.stringify(action.payload))
                // console.log(action.payload)
            })
    }
})

export const {} = authSlice.actions

export default authSlice.reducer