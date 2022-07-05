import { TodoArray } from "./TodoList";
import { TodoService } from "./todoService";

export class TodoContorller {
  constructor(private todoService: TodoService) {} 

  public getTodoList(
    setLoading: (isLoading: boolean) => void,
    setError: (error: string | null) => void,
    setTodoList: (todoList: TodoArray) => void
  ) {
    return this.todoService.getTodoList(setLoading, setError, setTodoList);
  }

  public toggleDo(
    setTodoList: (todoList: TodoArray) => void,
    todoList: TodoArray
  ) {
    return this.todoService.toggleDo(setTodoList, todoList);
  }

  public addTodoInList(
    setTodoList: (todoList: TodoArray) => void,
    todoList: TodoArray
  ) {
    return this.todoService.addTodoInList(setTodoList, todoList);
  }

  public deleteTodoInList(
    setTodoList: (todoList: TodoArray) => void,
    todoList: TodoArray
  ) {
    return this.todoService.deleteTodoInList(setTodoList, todoList);
  }

  public saveTodoList(
    setLoading: (isLoading: boolean) => void,
    setError: (error: string | null) => void,
    todoList: TodoArray
  ) {
    return this.todoService.saveTodoList(setLoading, setError, todoList);
  }

  public deleteTodoList(
    setLoading: (isLoading: boolean) => void,
    setError: (error: string | null) => void
  ) {
    return this.todoService.deleteTodoList(setLoading, setError);
  }

  public onEditMode(
    setCurrentTodoId: (id: string | null) => void,
    setTodoText: (text: string) => void,
    setTodoList: (todoList: TodoArray) => void,
    todoList: TodoArray,
    currentTodoId: string | null,
    todoText: string
  ) {
    return this.todoService.onEditMode(
                              setCurrentTodoId, 
                              setTodoText, 
                              setTodoList,
                              todoList,
                              currentTodoId,
                              todoText
                            );
  }

  public endEditMode(
    setCurrentTodoId: (id: string | null) => void,
    setTodoText: (text: string) => void,
    setTodoList: (todoList: TodoArray) => void,
    currentTodoId: string | null,
    todoText: string,
    todoList: TodoArray
  ) {
    return this.todoService.endEditMode(
                              setCurrentTodoId, 
                              setTodoText,
                              setTodoList,
                              currentTodoId,
                              todoText,
                              todoList
                            );
  }

  public editTodoText(setTodoText: (text: string) => void) {
    return this.todoService.editTodoText(setTodoText);
  }


}