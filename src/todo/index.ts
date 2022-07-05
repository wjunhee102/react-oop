import Error from "./components/Error";
import Loading from "./components/Loading";
import TodoView from "./components/TodoView";
import { TodoContorller } from "./todoController";
import { TodoModule, TodoModuleProps } from "./todoModule";
import { TodoRepository } from "./todoRepository";
import { TodoService } from "./todoService";
import { TodoValidation } from "./todoValidation";

const module: TodoModuleProps = {
  controller: TodoContorller,
  provider: TodoService,
  repository: TodoRepository,
  validation: TodoValidation,
  loadingComponent: Loading,
  errorComponent: Error,
  view: TodoView
}

const Todo = new TodoModule(module).element;

export default Todo;