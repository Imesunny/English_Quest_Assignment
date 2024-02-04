import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";
import Booklist from "../Components/Booklist";
import AddBooks from "../Components/AddBooks";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/booklist" element={<Booklist />} />
      <Route path="/addBook" element={<AddBooks />} />
    </Routes>
  );
};

export default AllRoutes;
