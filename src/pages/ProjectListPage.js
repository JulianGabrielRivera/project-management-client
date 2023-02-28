// src/pages/ProjectListPage.js

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { BaseUrl } from "../services/BaseUrl";
import AddProject from "../components/AddProject";

const API_URL = BaseUrl;

function ProjectListPage({ projects, setProjects, getAllProjects, message }) {
  useEffect(() => {
    if (!projects.length) {
      getAllProjects();
    }
  }, []);

  return (
    <div className="ProjectListPage">
      <AddProject projects={projects} setProjects={setProjects} />
      {message && <h2>{message}</h2>}
      {projects.map((project) => {
        return (
          <div className="ProjectCard card" key={project._id}>
            <Link to={`/projects/${project._id}`}>
              <h3>{project.title}</h3>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default ProjectListPage;
