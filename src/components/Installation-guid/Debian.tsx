import { motion } from 'framer-motion';
import img1 from '../../../public/assets/Images/guid-image-1.webp';

function Debian() {
  return (
    <>
      <motion.section
        initial={{ opacity: 0, x: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        className="mt-5"
      >
        <div className="flex flex-col gap-5">
          <h2 className="text-center text-4xl font-medium">
            Install Sugar on Debian
          </h2>
          <span className="text-center text-gray-700 text-xl">
            Debian is a free, stable Linux distribution. Sugar packages are
            available in Debian releases — use the commands below depending on
            your Debian version.
            <a
              href="https://www.debian.org/"
              className=" hover:text-blue-800 underline"
            >
              <b>click here</b>
            </a>{' '}
            <img src={`${img1}`} alt="Download Sugar for Debian" />
          </span>
        </div>
      </motion.section>
      <motion.section
        initial={{ opacity: 0, x: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        className="mt-5"
      >
        <div>
          <div className="flex flex-col gap-4">
            <h3 className="text-3xl font-semibold text-center">
              Using Sugar 0.112 on Debian Buster
            </h3>

            <p className="text-center text-xl">
              Sugar 0.112 will be available in Debian Buster. Install from the
              default repositories:
            </p>

            <p className="text-center text-gray-700 text-xl">
              After installation, log out and choose the <strong>Sugar</strong>{' '}
              session at the login screen.
            </p>
          </div>
        </div>
      </motion.section>{' '}
      <motion.section
        initial={{ opacity: 0, x: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        className="mt-5"
      >
        <div>
          <div className="flex flex-col gap-4 mt-6">
            <h3 className="text-3xl font-semibold text-center">
              Using Sugar 0.110 on Debian Stretch
            </h3>

            <p className="text-center text-xl">
              Sugar 0.110 is available in Debian Stretch. To install on a fresh
              Stretch installation:
            </p>
            <p className="text-center text-gray-600">
              During the Debian installer, when asked which collections to
              include, deselect all to keep a minimal system; then install{' '}
              <code>sucrose</code> and a display manager like{' '}
              <code>lightdm</code>.
            </p>
            <b className="text-center">
              when the install has completed, log in, install Sugar, a display
              manager, and reboot, type
            </b>
            <div className="flex flex-col items-center gap-3">
              <pre>
                <code className="font-mono bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">
                  sudo apt install sucrose lightdm
                </code>
              </pre>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() =>
                  navigator.clipboard.writeText(
                    'sudo apt install sucrose lightdm',
                  )
                }
              >
                Copy
              </button>

              <pre>
                <code className="font-mono bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">
                  exec sudo reboot
                </code>
              </pre>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() =>
                  navigator.clipboard.writeText('exec sudo reboot')
                }
              >
                Copy
              </button>
            </div>

            <p className="text-center text-gray-700 text-xl">
              At the graphical login screen change from the default X session to{' '}
              <strong>Sugar</strong>, then log in with the non-root user you
              created during install.
            </p>
          </div>
        </div>
      </motion.section>
    </>
  );
}

export default Debian;
