// src/App.js

import "./App.css";
import { Routes, Route } from "react-router-dom"; // <== IMPORT

import Navbar from "./components/Navbar"; // <== IMPORT
import HomePage from "./pages/HomePage"; // <== IMPORT
import ProjectListPage from "./pages/ProjectListPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import EditProjectPage from "./pages/EditProjectPage.js";

import { useEffect, useState } from "react";

import { BaseUrl } from "./services/BaseUrl";

import axios from "axios";

function App() {
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState("");

  const getAllProjects = () => {
    axios
      .get(`${BaseUrl}/projects`)
      .then((response) => {
        console.log("RESPONSE", response.data);
        setProjects(response.data);
      })
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div className="App">
      {/* Below: ADD <Navbar>, <Routes> & <Route> */}
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/projects"
          element={
            <ProjectListPage
              projects={projects}
              setProjects={setProjects}
              getAllProjects={getAllProjects}
              message={message}
              setMessage={setMessage}
            />
          }
        />
        <Route
          path="/projects/:projectId"
          element={
            <ProjectDetailsPage
              projects={projects}
              setProjects={setProjects}
              getAllProjects={getAllProjects}
              setMessage={setMessage}
            />
          }
        />
        <Route
          path="/projects/edit/:projectId"
          element={
            <EditProjectPage
              projects={projects}
              setProjects={setProjects}
              getAllProjects={getAllProjects}
              setMessage={setMessage}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
