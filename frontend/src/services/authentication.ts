import { AxiosError } from "axios";
import { store } from "../store/store";
import { http } from "../utils/http";

export async function login(email: string, password: string) {
  try {
    const response = await http.post(`/login`, {
      username: email,
      password,
    });
    const { accessToken } = response.data;
    localStorage.setItem("token", accessToken);
    localStorage.setItem("isAuthenticated", "true");
    store.dispatch({ type: "auth/setAuthenticated" });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    store.dispatch({ type: "auth/resetAuthenticated" });
    return err.response?.data ?? { error: "An unknown error occurred" };
  }
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("isAuthenticated");
  store.dispatch({ type: "auth/resetAuthenticated" });
}
