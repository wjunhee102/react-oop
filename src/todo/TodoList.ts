import { Token } from "../utils/token";
import { updateObject } from "../utils/updateObject";
import { Todo, TodoProps } from "./todoEntity";

export class TodoArray extends Array<Todo> {

  static createTodo(text: string = ""): Todo {
    return {
      index: 0,
      id: Token.getUUID(),
      text,
      do: false
    }
  }

  public getTargetTodo(targetId: string): Todo | null {
    
    const targetTodo = this.filter(({ id }) => id === targetId)[0];

    return targetTodo;
  } 

  public addTodoInList(text: string = "") {

    const newTodo = TodoArray.createTodo(text);

    const length = this.length;

    newTodo.index = length;

    return new TodoArray(...this, newTodo);
  }

  public updateTodoInList(
    targetId: string, 
    todoProps: TodoProps | ((targetTodo: Todo) => TodoProps)
  ) {

    const targetTodo = this.filter(({ id }) => id === targetId)[0];

    if(!targetTodo) {
      return this;
    }

    const props = typeof todoProps === "function" ? todoProps(targetTodo) : todoProps;

    const newTargetTodo = updateObject(targetTodo, props);

    const newTodoList = this.map(todo => 
      todo.id !== targetId? todo : newTargetTodo
    );

    return new TodoArray(...newTodoList);
  }

  public deleteTodoInList(targetId: string) {

    const deletedTodoList = this.filter(({ id }) => id !== targetId); 

    return new TodoArray(...deletedTodoList);
  }

}