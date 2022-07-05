import { checkProperty } from "../utils/checkProperty";
import { Todo } from "./todoEntity";

const todoPropertyList: (keyof Todo)[] = ["id", "index", "text", "do"];

export class TodoValidation {

  vaildateTodoGet(result: any): Todo[] | null {

    if(
      result 
      || !result.data
      || !Array.isArray(result.data)
    ) {
      return null;
    }

    const todoList: Todo[] = [];

    const dataList = result.data;

    const length = dataList.length;
    
    for(let i = 0; i < length; i++) {

      const data = dataList[i];

      const todo = checkProperty<Todo>(data, todoPropertyList);

      if(todo) {
        todoList.push(todo);
      }

    }

    return todoList;
  }

  vaildateTodoSave(result: any): string | null {
    return "success";
  }

  validateTodoDelete(result: any): string | null {
    return "success";
  }

}