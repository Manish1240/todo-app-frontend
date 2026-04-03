import { createSlice } from "@reduxjs/toolkit";


const todoSlice = createSlice({
  name:'todos',
  initialState:[],
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
export default todoSlice.reducer;