import React, { useState, useRef } from "react";
import { FaMinusCircle } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import html2canvas from "html2canvas";

const TemplateOne = () => {
  const [editing, setEditing] = useState(null);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [data, setData] = useState({
    name: "Rajnish Yadav",
    jobTitle: "MERN Stack developer",
    professionalProfile:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia beatae lorem ipsum dolor sit amet consectetur adipisicing elit. Quia beatae lorem dolor sit ipsum dolor sit amet consectetur adipisicing elit. Quia beatae lorem",
    experiences: [
      {
        title: "Web Developer",
        date: "April 2023 - December 2023",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad minima...",
      },
    ],
    education: [
      {
        degree: "Master Of E-commerce",
        description:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium, illo.",
      },
    ],
    skills: ["Skill 1", "Skill 2", "Skill 3"],
    languages: ["Language 1", "Language 2", "Language 3"],
    profileImage: "", // New state for profile image
    phone: "123-456-7890",
    mail: "example@email.com",
    url: "https://example.com",
    address: "123 Main St, City, Country",
  });

  const resumeRef = useRef();

  const handleEdit = (field) => {
    setEditing(field);
  };

  const handleEditItem = (field, index, subField, value) => {
    const newData = { ...data };
    newData[field][index][subField] = value;
    setData(newData);
  };

  const handleChange = (field, index, value) => {
    const newData = { ...data };

    if (index !== undefined) {
      newData[field][index] = value;
    } else {
      newData[field] = value;
    }

    setData(newData);
  };

  const handleBlur = () => {
    setEditing(null);
  };

  const handleMouseOver = () => {
    setIsMouseOver(true);
  };

  const handleMouseOut = () => {
    setIsMouseOver(false);
    setEditing(null);
  };

  const handleAddBox = (field) => {
    setData({
      ...data,
      [field]: [
        ...data[field],
        `New ${field.charAt(0).toUpperCase() + field.slice(1)} Box`,
      ],
    });
  };

  const handleRemoveBox = (field, index) => {
    const newData = { ...data };
    newData[field].splice(index, 1);
    setData(newData);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setData({
        ...data,
        profileImage: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // const renderEditableText = (field, text, index, subField) => {
  //   const itemId = `${field}-${index}-${subField}`;

  //   if (editing === itemId && isMouseOver) {
  //     return (
  //       <textarea
  //         type="text"
  //         value={text}
  //         className={
  //           field === "professionalProfile"
  //             ? "large-input black-text"
  //             : "black-input black-text"
  //         }
  //         onChange={(e) => {
  //           if (field === "experiences" || field === "education") {
  //             // handleEditItem for arrays
  //             handleEditItem(field, index, subField, e.target.value);
  //           } else {
  //             // For professionalProfile, handle directly
  //             handleChange(field, undefined, e.target.value);
  //           }
  //         }}
  //         onBlur={handleBlur}
  //       />
  //     );
  //   } else {
  //     return (
  //       <span
  //         onMouseOver={() => handleEdit(itemId)}
  //         className={
  //           editing === itemId
  //             ? "text-blue-500 cursor-pointer download-hidden"
  //             : "text-blue-500 cursor-pointer"
  //         }
  //       >
  //         {text} {editing === itemId ? "" : ""}
  //       </span>
  //     );
  //   }
  // };

  const renderEditableText = (field, text, index, subField) => {
    const itemId = `${field}-${index}-${subField}`;
  
    if (editing === itemId && isMouseOver) {
      return (
        <textarea
          
          type="text"
          value={text}
          className="black-input black-text w-[100%]"
          onChange={(e) => {
            if (field === "experiences" || field === "education") {
              // handleEditItem for arrays
              handleEditItem(field, index, subField, e.target.value);
            } else if (field === "skills" || field === "languages") {
              // For skills and languages, handle with index
              handleChange(field, index, e.target.value);
            } else {
              // For professionalProfile, handle directly
              handleChange(field, undefined, e.target.value);
            }
          }}
          onBlur={handleBlur}
        />
      );
    } else {
      return (
        <span
          onMouseOver={() => handleEdit(itemId)}
          className={
            editing === itemId
              ? "text-blue-500 cursor-pointer download-hidden"
              : "text-blue-500 cursor-pointer"
          }
        >
          {text} {editing === itemId ? "" : ""}
        </span>
      );
    }
  };
  

  const handleAddField = (field) => {
    setData({
      ...data,
      [field]: [
        ...data[field],
        {
          title: `New ${field.charAt(0).toUpperCase() + field.slice(1)}`,
          date: "Date",
          description: "Description",
        },
      ],
    });
  };

  const handleRemoveField = (field, index) => {
    const newData = { ...data };
    newData[field].splice(index, 1);
    setData(newData);
  };

  const handleDownloadImage = async () => {
    const leftContent = document.getElementById("left-content");
    const rightContent = document.getElementById("right-content");

    // Hide icons and edit texts during image download
    const elementsToHide = document.querySelectorAll(".download-hidden");
    elementsToHide.forEach((element) => {
      element.style.display = "none";
    });

    // Use html2canvas to capture the screenshot of the entire content
    const canvasLeft = await html2canvas(leftContent);
    const canvasRight = await html2canvas(rightContent);

    // Combine both canvases into one
    const combinedCanvas = document.createElement("canvas");
    const context = combinedCanvas.getContext("2d");
    combinedCanvas.width = canvasLeft.width + canvasRight.width;
    combinedCanvas.height = Math.max(canvasLeft.height, canvasRight.height);
    context.drawImage(canvasLeft, 0, 0);
    context.drawImage(canvasRight, canvasLeft.width, 0);

    // Create a temporary link and trigger the download
    const imageData = combinedCanvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imageData;
    link.download = "resume.png";
    link.click();

    // Show icons and edit texts again after download
    elementsToHide.forEach((element) => {
      element.style.display = "block";
    });
  };

  return (
    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <div className="flex justify-center">
        <div
          className="w-[20%] px-4 h-auto border bg-[#1f1e1e] text-white"
          id="left-content"
        >
          <div className="flex mt-4 justify-center text-center items-center">
            <label className="w-[200px] h-[200px] border-4 flex rounded-full overflow-hidden">
              {isMouseOver && (
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              )}
              {data.profileImage ? (
                <img
                  src={data.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="w-full h-full flex items-center justify-center text-gray-300">
                  {isMouseOver ? "Add Photo" : "Profile Photo"}
                </span>
              )}
            </label>
          </div>
          <div className="mt-2">
            <p className="uppercase font-bold">contact</p>
            <div className="border mt-2 mb-1"></div>
            <div>
              <p>{renderEditableText("phone", data.phone)}</p>
              <p>{renderEditableText("mail", data.mail)}</p>
              <p>{renderEditableText("url", data.url)}</p>
              <p>{renderEditableText("address", data.address)}</p>
            </div>
          </div>
          <div className=" mt-4">
            <p className="uppercase font-bold">skill</p>
            <div className="border  mt-2 mb-1"></div>

            {data.skills.map((skill, index) => (
              <div key={index} className="flex items-center mt-2">
                {renderEditableText("skills", skill, index)}
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
          <div className=" mt-4">
            <p className="uppercase font-bold">language</p>
            <div className="border mt-2 mb-1"></div>

            {data.languages.map((language, index) => (
              <div key={index} className="flex items-center mt-2">
                {renderEditableText("languages", language, index)}
                <button
                  onClick={() => handleRemoveBox("languages", index)}
                  className="ml-2 p-1 text-sm  text-white rounded"
                >
                  <FaMinusCircle className="download-hidden text-red-500" />
                </button>
              </div>
            ))}

            
            <button
              onClick={() => handleAddBox("languages")}
              className="mt-2 p-1 text-sm  text-white rounded"
            >
              <FaCirclePlus className="download-hidden text-green-500" />
            </button>
          </div>
        </div>
        <div className="w-[50%] h-auto border px-6 pt-10" id="right-content">
          <div className="text-center">
            <h1 className="text-5xl uppercase font-bold">
              {renderEditableText("name", data.name)}
            </h1>
            <h5 className="mt-4">
              {renderEditableText("jobTitle", data.jobTitle)}
            </h5>
          </div>
          <div className="mt-6">
            <h2 className="uppercase font-bold text-2xl">
              Professional Profile
            </h2>
            <div className=" border  mt-3 mb-2"></div>
            <p>
              {renderEditableText(
                "professionalProfile",
                data.professionalProfile
              )}
            </p>
          </div>
          <div className="mt-6">
            <h2 className="uppercase font-bold text-2xl">work experience</h2>
            <div className=" border  mt-3 mb-2"></div>
            {data.experiences.map((experience, index) => (
              <div key={index}>
                <p>
                  {renderEditableText(
                    "experiences",
                    experience.title,
                    index,
                    "title"
                  )}{" "}
                </p>
                <p>
                  {renderEditableText(
                    "experiences",
                    experience.date,
                    index,
                    "date"
                  )}
                </p>
                <p>
                  {renderEditableText(
                    "experiences",
                    experience.description,
                    index,
                    "description"
                  )}
                </p>
              </div>
            ))}
            <button
              onClick={() => handleAddField("experiences")}
              className="mt-2 p-1 text-sm text-white rounded"
            >
              <FaCirclePlus className="download-hidden text-green-500" />
            </button>
          </div>
          <div className="mt-6">
            <h2 className="uppercase font-bold text-2xl">education</h2>
            <div className=" border  mt-3 mb-2"></div>
            {data.education.map((education, index) => (
              <div key={index}>
                <p>
                  {renderEditableText(
                    "education",
                    education.degree,
                    index,
                    "degree"
                  )}
                </p>
                <p>
                  {renderEditableText(
                    "education",
                    education.description,
                    index,
                    "description"
                  )}
                </p>
              </div>
            ))}
            <button
              onClick={() => handleAddField("education")}
              className="mt-2 p-1 text-sm  text-white rounded"
            >
              <FaCirclePlus className="download-hidden text-green-500" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-end mr-10 mt-4">
        <button
          onClick={handleDownloadImage}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Download as Image
        </button>
      </div>
    </div>
  );
};

export default TemplateOne;
