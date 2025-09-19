import axios from "axios";
import {
  userRegisterRequest,
  userRegisterSuccess,
  userRegisterFailed,
  userLoginRequest,
  userLoginSuccess,
  userLoginFailed,
} from "../../utils/userSlice";
import { toast } from "react-toastify";

// automatically choosing url based on environment
const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://full-stack-foodie-app.onrender.com" //  production backend
    : "http://localhost:5000"; // for local dev backend

//  Register user
export const registerUser = (userData) => async (dispatch) => {
  dispatch(userRegisterRequest());

  try {
    const response = await axios.post(
      `${API_URL}/api/users/register`,
      userData
    );

    const { message } = response.data;

    dispatch(userRegisterSuccess(response.data));
    toast.success(message || "Signup successful! Please login.");
    return { success: true }; // <-- return success
  } catch (error) {
    const message = error.response?.data?.message || "Registration failed!";
    dispatch(userRegisterFailed(message));
    toast.error(message);
    return { success: false }; // return failure object
  }
};

//  Login User
export const loginUser = (userData) => async (dispatch) => {
  dispatch(userLoginRequest());
  try {
    const response = await axios.post(`${API_URL}/api/users/login`, userData);

    const { user, message } = response.data;

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      dispatch(userLoginSuccess(user));
      toast.success(message || "Login successful!");
      return { success: true };
    } else {
      dispatch(userLoginFailed("Login failed. Try again."));
      toast.error("Login failed. Try again.");
    }
  } catch (error) {
    const message =
      error.response?.data?.message || "Login failed. Check credentials.";
    dispatch(userLoginFailed(message));
    toast.error(message);
    return { success: false };
  }
};
