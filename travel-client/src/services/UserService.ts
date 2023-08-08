import { API, endpoints } from "../api";
import User from "../shared/models/UserModel";

class UserService {
  static createUser(user: FormData | User) {
    return API.post(endpoints?.api?.users?.create, user);
  }
  static updateUser(id: string, user: FormData | User) {
    return API.put(endpoints?.api?.users?.update + id, user);
  }
  static deleteUser(id: string) {
    return API.delete(endpoints?.api?.users?.delete + id);
  }
  static gertOneUser(id: string) {
    return API.get(endpoints?.api?.users?.getone + id);
  }
  static getAllUsers(query: string = "") {
    return API.get(endpoints?.api?.users?.getAll + query);
  }
}

export default UserService;
