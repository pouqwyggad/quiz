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
            const token = response.data.token
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
        await api.delete('/auth/me')
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

export const checkAuth = createAsyncThunk<ILogin, void, { rejectValue: any }>(
    "check/auth",

    async (_, {rejectWithValue}) => {
        try {
            const response = await api.post('/auth/me')
            return response.data
        } catch (e: any) {
            return rejectWithValue(e.response.data)
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
            .addCase(loginAsync.rejected, () => {
                console.log('НЕ ЗАЛОГИНЕН')
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.isAuth = true;
                localStorage.setItem("isAuth", JSON.stringify(state.isAuth))
                state.user = action.payload
                console.log("ДАННЫЕ ПРИ ВХОДЕ СОХРАНЕНЫ В REDUX")
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
                }

                console.log("ДАННЫЕ ИЗ REDUX УДАЛЕНЫ")
            })
            .addCase(changeProfileNameAsync.fulfilled, (state, action) => {
                state.user = action.payload
            })
            .addCase(checkAuth.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(checkAuth.rejected, (state) => {
                state.loading = false
                state.error = true
                state.isAuth = false
                console.log("ОТМЕНА ПРОВЕРКИ AuthMe")
                localStorage.setItem("isAuth", JSON.stringify(state.isAuth))
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = false
                state.isAuth = true
                state.user = action.payload
                localStorage.setItem("token", action.payload.token)
                console.log("ПРОВЕРКА AuthMe УСПЕШНА")
            })
    }
})

export const {} = authSlice.actions

export default authSlice.reducer