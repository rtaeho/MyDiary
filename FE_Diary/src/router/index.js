// src/router/index.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CalendarPage from "../pages/CalendarPage";
import DatePage from "../pages/DatePage";
import DiaryPage from "../pages/DiaryPage";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import KakaoCallback from "../pages/KakaoCallback";

const AppRouter = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/date/:date" element={<DatePage />} />
            <Route path="/diary/:date" element={<DiaryPage />} />
            <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRouter;
