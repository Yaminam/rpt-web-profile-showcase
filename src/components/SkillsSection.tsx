
import React from "react";

const SkillsSection = () => {
  const skills = {
    frontend: ["React.js", "HTML5", "CSS3", "JavaScript", "Responsive Design", "Tailwind CSS"],
    backend: ["Node.js", "Express.js", "MongoDB", "SQL", "RESTful APIs"],
    programming: ["JavaScript", "Java", "TypeScript"],
    tools: ["Git", "GitHub", "VS Code", "Postman", "npm"]
  };

  return (
    <section id="skills" className="section-padding bg-muted">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-2">My Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            As a MERN Stack enthusiast, I've developed proficiency in various technologies
            and continue to expand my skillset.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SkillCard title="Frontend Development" skills={skills.frontend} />
          <SkillCard title="Backend Development" skills={skills.backend} />
          <SkillCard title="Programming Languages" skills={skills.programming} />
          <SkillCard title="Tools & Technologies" skills={skills.tools} />
        </div>

        <div className="mt-16 bg-card rounded-lg border p-8 shadow-md">
          <h3 className="text-2xl font-bold mb-6 text-center gradient-text">MERN Stack Expertise</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <TechItem name="MongoDB" icon="M" color="bg-green-600" />
            <TechItem name="Express.js" icon="E" color="bg-gray-700" />
            <TechItem name="React.js" icon="R" color="bg-blue-500" />
            <TechItem name="Node.js" icon="N" color="bg-green-700" />
          </div>
          <div className="mt-8">
            <h4 className="text-lg font-semibold mb-2">Currently Learning</h4>
            <div className="flex flex-wrap gap-2">
              <span className="skill-badge">Advanced DSA</span>
              <span className="skill-badge">System Design</span>
              <span className="skill-badge">Next.js</span>
              <span className="skill-badge">TypeScript</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SkillCard = ({
  title,
  skills,
}: {
  title: string;
  skills: string[];
}) => {
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-md border h-full">
      <div className="bg-gradient-to-r from-primary to-accent p-4">
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <div className="p-6">
        <ul className="space-y-2">
          {skills.map((skill) => (
            <li key={skill} className="flex items-center">
              <span className="text-primary mr-2">✓</span>
              <span>{skill}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const TechItem = ({
  name,
  icon,
  color,
}: {
  name: string;
  icon: string;
  color: string;
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-16 h-16 ${color} rounded-full flex items-center justify-center mb-2`}>
        <span className="text-2xl font-bold text-white">{icon}</span>
      </div>
      <p className="font-medium">{name}</p>
    </div>
  );
};

export default SkillsSection;
