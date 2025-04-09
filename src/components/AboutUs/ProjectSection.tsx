import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects, projectsContent } from '@/constants/aboutUs/projects';

const ProjectsSection = () => {
  const [showAllProjects, setShowAllProjects] = useState(false);

  const initialProjectCount = 3;
  const displayProjects = showAllProjects
    ? projects
    : projects.slice(0, initialProjectCount);

  return (
    <section id={projectsContent.sectionId} className="w-full py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl font-semibold text-slate-800 sm:text-4xl mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-900 font-medium">
              {projectsContent.title.prefix}
            </span>{' '}
            <span className="text-red-600 font-medium">
              {projectsContent.title.highlight}
            </span>
          </motion.h2>

          <motion.div
            className="h-0.5 w-24 bg-gradient-to-r from-blue-600 to-red-600 mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          {projectsContent.description && (
            <motion.p
              className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {projectsContent.description}
            </motion.p>
          )}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="h-full"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col border border-slate-100 transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]">
                <div className="relative">
                  <div className="absolute top-0 right-0 z-10">
                    <div className="bg-blue-600 text-white text-xs py-1 px-3 font-medium">
                      Project {i + 1}
                    </div>
                  </div>
                  <div className="w-full h-48 bg-slate-50 flex items-center justify-center p-6">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3 pb-2 border-b border-slate-100">
                    {project.title}
                  </h3>

                  <p className="text-slate-600 mb-6 flex-grow text-base">
                    {project.description}
                  </p>

                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Link handling */}
                  {project.link && (
                    <a
                      href={project.link}
                      className="text-blue-600 hover:text-red-600 font-medium text-sm flex items-center gap-1 mt-auto transition-colors duration-300 group"
                    >
                      {projectsContent.ctaText || 'Learn More'}
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </a>
                  )}

                  {project.exlink && (
                    <a
                      href={project.exlink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-red-600 font-medium text-sm flex items-center gap-1 mt-auto transition-colors duration-300 group"
                    >
                      {projectsContent.ctaText || 'Visit Website'}
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        ></path>
                      </svg>
                    </a>
                  )}

                  {!project.link && !project.exlink && (
                    <button
                      className="text-blue-600 hover:text-red-600 font-medium text-sm flex items-center gap-1 mt-auto transition-colors duration-300 group"
                      onClick={() => (window.location.href = '#projects')}
                    >
                      {projectsContent.ctaText || 'Learn More'}
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show more button*/}
        {projects.length > initialProjectCount && (
          <motion.div
            className="flex justify-center mt-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {!showAllProjects ? (
              <button
                onClick={() => setShowAllProjects(true)}
                className="px-8 py-3 bg-blue-600 hover:bg-red-600 text-white rounded-lg shadow-sm font-medium transition-all duration-300 inline-flex items-center gap-2"
              >
                Show more
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
            ) : (
              <button
                onClick={() => setShowAllProjects(false)}
                className="px-8 py-3 bg-blue-600 hover:bg-red-600 text-white rounded-lg shadow-sm font-medium transition-all duration-300 inline-flex items-center gap-2"
              >
                Show less
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 15l7-7 7 7"
                  ></path>
                </svg>
              </button>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
