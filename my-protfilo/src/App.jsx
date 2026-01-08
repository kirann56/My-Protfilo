import { Routes, Route } from "react-router-dom";
import Intro from "./Intro";
import Contact from "./Contact";
import Navbar from "./Navbar";
import Background from "./Background";
import Chatbot from "./Chatbot";
import Resume from "./Resume";
import Project  from "./Project";
import { useState,useEffect } from "react";
import Alert from "./Alert";
import Login from "./Login";

function App() {





  const [alert, setalert] = useState(null);


   useEffect(() => {
    const clearStorage = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
    };

    window.addEventListener("beforeunload", clearStorage);

    return () => {
      window.removeEventListener("beforeunload", clearStorage);
    };
  }, []);
  
  const ShowAlert=(messege)=>{

    setalert({msg:messege})

setTimeout(() => {
  setalert(null)
  
}, 2000);

  }


  


  return (
  <>
  <Background/>
  <Navbar />
  <Alert alert={alert}/>
  <Routes>

    <Route path="/" element={<Intro ShowAlert={ShowAlert} />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/resume" element={<Resume />} />
    <Route path="/project" element={<Project/>}/>

    <Route path="/chatbot" element={<Chatbot/>}/>
     <Route path="/login" element={<Login/>}/>

</Routes>
</>

  );
}

export default App;
