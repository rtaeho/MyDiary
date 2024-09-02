import React, { useState, useEffect } from "react";
import { updateTodo, createTodo } from "../../api/todoApi";
import { useSelector } from "react-redux";

const TodoForm = ({ date, todo, onTodoUpdate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showWarning, setShowWarning] = useState(""); // 경고 메시지 상태
  const isLogin = useSelector((state) => state.user.isLogin); // 로그인 상태 확인

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

  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 제출 시 기본 동작 방지

    if (!isLogin) {
      setShowWarning("로그인하지 않으면 저장되지 않습니다!");
      return;
    }

    if (!title) {
      setShowWarning("할 일을 입력해주세요!");
      return;
    }

    const todoData = { title, description };
    if (todo) {
      await updateTodo(todo.id, todoData);
    } else {
      await createTodo(date, todoData);
    }
    setTitle(""); // 입력란 초기화
    setDescription("");
    onTodoUpdate();
    setShowWarning(""); // 성공적으로 저장되면 경고 메시지 숨기기
  };

  return (
    <form
      className={`todo-form ${isEditing ? "todo-form--editing" : ""}`}
      onSubmit={handleSubmit}
    >
      <div className="todo-form__fields">
        <div className="todo-form__field">
          <input
            id="title"
            type="text"
            placeholder="새로운 할 일"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            className="todo-form__input"
          />
        </div>
        <button type="submit" className="todo-form__button">
          {isEditing ? "수정" : "추가"}
        </button>
      </div>
      {showWarning && <p className="todo-warning-message">{showWarning}</p>}
    </form>
  );
};

export default TodoForm;
