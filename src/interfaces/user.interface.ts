export interface Login {
  username: string,
  password: string,
}

export interface User extends Login {
  [key: string]: number | string;
  vocation: string,
  level: number,
}

export interface UserWithId extends User {
  id: number
}