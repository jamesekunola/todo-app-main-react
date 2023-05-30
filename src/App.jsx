import useLocalStorage from "use-local-storage";
import Header from "./component/Header";
import Todos from "./component/Todos";

const App = () => {
  // hooks
  const [todoList, setTodoList] = useLocalStorage("todos", []);

  // functions
  return (
    <>
      <Header setTodoList={setTodoList} />
      <Todos todoList={todoList} setTodoList={setTodoList} />
    </>
  );
};

export default App;
