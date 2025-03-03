import { motion } from 'framer-motion';
import SectionContainer from '@/components/shared/SectionContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import { projects, projectsContent } from '@/constants/aboutUs/projects';
import { projectsSectionAnimations } from '@/styles/Animations';

const ProjectsSection = () => {
  const displayProjects = projects.slice(
    0,
    projectsContent.displayProjectCount,
  );

  return (
    <SectionContainer id={projectsContent.sectionId}>
      <motion.div
        className="w-full space-y-8"
        variants={projectsSectionAnimations.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={projectsSectionAnimations.title}>
          <SectionTitle>
            <span className="font-Caveat text-3xl md:text-4xl">
              {projectsContent.title.prefix}
            </span>{' '}
            <span className="text-red-500 font-Caveat text-3xl md:text-4xl">
              {projectsContent.title.highlight}
            </span>
          </SectionTitle>
        </motion.div>

        {projectsContent.description && (
          <motion.p
            className="text-base md:text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto"
            variants={projectsSectionAnimations.title}
          >
            {projectsContent.description}
          </motion.p>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          {displayProjects.map((project, i) => (
            <motion.div
              key={i}
              className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden transition-all md:w-1/2 items-center"
              custom={i}
              variants={projectsSectionAnimations.projectCard}
              whileHover="hover"
              style={{ height: '400px' }}
            >
              <motion.div
                className="w-full h-1/2 flex items-center justify-center bg-gray-50"
                variants={projectsSectionAnimations.imageContainer}
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-contain p-4"
                />
              </motion.div>

              <div className="w-full p-6 text-center flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600">{project.description}</p>
                </div>

                <div className="flex flex-col items-center mt-4">
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {project.link ? (
                    <motion.a
                      href={project.link}
                      className="text-red-500 hover:text-red-700 font-medium text-sm flex items-center justify-center gap-1"
                      variants={projectsSectionAnimations.learnMoreButton}
                      whileHover="hover"
                    >
                      {projectsContent.ctaText}
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
                    </motion.a>
                  ) : (
                    <motion.span
                      className="text-red-500 hover:text-red-700 font-medium text-sm flex items-center justify-center gap-1 cursor-pointer"
                      variants={projectsSectionAnimations.learnMoreButton}
                      whileHover="hover"
                      onClick={() => (window.location.href = '#projects')}
                    >
                      {projectsContent.ctaText}
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
                    </motion.span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {projects.length > projectsContent.displayProjectCount && (
          <motion.div
            className="flex justify-center mt-8"
            variants={projectsSectionAnimations.title}
          >
            <motion.a
              href="/projects"
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center gap-2 shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              View all projects
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
            </motion.a>
          </motion.div>
        )}
      </motion.div>
    </SectionContainer>
  );
};

export default ProjectsSection;
