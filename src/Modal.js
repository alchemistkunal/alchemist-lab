import React from "react";
import "./Modal.css";


const Modal = ({ setIsOpen, field }) => {
  const f1 = field.split('#');
  return (
    // onClick={() => setIsOpen(false)} 
      <div className="modal-container" >

        <p>{f1[0].trim()}<br /><br /></p>
        <ul className="modalContent">
          {f1.slice(1).map((part, index) => (
            <li key={index}>{part.trim()}</li>
          ))}
        </ul>
      </div>

    
    
  );
};

export default Modal;


{/* <div>
      {Object.entries(field).map(([key, value]) => {
        if (typeof value === 'string' && value.startsWith('http')) {
          console.log(key + "=>" + value)
          return (
            <img src={value} alt={key} className="project-image" onContextMenu={(e) => e.preventDefault()} />

          );
        } else if (typeof value === 'number') {
          <p key={key}>{key}: {value}</p>
        } else {

          return (
            <>
              <p key={key}>
                {value.split('-')[0].trim()}<br /><br />
              </p>
              <ul className="modalContent">
                {value.split('-').slice(1).map((part, index) => (
                  <li key={index}>{part.trim()}</li>
                ))}
              </ul>
            </>
          );
        }
      })}
    </div> */}