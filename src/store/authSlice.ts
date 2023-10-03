import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {ILogin} from "../interfaces/AuthResponse";
import api from "../api";

export const loginAsync = createAsyncThunk<ILogin, { email: string; password: string, rememberMe: boolean }, {
    rejectValue: { message: string }
}>(
    "auth/login",

    async ({email, password, rememberMe}, {rejectWithValue}) => {
        try {
            const response = await api.post<ILogin>('/auth/login', {email, password, rememberMe});
            // if (!(response.statusText === "OK")) {
            //     return rejectWithValue({message: "Error"});
            // }

            const userData = {
                "name": response.data.name,
                "email": response.data.email,
                "avatar": response.data.avatar
            }

            const token = response.data.token

            localStorage.setItem("userData", JSON.stringify(userData))
            localStorage.setItem("token", JSON.stringify(token))

            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue({message: "Unknown error occurred."});
            }
        }
    }
)
export const logoutAsync = createAsyncThunk(
    "auth/logout",

    async () => {
        try {
            localStorage.clear()

            return await api.delete('/auth/me')
        } catch (error: any) {
            throw error.response.data
        }
    }
)


export const changeProfileNameAsync = createAsyncThunk<ILogin, { avatar: string, name: string }, {}>(
    "change/name",

    async ({avatar, name}) => {
        try {
            const res = await api.put('/auth/me', {name, avatar})

            return res.data.updatedUser
        } catch (error) {

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
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.isAuth = true;
                console.log("login")
                console.log(action.payload)
                state.user = action.payload
            })
            .addCase(logoutAsync.pending, (state) => {
                state.loading = false;
                state.error = null;
                state.isAuth = false;
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
                state.user = action.payload
            })
    }
})

export const {} = authSlice.actions

export default authSlice.reducer