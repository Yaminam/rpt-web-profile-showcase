
import React from "react";
import { ExternalLink, Github } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
      title: "Alumni Association Platform",
      description: "A comprehensive platform for alumni networking developed during Smart India Hackathon 2024. Our team ranked in the Top 20!",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      image: "/placeholder.svg",
      githubLink: "#",
      liveLink: "#",
    },
    {
      title: "E-commerce Website",
      description: "A full-stack e-commerce platform with user authentication, product browsing, cart functionality, and payment integration.",
      technologies: ["MERN Stack", "Redux", "JWT", "Stripe"],
      image: "/placeholder.svg",
      githubLink: "#",
      liveLink: "#",
    },
    {
      title: "Task Management App",
      description: "A productivity application for managing tasks with features including drag-and-drop organization and priority labeling.",
      technologies: ["React", "Context API", "Node.js", "MongoDB"],
      image: "/placeholder.svg",
      githubLink: "#",
      liveLink: "#",
    },
    {
      title: "Portfolio Website",
      description: "A personal portfolio website (this one!) to showcase my skills, projects, and experiences.",
      technologies: ["React", "Tailwind CSS", "TypeScript"],
      image: "/placeholder.svg",
      githubLink: "#",
      liveLink: "#",
    },
  ];

  return (
    <section id="projects" className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-2">Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Here are some of the projects I've worked on, showcasing my skills in web development and problem-solving.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold mb-4">Smart India Hackathon 2024</h3>
          <div className="bg-card border rounded-lg p-6 max-w-3xl mx-auto">
            <p className="text-muted-foreground">
              I'm thrilled to share that Team Nemysis qualified for the next round of Smart India Hackathon 2024, ranking among the Top 20! 
              Our challenge was designing an Alumni Association platform under Smart Education. 
              It was an unforgettable experience where I learned the true meaning of teamwork.
            </p>
            <div className="mt-4">
              <p className="font-medium">Team Members:</p>
              <p className="text-muted-foreground">
                Nitish Jha, Shakir Raza, Anshika Saini, Raghav Upadhyay, Prince Jain
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }: { project: any }) => {
  return (
    <div className="project-card group">
      <div className="relative overflow-hidden h-48">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white rounded-full text-black hover:bg-gray-200"
            aria-label="GitHub Repository"
          >
            <Github size={20} />
          </a>
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-primary rounded-full text-white hover:bg-primary/80"
            aria-label="Live Demo"
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech: string, index: number) => (
            <span key={index} className="skill-badge">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
