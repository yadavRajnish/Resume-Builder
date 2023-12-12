import React, { useState } from "react";
import ResumeTemp from "../Templates/ResumeTemp";
import TemplateOne from "../Templates/TemplateOne";
import TemplateTwo from "../Templates/TemplateTwo";
import TemplateThree from "../Templates/TemplateThree";

const Home = ({ selectedTemplate }) => {
  const [data, setData] = useState({
    name: "",
    jobTitle: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    skills: [],
  });

  const handleChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handleDownload = () => {
    // Convert data to a format suitable for download (e.g., JSON to PDF)
    const formattedData = JSON.stringify(data, null, 2);

    // Create a Blob from the formatted data
    const blob = new Blob([formattedData], { type: "application/json" });

    // Create a download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.json";

    // Trigger the download
    document.body.appendChild(a);
    a.click();

    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="">
      {/* <div className="flex justify-end mb-2">
        <button onClick={handleDownload} className="rounded-full border p-2">
          Download Resume
        </button>
      </div> */}

      {selectedTemplate === 1 && (
        <TemplateOne data={data} onChange={handleChange} />
      )}
      {selectedTemplate === 2 && (
        <TemplateTwo data={data} onChange={handleChange} />
      )}
      {/* {selectedTemplate === 3 && (
        <TemplateThree data={data} onChange={handleChange} />
      )} */}
    </div>
  );
};

export default Home;
