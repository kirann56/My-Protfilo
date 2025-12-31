import "./Intro.css";

function Intro() {
  return (
    <>
    

      {/* <header>
        <ul className="header-home">
          <li
            className="logo"
            style={{ fontFamily: "Caveat, cursive", fontSize: "40px" }}
          >
            Punna.in
          </li>
          <li><a className="header-home1" href="/resume">Resume |</a></li>
          <li><a className="header-home1" href="/projects">Projects |</a></li>
          <li><a className="header-home1" href="/contact">Contact</a></li>
        </ul>
      </header> */}

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
            <li><div className="circle1">Resume</div></li>
            <li><div className="circle2">Projects</div></li>
            <li><div className="circle3">Contact</div></li>
          </ul>
        </div>
      </div>

      <hr className="br-line" />

      {/* <footer className="container">
        <div>
          <b>Phone</b>
          <div>
            <img src="/images/viber.png" style={{height:"30px"}} alt="phone" /> +91 9381911235
          </div>
        </div>

        <div>
          <b>Email</b>
          <div className="email">kiranpunna58@gmail.com</div>
        </div>

        <div>
          <div style={{ marginBottom: "15px" }}>
            <b>Follow Me On</b>
          </div>
          <div className="social-media">
          <a> <img src="/images/linkedin.png" alt="linkedin" /></a> 
            <a><img src="/images/github-sign.png" alt="github" /></a>
            <a><img src="/images/instagram.png" alt="instagram" /></a>
          </div>
        </div>

        <div style={{ opacity: 0.6, fontSize: "14px" }}>
          ⓒ Kiran Punna 2025
        </div>
      </footer> */}
    </>
  );
}

export default Intro;
