import "./Sidecard.css";
import { useEffect, useState } from "react";

function SideCard() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if user has previously closed the card
    const isClosed = sessionStorage.getItem("sideCardClosed");
    if (isClosed === "true") {
      setIsVisible(false);
    }
  }, []);

  const handleClose = (e) => {
    e.stopPropagation();
    setIsVisible(false);
    sessionStorage.setItem("sideCardClosed", "true");
  };

  const handleCardClick = () => {
    window.open("/chatbot", "_blank");
  };

  if (!isVisible) return null;

  return (
    <div className="message-alert" onClick={handleCardClick}>
      <img className="ai-chat" src="/images/chat-ai.png" alt="AI Chat" />
      <div className="alert-text">
        <b>Chat with SpiritAI</b>
        <p>Get to know me better</p>
      </div>
      <button className="close-btn" onClick={handleClose} aria-label="Close">
        ×
      </button>
    </div>
  );
}

export default SideCard;