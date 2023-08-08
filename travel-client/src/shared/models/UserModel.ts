interface Name {
  first: string;
  last: string;
}

interface User {
  _id?: string;
  name?: Name;
  mobile?: string;
  email?: string;
  password?: string;
  avatar?: string;

  role?: string;
  status?: number;
}

export default User;
