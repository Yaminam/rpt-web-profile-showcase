
import React from "react";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-2">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-3 gradient-text">Who am I?</h3>
              <p className="text-muted-foreground mb-4">
                I am Shreyash Tripathi, a dedicated and passionate software developer currently pursuing my Bachelor's degree at JECRC University in Jaipur, Rajasthan, India.
              </p>
              <p className="text-muted-foreground">
                With a strong foundation in the MERN stack (MongoDB, Express.js, React.js, Node.js), SQL, HTML, CSS, Java, and JavaScript, I am currently deepening my understanding of Data Structures and Algorithms (DSA). I am eager to contribute to innovative projects and grow in the field of software development.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-3 gradient-text">What drives me?</h3>
              <p className="text-muted-foreground mb-4">
                I'm passionate about building user-friendly web applications and solving real-world problems through technology. Recently, I participated in the Smart India Hackathon 2024 with Team Nemysis, where we ranked among the Top 20 teams.
              </p>
              <p className="text-muted-foreground">
                Our challenge was designing an Alumni Association platform under Smart Education, which was an unforgettable experience that taught me the true meaning of teamwork.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg shadow-md border border-border">
              <h3 className="text-xl font-bold mb-3 text-primary">Professional Goals</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2">►</span>
                  <span>Develop scalable, efficient web applications</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">►</span>
                  <span>Master full-stack development with MERN</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">►</span>
                  <span>Become proficient in data structures and algorithms</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">►</span>
                  <span>Contribute to open source projects</span>
                </li>
              </ul>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-md border border-border">
              <h3 className="text-xl font-bold mb-3 text-primary">Quick Facts</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2">►</span>
                  <span>Based in Jaipur, Rajasthan, India</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">►</span>
                  <span>BTech in Computer Science (JECRC University)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">►</span>
                  <span>Smart India Hackathon 2024 participant</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">►</span>
                  <span>Open to software engineering roles</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
