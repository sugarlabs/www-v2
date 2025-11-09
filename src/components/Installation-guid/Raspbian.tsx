import { motion } from 'framer-motion';
import img1 from '../../../public/assets/Images/fedora-step1.webp';
function Raspbian() {
  return (
    <div className="w-full max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Installing Sugar on Raspberry Pi</h1>

      <p className="text-base leading-relaxed">
        Raspberry Pi devices are small, low-cost computers that work well with
        Sugar. To use Sugar, you'll need a display, keyboard, and mouse.
      </p>
          <img src={ `${img1}`} alt="" />
      <motion.section
        className="space-y-3"
        initial={{ opacity: 0, x: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-2xl font-semibold">
          Recommended Method: Sugar on a Stick(SoaS)
        </h2>
        <p>
          The most reliable way to run Sugar on a Raspberry Pi is by using{' '}
          <b>Sugar on a Stick</b>, a Fedora-based build that ships with many
          activities and receives regular security updates.
          <a
            href="https://wiki.sugarlabs.org/go/Installation"
            className=" hover:text-blue-800 underline"
          >
            <b> Click here for more info</b>
          </a>
        </p>
      </motion.section>

      <motion.section
        className="space-y-3"
        initial={{ opacity: 0, x: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-2xl font-semibold">Other Installation Options</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            <b>Fedora:</b> Actively used for Sugar development and provides
            strong tooling.
          </li>
          <li>
            <b>Debian:</b> Stable environment with good ARM support for
            Raspberry Pi.
          </li>
          <li>
            <b>Ubuntu:</b> Works well for general Sugar usage and familiar
            workflows.
          </li>
        </ul>
      </motion.section>

      <motion.section
        className="space-y-3"
        initial={{ opacity: 0, x: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-2xl font-semibold">Development Notes</h2>
        <p>
          Developers usually choose <b>Fedora</b> or <b>Debian</b> when setting
          up a development environment for Sugar on Raspberry Pi, since both
          align closely with the platforms used for Sugar development on
          standard computers.
        </p>
      </motion.section>
    </div>
  );
}

export default Raspbian;
