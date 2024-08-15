// src/router/index.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CalendarPage from "../pages/CalendarPage";
import DatePage from "../pages/DatePage";
import DiaryPage from "../pages/DiaryPage";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const AppRouter = () => {
  return (
    <Router>
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/date/:date" element={<DatePage />} />
          <Route path="/diary/:date" element={<DiaryPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default AppRouter;
