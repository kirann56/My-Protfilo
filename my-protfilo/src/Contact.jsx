import "./Contact.css";

function Contact() {
  return (
    < >

      
      {/* <div className="color-orb orb1"></div>
      <div className="color-orb orb2"></div>
      <div className="color-orb orb3"></div>
      <div className="color-orb orb4"></div>
      <div className="color-orb orb5"></div>

      <header>
        <ul className="header-home">
          <li
            className="logo"
            style={{ fontFamily: "Caveat, cursive", fontSize: "40px" }}
          >
            Punna.in
          </li>
          <li><a className="header-home1" href="#">Resume |</a></li>
          <li><a className="header-home1" href="#">Projects |</a></li>
          <li><a className="header-home1" href="#">Contact</a></li>
        </ul>
      </header> */}

      <div className="container-detail">
        <div className="details">
          <h1>Contact</h1>
          <p>Looking forward to hearing from you</p>
          <h3>Phone</h3>
          <p>+91 9381911235</p>
          <h3>Email</h3>
          <p>kiranpunna58@gmail.com</p>
        </div>

        <div className="form-detail" style={{ marginTop: "18px" }}>
          <form>
            <div className="first-input">
              <div>
                <label htmlFor="first-name">First Name *</label>
                <input type="text" id="first-name" />
              </div>

              <div>
                <label htmlFor="last-name">Last Name *</label>
                <input type="text" id="last-name" />
              </div>
            </div>

            <div className="first-input" style={{ marginTop: "30px" }}>
              <div>
                <label htmlFor="email">Email *</label>
                <input type="email" id="email" />
              </div>

              <div>
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" />
              </div>
            </div>

            <div style={{ marginTop: "30px" }}>
              <label htmlFor="message">Message</label><br />
              <textarea id="text-area" rows="5"></textarea>
            </div>

            <div className="btn-div">
              <button className="btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <hr style={{ width: "93.5%", opacity: 0.9, marginTop: "340px" }} />
{/* 
      <footer className="container">
        <div>
          <b>Phone</b>
          <div>
            <img  className="phone" src="/images/viber.png" alt="phone" /> +91 9381911235
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

        <div style={{ opacity: 0.6, fontSize: "18px" }}>
          ⓒ Kiran Punna 2025
        </div>
      </footer> */}

    </>
  );
}

export default Contact;
