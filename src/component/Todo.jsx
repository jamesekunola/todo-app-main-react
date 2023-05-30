import React, { useRef } from "react";
import closeIcon from "../images/icon-cross.svg";
import "./todos.css";

const Todo = React.memo(
  ({
    id,
    index,
    text,
    checked,
    displayedTodos,
    setTodoList,
    onDragStart,
    onDragEnter,
    onDragEnd,
  }) => {
    // function to delete todo
    const deleteTodo = (event, id) => {
      // add exit animation to deleted todos
      const todoEl = event.target.closest("button").parentElement;
      todoEl.classList.add("todo--exit");

      setTimeout(() => {
        setTodoList((prevTodoList) =>
          prevTodoList.filter((todo) => todo.id !== id)
        );
      }, 400);
    };

    // function to toggle todos radio btn
    const toggleTodoRadioBtn = (id) => {
      const todoToUpdateIndex = displayedTodos.findIndex(
        (todo) => todo.id === id
      );
      if (todoToUpdateIndex > -1) {
        const todos = [...displayedTodos];
        const todoToUpdate = todos[todoToUpdateIndex];
        todos[todoToUpdateIndex] = {
          ...todoToUpdate,
          checked: !todoToUpdate.checked,
        };
        setTodoList(todos);
      }
    };

    return (
      <div
        className="todo"
        draggable
        onDragStart={(e) => onDragStart(index)}
        onDragEnter={(e) => onDragEnter(index)}
        onDragEnd={onDragEnd}
      >
        <div className="todo__info" onClick={() => toggleTodoRadioBtn(id)}>
          <span className={`todo__checked ${checked && "checked"}`}></span>
          <p className={checked ? "done" : null}>{text}</p>
        </div>
        <button onClick={(e) => deleteTodo(e, id)}>
          <img src={closeIcon} alt="delete" />
        </button>
      </div>
    );
  }
);

export default Todo;
