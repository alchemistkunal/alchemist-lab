import React, { useState } from 'react';
import './Project.css'
import Modal from './Modal';


const Project = ({ project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateModalView = () => {
    setIsModalOpen(!isModalOpen);
  };


  return (
    <li>
      <div className="project" >
        <h3 onClick={updateModalView}>{project.title}</h3>
        {/* <p>{project.outcomes}</p> */}
        {isModalOpen ?  
          (
            <div className='project-content-image'>
              <Modal setIsOpen={isModalOpen} field={project.outcomes}/> 
              {project.image_url !== '' ? <img src={project.image_url} alt={project.title} className="project-image" onContextMenu={(e) => e.preventDefault()}/> :""}
            </div>
          ): ""
        }
        
      </div>
    </li>
  );
};

export default Project;