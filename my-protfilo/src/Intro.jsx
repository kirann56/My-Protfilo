import "./Intro.css";
import "./App.css"
import Footer from "./Footer";
import { Link } from "react-router-dom";
function Intro({ShowAlert}) {



  return (
    <>
    {/* <Background/> */}
    


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
            <Link  onClick={()=>ShowAlert('resume')} className="link" to="/resume"><li> <div className="circle1">Resume</div></li></Link>
                   <Link to="/project" className="link">    <li><div className="circle2">Projects</div></li></Link>
                          <Link to="/contact" className="link">    <li><div className="circle3">Contact</div></li></Link>
         
        
          </ul>
        </div>
      </div>

      <hr className="br-line" style={{ margin:"auto"}} />

      <Footer/>
    </>
  );
}

export default Intro;