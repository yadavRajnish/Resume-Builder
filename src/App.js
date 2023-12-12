import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./component/HomePage/Home";
import { useState } from "react";
import Template from "./component/Templates/Template";


function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  return (
    <div className="app-container">

      <div className="template-sidebar border h-[130vh]">
        <Template onSelectTemplate={setSelectedTemplate} />
      </div>
      <div className="main-content">
        {selectedTemplate && <Home selectedTemplate={selectedTemplate} />}
      </div>
    </div>
  );
}

export default App;
