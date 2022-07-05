import React, { useMemo } from "react";
import { Todo } from "../todoEntity";

interface TodoBlockProps {
  todo: Todo;
  currentTodoId: string | null;
  todoText: string;
  onEditMode: (targetId: string) => () => void;
  editTodoText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  endEditMode: () => void;
  toggleDo: (targetId: string) => () => void;
  deleteTodoInList: (targetId: string) => () => void;
}

const TodoBlock: React.FC<TodoBlockProps> = ({
  todo,
  currentTodoId,
  todoText,
  onEditMode,
  editTodoText,
  toggleDo,
  endEditMode,
  deleteTodoInList
}) => {

  const editMode = useMemo(() => todo.id === currentTodoId, [todo, currentTodoId]);

  const onEditCurrentTodo = useMemo(() => 
    onEditMode(todo.id)
  , [onEditMode, todo]);

  const toggleCurrentTodo = useMemo(() => 
    toggleDo(todo.id)
  , [toggleDo, todo]);

  const deleteCurrentTodo = useMemo(() => 
    deleteTodoInList(todo.id)
  , [deleteTodoInList, todo]);

  return (
    <div className="flex justify-between w-full my-2 leading-7 shadow h-7">
      <button 
        onClick={toggleCurrentTodo}
        className="block p-0 w-7 h-7"
      >
        <div className={`w-full h-full rounded-full border border-solid border-gray-600 ${todo.do? "bg-slate-600" : "bg-white"}`}></div>
      </button>

      <div className="w-[80%] h-full leading-7">
        {
          editMode?
          <div className="flex w-full h-full">
            <input 
              className="w-[80%]"
              type="text" 
              value={todoText} 
              onChange={editTodoText} 
            />
            <button 
              className="w-[10%]"
              onClick={endEditMode}
            >
              작성 완료
            </button>
          </div>
          : <p className="w-full h-full" onClick={onEditCurrentTodo}>{todo.text}</p>
        }
      </div>

      <button className="block p-0 h-7 w-fit" onClick={deleteCurrentTodo}>
        삭제
      </button>
    </div>
  );
}

export default TodoBlock;