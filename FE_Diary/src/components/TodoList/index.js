import React from "react";

const TodoList = ({ todos }) => {
  return (
    <div className="todo-list">
      <h2>To-do List</h2>
      <ul>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <li key={todo.id}>
              {todo.title} - {todo.description}
            </li>
          ))
        ) : (
          <li>No todos for this date</li>
        )}
      </ul>
    </div>
  );
};

export default TodoList;
