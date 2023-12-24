import React, { useState, useEffect } from 'react';
import useFetch from './Components/Fetch.js';
import Pagination from './Components/Pagination.js';
import Form from './Components/Form.js';
export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  // const [checked, setChecked] = useState(false);
  const apiUrl = 'https://jsonplaceholder.typicode.com/todos';
  const { data: fetchedData, error: fetchError } = useFetch(apiUrl);

  useEffect(() => {
    if (fetchedData) {
      setTodos(fetchedData);
    }
  }, [fetchedData]);

  const Addtodo = async () => {
    await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify({
        title: newTodo,
        completed: false,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => setTodos([data, ...todos]));
    console.log('hi', newTodo, todos);
    setNewTodo('');
  };

  const ToggleTodo = async (e, todo) => {
    console.log(e, todo);
    await fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        completed: !todo.completed,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    setTodos(
      todos.map((toodo) =>
        toodo.id === todo.id ? { ...toodo, completed: !toodo.completed } : toodo
      )
    );
    // setChecked(!checked);
  };

  const handleDelete = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    });
    setTodos(todos.filter((todo) => todo.id !== id));
    console.log(id, 'ididididid');
  };

  return (
    <>
      <h1>Todo Here</h1>
      {/* <input onChange={(e) => setNewTodo(e.target.value)} type="text" />
      <button onClick={Addtodo}>Add</button> */}
      {/* <ol>
        {todos
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                name="todoStatus"
                defaultChecked={todo.completed}
                onChange={() => ToggleTodo(todo.id)}
                className="todo-checkbox"
              />
              <span className="todo-title">{todo.title}</span>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </li>
          ))}
      </ol> */}
      <Form
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        todos={todos}
        Addtodo={Addtodo}
        setNewTodo={setNewTodo}
        ToggleTodo={ToggleTodo}
        handleDelete={handleDelete}
      />
      {fetchError && <p>Error fetching data: {fetchError.message}</p>}
      <Pagination
        currentPage={currentPage}
        totalItems={todos.length}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
