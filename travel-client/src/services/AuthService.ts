import User from "../shared/models/UserModel";

import { API, endpoints } from "../api";

class AuthService {
  static userLogin(user: User) {
    return API.post(endpoints?.api?.auth.userLogin, user);
  }
  static validateToken(token?: string) {
    if (!token) token = sessionStorage.getItem("accesstoken") || "";
    if (token) return API.post(endpoints?.api?.auth.validateToken, { token });
    else return Promise.reject("Token not available");
  }
  static resetPassword(email: string) {
    return API.post(endpoints?.api?.auth.resetPassword, { email });
  }

  static refreshToken(token: string) {
    return API.post(endpoints?.api?.auth.refreshToken, { token });
  }
}

export default AuthService;
