import React from "react";
import { Todo } from "./todoEntity";
import { TodoArray } from "./TodoList";
import { TodoRepository } from "./todoRepository";
import { TodoValidation } from "./todoValidation";
import "reflect-metadata";

function Error(message: string) {
  return function (target: any, key: string, desc: PropertyDescriptor) {

    const method = desc.value;

    desc.value = async function(...args: any[]) {
      try {
        return await method.apply(this, args);
      } catch(e) {
        const errorMessage = typeof e === "string"? e : "e";
        
        return new TodoArray(TodoArray.createTodo("데코"), TodoArray.createTodo("message"), TodoArray.createTodo(errorMessage));
      }
    }

  }
}

function Injectable(): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata("__injectable__", true, target);
  };
}

// emitDecoratorMetadata가 작동하지 않음...
function LogType(target: any, key: string) {
  const allType = Reflect.getMetadataKeys(target);
  const type = Reflect.getMetadata("design:type", target, key);
  const types = Reflect.getMetadata("design:paramtypes", target, key);
  console.log(allType, type, types);
  // console.log("types", types);

  // console.log(`${key} type: ${type}`);

}

@Injectable()
export class TodoService {

  constructor(
    private todoRepository: TodoRepository,
    private todoValidation: TodoValidation
  ) {}

  @LogType
  public aaaa: string = "";

  @Error("잘 됩니다.")
  @LogType
  public async getTodoListInStorage(): Promise<TodoArray | null> {
    const result = await this.todoRepository.getFetch("todo");

    const todoList = this.todoValidation.vaildateTodoGet(result);

    if(todoList) {
      return new TodoArray(...todoList);
    }

    return null;
  }

  @LogType
  public async saveTodoListInStorage(todoList: TodoArray): Promise<boolean> {

    try {

      const result = await this.todoRepository.postFetch("save", todoList);

      const checkData = this.todoValidation.vaildateTodoSave(result);

      if(checkData === "success") {
        return true;
      } 
      
    } catch(e) {
      return false;
    }
    
    return false;
  }

  public async deleteTodoListInStorage(): Promise<boolean> {

    try {

      const result = await this.todoRepository.deleteFetch("delete");

      const checkData = this.todoValidation.vaildateTodoSave(result);

      if(checkData === "success") {
        return true;
      } 
      
    } catch(e) {
      return false;
    }
    
    return false;
  }

  @LogType
  public onEditMode(
    setCurrentTodoId: (id: string | null) => void,
    setTodoText: (text: string) => void,
    setTodoList: (todoList: TodoArray) => void,
    todoList: TodoArray,
    currentTodoId: string | null,
    todoText: string
  ) {
    return (targetId: string) => () => {

      if(currentTodoId) {
        
        const newTodoList = todoList.updateTodoInList(currentTodoId, { text: todoText });

        setTodoList(newTodoList);
      }

      const currentTodo = todoList.getTargetTodo(targetId);

      if(!currentTodo) {
        return;
      }
  
      setCurrentTodoId(targetId);
      setTodoText(currentTodo.text);
    }
  }

  public endEditMode(
    setCurrentTodoId: (id: string | null) => void,
    setTodoText: (text: string) => void,
    setTodoList: (todoList: TodoArray) => void,
    currentTodoId: string | null,
    todoText: string,
    todoList: TodoArray
  ) {
    return () => {
      if(!currentTodoId) {
        return;
      }

      const newTodoList = todoList.updateTodoInList(currentTodoId, { text: todoText });

      setTodoList(newTodoList);
      setTodoText("");
      setCurrentTodoId(null);  
    }
  }

  public editTodoText(
    setTodoText: (text: string) => void
  ) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setTodoText(e.target.value);
    }
  }

  public saveTodoList(
    setLoading: (isLoading: boolean) => void,
    setError: (error: string | null) => void,
    todoList: TodoArray
  ) {
    return async () => {
      
      setLoading(false);
      setError(null);
      
      const result = this.saveTodoListInStorage(todoList);

      setLoading(false);

      if(!result) {
        setError("저장하지 못했습니다.");
      } 

    }
  }

  public toggleDo(
    setTodoList: (todoList: TodoArray) => void,
    todoList: TodoArray
  ) {
    return (targetId: string) => () => {

      const props = (todo: Todo) => {
        return {
          do: !todo.do
        }
      }

      setTodoList(todoList.updateTodoInList(targetId, props));
    }
  } 

  public addTodoInList(
    setTodoList: (todoList: TodoArray) => void,
    todoList: TodoArray
  ) {
    return () => {
      setTodoList(todoList.addTodoInList());
    }
  }

  public deleteTodoInList(
    setTodoList: (todoList: TodoArray) => void,
    todoList: TodoArray
  ) {
    return (targetId: string) => () => {
      setTodoList(todoList.deleteTodoInList(targetId))
    }
  }

  public deleteTodoList(
    setLoading: (isLoading: boolean) => void,
    setError: (error: string | null) => void
  ) {
    return async () => {

      setLoading(false);
      setError(null);

      const result = this.deleteTodoListInStorage();

      setLoading(false);

      if(!result) {
        setError("삭제하지 못했습니다.");
      } 

    }
  }

  public async getTodoList(
    setLoading: (isLoading: boolean) => void,
    setError: (error: string | null) => void,
    setTodoList: (todoList: TodoArray) => void
  ) {

    setLoading(true);

    const todoList = await this.getTodoListInStorage();

    if(todoList) {
      setTodoList(todoList);

    } else {
      setError("todo list를 불러오지 못했습니다.");
      
      setTodoList(new TodoArray(TodoArray.createTodo("투두")));
    }

    setLoading(false);
  }

}

console.log("TestService", Reflect.getMetadata("design:type", TodoRepository.prototype, "getTodoListInStorage"));