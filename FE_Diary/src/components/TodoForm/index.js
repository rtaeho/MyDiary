import React, { useState, useEffect } from "react";
import { updateTodo, createTodo } from "../../api/todoApi";

const TodoForm = ({ date, todo, onTodoUpdate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setIsEditing(true); // 수정 모드로 설정
    } else {
      setTitle("");
      setDescription("");
      setIsEditing(false); // 새로운 항목 추가 모드로 설정
    }
  }, [todo]);

  const handleSubmit = async () => {
    const todoData = { title, description };
    if (todo) {
      await updateTodo(todo.id, todoData);
    } else {
      await createTodo(date, todoData);
    }
    setTitle(""); // Clear the form fields
    setDescription("");
    onTodoUpdate();
  };

  return (
    <form
      className={`todo-form ${isEditing ? "todo-form--editing" : ""}`}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="todo-form__fields">
        <div className="todo-form__field">
          <input
            id="title"
            type="text"
            placeholder="새로운 할 일"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="todo-form__input"
          />
        </div>
        <div className="todo-form__field">
          <input
            id="description"
            type="text"
            placeholder="새로운 메모"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="todo-form__input"
          />
        </div>
        <button
          type="submit"
          className="todo-form__button"
          onClick={handleSubmit}
        >
          {isEditing ? "수정" : "추가"}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
