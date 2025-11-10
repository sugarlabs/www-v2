import { motion } from 'framer-motion';
import img1 from '../../../public/assets/Images/guid-image-1.webp';

function Ubuntu() {
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
            Steps to install Sugar on Ubuntu
          </h2>
          <h3 className="font-medium text-gray-600 flex justify-center">
            Step 1
          </h3>

          <span className="text-center text-gray-700 text-xl">
            Ubuntu is a Debian-based Linux system using GNOME as its default
            desktop environment. It can run Sugar easily using packages
            available in the official repositories. For Ubuntu installation{' '}
            <a
              href="https://ubuntu.com/download/desktop"
              className=" hover:text-blue-800 underline"
            >
              <b>click here</b>
            </a>
          </span>
          <img src={`${img1}`} alt="Download Sugar for Ubuntu" />

          {/* ---- Ubuntu 19.10 ---- */}
          <div className="flex flex-col gap-4">
            <h3 className="text-3xl font-semibold text-center">
              Ubuntu 19.10 (Eoan Ermine)
            </h3>

            <span className="text-center text-2xl font-medium">
              Install Sugar 0.112 with:
            </span>

            <div className="flex flex-col items-center gap-3">
              <pre className="text-center">
                <code className="font-mono bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">
                  sudo apt update
                </code>
              </pre>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => navigator.clipboard.writeText('sudo apt update')}
              >
                Copy
              </button>

              <pre className="text-center">
                <code className="font-mono bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">
                  sudo apt install sucrose
                </code>
              </pre>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() =>
                  navigator.clipboard.writeText('sudo apt install sucrose')
                }
              >
                Copy
              </button>
            </div>

            <p className="text-xl text-center text-gray-700">
              After installation, log out and select the{' '}
              <strong>Sugar Desktop </strong>
              session on the login screen.
            </p>
            <span className=" text-gray-400">
              For a complete walkthrough or common troubleshooting tips on
              Ubuntu 19.10 installation,
              <a
                href="https://github.com/sugarlabs/sugar/blob/master/docs/ubuntu.md#ubuntu-1910-eoan-ermine"
                className=" hover:text-blue-800 underline"
              >
                {' '}
                <b> follow this guide.</b>
              </a>
            </span>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, x: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        className="mt-5"
      >
        <div className="flex flex-col gap-5">
          <h3 className="font-medium text-gray-600 flex justify-center">
            Step 2
          </h3>
          {/* ---- Ubuntu 19.04, 18.04, 18.10 ---- */}
          <div className="flex flex-col gap-4 mt-6">
            <h3 className="text-3xl font-semibold text-center">
              Ubuntu 19.04, 18.04, 18.10
            </h3>

            <span className="text-center text-2xl font-medium">
              Sugar 0.112 is in the universe repository, and can be installed
              with the following commands:
            </span>

            <div className="flex flex-col items-center gap-3">
              <pre>
                <code className="font-mono bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">
                  sudo add-apt-repository universe
                </code>
              </pre>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() =>
                  navigator.clipboard.writeText(
                    'sudo add-apt-repository universe',
                  )
                }
              >
                Copy
              </button>

              <pre>
                <code className="font-mono bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">
                  sudo apt update
                </code>
              </pre>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => navigator.clipboard.writeText('sudo apt update')}
              >
                Copy
              </button>

              <pre>
                <code className="font-mono bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">
                  sudo apt install sucrose
                </code>
              </pre>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() =>
                  navigator.clipboard.writeText('sudo apt install sucrose')
                }
              >
                Copy
              </button>
            </div>

            <p className="text-center text-gray-700 text-xl">
              Log out and select the <strong>Sugar Desktop</strong> session. On
              Ubuntu 18.*, use the <strong>F3</strong> key to show Home View.
            </p>
          </div>
        </div>
      </motion.section>
    </>
  );
}

export default Ubuntu;
