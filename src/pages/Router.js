import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home";
import Admin from "./Admin";
import Delete from "./Delete";

export default function Router() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route index element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/delete" element={<Delete />} />
    </Routes>
  );
}
