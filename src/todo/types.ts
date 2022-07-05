import { Todo } from "./todoEntity";

export interface TodoViewProps {
  title: string;
  todoList: Todo[];
  currentTodoId: string | null;
  todoText: string;
  onEditMode: (targetId: string) => () => void;
  endEditMode: () => void;
  editTodoText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleDo: (targetId: string) => () => void;
  addTodoInList: () => void;
  deleteTodoInList: (targetId: string) => () => void;
  saveTodoList: () => void;
  deleteTodoList: () => void;
}

export interface TodoLoadingComponentProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export interface TodoErrorComponentProps {
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface TodoElementProps {
  title: string;
}