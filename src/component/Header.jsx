import { useEffect, useRef } from "react";
import useLocalStorage from "use-local-storage";
import { generateId } from "../utils/id-generator";
import moonIcon from "../images/icon-moon.svg";
import sunIcon from "../images/icon-sun.svg";
import "./header.css";

const Header = ({ setTodoList }) => {
  // hooks
  const [darkMode, setDarkMode] = useLocalStorage("theme,false");
  const inputEl = useRef(null);

  useEffect(() => {
    const body = document.body.classList;
    darkMode ? body.add("dark--mode") : body.remove("dark--mode");
  }, [darkMode]);

  // func
  const createTodo = (event) => {
    event.preventDefault();
    let inputValue = inputEl.current.value;

    if (!inputValue) return; //return if user input is empty

    setTodoList((prevTodoList) => {
      return [
        ...prevTodoList,
        {
          text: inputValue,
          checked: false,
          id: new Date().getTime().toString(),
        },
      ];
    });
    // reset input text
    inputEl.current.value = "";
  };

  return (
    <div className={`header ${darkMode && "header--dark"}`}>
      <div className="header__content">
        <div className="header__switch">
          <h2>Todo</h2>
          <button onClick={() => setDarkMode(!darkMode)}>
            <img
              src={darkMode ? moonIcon : sunIcon}
              alt={darkMode ? "moon icon " : "sun icon"}
            />
          </button>
        </div>

        {/* Text input */}
        <form onSubmit={createTodo}>
          <div className="header__input__container">
            <span className="circle"></span>
            <input ref={inputEl} placeholder="Create a new todo..." />
            <button className="header__btn">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Header;
