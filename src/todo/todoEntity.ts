


export interface Todo {
  index: number;
  id: string;
  text: string;
  do: boolean;
}

export type TodoProps = {
  [P in keyof Todo]?: Todo[P];
}