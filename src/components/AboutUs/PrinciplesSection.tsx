import { motion } from 'framer-motion';
import SectionContainer from '@/components/shared/SectionContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import { principles, principlesContent } from '@/constants/aboutUs/principles';
import { principlesSectionAnimations } from '@/styles/Animations';

const PrinciplesSection = () => {
  return (
    <>
      <SectionTitle>
        <motion.span
          className="font-Caveat text-3xl md:text-4xl inline-block"
          variants={principlesSectionAnimations.title}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {principlesContent.title.prefix}
        </motion.span>{' '}
        <motion.span
          className="text-red-500 font-Caveat text-3xl md:text-4xl inline-block"
          variants={principlesSectionAnimations.title}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {principlesContent.title.highlight}
        </motion.span>
      </SectionTitle>
      <SectionContainer id={principlesContent.sectionId}>
        <div className="w-full space-y-16">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <motion.div
                className="rounded-lg overflow-hidden shadow-xl relative"
                variants={principlesSectionAnimations.featureImage}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
              >
                <img
                  src={principlesContent.featuredImage}
                  alt="Our Principles"
                  className="w-full h-[400px] object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-red-500/30 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </div>

            <div className="w-full md:w-1/2 space-y-6 order-1 md:order-2">
              <motion.p
                className="text-base md:text-lg text-gray-700 leading-relaxed"
                variants={principlesSectionAnimations.description}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {principlesContent.description}
              </motion.p>
            </div>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 md:mt-16"
            variants={principlesSectionAnimations.container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {principles.map((principle) => (
              <motion.div
                key={principle.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                variants={principlesSectionAnimations.card}
              >
                <motion.div
                  className="relative h-48 overflow-hidden"
                  whileHover="hover"
                  variants={principlesSectionAnimations.cardImage}
                >
                  <img
                    src={principle.image}
                    alt={principle.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </motion.div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {principle.title}
                  </h3>
                  <p className="text-gray-600">{principle.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionContainer>
    </>
  );
};

export default PrinciplesSection;
