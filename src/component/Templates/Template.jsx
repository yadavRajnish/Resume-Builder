import React from "react";
import temp1 from "../Data/Images/temp1.png";
import temp2 from "../Data/Images/temp2.png";
import temp3 from "../Data/Images/temp3.png";


const Template = ({ onSelectTemplate }) => {
  return (
    <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>
      <h6>Choose a Template</h6>
      <div>
        <button onClick={() => onSelectTemplate(1)}>
          <img
            src={temp1}
            alt="Template 1"
            rounded
            style={{ height: "160px", width: "100%" }}
          />
        </button>
      </div>
      <div>
        <button onClick={() => onSelectTemplate(2)}>
          <img
            src={temp2}
            alt="Template 2"
            style={{ height: "160px", width: "100%" }}
          />
        </button>
      </div>
      {/* <div>
        <button onClick={() => onSelectTemplate(3)}>
          <img
            src={temp3}
            alt="Template 3"
            style={{ height: "160px", width: "100%" }}
          />
        </button>
      </div> */}
    </div>
  );
};

export default Template;
