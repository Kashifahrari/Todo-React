import { useEffect, useState } from "react";
import "./App.css";
import { TodoPovider } from "./Contexts";
import TodoForm from "./Components/TodoForm";
import TodoItem from "./Components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((pre) => [{ id: Date.now(), ...todo }, ...pre]);
  };

  const updateTodo = (id, todo) => {
    {
      setTodos((prev) =>
        prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
      );
    }
  };
  const toggleCompleted = (id) => {
    setTodos((prev) =>
      prev.map((pretodo) =>
        pretodo.id === id
          ? { ...pretodo, completed: !pretodo.completed }
          : pretodo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((toodo) => toodo.id !== id));
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoPovider
      value={{ todos, addTodo, deleteTodo, updateTodo, toggleCompleted }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div className="w-full" key={todo.id}>
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoPovider>
  );
}

export default App;
