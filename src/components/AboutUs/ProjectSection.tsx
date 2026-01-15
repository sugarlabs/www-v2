import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects, projectsContent } from '@/constants/aboutUs/projects';
import ResponsiveCarousel from './ResponsiveCarousel';

const ProjectsSection = () => {
  const [showAllProjects, setShowAllProjects] = useState(false);

  const initialProjectCount = 3;
  const displayProjects = showAllProjects
    ? projects
    : projects.slice(0, initialProjectCount);

  return (
    <section
      id={projectsContent.sectionId}
      className="w-full py-12 md:py-24 dark:bg-gray-900"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-8 md:mb-16">
          <motion.h2
            className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-slate-200 sm:text-3xl md:sm:text-4xl mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-900 dark:text-blue-400 font-medium">
              {projectsContent.title.prefix}
            </span>{' '}
            <span className="text-red-600 dark:text-red-400 font-medium">
              {projectsContent.title.highlight}
            </span>
          </motion.h2>

          <motion.div
            className="h-0.5 w-16 md:w-24 bg-gradient-to-r from-blue-600 to-red-600 mx-auto mb-6 md:mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: '4rem' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          {projectsContent.description && (
            <motion.p
              className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {projectsContent.description}
            </motion.p>
          )}
        </div>

        {/* Desktop Projects grid - Shows 3 initially, 4 when "Show more" clicked */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="h-full"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-full flex flex-col border border-slate-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]">
                <div className="relative">
                  <div className="absolute top-0 right-0 z-10">
                    <div className="bg-blue-600 text-white text-xs py-1 px-3 font-medium">
                      Project {i + 1}
                    </div>
                  </div>
                  <div className="w-full h-48 bg-slate-50 dark:bg-gray-700 flex items-center justify-center p-6">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3 pb-2 border-b border-slate-100 dark:border-gray-700">
                    {project.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 mb-6 flex-grow text-base">
                    {project.description}
                  </p>

                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-slate-300 rounded-full text-xs font-medium"
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
                      className="text-blue-600 dark:text-blue-400 hover:text-red-600 dark:hover:text-red-400 font-medium text-sm flex items-center gap-1 mt-auto transition-colors duration-300 group"
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
                      className="text-blue-600 dark:text-blue-400 hover:text-red-600 dark:hover:text-red-400 font-medium text-sm flex items-center gap-1 mt-auto transition-colors duration-300 group"
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
                      className="text-blue-600 dark:text-blue-400 hover:text-red-600 dark:hover:text-red-400 font-medium text-sm flex items-center gap-1 mt-auto transition-colors duration-300 group"
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

        {/* Mobile Carousel - Shows ALL 4 projects */}
        <div className="md:hidden">
          <ResponsiveCarousel
            autoScrollInterval={4500}
            showIndicators={true}
            showNavigation={true}
          >
            {projects.map((project, i) => (
              <div key={i} className="px-2 py-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-full flex flex-col border border-slate-200 dark:border-gray-700">
                  {/* Project header with gradient */}
                  <div className="relative">
                    <div className="absolute top-0 right-0 z-10">
                      <div className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white text-xs py-2 px-4 font-medium rounded-bl-lg">
                        Project {i + 1}
                      </div>
                    </div>
                    <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center p-6 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-emerald-500/5"></div>
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-contain relative z-10"
                      />

                      {/* Floating elements */}
                      <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-gradient-to-r from-blue-600 to-emerald-500"></div>
                      <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-emerald-500"></div>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                        {project.title}
                      </h3>
                      <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full"></div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 mb-6 flex-grow text-sm">
                      {project.description}
                    </p>

                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 text-blue-700 dark:text-emerald-300 rounded-full text-xs font-medium border border-blue-200 dark:border-emerald-900/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action buttons with gradient */}
                    <div className="mt-auto pt-4 border-t border-slate-100 dark:border-gray-700">
                      {project.link && (
                        <button
                          onClick={() => (window.location.href = project.link!)}
                          className="w-full py-3 bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98] shadow-md shadow-blue-600/20"
                        >
                          <span>
                            {projectsContent.ctaText || 'Explore Project'}
                          </span>
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
                              d="M9 5l7 7-7 7"
                            ></path>
                          </svg>
                        </button>
                      )}

                      {project.exlink && (
                        <a
                          href={project.exlink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full block"
                        >
                          <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98] shadow-md shadow-blue-600/20">
                            <span>Visit Website</span>
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
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              ></path>
                            </svg>
                          </button>
                        </a>
                      )}

                      {!project.link && !project.exlink && (
                        <button
                          onClick={() => (window.location.href = '#projects')}
                          className="w-full py-3 bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98] shadow-md shadow-blue-600/20"
                        >
                          <span>{projectsContent.ctaText || 'Learn More'}</span>
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
                              d="M9 5l7 7-7 7"
                            ></path>
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ResponsiveCarousel>

          {/* Project counter for mobile */}
          <div className="text-center mt-6">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-full">
              <span className="text-sm font-medium text-blue-700 dark:text-emerald-400">
                {projects.length} Active Projects
              </span>
            </div>
          </div>
        </div>

        {/* Show more/less button for desktop ONLY */}
        {projects.length > initialProjectCount && (
          <motion.div
            className="hidden md:flex justify-center mt-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {!showAllProjects ? (
              <button
                onClick={() => setShowAllProjects(true)}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white rounded-lg shadow-lg font-medium transition-all duration-300 inline-flex items-center gap-2 shadow-blue-600/20"
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
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white rounded-lg shadow-lg font-medium transition-all duration-300 inline-flex items-center gap-2 shadow-blue-600/20"
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
