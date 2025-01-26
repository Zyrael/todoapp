export type Todo = {
  id: string;
  parentId: string;
  text: string;
  completed: boolean;
  createdAt: number;
  deadline: number | null;
};

export type TodoList = {
  id: string;
  deletable: boolean;
  title: string;
  todos: Todo[];
};
