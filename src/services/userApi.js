import axios from "axios";
const api = import.meta.env.VITE_API_URL;

export const addUser = async (username) => {
  try {
    const res = await axios.post(`${api}/user`, { username });

    // ✅ success case
    if (res.status === 201) {
      return {
        success: true,
        token: res.data.token,
      };
    }

  } catch (error) {
   if(import.meta.env.ENVIRONMENT==='development'){
     console.log("POST ERROR:", error);
   }
    const status = error.response?.status;

    // ✅ handle based on status
    if (status === 401) {
      return {
        success: false,
        message: "this user is already registered",
      };
    }

    if (status === 500) {
      return {
        success: false,
        message: "server error! something went wrong",
      };
    }

    return {
      success: false,
      message: "Unknown error! something went wrong",
    };
  }
};
export const deleteUser = async (token) => {
  try {
    const res = await axios.delete(`${api}/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res.status === 200 || res.status === 201) {
      return {
        success: true,
        message: 'deleted successfully'
      };
    }
  } catch (error) {
     if(import.meta.env.ENVIRONMENT=='development'){
    console.log("DELETE ERROR:", error.response || error);
    }
    const status = error.response?.status;

    if (status === 401) {
      return {
        success: false,
        message: "Invalid or expired token",
      };
    }

    if (status === 500) {
      return {
        success: false,
        message: "Server error! something went wrong",
      };
    }

    return {
      success: false,
      message: "Unknown error! something went wrong",
    };
  }
};
