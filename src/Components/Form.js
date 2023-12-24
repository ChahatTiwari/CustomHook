import React from 'react';
// import './Form.css';
export default function Form({
  currentPage,
  itemsPerPage,
  todos,
  Addtodo,
  setNewTodo,
  ToggleTodo,
  handleDelete
}) {
  return (
    <>
      <div className="outerDiv">
        <input
          className="Input"
          onChange={(e) => setNewTodo(e.target.value)}
          type="text"
        />
        <button className="btn" onClick={Addtodo}>
          Add
        </button>
        <ol className="TodoList">
          {todos
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((todo) => (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  name="todoStatus"
                  defaultChecked={todo.completed}
                  onChange={() => ToggleTodo(todo, todo.id)}
                  className="todo-checkbox"
                />
                <span className="todo-title">{todo.title}</span>
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
              </li>
            ))}
        </ol>
      </div>
    </>
  );
}
