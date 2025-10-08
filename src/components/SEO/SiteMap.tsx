const SiteMap = () => {
  return (
    <section className="sr-only" aria-label="Site structure and navigation">
      <h2>Site Navigation Structure</h2>
      <nav aria-label="Complete site navigation">
        <ol>
          <li>
            <h3><a href="#home">Home - Tarek Ragab Portfolio</a></h3>
            <p>Professional portfolio homepage featuring full-stack software engineer specializing in .NET, React, and Azure</p>
            <ul>
              <li><a href="#home">Hero Introduction</a> - Professional summary and key skills</li>
              <li>Contact Information - Email: tarek.madany113@gmail.com, Phone: +201090477381</li>
              <li>Social Links - <a href="https://github.com/Tarek-Ragab-Abdelal" target="_blank" rel="noopener noreferrer">GitHub</a>, <a href="https://www.linkedin.com/in/tarek-ragab/" target="_blank" rel="noopener noreferrer">LinkedIn</a>, <a href="https://www.upwork.com/freelancers/~01f068ac7a77a08223" target="_blank" rel="noopener noreferrer">Upwork</a></li>
            </ul>
          </li>
          
          <li>
            <h3><a href="#experience">Professional Experience</a></h3>
            <p>Comprehensive work history including software engineering, IoT development, and technical instruction</p>
            <ul>
              <li>Software Engineer at Upwork (Remote) - Jan 2023 - Present</li>
              <li>Full-Stack Software Engineer at RES-VA - Jun 2024 - Present</li>
              <li>Mid-Level IoT Firmware Engineer at SudoTechs - Jun 2022 - Oct 2024</li>
              <li>IoT Instructor at CIC, Cairo - Oct 2022 - Oct 2023</li>
              <li>Digital Fabrication Trainee at Sector B5 - Jun 2021 - Sep 2021</li>
            </ul>
          </li>
          
          <li>
            <h3><a href="#projects">Featured Software Projects</a></h3>
            <p>Portfolio of custom software solutions including web applications, data systems, and IoT implementations</p>
            <ul>
              <li>Lead Generation Reporting App - <a href="https://res-va-reporting.com/" target="_blank" rel="noopener noreferrer">RES-VA Platform</a></li>
              <li>Loan System Reporting App - SANAD Finance</li>
              <li>End-to-End Data Pipeline - RES-VA</li>
              <li>Human Resources Management - Future of Egypt</li>
              <li>Licencer Desktop App - <a href="https://www.upwork.com/jobs/~019b407c3a005474d7" target="_blank" rel="noopener noreferrer">Boreal Laser Inc.</a></li>
              <li>IoT Dashboard - <a href="https://www.upwork.com/jobs/~01f89be264ec24bfce" target="_blank" rel="noopener noreferrer">Boreal Laser Inc.</a></li>
            </ul>
          </li>
          
          <li>
            <h3><a href="#skills">Technical Skills & Expertise</a></h3>
            <p>Comprehensive technical capabilities across programming languages, frameworks, and development tools</p>
            <ul>
              <li>Programming Languages: C#, C++, JavaScript, TypeScript, Python, Dart</li>
              <li>Frameworks & Platforms: .NET, Node.js, Nest.js, React, Flutter</li>
              <li>Cloud & Serverless: Azure Function Apps, Azure Service Bus, Azure Web Hosting</li>
              <li>Data & APIs: SQL Server, PostgreSQL, RESTful APIs, Websockets, Message Queuing</li>
              <li>Version Control & CI/CD: Git, GitHub, GitHub Actions, Docker</li>
            </ul>
          </li>
          
          <li>
            <h3><a href="#reviews">Client Reviews & Testimonials</a></h3>
            <p>Authentic feedback from satisfied clients across various industries and project types</p>
            <ul>
              <li>Edward Don Adrenana - Product Manager, Boreal Laser Inc.</li>
              <li>Chris Byard - CTO, Signal Dynamic</li>
              <li>Aser Nabil - Product Owner, Sudotechs</li>
              <li>Seif Mostafa - Senior Software Engineer, RES Va</li>
            </ul>
          </li>
          
          <li>
            <h3><a href="#contact">Contact & Collaboration</a></h3>
            <p>Professional contact information and inquiry form for project consultation and collaboration</p>
            <ul>
              <li>Email: <a href="mailto:tarek.madany113@gmail.com">tarek.madany113@gmail.com</a></li>
              <li>Phone: <a href="tel:+201090477381">+201090477381</a></li>
              <li>Location: Cairo, Egypt (Remote work available)</li>
              <li>Contact Form - Project inquiry and consultation requests</li>
            </ul>
          </li>
        </ol>
      </nav>
      
      <h2>External Professional Resources</h2>
      <nav aria-label="Professional development resources">
        <ul>
          <li><a href="https://docs.microsoft.com/en-us/dotnet/" target="_blank" rel="noopener noreferrer">.NET Framework Documentation</a> - Microsoft official documentation</li>
          <li><a href="https://azure.microsoft.com/en-us/services/" target="_blank" rel="noopener noreferrer">Microsoft Azure Cloud Services</a> - Cloud platform services</li>
          <li><a href="https://reactjs.org/docs/getting-started.html" target="_blank" rel="noopener noreferrer">React.js Documentation</a> - Frontend framework documentation</li>
          <li><a href="https://nodejs.org/en/docs/" target="_blank" rel="noopener noreferrer">Node.js Documentation</a> - Backend runtime documentation</li>
          <li><a href="https://www.typescriptlang.org/docs/" target="_blank" rel="noopener noreferrer">TypeScript Documentation</a> - Typed JavaScript documentation</li>
          <li><a href="https://stackoverflow.com/" target="_blank" rel="noopener noreferrer">Stack Overflow</a> - Developer community and Q&A</li>
          <li><a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a> - Version control and collaboration platform</li>
        </ul>
      </nav>
    </section>
  );
};

export default SiteMap;