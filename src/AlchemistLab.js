import React, { useState, useEffect }  from 'react';
import axios from 'axios';

import './AlchemistLab.css';
import './logo.css'
import Project from './Project';

import { config } from './resources/config/config.js';
import restdef from './resources/default_response.json'
import lIn from './resources/social-media/lIn.png';
import profileImage from './resources/portrait.jpg';
import cox3 from './resources/company-logos/912.png';
import fwb from './resources/project-images/fwb.svg';

function importAll(r) {
  return r.keys().map(r);
}

function AlchemistLab() {

  const companyLogoFiles = importAll(
    require.context('./resources/company-logos', false, /\.(png|jpe?g|svg)$/)
  );
  const apiUrl = config.url.API_URL;
  const linkedIn_URL = config.url.LinkedIn_URL;
  const default_response = restdef;
  const [projects, setProjects] = useState(default_response.projects);
  const [headline, setHeadline] = useState(default_response.gold_dust);
  const [intro, setIntro] = useState(default_response.about_me);

  
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    // Fetch the list of strings from the API
    setRefresh(false);
    
    axios.get(apiUrl)
      .then(response => {

        setProjects(response.data.projects);
        setHeadline(response.data.gold_dust);
        setIntro(response.data.about_me);
      })
      .catch(error => {
        console.error(error);
        setProjects(default_response.projects);
        setHeadline(default_response.gold_dust);
        setIntro(default_response.about_me);
      }).finally(()=> {
        setRefresh(false);
      
      });
    

  }, []);

  
  return (
    <div className="container">
      <header>        
        <h1>Kunal's Portfolio</h1>
        <div className="get-connected">
          <a href={linkedIn_URL} target="blank">
            <img src={lIn} alt="linkedIn-profile" className="button-image" />
          </a>
        </div>
      </header>
      <main>
      <div className="one-liner">

        {refresh  ? <div className='placeholder'><br/><br/></div> : <h1>{headline}</h1>}
        {/* <div className="quote-of-the-week">
          <div className="quote-box">
            <p className="quote-text">Thought of the week: Follow your passion!🐾</p>
          </div>
        </div> */}
      </div>

        <section id="about">
          <br/>
          <div className="about-content">
            <div className="about-text">
              <h2>About me</h2>
              {refresh  ? <div className='placeholder'>{new Array(6).fill(<br/>).map((br,i)=>br)}</div>: <p>{intro}</p>}

            </div>
            <div className="about-image">
              <img src={profileImage} alt="Profile" className="about-profile-image" onContextMenu={(e) => e.preventDefault()} />
            </div>
          </div>

        </section>
        <section id="portfolio" className='portfolio-container'>
          <div className="portfolio-heading">
            <h2>Projects</h2>
            {refresh  ? <div className='placeholder'>{new Array(6).fill(<br/>).map((br,i)=>br)}</div>: ""}
          </div>

          <ul className="portfolio-list">
            {/* intentially added to get a diveder above the 1st project */}
            <li></li> 

            {!refresh  ? projects.map((project, index) => (
              <Project key={index} project={project}/>
            )): ""}
          </ul>

        </section>

        <section id="affiliations" className="affiliation">

            <h2>Affiliations</h2><br/>

            <div className="logo-container">
              {companyLogoFiles.map((logo, index) => (
                <img src={logo} alt={`Company ${index + 1}`} key={index} onContextMenu={(e) => e.preventDefault()} />
              ))}
            </div>
            {/* <div className='current-affiliations'>
              <h3>Current Affiliations</h3>
              <ul>
                <li><span>Community Host at</span> <a href='https://www.ourfamilywithoutborders.com/about' target="blank"><img src={fwb} style={{ width: '200px' }}/></a></li>
                <li><span>Generative AI initiatives with</span> <a href='https://app.takeaction.ai' target="blank"><img src={cox3} style={{ width: '70px' }}/></a></li>
              </ul>
            </div> */}
            
        </section>

      </main>
      <footer>
      <nav>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#portfolio">Projects</a></li>
            <li><a href="#affiliations">Affiliations</a></li>

            <li><span class="construction-icon"><i class="fas fa-tools"></i>Tools</span></li>

          </ul>
        </nav>
        <p className='copyright'>&copy; 2024 @|c)-(3m!5t's Lab. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AlchemistLab;