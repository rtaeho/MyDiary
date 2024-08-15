import React from "react";
import ReactDOM from "react-dom/client"; // `react-dom` 대신 `react-dom/client`에서 임포트
import AppRouter from "./router"; // router/index.js의 기본 내보내기를 임포트
import "./scss/style.scss"; // SCSS 파일 임포트

// Create a root element and render the AppRouter component
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
