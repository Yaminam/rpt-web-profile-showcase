
import React from "react";
import { BookOpen, Award, Calendar } from "lucide-react";

const EducationSection = () => {
  return (
    <section id="education" className="section-padding bg-muted">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-2">Education</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-card border rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex h-16 w-16 bg-muted rounded-full items-center justify-center">
                    <BookOpen size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Bachelor of Technology (BTech)</h3>
                    <p className="text-lg">Computer Science</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar size={16} />
                  <span>2022 Graduate</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <img
                  src="/public/lovable-uploads/1a91e0bc-26d7-43d4-9154-9a33e75934f2.png"
                  alt="JECRC University Logo"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-lg font-bold">JECRC University</h4>
                  <p className="text-muted-foreground">Jaipur, Rajasthan, India</p>
                </div>
              </div>

              <div className="space-y-4">
                <p>
                  During my time at JECRC University, I've focused on building a strong foundation in computer science fundamentals and specializing in web development technologies, particularly the MERN stack.
                </p>

                <div>
                  <h4 className="font-medium mb-2">Key Subjects:</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="skill-badge">Data Structures</span>
                    <span className="skill-badge">Algorithms</span>
                    <span className="skill-badge">Database Management</span>
                    <span className="skill-badge">Web Development</span>
                    <span className="skill-badge">Object-Oriented Programming</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Activities:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Participated in Smart India Hackathon 2024</li>
                    <li>Member of the university coding club</li>
                    <li>Attended various workshops and technical seminars</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-card border rounded-lg shadow-md p-6">
              <div className="flex items-center gap-4 mb-4">
                <Award className="text-primary" size={24} />
                <h3 className="text-xl font-bold">Certifications & Achievements</h3>
              </div>

              <ul className="space-y-4">
                <li className="flex flex-col sm:flex-row sm:items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="sm:w-24 font-medium text-primary">2024</div>
                  <div>
                    <h4 className="font-semibold">Smart India Hackathon 2024</h4>
                    <p className="text-muted-foreground">
                      Team Nemysis ranked in Top 20 for developing an Alumni Association platform
                    </p>
                  </div>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="sm:w-24 font-medium text-primary">Ongoing</div>
                  <div>
                    <h4 className="font-semibold">DSA Learning Journey</h4>
                    <p className="text-muted-foreground">
                      Actively participating in coding challenges to improve DSA skills
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
