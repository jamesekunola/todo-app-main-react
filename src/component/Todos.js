import React, { useState, memo, useRef } from "react";
import Todo from "./Todo";
import "./todos.css";

const todoStatus = ["All", "Active", "Completed"];

function filterTodosByStatus(todos, status) {
  switch (status) {
    case "Active":
      return todos.filter((todos) => !todos.checked);
    case "Completed":
      return todos.filter((todos) => todos.checked);
    case "All":
    default:
      return todos;
  }
}

const Todos = memo(({ todoList, setTodoList }) => {
  // hook
  const [todoStatusFilter, setTodoStatusFilter] = useState("All");

  // variables
  let dragStartIndex;
  let dragOverItemIndex;

  // func onDragStart
  const onDragStart = (index) => {
    dragStartIndex = index;
  };

  // func onDragEnter
  const onDragEnter = (index) => {
    dragOverItemIndex = index;
  };

  // func onDragEnd
  const onDragEnd = () => {
    setTodoList((prevTodoList) => {
      const draggableList = [...prevTodoList];
      const draggedTodo = draggableList.splice(dragStartIndex, 1)[0];

      draggableList.splice(dragOverItemIndex, 0, draggedTodo);

      return draggableList;
    });
  };

  //get length of active todos
  const activeTasksCount = todoList.filter((todos) => !todos.checked).length;

  //filter todo list by selected status
  let displayedTodos = filterTodosByStatus(todoList, todoStatusFilter);

  // func to clear complected todos
  const displayActiveTodos = () => {
    setTodoList((prevTodoList) => prevTodoList.filter((todo) => !todo.checked));
  };

  return (
    <div className="todos">
      <div className="todos__list__container">
        {displayedTodos.map((todo, index) => (
          <Todo
            key={todo.id}
            {...todo}
            index={index}
            displayedTodos={displayedTodos}
            setTodoList={setTodoList}
            onDragStart={onDragStart}
            onDragEnter={onDragEnter}
            onDragEnd={onDragEnd}
          />
        ))}

        {/* if there is no todo hide todos__item__box */}
        {todoList.length > 0 && (
          <div className="todos__item__box">
            <p>{`${activeTasksCount} item left`}</p>
            <button onClick={displayActiveTodos}>Clear Completed</button>
          </div>
        )}
      </div>

      {todoList.length > 0 && (
        <div className="todos__status__box">
          {todoStatus.map((status) => (
            <button
              className={`todos__status__box__btn ${
                status === todoStatusFilter && "active"
              }`}
              key={status.toLowerCase()}
              onClick={() => setTodoStatusFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

export default Todos;
