export interface User {
  avatar: Avatar;
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
  __v: number;
}
export interface Avatar {
  public_id: string;
  url: string;
}
