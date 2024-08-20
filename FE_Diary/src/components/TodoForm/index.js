import React, { useState, useEffect } from "react";

const TodoForm = ({ onAddTodo, editingTodo, onUpdateTodo }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTodo) {
      onUpdateTodo(editingTodo.id, { title, description });
    } else {
      onAddTodo({ title, description });
    }
    setTitle(""); // Submit 후에 입력 필드를 초기화
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">{editingTodo ? "Update Todo" : "Add Todo"}</button>
    </form>
  );
};

export default TodoForm;
