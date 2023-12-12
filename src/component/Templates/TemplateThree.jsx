import React, { useState } from "react";
import { FaMinusCircle } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";

const TemplateThree = () => {
  const [data, setData] = useState({
    name: "Rajnish Yadav",
    jobTitle: "Web Developer",
    profile: {
      summary:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium aperiam blanditiis excepturi nobis ipsam fugit quisquam eaque ducimus nesciunt dolor, ut facere, aliquam fugiat fuga nisi magnam reiciendis. Commodi ab blanditiis nobis. Ea quos, facilis quis, corporis ad nam consequatur soluta sint consectetur deserunt, eligendi laudantium earum? Fuga, ab minima.",
    },
    contact: {
      email: "rajnishyadav@gmail.com",
      phone: "+91 8629536225",
      location: "Mumbai",
    },
    education: {
      college: "College",
      course: "Course",
      date: "Date",
    },
    experience: [
      {
        company: "Company",
        date: "Date",
        description:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur atque minus corporis similique vitae est accusamus, quia praesentium dolor ad!",
      },
    ],
    skills: ["", "", ""],
  });

  const handleInput = (field, value, index, subfield) => {
    setData((prevData) => {
      const newData = { ...prevData };
  
      // Reverse the text content before updating the state
      const reversedValue = value.split('').reverse().join('');
  
      if (index !== undefined) {
        if (!newData[field]) {
          newData[field] = [];
        }
        if (!newData[field][index]) {
          newData[field][index] = {};
        }
        newData[field][index][subfield] = reversedValue;
      } else {
        if (Array.isArray(newData[field])) {
          newData[field] = [...newData[field]];
          newData[field] = newData[field].map((item, i) =>
            i === index ? reversedValue : item
          );
        } else {
          newData[field] = reversedValue;
        }
      }
  
      return newData;
    });
  };
  

  const handleAddBox = (field) => {
    setData((prevData) => ({
      ...prevData,
      [field]: [
        ...prevData[field],
        `New ${field.charAt(0).toUpperCase() + field.slice(1)} Box`,
      ],
    }));
  };

  const handleRemoveBox = (field, index) => {
    setData((prevData) => {
      const newData = { ...prevData };
      newData[field].splice(index, 1);
      return newData;
    });
  };

  const incrementSkills = () => {
    setData((prevData) => ({
      ...prevData,
      skills: [...prevData.skills, ""],
    }));
  };

  return (
    <div className="w-[50%] border text-direction">
      <div className="">
        <h1
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => handleInput("name", e.currentTarget.textContent)}
        >
          {data.name}
        </h1>
        <h2
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => handleInput("jobTitle", e.currentTarget.textContent)}
        >
          {data.jobTitle}
        </h2>
        <p
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => handleInput("profile", e.currentTarget.textContent)}
        >
          {data.profile.summary}
        </p>
      </div>

      <div className="skills">
        {data.skills.map((skill, index) => (
          <div key={index} className="flex items-center mt-2">
            <span
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => handleInput("skills", e.currentTarget.textContent, index)}
            >
              {skill}
            </span>
            <button
              onClick={() => handleRemoveBox("skills", index)}
              className="ml-2 p-1 text-sm bg-red-500 text-white rounded"
            >
              <FaMinusCircle />
            </button>
          </div>
        ))}
        <button
          onClick={() => incrementSkills()}
          className="mt-2 p-1 text-sm bg-green-500 text-white rounded"
        >
          <FaCirclePlus />
        </button>
      </div>

      <div className="education">
        <p
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => handleInput("education", e.currentTarget.textContent, 0, "college")}
        >
          {data.education.college}
        </p>
        <p
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => handleInput("education", e.currentTarget.textContent, 0, "course")}
        >
          {data.education.course}
        </p>
        <p
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => handleInput("education", e.currentTarget.textContent, 0, "date")}
        >
          {data.education.date}
        </p>
      </div>

      <div className="experience">
        {data.experience.map((exp, index) => (
          <div key={index} className="mt-2">
            <div>
              <h3
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => handleInput("experience", e.currentTarget.textContent, index, "company")}
              >
                {exp.company}
              </h3>
              <p
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => handleInput("experience", e.currentTarget.textContent, index, "date")}
              >
                {exp.date}
              </p>
              <p
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => handleInput("experience", e.currentTarget.textContent, index, "description")}
              >
                {exp.description}
              </p>
            </div>
          </div>
        ))}
        <button
          onClick={() => handleAddBox("experience")}
          className="mt-2 p-1 text-sm bg-green-500 text-white rounded"
        >
          <FaCirclePlus />
        </button>
      </div>

      <div className="contact">
        <p
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => handleInput("contact", e.currentTarget.textContent, 0, "email")}
        >
          {data.contact.email}
        </p>
        <p
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => handleInput("contact", e.currentTarget.textContent, 0, "phone")}
        >
          {data.contact.phone}
        </p>
        <p
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => handleInput("contact", e.currentTarget.textContent, 0, "location")}
        >
          {data.contact.location}
        </p>
      </div>
    </div>
  );
};

export default TemplateThree;
