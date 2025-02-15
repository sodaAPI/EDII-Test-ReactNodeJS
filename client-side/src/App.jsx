import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import PageNotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Applicant from "./pages/Applicant";
import UserForm from "./pages/UserForm";

function App() {
  return (
    <div className="App ">
      <BrowserRouter>
        <Routes>
          {/* Global */}
          <Route path="/" element={<Login />} />
          <Route path="/*" element={<PageNotFound />} />

          {/* Authentication */}

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/dashboard" element={<Applicant />} />
          <Route path="/user-form/:uuid" element={<UserForm key="userUpdate" />} />
          <Route path="/user-form/new" element={<UserForm key="userCreate" />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
