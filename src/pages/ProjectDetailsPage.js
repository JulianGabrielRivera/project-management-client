// src/pages/ProjectDetailsPage.js

import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { BaseUrl } from "../services/BaseUrl";

function ProjectDetailsPage({
  projects,
  setProjects,
  getAllProjects,
  setMessage,
}) {
  const [project, setProject] = useState(null);

  const { projectId } = useParams(); // <== ADD

  // Helper function that makes a GET request to the API
  // and retrieves the project by id
  const getProject = () => {
    //  <== ADD A NEW FUNCTION
    axios
      .get(`${BaseUrl}/projects/${projectId}`)
      .then((response) => {
        const oneProject = response.data;
        setProject(oneProject);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (!projects.length) {
      console.log("NETWORK REQUEST");
      getProject();
    } else {
      console.log("NETWORK SAVE");
      let thisProject = projects.find((project) => project._id === projectId);
      setProject(thisProject);
    } // <== ADD AN EFFECT
  }, []);

  return (
    <div className="ProjectDetails">
      {project && (
        <>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </>
      )}

      {project &&
        project.tasks.map((task) => (
          <li className="TaskCard card" key={task._id}>
            <h3>{task.title}</h3>
            <h4>Description:</h4>
            <p>{task.description}</p>
          </li>
        ))}

      <Link to="/projects">
        <button>Back to projects</button>
      </Link>

      <Link to={`/projects/edit/${projectId}`}>
        <button>Edit Project</button>
      </Link>
    </div>
  );
}

export default ProjectDetailsPage;
