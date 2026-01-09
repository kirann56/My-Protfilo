import { useEffect, useState } from "react";
import Footer from "./Footer";
import "./Project.css";
import "./App.css";
import SideCard from "./SideCard";
import api from "./Api";
import { getToken } from "./auth";

export default function Projects() {
  const [projectDetails, setProjectDetails] = useState([]);
  const [likedProjects, setLikedProjects] = useState(new Set());
  const [commentedProjects, setCommentedProjects] = useState(new Set());

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


    
    const fetchUserInteractions = async () => {
      const token = getToken();
      if (!token) return;

      try {
        // Fetch user's liked projects
        const likesRes = await api.get("/PROJECT_LIKE/user-likes", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLikedProjects(new Set(likesRes.data.liked_project_ids || []));

        // Fetch user's commented projects
        const commentsRes = await api.get("/PROJECT_COMMENT/user-comments", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCommentedProjects(new Set(commentsRes.data.commented_project_ids || []));
      } catch (error) {
        console.error("Error fetching user interactions:", error);
      }
    };

    fetchProjects();
    fetchUserInteractions();
  }, []);






  const handleLike = async (projectId) => {
    const token = getToken();
    if (!token) {
      alert("Please login to like projects!");
      window.location.href = "/login";
      return;
    }

    try {
      const isLiked = likedProjects.has(projectId);
      
      await api.post(
        "/PROJECT_LIKE/",
        {
          project_id: projectId,
          dir: isLiked ? 0 : 1 // 0 = unlike, 1 = like
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );





      // Update local state
      setLikedProjects(prev => {
        const newSet = new Set(prev);
        if (isLiked) {
          newSet.delete(projectId);
        } else {
          newSet.add(projectId);
        }
        return newSet;
      });



      // Update vote count
      setProjectDetails(prev =>
        prev.map(project =>
          project.project_id === projectId
            ? {
                ...project,
                project_votes: isLiked
                  ? project.project_votes - 1
                  : project.project_votes + 1
              }
            : project
        )
      );

      alert(isLiked ? "Like removed!" : "Thanks for liking!");
    } catch (error) {
      console.error("Error liking project:", error);
      if (error.response?.status === 409) {
        alert("You've already liked this project!");
      } else {
        alert("Failed to like project. Please try again.");
      }
    }
  };



  const handleComment = async (projectId) => {
    const token = getToken();
    if (!token) {
      alert("Please login to comment!");
      window.location.href = "/login";
      return;
    }

    const comment = prompt("Enter your comment:");
    if (!comment || comment.trim() === "") return;

    try {
      await api.post(
        "/PROJECT_COMMENT/",
        {
          project_id: projectId,
          comment_text: comment.trim()
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setCommentedProjects(prev => new Set([...prev, projectId]));
      alert("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment. Please try again.");
    }
  };







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
          <div className="project-card" key={details.project_id}>
            <div className="project-content">
              <div className="project-image-container">
                <img
                  src={`https://images.unsplash.com/${details.ImageUrl}?auto=format&fit=crop&h=390&w=450&q=80`}
                  alt="Project preview"
                  onError={(e) => {
                    e.target.src = `https://source.unsplash.com/800x600/?technology,coding&sig=${details.project_id}`;
                  }}
                />
                <div className="project-image-overlay"></div>
              </div>

              <div className="project-info">
                <div className="project-number">{details.project_id}</div>

                <h2 className="project-title">{details.ProjectName}</h2>

                <p className="project-description">{details.ProjectContent}</p>

                <div className="project-tech">
                  <div className="project-tech-label">Tech Stack</div>

                  <div className="tech-stack">
                    {details.TechStcak?.split(",").map((tech, index) => (
                      <span className="tech-tag" key={index}>
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
                    title="View on GitHub"
                  >
                    <img src="/images/preview.png" alt="GitHub" />
                  </a>

                  <a
                    className="action-btn"
                    href={details.PreviewLink}
                    target="_blank"
                    rel="noreferrer"
                    title="Live Preview"
                  >
                    <img src="/images/web-programming.png" alt="Preview" />
                  </a>

                  <button
                    className="action-btn"
                    onClick={() => handleComment(details.project_id)}
                    title="Add Comment"
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer"
                    }}
                  >
                    <img
                      src="/images/comments.png"
                      alt="Comment"
                      style={{
                        opacity: commentedProjects.has(details.project_id)
                          ? 1
                          : 0.6
                      }}
                    />
                  </button>

                  <button
                    className="action-btn"
                    onClick={() => handleLike(details.project_id)}
                    title={
                      likedProjects.has(details.project_id)
                        ? "Unlike"
                        : "Like"
                    }
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer"
                    }}
                  >
                    <img
                      src="/images/heart.png"
                      alt="Like"
                      style={{
                        opacity: likedProjects.has(details.project_id) ? 1 : 0.6,
                        filter: likedProjects.has(details.project_id)
                          ? "brightness(1.2)"
                          : "none"
                      }}
                    />
                  </button>

                  <h6
                    style={{
                      marginTop: "43.9px",
                      marginLeft: "186.2px",
                      position: "absolute",
                      color: likedProjects.has(details.project_id)
                        ? "#ff6b6b"
                        : "inherit"
                    }}
                  >
                    {details.project_votes}
                  </h6>
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