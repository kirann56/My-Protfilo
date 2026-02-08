import "./App.css";

function Footer() {
  return (
    <footer className="container">
      <div className="footer-item">
        <b>Phone</b>
        <div className="footer-content">
          <img className="phone" src="/images/viber.png" alt="phone" />
          +91 9381911235
        </div>
      </div>

      <div className="footer-item">
        <b>Email</b>
        <div className="footer-content email">kiranpunna58@gmail.com</div>
      </div>

      <div className="footer-item">
        <b>Follow Me On</b>
        <div className="social-media">
          <a href="https://www.linkedin.com/in/kiran-punna-b50774330/" target="_blank" rel="noopener noreferrer">
            <img src="/images/linkedin (1).png" alt="linkedin" />
          </a>
          <a href="https://github.com/Mr-kiran56" target="_blank" rel="noopener noreferrer">
            <img src="/images/github.png" alt="github" />
          </a>
          <a href="https://leetcode.com/u/kiran_punna/" target="_blank" rel="noopener noreferrer">
            <img src="/images/leetcode.png" alt="leetcode" />
          </a>
        </div>
      </div>

      <div className="footer-item copyright">
        <span>ⓒ Kiran Punna 2025</span>
      </div>
    </footer>
  );
}

export default Footer;