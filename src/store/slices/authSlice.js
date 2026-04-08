import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    username:localStorage.getItem('username') || null,
    token:localStorage.getItem('token') || null,
  }
const authSlice = createSlice({
  name:'Auth',
  initialState,
  reducers:{
    setTasks: (state,action)=>{
    return action.payload;
    },
    addTask: (state,action)=>{
    state.push(action.payload);
    },
    removeTask :(state,action) => {
    const id = action.payload;
    return state.filter((todo)=>todo._id !==id );
    },
  }
})


export const { addTask,removeTask , setTasks } = todoSlice.actions;
export default authSlice.reducer;