import {
  userRegisterRequest,
  userRegisterSuccess,
  userRegisterFailed,
  userLoginRequest,
  userLoginSuccess,
  userLoginFailed,
} from "../../utils/userSlice";
import axios from "axios";

// login user
export const loginUser = (userData) => async (dispatch) => {
  try {
    dispatch(userLoginRequest());
    const API_URL =
      process.env.NODE_ENV === "production"
        ? "https://full-stack-foodie-app.onrender.com/"
        : "http://localhost:5000";

    const response = await axios.post(
      `${API_URL}/api/users/login`, // <-- Your login endpoint
      userData
    );
    console.log("rohit", response.data);
    dispatch(userLoginSuccess(response.data));
    localStorage.setItem("currentUser", JSON.stringify(response.data)); // Save to localStorage
    window.location.href = "/";
  } catch (error) {
    dispatch(userLoginFailed(error.response?.data?.message || "Login failed"));
  }
};

// REGISTER USER
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(userRegisterRequest()); // You can create a separate registerRequest if needed
    const API_URL =
      process.env.NODE_ENV === "production"
        ? "https://full-stack-foodie-app.onrender.com/"
        : "http://localhost:5000";

    const response = await axios.post(
      `${API_URL}/api/users/register`, // <-- Make sure this matches your backend
      userData
    );
    const { user } = response.data;

    dispatch(userRegisterSuccess(user));
    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "/";
  } catch (error) {
    dispatch(
      userRegisterFailed(error.response?.data?.message || "Registration failed")
    );
  }
};
