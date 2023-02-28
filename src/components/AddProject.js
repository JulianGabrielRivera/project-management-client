// src/components/AddProject.js

import { useState } from "react";
import axios from "axios";

import { BaseUrl } from "../services/BaseUrl";



function AddProject({ projects, setProjects }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {                          // <== ADD
    e.preventDefault();
 
    const requestBody = { title, description };


    axios
      .post(`${BaseUrl}/projects`, requestBody)
      .then((response) => {
        setProjects([response.data, ...projects])
        console.log(response.data)
        // Reset the state
        setTitle("");
        setDescription("");
      })
      .catch((error) => console.log(error));
  };
 


  return (
    <div className="AddProject">
      <h3>Add Project</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddProject;
