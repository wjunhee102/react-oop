import React, { useEffect, useMemo, useState } from "react";
import { Module } from "../abstract/module";
import { TodoContorller } from "./todoController";
import { TodoArray } from "./TodoList";
import { TodoRepository } from "./todoRepository";
import { TodoService } from "./todoService";
import { TodoValidation } from "./todoValidation";
import { TodoElementProps, TodoErrorComponentProps, TodoLoadingComponentProps, TodoViewProps } from "./types";

export interface TodoModuleProps {
  controller: typeof TodoContorller;
  provider: typeof TodoService;
  repository: typeof TodoRepository;
  validation: typeof TodoValidation;
  loadingComponent: React.FC<TodoLoadingComponentProps>;
  errorComponent: React.FC<TodoErrorComponentProps>;
  view: React.FC<TodoViewProps>;
}

export class TodoModule<T extends TodoModuleProps> implements Module {

  private todoController!: TodoContorller;
  private loadingComponent!: React.FC<TodoLoadingComponentProps>;
  private errorComponent!: React.FC<TodoErrorComponentProps>; 
  private todoView!: React.FC<TodoViewProps>;

  constructor(props: T) {
    this.init(props);
  }

  private init(props: T) {

    const {
      controller,
      provider,
      repository,
      validation,
      loadingComponent,
      errorComponent,
      view
    } = props;

    const todoRepository = new repository("todo");
    const todoValidation = new validation();
    const todoService    = new provider(todoRepository, todoValidation);

    this.todoController   = new controller(todoService);
    this.loadingComponent = loadingComponent;
    this.errorComponent   = errorComponent;
    this.todoView         = view;
  }

  /* eslint-disable */
  public element = ({ title }: TodoElementProps) => {

    const [ todoList, setTodoList ]           = useState<TodoArray>(new TodoArray());
    const [ currentTodoId, setCurrentTodoId ] = useState<string | null>(null);
    const [ todoText, setTodoText ]           = useState<string>("");
    const [ isLoading, setLoading ]           = useState<boolean>(false);
    const [ error, setError ]                 = useState<string | null>(null);

    const onEditMode = useMemo(() => 
      this.todoController.onEditMode(
                            setCurrentTodoId, 
                            setTodoText, 
                            setTodoList,
                            todoList,
                            currentTodoId,
                            todoText
                          )
    , [todoList, currentTodoId, todoText]);

    const endEditMode = useMemo(() =>
      this.todoController.endEditMode(
                            setCurrentTodoId,
                            setTodoText,
                            setTodoList,
                            currentTodoId,
                            todoText,
                            todoList
                          )
    , [todoList, currentTodoId, todoText]);

    const editTodoText = useMemo(() => 
      this.todoController.editTodoText(setTodoText)
    , []);

    const toggleDo = useMemo(() =>
      this.todoController.toggleDo(setTodoList, todoList)
    , [todoList]);

    const addTodoInList = useMemo(() => 
      this.todoController.addTodoInList(setTodoList, todoList)
    , [todoList]);

    const deleteTodoInList = useMemo(() => 
      this.todoController.deleteTodoInList(setTodoList, todoList)
    , [todoList]);

    const saveTodoList = useMemo(() =>
      this.todoController.saveTodoList(
                            setLoading, 
                            setError,
                            todoList
                          )
    , [todoList]);

    const deleteTodoList = useMemo(() => 
      this.todoController.deleteTodoList(
                            setLoading,
                            setError
                          )
    , []);

    useEffect(() => {
      this.todoController.getTodoList(
                            setLoading, 
                            setError, 
                            setTodoList
                          );
    }, []);

    const Loading  = this.loadingComponent;
    const TodoView = this.todoView;
    const Error    = this.errorComponent;

    const viewProps = {
      title,
      todoList,
      currentTodoId,
      todoText,
      onEditMode,
      endEditMode,
      editTodoText,
      toggleDo,
      addTodoInList,
      deleteTodoInList,
      saveTodoList,
      deleteTodoList
    }

    return (
      <Loading isLoading={isLoading}>
        <TodoView {...viewProps} />
        <Error 
          error={error}
          setError={setError}
        />
      </Loading>
    );
  }

}