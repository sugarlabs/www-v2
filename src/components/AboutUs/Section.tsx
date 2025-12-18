import { motion } from 'framer-motion';

const Section = ({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) => {
  const [prefix, highlighted] = title.split(' ');
  return (
    <section className="w-full py-24 scroll-mt-32" id={id}>
      {/* Section header */}
      <div className="text-center mb-16">
        <motion.h2
          className="text-3xl font-semibold text-slate-800 dark:text-slate-200 sm:text-4xl mb-4 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-blue-900 dark:text-blue-400 font-medium">
            {prefix}
          </span>{' '}
          <span className="text-red-600 dark:text-red-400 font-medium">
            {highlighted}
          </span>
        </motion.h2>

        <motion.div
          className="h-0.5 w-24 bg-linear-to-r from-blue-600 to-red-600 mx-auto mb-8"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {description && (
          <motion.p
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {description}
          </motion.p>
        )}
      </div>
      {children}
    </section>
  );
};

export default Section;
