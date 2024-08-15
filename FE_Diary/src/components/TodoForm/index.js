import React, { useState } from "react";

const TodoForm = ({ onAddTodo }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      onAddTodo({
        title,
        description,
      });
      setTitle("");
      setDescription("");
      setSuccessMessage("Todo added successfully!");
      setErrorMessage("");
    } else {
      setErrorMessage("Both title and description are required.");
      setSuccessMessage("");
    }
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setSuccessMessage("");
    setErrorMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Todo</button>
      <button type="button" onClick={handleReset}>
        Reset
      </button>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </form>
  );
};

export default TodoForm;
