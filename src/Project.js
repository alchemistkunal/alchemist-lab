import React, { useState } from 'react';
import './Project.css'
import Modal from './Modal';
 
// // Unused
// function importAll(r) {
//   return r.keys().map(r);
// }
// // Unused
// const project_imgs = importAll(
//   require.context('./resources/project-images', false, /\.(png|jpe?g|svg)$/)
// );


const Project = ({ project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateModalView = () => {
    setIsModalOpen(!isModalOpen);

  };

  // Unused
  // const getImageUrl = (projectId) => {
  //   const imageFiles = project_imgs.keys();
  //   const matchingFile = imageFiles.find((file) => {
  //     // Match the filename based on the projectId
  //     return file.includes(projectId);
  //   });

  //   if (matchingFile) {
  //     const imageUrl = project_imgs(matchingFile).default;
  //     return imageUrl;
  //   }

  //     // TODO: Return a fallback URL if no matching image found
  //     return 'fallback-url';
  // };

  return (
    <li>
      <div className="project" >
        <div className='project-expand' onClick={updateModalView}>
          <h3 className='project-title'>{project.title}</h3>
          <p className='project-toggle'><b>{isModalOpen? '-' : '+'} </b></p>
        </div>
        {isModalOpen ?  
          (
            <div className='project-content-image'>
              <Modal setIsOpen={isModalOpen} field={project.outcomes}/> 
              {project.image_url !== '' ? <img src={project.image_url} 
                                                alt={project.title} 
                                                className="project-image" 
                                                onContextMenu={(e) => e.preventDefault()}
                                          /> 
                                        :""}
            </div>
          ): ""
        }
        
      </div>
    </li>
  );
};

export default Project;