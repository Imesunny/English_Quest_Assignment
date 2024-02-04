import React, { useState, useEffect } from "react";
import axios from "axios";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [newBooks, setNewBooks] = useState([]);
  const [oldBooks, setOldBooks] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    // Retrieve selectedRole from localStorage
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
    try {
      await axios.delete(`/books/${id}`);
      // Refresh the books list after deletion
      fetchData();
    } catch (error) {
      console.error("Error deleting book:", error.message);
    }
  };

  return (
    <div>
      <h2>All Books</h2>
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
                  <button onClick={() => handleDeleteBook(book._id)}>
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={fetchNewBooks}>Fetch New Books</button>
        <button onClick={fetchOldBooks}>Fetch Old Books</button>
      </div>

      <h2>New Books (Last 10 minutes)</h2>
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

      <h2>Old Books (Before Last 10 minutes)</h2>
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
  );
};

export default BookList;
