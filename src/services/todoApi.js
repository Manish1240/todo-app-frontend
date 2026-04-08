import axios from "axios";
const api = import.meta.env.VITE_API_URL;

// ✅ GET TODOS
export const getTodos = async (token) => {
  try {
      const response = await axios.get(`${api}/todos`,{headers:{
      Authorization:`bearer ${token}`
    }});
    return {
      success:true,
      data:response.data.data
    }; // important
  } catch (error) {
    const status = error.response?.status;
    if(status===401){
      return {
        success:false,
        message:'Invalid token !'
      }
    }
    if(status===500){
      return {
        success:false,
        message:error.message
      }
    }
    return {
    success:false,
    message:'something went wrong unkown error'
    }
  }
};
// ✅ POST TODO
export const addTodo = async (todo,token) => {
  try {
    const res = await axios.post(
    api+'/todos',
    todo,
    {headers:{
      Authorization:`Bearer ${token}`
    }
    }
    );
    if(res.status===201){
      return {
        success:true,
        data:res.data.data
      }
    }
  } catch (error) {
    const status = error.response.status;
    if(status===401){
      return {
        success:false,
        message:'Invalid token !'
      }
    }
    if(status===500){
      return {
        success:false,
        message:error.message
      }
    }
    return {
    success:false,
    message:'something went wrong unkown error'
    }
  }
};
export const deleteTodo = async (id) => {
  try {
    const res = await axios.delete(`${api}/todos/${id}`);
    return res.data.data;
  } catch (error) {
    if(import.meta.env.ENVIRONMENT=='development'){
    console.log("DELETE ERROR:", error);
    }
  }
};


