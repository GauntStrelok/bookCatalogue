import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
import Home from "./Home";
import Admin from "./Admin";
import Delete from "./Delete";

export default function Router() {
  const location = useLocation();
  //   const userData = useSelector((state) => state.USER_LOGIN);

  return (
    <Routes location={location} key={location.pathname}>
      <Route index element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/delete" element={<Delete />} />
    </Routes>
  );
}
