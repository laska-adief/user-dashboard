import { Post } from "./post";
import { Todo } from "./todo";

export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface UserData extends User {
  postCounts: number;
  completedTodoCounts: number;
  pendingTodoCounts: number;
}

export interface UserDetail extends User {
  posts: Post[];
  todos: Todo[];
}
