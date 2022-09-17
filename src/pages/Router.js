import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home";
import Admin from "./Admin";
import Delete from "./Delete";
import BookDetails from "./BookDetails";
import Book from "../components/Book";
import BookModal from "./BookModal";
import BookInfo from "../components/BookInfo";

export default function Router() {
  const location = useLocation();
  const backgroundLocation = location.state;

  return (
    <div>
      <Routes location={backgroundLocation || location} key={location.pathname}>
        <Route index element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/delete" element={<Delete />} />
        <Route path="/details/:id" element={<BookDetails />} />
      </Routes>

      {/* Show the modal when a background page is set */}
      {backgroundLocation && (
        <Routes>
          <Route path="/details/:id" element={<BookModal />} />
        </Routes>
      )}
    </div>
  );
}
