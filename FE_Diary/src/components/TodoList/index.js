import React, { useState } from "react";

const TodoList = ({ todos, onDeleteTodo, onEditTodo, onUpdateTodo }) => {
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  const handleEditClick = (todo) => {
    setEditingTodoId(todo.id);
    setEditedTitle(todo.title);
    setEditedDescription(todo.description);
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
  };

  const handleSaveEdit = (id) => {
    onUpdateTodo(id, { title: editedTitle, description: editedDescription });
    setEditingTodoId(null);
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {editingTodoId === todo.id ? (
            <div>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
              <button onClick={() => handleSaveEdit(todo.id)}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          ) : (
            <div>
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
              <button onClick={() => onDeleteTodo(todo.id)}>Delete</button>
              <button onClick={() => handleEditClick(todo)}>Edit</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
