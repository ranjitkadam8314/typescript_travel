import axios from "axios";
import AuthService from "../services/AuthService";
import endpoints from "./endpoints";
const API = axios.create({
  baseURL: endpoints?.serverBaseURL + "/api",
});

API.interceptors.request.use((req: any) => {
  const token = sessionStorage.getItem("accesstoken");
  if (token) req.headers["authorization"] = token;
  return req;
});

const resetSession = () => {
  sessionStorage.clear();
  window.location.href = "/login";
};

API.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.log("Error---", error);

    if (error?.response?.status == 401) {
      AuthService.refreshToken(sessionStorage?.getItem("refreshtoken") || "")
        .then((response: any) => {
          console.log("Resonose:", response);
          if (response?.response.status == 403) resetSession();
          else sessionStorage.setItem("accesstoken", response?.data?.data);
        })
        .catch((err) => {
          // console.log("===",err);

          if (err?.response?.status == 403) {
            resetSession();
          }
        });
      // return response;
      // console.log("access token refreshed..." , response?.data?.data)
    }
    return error;
  }
);

export default API;
