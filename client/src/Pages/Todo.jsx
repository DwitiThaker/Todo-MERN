import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../components/Store/Auth";
import "../components/Todo.css";

export const Todo = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [deleteResult, setDeleteResult] = useState("");
  const [todos, setTodos] = useState([]); 
  const [loading, setLoading] = useState(true);

  const { getTokenFromLS } = useAuth();

  const handleInput = (e) => {
    setSearch(e.target.value);
  };


  const loadTodos = async () => {
    const token = getTokenFromLS();

    try {
      const response = await fetch(
        "http://localhost:5000/api/todo/read_all_todos",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setTodos(data.todos || []);
      }
    } catch (error) {
      console.log("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);


  const searchTask = async () => {
    const token = getTokenFromLS();

    if (!search.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/todo/view_todo_by_id/${search}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSearchResult(data.view || null);
      } else {
        setSearchResult(null);
      }
    } catch (error) {
      console.log("Search Todo: ", error);
    }
  };


  const deleteBtn = async (id) => {
    const token = getTokenFromLS();

    try {
      const response = await fetch(
        `http://localhost:5000/api/todo/delete_todo_by_id/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setTodos(todos.filter((t) => t._id !== id));
        setDeleteResult("Task deleted successfully!");
        setSearchResult(null);
      }
    } catch (error) {
      console.log("Delete Todo: ", error);
    }
  };

  return (
    <div className="todo-page">
      <div className="main">
        <div className="slides">

          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="Search task by ID..."
              onChange={handleInput}
              value={search}
            />
            <button className="search-btn" onClick={searchTask}>
              Search
            </button>
          </div>

          {searchResult && (
            <>
              <div className="todo-container-m">
                <div className="card-m">Title</div>
                <div className="desc-m">Description</div>
                <div className="edit">Edit</div>
                <div className="delete">Delete</div>
                <div className="status-m">Done</div>
              </div>

              <div className="todo-container">
                <div className="card">{searchResult.title}</div>
                <div className="desc">
                  <p>{searchResult.description}</p>
                </div>
                <div className="edit">
                  <NavLink to={`/edit/${searchResult._id}`}>Edit</NavLink>
                </div>
                <div
                  className="delete"
                  onClick={() => deleteBtn(searchResult._id)}
                >
                  Delete
                </div>
                <div className="status">
                  <input type="checkbox" />
                </div>
              </div>
            </>
          )}


          <h3 style={{ marginTop: 20, textAlign: "center" }}>All Your Tasks</h3>

          <div className="todo-scroll">
            {loading ? (
              <p>Loading...</p>
            ) : todos.length === 0 ? (
              <p>No tasks found.</p>
            ) : (
              todos.map((todo) => (
                <div key={todo._id} className="todo-row">
                  <div className="title-text">{todo.title}</div>
                  <div className="desc-text">
                    <p>{todo.description}</p>
                  </div>
                  <div className="action-col">
                    <NavLink
                      to={`/edit/${todo._id}`}
                      className="btn-small btn-edit"
                    >
                      Edit
                    </NavLink>
                  </div>
                  <div className="action-col">
                    <button
                      className="btn-small btn-delete"
                      onClick={() => deleteBtn(todo._id)}
                    >
                      Delete
                    </button>
                  </div>
                  <div className="status-col">
                    <input type="checkbox" />
                  </div>
                </div>
              ))
            )}
          </div>

          {deleteResult && (
            <p style={{ color: "crimson", marginTop: "10px" }}>
              {deleteResult}
            </p>
          )}
        </div>

        <div className="btn">
          <NavLink to="/Create">
            <button className="button" type="button">
              Create Task
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

{
  /* {!searchResult && (
            <>
              <h3 style={{ marginTop: "20px" }}>All Your Tasks</h3>

              {loading ? (
                <p>Loading...</p>
              ) : todos.length === 0 ? (
                <p>No tasks found.</p>
              ) : (
                todos.map((todo) => (
                  <div key={todo._id}>
                    <div className="todo-container">
                      <div className="card">{todo.title}</div>
                      <div className="desc">
                        <p>{todo.description}</p>
                      </div>

                      <div className="edit">
                        <NavLink to={`/edit/${todo._id}`}>Edit</NavLink>
                      </div>

                      <div className="delete" onClick={() => deleteBtn(todo._id)}>
                        Delete
                      </div>

                      <div className="status">
                        <input type="checkbox" />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </>
          )} */
}
