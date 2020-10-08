export interface TodosListRequest {
  userId?: number;
  completed?: boolean;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
