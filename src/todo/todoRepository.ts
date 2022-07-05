import { Repository } from "../abstract/repository";
import { TodoArray } from "./TodoList";


export class TodoRepository implements Repository {
  
  constructor(private baseUrl: string) {
    
  }
  
  public getFetch(
    path: string, 
    query?: object
  ): Promise<any> {
    return Promise.resolve({ date: [ TodoArray.createTodo("") ] });
  }

  public postFetch (
    path: string, 
    data?: object | any[], 
    query?: object
  ): Promise<any> {
    return Promise.resolve("success");
  };

  public putFetch(
    path: string, 
    data?: object | any[], 
    query?: object
  ): Promise<any> {
    return Promise.resolve();
  }

  public deleteFetch (
    path: string, 
    data?: object | any[], 
    query?: object
  ): Promise<any> {
    return Promise.resolve("success");
  };

}