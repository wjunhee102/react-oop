import React from "react";
import { TodoViewProps } from "../types";
import TodoBlock from "./TodoBlock";

const TodoView: React.FC<TodoViewProps> = ({
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
}) => (
  <div className="w-screen h-screen ">
    <h1>{title}</h1>
    <div className="p-2">
      {
        todoList.map(todo => 
          <TodoBlock 
            key={todo.id}
            todo={todo}
            currentTodoId={currentTodoId}
            todoText={todoText}
            onEditMode={onEditMode}
            editTodoText={editTodoText}
            endEditMode={endEditMode}
            toggleDo={toggleDo}
            deleteTodoInList={deleteTodoInList}
          />  
        )
      }
    </div>
    <div className="flex justify-center">
      <button className="mx-2" onClick={addTodoInList}>
        추가
      </button>
      <button className="mx-2" onClick={saveTodoList}>
        스토리지에 저장
      </button>
      <button className="mx-2" onClick={deleteTodoList}>
        스토리지에 삭제
      </button>
    </div>
  </div>
);

export default TodoView;