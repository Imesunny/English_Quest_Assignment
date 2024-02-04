// AddBooks.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBooks = ({ fetchData }) => {
  const notify = (message) => toast(message);

  const Navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleAddBook = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/books/add", { title, author });
      toast.info("Data Successfully Added", {
        position: "top-center",
      });
      setTitle("");
      setAuthor("");
      fetchData();
     
    } catch (error) {
      console.error("Error adding book:", error.message);
    }
  };

  const handleViewBooks = () => {
    Navigate("/booklist");
  };

  return (
    <div>
      <button onClick={handleViewBooks} style={{ marginTop: "20px" }}>
        VIEW BOOKS
      </button>
      <form className="formss" onSubmit={handleAddBook}>
        <h2>Add Books</h2>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Author:
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
        <button>ADD BOOKS</button>
      </form>
    </div>
  );
};

export default AddBooks;
