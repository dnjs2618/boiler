import axios from "axios";
import { LOGIN_USER } from "./types";
import { REGISTER_USER, AUTH_USER } from "./types";
export function loginUser(body) {
  const request = axios
    .post("/api/users/login", body)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response);
    });

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function RegisterUser(body) {
  const request = axios
    .post("/api/users/register", body)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response);
    });

  return {
    type: REGISTER_USER,
    payload: request,
  };
}
export function auth() {
  const request = axios
    .get("/api/users/auth")
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response);
    });

  return {
    type: AUTH_USER,
    payload: request,
  };
}
