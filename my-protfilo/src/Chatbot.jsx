import "./Chatbot.css"
import ReactMarkdown from "react-markdown";

function Chatbot(){


  const output = document.getElementById("output");
  let recognition;

  function startListening() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;        
    recognition.interimResults = true;   

    output.innerText = ""; // clear old text
    recognition.start();

    recognition.onresult = (event) => {
      let transcript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }

      output.innerText = transcript;
    };

    recognition.onend = () => {
     
      sendToChatbot(output.innerText);
    };

    recognition.onerror = (event) => {
      console.error("Speech error:", event.error);
    };
  }

  async function sendToChatbot (text){
    console.log("User said:", text);
      const res = await api.post("/profilechatbotResponce", {
        username,
        question,
      });

  }

  






    



    return (
        <>
         <div className="chat-container">
        <div className="chat-messages" id="chatMessages">
            <div className="welcome-message">
                <h2>Welcome to Spirit AI Assistant</h2>
                <p>How can I help you today?</p>
            </div>

            {/* <div className="message bot">
                <div className="message-avatar">AI</div>
                <div className="message-content">
                    Hello! I'm your AI assistant. Feel free to ask me anything!
                </div>
            </div> */}

            <div className="message user">

                <div className="message-avatar">U</div>
                <div className="message-content">
                    Tell me about your capabilities
                </div>

            </div>


            <div className="message bot">


                <div className="message-avatar">AI</div>
                <div className="message-content">
                    I can help you with various tasks including answering questions, providing information, helping with code, creative writing, and much more. What would you like to know?
                </div>


            </div>

            
        </div>


        <div className="input-container">
            <input 
                type="text" 
                className="chat-input" 
                id="chatInput" 
                placeholder="Type your message here..."
                autocomplete="off"
            />
            <button className="send-button" id="sendButton">Send</button>
        </div>
    </div>
        </>
    );
}
export default Chatbot;