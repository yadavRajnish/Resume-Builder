import React, { useState, useRef } from "react";
import { FaMinusCircle } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaPhoneAlt } from "react-icons/fa";

const TemplateTwo = () => {
  const resumeRef = useRef();
  const [showDownloadButton, setShowDownloadButton] = useState(true);

  const [data, setData] = useState({
    name: "Rajnish Yadav",
    jobTitle: "Web Developer",
    profile: {
      summary:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci modi quis similique eius veritatis iusto ratione hic! Accusantium, pariatur nulla. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, officia. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, aliquid!",
    },
    contact: {
      phone: "+91 8523694156",
      email: "rajnishyadav@gmail.com",
      location: "Mumbai",
    },
    education: {
      degree: "Degree",
      college: "College",
      year: "Year",
    },
    language: ["Language 1", "Language 2", "Language 3"],
    skills: ["Skill 1", "Skill 2", "Skill 3"],
    experience: [
      {
        company: "Company",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, dolorum enim tempore velit aperiam eveniet soluta neque molestias suscipit ipsum?",
      },
    ],
  });

  const handleInput = (field, value, index, subfield) => {
    setData((prevData) => {
      const newData = { ...prevData };

      if (index !== undefined) {
        if (!newData[field]) {
          newData[field] = [];
        }
        if (!newData[field][index]) {
          newData[field][index] = {};
        }
        if (subfield) {
          newData[field][index][subfield] = value;
        } else {
          newData[field][index] = value;
        }
      } else {
        newData[field] = value;
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

  const handleDownload = async (type) => {
    const resumeElement = resumeRef.current;

    // Hide the download button during the download process
    setShowDownloadButton(false);

    // Hide the icons during the download process
    const iconsToHide = resumeElement.querySelectorAll(".download-hidden");
    iconsToHide.forEach((icon) => {
      icon.style.display = "none";
    });

    if (type === "image") {
      const canvas = await html2canvas(resumeElement);
      const imageData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imageData;
      link.download = "resume.png";
      link.click();
    } else if (type === "pdf") {
      const pdf = new jsPDF();
      pdf.text("Resume", 20, 10);
      pdf.fromHTML(resumeElement, 15, 15);
      pdf.save("resume.pdf");
    }

    // Show the download button after the download process
    setShowDownloadButton(true);

    // Show the icons after the download process
    iconsToHide.forEach((icon) => {
      icon.style.display = "block";
    });
  };

  return (
    <div className="mx-auto w-[60%] border pb-10" ref={resumeRef}>
      <div className="bg-[#d6dde6] h-[20vh] text-center">
        <h1
          className="font-bold text-5xl pt-10 cursor-pointer"
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
      </div>
      <div className="w-[70%] flex">
        <div className="bg-[#e8eaed] w-[60%] mx-5 left-section px-4 pt-6">
          <div className="profile">
            <h4 className="uppercase font-bold text-2xl">profile</h4>
            <p
              contentEditable
              suppressContentEditableWarning
              onInput={(e) =>
                handleInput("summary", e.currentTarget.textContent)
              }
            >
              {data.profile.summary}
            </p>
          </div>
          <div
            className="contact mt-
10"
          >
            <h4 className="uppercase font-bold text-2xl">contact me</h4>
            <p className="flex gap-2 items-center mt-4">
              <span>
                <FaPhoneAlt className="download-hidden" />
              </span>
              <span
                contentEditable
                suppressContentEditableWarning
                onInput={(e) =>
                  handleInput("phone", e.currentTarget.textContent)
                }
              >
                {data.contact.phone}
              </span>
            </p>
            <p className="flex gap-2 items-center mt-2">
              <span>
                <IoMail className="download-hidden" />
              </span>
              <span
                contentEditable
                suppressContentEditableWarning
                onInput={(e) =>
                  handleInput("email", e.currentTarget.textContent)
                }
              >
                {data.contact.email}
              </span>
            </p>
            <p className="flex gap-2 items-center mt-2">
              <span>
                <FaLocationDot className="download-hidden" />
              </span>
              <span
                contentEditable
                suppressContentEditableWarning
                onInput={(e) =>
                  handleInput("location", e.currentTarget.textContent)
                }
              >
                {data.contact.location}
              </span>
            </p>
          </div>
        </div>
        <div className="mt-4 w-[100%]">
          <div className="education">
            <h2 className="uppercase font-bold text-2xl">education</h2>
            <div>
              <p
                contentEditable
                suppressContentEditableWarning
                onInput={(e) =>
                  handleInput(
                    "degree",
                    e.currentTarget.textContent,
                    0,
                    "degree"
                  )
                }
              >
                {data.education.degree}
              </p>
              <p
                contentEditable
                suppressContentEditableWarning
                onInput={(e) =>
                  handleInput(
                    "college",
                    e.currentTarget.textContent,
                    0,
                    "college"
                  )
                }
              >
                {data.education.college}
              </p>
              <p
                contentEditable
                suppressContentEditableWarning
                onInput={(e) =>
                  handleInput("year", e.currentTarget.textContent, 0, "year")
                }
              >
                {data.education.year}
              </p>
            </div>
          </div>
          <div className="language mt-4">
            <h2 className="uppercase font-bold text-2xl">language</h2>
            {data.language.map((language, index) => (
              <div key={index} className="flex items-center mt-2">
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onInput={(e) =>
                    handleInput("language", e.currentTarget.textContent, index)
                  }
                >
                  {language}
                </span>
                <button
                  onClick={() => handleRemoveBox("language", index)}
                  className="ml-2 p-1 text-sm  text-white rounded"
                >
                  <FaMinusCircle className="download-hidden text-red-500" />
                </button>
              </div>
            ))}
            <button
              onClick={() => handleAddBox("language")}
              className="mt-2 p-1 text-sm  text-white rounded"
            >
              <FaCirclePlus className="download-hidden text-green-500" />
            </button>
          </div>
          <div className="skills mt-4">
            <h2 className="uppercase font-bold text-2xl">skills</h2>
            {data.skills.map((skill, index) => (
              <div key={index} className="flex items-center mt-2">
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onInput={(e) =>
                    handleInput("skills", e.currentTarget.textContent, index)
                  }
                >
                  {skill}
                </span>
                <button
                  onClick={() => handleRemoveBox("skills", index)}
                  className="ml-2 p-1 text-sm  text-white rounded"
                >
                  <FaMinusCircle className="download-hidden text-red-500" />
                </button>
              </div>
            ))}
            <button
              onClick={() => handleAddBox("skills")}
              className="mt-2 p-1 text-sm  text-white rounded"
            >
              <FaCirclePlus className="download-hidden text-green-500" />
            </button>
          </div>
          <div className="experience mt-4">
            <h2 className="uppercase font-bold text-2xl">Work experience</h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="mt-2">
                <div>
                  <h3
                    contentEditable
                    suppressContentEditableWarning
                    onInput={(e) =>
                      handleInput(
                        "experience",
                        e.currentTarget.textContent,
                        index,
                        "company"
                      )
                    }
                  >
                    {exp.company}
                  </h3>
                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onInput={(e) =>
                      handleInput(
                        "experience",
                        e.currentTarget.textContent,
                        index,
                        "description"
                      )
                    }
                  >
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
            <button
              onClick={() => handleAddBox("experience")}
              className="mt-2 p-1 text-sm text-white rounded"
            >
              <FaCirclePlus className="download-hidden text-green-500" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-end mr-10 mt-4">
        {showDownloadButton && (
          <>
            <button
              onClick={() => handleDownload("image")}
              className="p-2 bg-blue-500 text-white rounded mr-2"
            >
              Download as Image
            </button>
            <button
              onClick={() => handleDownload("pdf")}
              className="p-2 bg-blue-500 text-white rounded"
            >
              Download as PDF
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TemplateTwo;
