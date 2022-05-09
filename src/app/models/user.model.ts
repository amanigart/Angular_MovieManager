export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  isActive: boolean;
  isAdmin: boolean;
  token: string;
}

export interface NewUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
}

export interface UserForComments {
  id: number;
  firstName: string;
  lastName: string;
}
