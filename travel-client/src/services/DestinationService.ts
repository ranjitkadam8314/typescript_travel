import { API, endpoints } from "../api";
import Destination from "../shared/models/DestinationsModel";
// import User from "../shared/models/UserModel";
class DestinationService {
  static createDestination(destination: FormData | Destination) {
    return API.post(endpoints?.api?.destinations?.create, destination);
  }
  static updateDestination(id: string, destination: FormData | Destination) {
    return API.put(endpoints?.api?.destinations?.update + id, destination);
  }
  static deleteDestination(id: string) {
    return API.delete(endpoints?.api?.destinations?.delete + id);
  }
  static gertOneDestination(id: string) {
    return API.get(endpoints?.api?.destinations?.getone + id);
  }
  static getAllDestinations(query: string = "") {
    return API.get(endpoints?.api?.destinations?.getAll + query);
  }
}

export default DestinationService;
