import React, { useState, useEffect }  from 'react';
import './AlchemistLab.css';
import profileImage from './resources/portrait.jpg'; // Replace with the actual path to your profile image
import Project from './Project'; // Import the Project component
import './logo.css'
import axios from 'axios';
import { config } from './resources/config/config.js';
import lIn from './resources/social-media/lIn.png'; // Replace with the actual path to your profile image

function importAll(r) {
  return r.keys().map(r);
}

function AlchemistLab() {

  const companyLogoFiles = importAll(
    require.context('./resources/company-logos', false, /\.(png|jpe?g|svg)$/)
  );

  const apiUrl = config.url.API_URL;
  const linkedIn_URL = config.url.LinkedIn_URL;
  const [projects, setProjects] = useState([]);
  const [headline, setHeadline] = useState("");
  const [intro, setIntro] = useState("");

  
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    // Fetch the list of strings from the API
    setRefresh(true);
    
    axios.get(apiUrl)
      .then(response => {

        setProjects(response.data.projects);
        setHeadline(response.data.gold_dust);
        setIntro(response.data.about_me);
      })
      .catch(error => {
        console.error(error);
      }).finally(()=> {
        setRefresh(false);
        

      });
    

  }, []);

  
  return (
    <div className="container">
      <header>        
        <h1>Kunal's Portfolio</h1>
        <div className="logo-lIn">
          <a href={linkedIn_URL} target="blank">
            <img  src={lIn} alt="linkedIn-profile"/>
          </a>
        </div>
      </header>
      <main>
      <div className="one-liner">

        {refresh  ? "loading..." : <h1>{headline}</h1>}
        {/* <div className="quote-of-the-week">
          <div className="quote-box">
            <p className="quote-text">Thought of the week: Follow your passion!🐾</p>
          </div>
        </div> */}
      </div>

        <section id="about">
          <div className="about-content">
            <div className="about-text">
              <h2>About me</h2>
              <p>{refresh  ? "loading..." : intro}</p>

            </div>
            <div className="about-image">
              <img src={profileImage} alt="Profile" className="about-profile-image" onContextMenu={(e) => e.preventDefault()} />
            </div>
          </div>

        </section>
        <section id="portfolio" className='portfolio-container'>

          <h2>Portfolio {refresh? "(loading...)":""}</h2><br/>
          
          <ul className="portfolio-list">
            {/* intentially added to get a diveder above the 1st project */}
            <li></li> 

            {!refresh  ? projects.map((project, index) => (
              <Project key={index} project={project}/>
            )): ""}
          </ul>

        </section>

        <section id="affiliations" className="affiliation">

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