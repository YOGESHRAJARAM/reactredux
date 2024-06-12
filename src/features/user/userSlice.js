import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: '0', name: 'Kumaran' },
    { id: '1', name: 'Senthil' },
    { id: '2', name: 'Murugan' }
]

const userSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
        
    }
})

export const selectAlluser = (state)=>(state.users)
export default userSlice.reducer