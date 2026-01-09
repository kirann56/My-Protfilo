import { useEffect, useState } from "react";
import Footer from "./Footer";
import "./Project.css";
import "./App.css";
import SideCard from "./SideCard";
import api from "./Api";
import { getUserId } from "./auth";

export default function Projects() {
  const [projectDetails, setProjectDetails] = useState([]);
  const [src_image, setSrcImage] = useState("/images/heart.png");
  const upvoted_src = "/images/upstar.png";

  
  const [profileLikes, setprofileLikes] = useState({
    total_project_upvotes: 0
  });

  const Upvotes = async () => {
    try {
      const votes = await api.get("/profile_upvote/getall-upvotes");
      setprofileLikes(votes.data);
    } catch (error) {
      console.error("Error fetching upvotes:", error);
    }
  };


  

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



    const isUpVote = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await api.get("/project_upvote/is_project_upvote", {
        project_id:details.project_id,
        user_id:getUserId(),
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.data.is_upvoted === true) {
        setSrcImage(upvoted_src);
      }
    } catch (err) {
      console.error("Error checking upvote status:", err);
    }
  };

  

  const PostUpvote = async () => {
    if (src_image === upvoted_src) {
      alert("You have already upvoted!");
      return;
    }

    const token = getToken();
    if (!token) {
      alert("Please login to upvote!");
      window.location.href = "/login";
      return;
    }

    try {
      console.log("Sending upvote request...");
      
      const response = await api.post(
        "/profile_upvote/",
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Upvote response:", response.data);
      
      setSrcImage(upvoted_src);
      await Upvotes();
      alert(response.data.message || "Thanks for upvoting!");
    } catch (error) {
      console.error("Full error:", error);
      console.error("Error response:", error.response?.data);
      
      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
        window.location.href = "/login";
      } else if (error.response?.data?.detail) {
        alert(error.response.data.detail);
      } else {
        alert("Failed to upvote. Please try again.");
      }
    }
  };

 

  useEffect(() => {
    Upvotes();
    isUpVote();
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
  src={`https://images.unsplash.com/${details.ImageUrl}?auto=format&fit=crop&h=390&w=450&q=80`}
  alt="Project preview"
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
                  <h6 style={{marginTop:'43.9px',marginLeft:'128.2px',position:'absolute'}}>{(details.project_comments).length}</h6> 

                  
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
