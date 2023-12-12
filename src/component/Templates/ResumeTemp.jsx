import React from "react";

const ResumeTemp = ({data}) => {
  return (
    <div>
      <div className="">
        <div className="header">
          <h1>Name:{data.name}</h1>
          <p>Title: {data.jobTitle}</p>
        </div>
        <div className="section">
          <h2>Contact Information</h2>
          <p>Email: {data.email}</p>
          <p>Phone: {data.phone}</p>
          {/* Add other contact information fields as needed */}
        </div>
        <div className="section">
          <h2>Education</h2>
          <p>{data.education}</p>
          {/* Add other education details as needed */}
        </div>
        <div className="section">
          <h2>Experience</h2>
          <p>{data.experience}</p>
          {/* Add other experience details as needed */}
        </div>
        <div className="section">
          <h2>Skills</h2>
          <ul>
            {data.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemp;
