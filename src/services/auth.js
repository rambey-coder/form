import axios from "axios";

const authBaseURL =
  "https://site--checkit-procurement--gqr8p4b5dyhw.code.run/api/auth/";

export const SignUp = (data) => {
  return axios.post(authBaseURL + `signup`, data);
};

export const SignIn = (data) => {
  return axios.post(authBaseURL + `signin`, data);
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};

export const SignOut = () => {
  localStorage.removeItem("user")
}
