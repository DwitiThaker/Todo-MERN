import React, { useEffect, useState } from "react";
import "../components/create-todo.css";
import { useAuth } from "../components/Store/Auth";
import { NavLink, useParams } from "react-router-dom";

export const EditTodo = () => {
  const { id } = useParams(); 
  const { getTokenFromLS } = useAuth();
  const token = getTokenFromLS();

  const [edit, setEdit] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);

  const loadTask = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/todo/view_todo_by_id/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.view) {
        setEdit({
          title: data.view.title,
          description: data.view.description,
        });
      }

      setLoading(false);
    } catch (error) {
      console.error("Fetch edit todo failed:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
  if (!id || id === "undefined") {
    console.error("Invalid ID in URL:", id);
    return; 
  }

  loadTask();
}, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/todo/update_todo_by_id/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(edit),
        }
      );

      if (response.ok) {
        alert("Task updated successfully!");
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <div className="create-container">
        <div className="create-image">
          <img src="/image.jpg" alt="decorative artwork" />
        </div>

        <div className="login-form">
          <h1 className="main-heading mb-3">Edit Task</h1>

          <div className="create-input">
            <input
              type="text"
              name="title"
              placeholder="title"
              onChange={handleInput}
              value={edit.title}
            />

            <textarea
              rows="5"
              cols="30"
              name="description"
              placeholder="description"
              onChange={handleInput}
              value={edit.description}
            ></textarea>
          </div>

          <div className="btn-create">
            <NavLink to="/View">
              <button className="button-create" type="button">
                Cancel
              </button>
            </NavLink>

            <button
              className="button-create"
              type="button"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
