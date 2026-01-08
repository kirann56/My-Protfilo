import { useEffect, useState } from "react";
import Footer from "./Footer";
import "./Project.css";
import "./App.css";
import SideCard from "./SideCard";
import api from "./Api";

export default function Projects() {
  const [projectDetails, setProjectDetails] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects/getallprojects");
        setProjectDetails(response.data);
        console.log("Projects:", response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);
  

  

  return (
    <>
      <div className="projects-container" id="projects">
        <SideCard />
        <h1 className="projects-title">Projects</h1>

        {projectDetails.length === 0 && (
          <p style={{ color: "white", textAlign: "center" }}>
            No projects found
          </p>
        )}

        {projectDetails.map((details) => (
          <div
            className="project-card"
            key={details.project_id}
          >
            <div className="project-content">
              <div className="project-image-container">
                <img
                  src={
                   details.ImageUrl ??
    "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&h=600&fit=crop"}
                    
                  alt={details.ProjectName}
                  className="project-image"
                />
                <div className="project-image-overlay"></div>
              </div>

              <div className="project-info">
                <div className="project-number">
                  {details.project_id}
                </div>

                <h2 className="project-title">
                  {details.ProjectName}
                </h2>

                <p className="project-description">
                  {details.ProjectContent}
                </p>

                <div className="project-tech">
                  <div className="project-tech-label">
                    Tech Stack
                  </div>

                  <div className="tech-stack">
                    {details.TechStcak
                      ?.split(",")
                      .map((tech, index) => (
                        <span
                          className="tech-tag"
                          key={index}
                        >
                          {tech.trim()}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="project-actions">
                  <a
                    className="action-btn"
                    href={details.GitHubLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="/images/preview.png"
                      alt="GitHub"
                    />
                  </a>

                  <a
                    className="action-btn"
                    href={details.PreviewLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="/images/web-programming.png"
                      alt="Preview"
                    />
                  </a>
                   <a
                    className="action-btn"
                    // href={}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="/images/comments.png"
                      alt="Preview"
                    />
                  
                  </a>

                  
                  <a
                    className="action-btn"
                    // href={}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="/images/heart.png"
                      alt="Preview"
                    />
                  
                  </a>
                   <h6 style={{marginTop:'43.9px',marginLeft:'186.2px',position:'absolute'}}>{details.project_votes}</h6> 
                  

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr className="br-line" style={{ margin: "auto" }} />
      <Footer />
    </>
  );
}
