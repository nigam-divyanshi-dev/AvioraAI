import { createSlice } from "@reduxjs/toolkit";

const normalizeUser = (user) => {
    if (!user) return null;

    return {
        ...user,
        id: user.id ?? user._id ?? user.userId ?? null,
    };
};

const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:null,
    },
    reducers:{
        setUserdata:(state,action)=>{
            state.userData = normalizeUser(action.payload)
        }
    }
})

export const {setUserdata}=userSlice.actions
export default userSlice.reducer