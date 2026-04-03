import axios from "axios";

const api = import.meta.env.VITE_API_URL;

// ✅ GET TODOS
export const getTodos = async () => {
  try {
    const res = await axios.get(api);
    return res.data.data; // important
  } catch (error) {
    console.log("GET ERROR:", error);
  }
};


// ✅ POST TODO
export const addTodo = async (todo) => {
  try {
    const res = await axios.post(api,todo);
    return res.data;
  } catch (error) {
    console.log("POST ERROR:", error);
  }
};
export const deleteTodo = async (id) => {
  try {
   
    const res = await axios.delete(`${api}/${id}`);
    return res.data.data;
  } catch (error) {
    console.log("DELETE ERROR:", error);
  }
};