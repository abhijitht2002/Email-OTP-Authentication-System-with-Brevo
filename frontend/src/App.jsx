import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./pages/register/AuthLayout";
import Verification from "./pages/register/Verification";
import Register from "./pages/register/Register";
import Success from "./pages/register/Success";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route index element={<Verification />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-success" element={<Success />} />
      </Route>
    </Routes>
  );
}

export default App;
