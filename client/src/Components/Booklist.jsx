import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Modules/Booklist.css";
import AddBooks from "./AddBooks";
import { useNavigate } from "react-router-dom";

const BookList = () => {
    const Navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [newBooks, setNewBooks] = useState([]);
  const [oldBooks, setOldBooks] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [render, setRender] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    const role = localStorage.getItem("selectedRole");
    setSelectedRole(role);

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error.message);
    }
  };

  const fetchNewBooks = async () => {
    try {
      const response = await axios.get("/books/new");
      setNewBooks(response.data);
    } catch (error) {
      console.error("Error fetching new books:", error.message);
    }
  };

  const fetchOldBooks = async () => {
    try {
      const response = await axios.get("/books/old");
      setOldBooks(response.data);
    } catch (error) {
      console.error("Error fetching old books:", error.message);
    }
  };

  const handleDeleteBook = async (id) => {
    alert('Sure, you want to delete this?')
    try {
      await axios.delete(`/books/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting book:", error.message);
    }
  };

  const handleAddBook = () => {
    setRender(true);
    Navigate("/addBook");
  };

  return (
    <div>
      {selectedRole === "CREATOR" && (
        <button onClick={handleAddBook} className="add-book-btn">
          Add Book
        </button>
      )}
      {render && <AddBooks fetchData={fetchData} />}
      <h2>All Books</h2>
      <div className="book-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Created At</th>
              {selectedRole === "CREATOR" && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{new Date(book.createdAt).toLocaleString()}</td>
                {selectedRole === "CREATOR" && (
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteBook(book._id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="button-container">
        <button onClick={fetchNewBooks}>New Books</button>
        <button onClick={fetchOldBooks}>Old Books</button>
      </div>

      <h2>New Books (Last 10 minutes)</h2>
      <div className="book-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Created At</th>
              {selectedRole === "CREATOR" && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {newBooks.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{new Date(book.createdAt).toLocaleString()}</td>
                {selectedRole === "CREATOR" && (
                  <td>
                    <button onClick={() => handleDeleteBook(book._id)}>
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Old Books (Before Last 10 minutes)</h2>
      <div className="book-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Created At</th>
              {selectedRole === "CREATOR" && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {oldBooks.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{new Date(book.createdAt).toLocaleString()}</td>
                {selectedRole === "CREATOR" && (
                  <td>
                    <button onClick={() => handleDeleteBook(book._id)}>
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookList;
