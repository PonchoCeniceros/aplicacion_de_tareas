export interface Task {
  _id: string;
  title: string;
  description: string;
  done: boolean;
}

export interface ApiResponse<T> {
  isOk: boolean;
  data?: T;
  message: string;
}
