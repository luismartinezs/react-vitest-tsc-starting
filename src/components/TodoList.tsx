import { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [current, setCurrent] = useState("");

  const clearInput = () => {
    setCurrent("");
  };

  const getNewId = () => {
    return todos.length ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;
  };

  const addTodo = () => {
    const currentTodo = {
      todo: current,
      id: getNewId(),
    };
    setTodos((todos) => [...todos, currentTodo]);
    clearInput();
  };

  const handleChange = (event) => {
    setCurrent(event.target.value);
  };

  const completeTodo = (id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const status = `${
    todos.filter((todo) => !todo.done).length
  } remaining out of ${todos.length} tasks`;

  let taskList = null;
  if (todos.length > 0) {
    taskList = (
      <ul>
        {todos.map(({ todo, id, done }) => {
          return (
            <li
              key={id}
              onClick={() => completeTodo(id)}
              className={done ? "is-done" : ""}
            >
              {todo}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <>
      <div>
        <h2>Todo List</h2>
      </div>
      <div>
        <input
          type="text"
          aria-label="Enter new todo"
          value={current}
          onChange={handleChange}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <div className="task-counter">{status}</div>
      {taskList}
      <style>{`
                .is-done {
                    text-decoration: line-through;
                }
            `}</style>
    </>
  );
};

export default TodoList;
