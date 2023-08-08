interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  latitude: number;
  longitude: number;
}
interface Rating {
  rating: number;
  review: string;
  user: string;
}

interface Destination {
  _id: string;
  destinationId: number;
  name: string;
  category: string;
  address: Address; // array added me
  images: string[];
  explanation: string;
  ratings: Rating[];
  timeToVisit: string;
  nearBy: string[] | Destination[];
  stay: string;
  eateries: string;
  travelMode: string[];
  guides: string;

  status: number;
  createdAt: Date | string;
}
export default Destination;
