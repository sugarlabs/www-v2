import { motion } from 'framer-motion';
import SectionContainer from '@/components/shared/SectionContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import { content } from '@/constants/aboutUs/mission';
import { missionSectionAnimations } from '@/styles/Animations';

const MissionSection = () => {
  return (
    <SectionContainer id={content.sectionId}>
      <div className="flex flex-col items-start">
        <motion.div
          className="w-full px-4 mb-6"
          variants={missionSectionAnimations.containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={missionSectionAnimations.itemVariants}>
            <SectionTitle>
              <span className="font-Caveat text-3xl md:text-4xl">
                {content.title.prefix}
              </span>{' '}
              <span className="text-red-500 font-Caveat text-3xl md:text-4xl relative">
                {content.title.highlighted}
                <motion.div
                  className="absolute -z-10 w-full h-3 bg-red-100 bottom-1 left-0"
                  variants={missionSectionAnimations.titleUnderlineVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                />
              </span>
            </SectionTitle>
          </motion.div>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-start w-full">
          <motion.div
            className="w-full md:w-1/2 px-4 order-2 md:order-1"
            variants={missionSectionAnimations.containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              {content.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="text-base md:text-lg text-gray-700 leading-relaxed"
                  variants={missionSectionAnimations.itemVariants}
                >
                  {paragraph}
                </motion.p>
              ))}

              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
                variants={missionSectionAnimations.containerVariants}
              >
                {content.images.gallery.map((img, index) => (
                  <motion.div
                    key={index}
                    className="relative overflow-hidden rounded-lg shadow-lg aspect-video"
                    variants={missionSectionAnimations.imageHoverVariants}
                    whileHover="hover"
                  >
                    <motion.img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover transform"
                      variants={missionSectionAnimations.imageScaleVariants}
                      whileHover="hover"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 px-4 mb-8 md:mb-0 order-1 md:order-2"
            initial={missionSectionAnimations.mainImageVariants.initial}
            whileInView={missionSectionAnimations.mainImageVariants.whileInView}
            viewport={{ once: true }}
            transition={missionSectionAnimations.mainImageVariants.transition}
          >
            <motion.div
              className="rounded-xl overflow-hidden shadow-2xl relative aspect-[4/3]"
              whileHover={missionSectionAnimations.mainImageVariants.hover}
            >
              <img
                src={content.images.main.src}
                alt={content.images.main.alt}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default MissionSection;
