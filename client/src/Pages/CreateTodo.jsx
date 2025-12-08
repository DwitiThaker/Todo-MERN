import React from "react";
import "../components/create-todo.css";
import { useState } from "react";
import { useAuth } from "../components/Store/Auth";
import { NavLink } from "react-router-dom";

export const CreateTodo = () => {
  const [write, setWrite] = useState({
    title: "",
    description: "",
  });

  const { getTokenFromLS } = useAuth();
  const token = getTokenFromLS();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("working...");

    try {
      const response = await fetch(
        `http://localhost:5000/api/todo/create_todo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(write),
        }
      );
      if (response.ok) {
        getTokenFromLS();
        const data = await response.json();
      }

      setWrite({ title: "", description: "" });
      console.log(write);
    } catch (error) {
      console.error("Create: ", error);
    }
  };

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setWrite((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="create-container">
        <div className="create-image">
          <img src="/image.jpg" alt="decorative artwork" />
        </div>
        <div className="login-form">
          <h1 className="main-heading mb-3">Create Task</h1>
          <div className="create-input">
            <input
              type="text"
              name="title"
              placeholder="title"
              onChange={handleInput}
              value={write.title}
            />
            <textarea
              rows="5"
              cols="30"
              name="description"
              placeholder="description"
              onChange={handleInput}
              value={write.description}
            ></textarea>
          </div>

          <div className="btn-create">
            <NavLink to="/View">
              {" "}
              <button className="button-create" type="button">
                Cancel
              </button>
            </NavLink>
            <button
              className="button-create"
              type="button"
              onClick={handleSubmit}
            >
              Create Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
