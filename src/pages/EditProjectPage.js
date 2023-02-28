// src/pages/EditProjectPage.js

import { useParams, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";

import { BaseUrl } from "../services/BaseUrl";

function EditProjectPage({
  projects,
  setProjects,
  getAllProjects,
  setMessage,
}) {
  const [project, setProject] = useState(null);

  const { projectId } = useParams();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProject((recent) => ({ ...recent, [e.target.name]: e.target.value }));
  };
  const getIndex = (array, thisId) => {
    return array.findIndex((element) => element._id === thisId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${BaseUrl}/projects/${projectId}`, project)
      .then((response) => {
        console.log("Updated project", response.data);
        let newProjects = [...projects];
        // let projectIndex = newProjects.findIndex(
        //   (element) => element._id === projectId
        // );
        newProjects[getIndex(newProjects, projectId)] = response.data;
        // newProjects.splice(projectIndex, 1, response.data);
        console.log("newProjects", newProjects);
        setProjects(newProjects);
        navigate("/projects");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProject = () => {
    //  <== ADD
    // Make a DELETE request to delete the project
    axios
      .delete(`${BaseUrl}/projects/${projectId}`)
      .then((response) => {
        console.log("DELETE", response.data);
        let newProjects = [...projects];
        newProjects.splice(getIndex(newProjects, projectId), 1);
        setProjects(newProjects);
        setMessage(response.data.message);
        setTimeout(() => {
          setMessage("");
        }, 4000);
        // Once the delete request is resolved successfully
        // navigate back to the list of projects.
        navigate("/projects");
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (!projects.length) {
      axios
        .get(`${BaseUrl}/projects/${projectId}`)
        .then((response) => {
          console.log("LINE 48", response.data);
          const oneProject = response.data;
          setProject(oneProject);
        })
        .catch((error) => console.log(error));
    } else {
      console.log("LINE 53");
      let thisProject = projects.find((project) => project._id === projectId);
      setProject(thisProject);
    }
  }, []);

  return (
    <div className="EditProjectPage">
      <h3>Edit the Project</h3>

      {project ? (
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={project.title}
            onChange={handleChange}
          />

          <label>Description:</label>
          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
          />

          <button type="submit">Submit</button>
        </form>
      ) : (
        <h4>Loading...</h4>
      )}

      <button onClick={deleteProject}>Delete Project</button>
    </div>
  );
}

export default EditProjectPage;
