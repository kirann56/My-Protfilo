import "./App.css";

function Footer() {
  return (
    <footer className="container">
      <div>
        <b>Phone</b>
        <div>
          <img className="phone" src="/images/viber.png" alt="phone" />
          +91 9381911235
        </div>
      </div>

      <div className="social-media">
        <b>Email</b>
        <div className="email">kiranpunna58@gmail.com</div>
      </div>

      <div>
        <div style={{ marginBottom: "15px" }}>
          <b>Follow Me On</b>
        </div>
        <div className="social-media">
          <a href="www.linkedin.com/in/kiran-punna-b50774330" target="_blank">
            <img src="/images/linkedin (1).png" alt="linkedin" />
          </a>
          <a href="https://github.com/Mr-kiran56" target="_blank">
            <img src="/images/github.png" alt="github" />
          </a>
          <a href="https://leetcode.com/u/kiran_punna/" target="_blank">
            <img src="/images/leetcode.png" alt="leetcode" />
          </a>
        </div>
      </div>

      <div style={{ opacity: 0.6, fontSize: "15px" }}>
        ⓒ Kiran Punna 2025
      </div>
    </footer>
  );
}

export default Footer;
