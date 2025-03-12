import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    referredBy: ""
}

const slice = createSlice({
    name: "referral",
    initialState,
    reducers: {
        UPDATE_REFFERRED_BY: (state, {payload})=>({...state, referredBy: payload})
    }
})

export const {UPDATE_REFFERRED_BY} = slice.actions
export default slice.reducer;