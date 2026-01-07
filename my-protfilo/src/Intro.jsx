import "./Intro.css";
import "./App.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "./Api";
import Footer from "./Footer";
import SideCard from "./SideCard";

function Intro({ ShowAlert }) {
  const [profileLikes, setprofileLikes] = useState([]);


  useEffect(() => {
  const Upvotes= async()=>{
    try{
    const votes=await api.get('/profile_upvote/getall-upvotes');
    setprofileLikes(votes.data)
    console.log(votes.data);}
    catch (error){
      console.error(error);
    }
  };

Upvotes();

  }, [])
  





  const [displayText, setDisplayText] = useState({
    normal: "",
    highlight: ""
  });
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const sentences = [
    {
      normal: "Welcome to my AI-powered profile — ",
      highlight: "I'm Kiran Punna."
    },
    {
      normal: "I build intelligent, scalable solutions using ",
      highlight: "Machine Learning and Generative AI."
    },
    {
      normal: "Discover my technical journey, projects, and ",
      highlight: "problem-solving approach."
    },
    {
      normal: "Interact with my Spirit AI bot to get ",
      highlight: "detailed insights and information."
    }
  ];

  
  useEffect(() => {
    const current = sentences[sentenceIndex];
    const fullText = current.normal + current.highlight;

    const typedLength =
      displayText.normal.length + displayText.highlight.length;

    const typingSpeed = isDeleting ? 8 : 8;
    const pauseBeforeDelete = 2500;

    const timer = setTimeout(() => {
      if (!isDeleting && typedLength === fullText.length) {
        setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
      } 
      else if (isDeleting && typedLength === 0) {
        setIsDeleting(false);
        setSentenceIndex((prev) => (prev + 1) % sentences.length);
      } 
      else {
        const newLength = isDeleting
          ? typedLength - 1
          : typedLength + 1;

        const normalPart = fullText.slice(0, current.normal.length);
        const highlightPart = fullText.slice(current.normal.length);

        setDisplayText({
          normal: normalPart.slice(
            0,
            Math.min(newLength, normalPart.length)
          ),
          highlight:
            newLength > normalPart.length
              ? highlightPart.slice(0, newLength - normalPart.length)
              : ""
        });
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, sentenceIndex, isDeleting]);

  return (
    <>
      
      <div className="sentence-container">
        <div className="animated-sentence">
          {displayText.normal}
          <span id="inner-text">{displayText.highlight}</span>
          <span className="cursor">|</span>
        </div>
      </div>

      <SideCard />

     
      <div className="main">
        <div className="profile"></div>

        <div className="main-content">
          <h1>Hii I'm Kiran Punna</h1>
          <p className="about-bit">A Bit About Me</p>
          <p className="about-me">
            3rd-year BTech student specializing in Machine Learning, Deep Learning,
            and Generative AI, focused on building intelligent, real-world solutions
            with measurable impact.
          </p>

          <ul className="circles">
            <Link
              className="link"
              to="/resume"
              onClick={() => ShowAlert("resume")}
            >
              <li>
                <div className="circle1">Resume</div>
              </li>
            </Link>

            <Link className="link" to="/project">
              <li>
                <div className="circle2">Projects</div>
              </li>
            </Link>

            <Link className="link" to="/contact">
              <li>
                <div className="circle3">Contact</div>
              </li>
            </Link>
          </ul>
        </div>
      </div>

     
      <div className="profile-social-media">
        <div className="social-media-new">
          <a
            href="https://www.linkedin.com/in/kiran-punna-b50774330/"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/images/linkedin (1).png" alt="linkedin" />
          </a>

          <a
            href="https://github.com/Mr-kiran56"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/images/github.png" alt="github" />
          </a>

          <a
            href="https://leetcode.com/u/kiran_punna/"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/images/leetcode.png" alt="leetcode" />
          </a>

            <a
            // href="https://leetcode.com/u/kiran_punna/"
            // target="_blank"
            // rel="noreferrer"
          >
            <img src="/images/upvote.png" alt="leetcode" /> {profileLikes.total_profile_upvotes}<h6>People Liked This Profile</h6>
          </a>

        </div>
      </div>

      <hr className="br-line" style={{ margin: "auto" }} />

      <Footer />
    </>
  );
}

export default Intro;
