import React, { useState, useEffect, useRef }  from 'react';
import './AlchemistLab.css';
import profileImage from './resources/portrait.jpg'; // Replace with the actual path to your profile image
import Project from './Project'; // Import the Project component
import axios from 'axios';
import './logo.css'

import { config } from './resources/config/config.js';

function importAll(r) {
  return r.keys().map(r);
}

function AlchemistLab() {

  const companyLogoFiles = importAll(
    require.context('./resources/company-logos', false, /\.(png|jpe?g|svg)$/)
  );

  const apiUrl = config.url.API_URL;

  const [projects, setProjects] = useState([]);
  const [headline, setHeadline] = useState("");
  const [intro, setIntro] = useState("");
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    // Fetch the list of strings from the API
    setRefresh(true);
    axios.get(apiUrl+'/portfolio/profile')
      .then(response => {
        // console.log(response.data); // Check the response data
        setProjects(response.data.projects);
        setHeadline(response.data.gold_dust);
        setIntro(response.data.about_me);
      })
      .catch(error => {
        console.error(error);
      }).finally(()=> setRefresh(false));
     
      
  }, []);

  
  return (
    <div className="container">
      <header>
        <h1>Kunal's Portfolio</h1>
      </header>
      <main>
      <div className="one-liner">
        <h1>{headline}</h1>
      </div>

        <section id="about">
          <div className="about-content">
            <div className="about-text">
              <h2>About me</h2>
              <p>{intro}</p>

            </div>
            <div className="about-image">
              <img src={profileImage} alt="Profile" className="about-profile-image" onContextMenu={(e) => e.preventDefault()} />
            </div>
          </div>

        </section>
        <section id="portfolio" className='portfolio-container'>
        {/* <div class="portfolio-conta">
        </div> */}
          <h2>Portfolio</h2><br/>
          {/* <p>Here you can find some examples of my work and projects I've completed.</p> */}
          <ul className="portfolio-list">
            <li></li> 

            {projects.map((project, index) => (
              <Project key={index} project={project}/>
            ))}
          </ul>

        </section>
        {/* <section id="experiments">
          <h2>On-going Projects</h2>
          <p><b>Note:</b> Section is under construction. I am making my site dynamically read it directly from my documentation tool, Notion, which is tracking all my work. I expect this to be up by 25th May, 2023. Apologies for the inconvience!</p>
          <p>These are my latest projects that I've been working on.</p>
          <ul>
            <li>Unified Portfolio manager - personal investments</li>
            <li>Alfred - the all in 1 butler (using the latest AI algos)</li>
            <li>Digital Accountal - for daily transactions</li>
          </ul>
        </section> */}
        <section id="affiliations" className="affiliation">
          {/* <div className="logo-container"> */}
            <h2>Past Affiliations</h2><br/><br/>

            <div className="logo-container">
              {companyLogoFiles.map((logo, index) => (
                <img src={logo} alt={`Company ${index + 1}`} key={index} onContextMenu={(e) => e.preventDefault()} />
              ))}
            </div>
       
       
        </section>


      </main>
      <footer>
      <nav>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            {/* <li><a href="#experiments">Projects</a></li> */}
            <li><a href="#affiliations">Affiliations</a></li>

            <li><span class="construction-icon"><i class="fas fa-tools"></i>Tools</span></li>

          </ul>
        </nav>
        <p className='copyright'>&copy; 2023 @|c)-(3m!5t's Lab. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AlchemistLab;