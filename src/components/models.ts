export interface Todo {
  id: number;
  content: string;
  description?: string;
  date: string;
}

export interface Meta {
  totalCount: number;
}

export interface LoginForm {
  email: string;
  password: string;
}
