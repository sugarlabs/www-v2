import { motion } from 'framer-motion';
import img1 from '../../../public/assets/Images/fedora-step1.webp';

function Fedora() {
  return (
    <>
      <main>
        <motion.article className="mx-auto p-6 flex items-center flex-col max-w-10/12">
          <h1 className="text-4xl font-sans font-bold text-center">
            Steps to install Sugar using Fedora
          </h1>

          <motion.section
            initial={{ opacity: 0, x: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="mt-5"
          >
            <div className="flex flex-col gap-5">
              <div>
                <h3 className="font-medium text-gray-600 flex justify-center">
                  Step 1
                </h3>
              </div>
              <span className="text-3xl text-center">
                Install <b>Fedora</b> on your device.
                <a
                  href="https://getfedora.org/"
                  className=" hover:text-blue-800 underline"
                >
                  {' '}
                  Click here{' '}
                </a>
              </span>
              <desc className=" text-gray-600 text-center">
                Download the Fedora ARM image for your Raspberry Pi from the
                official Fedora website. Make sure to select the version that
                matches your Raspberry Pi model.
              </desc>
            </div>
            <div>
              <img src={`${img1}`} alt="Download Fedora for Raspberry Pi" />
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="mt-5"
          >
            <div className="flex flex-col gap-5 ">
              <h3 className="font-medium text-gray-600 flex justify-center">
                Step 2
              </h3>
              <ol className="flex flex-col gap-5">
                <li className=" text-4xl text-center font-medium flex justify-center">
                  Open the Terminal & Run the command:
                </li>
                <li className="text-xl text-center flex gap-2.5">
                  <code className="font-mono bg-gray-100 px-2 py-1 rounded-2xl hover:bg-gray-200 text-wrap">
                    sudo dnf groupinstall sugar-desktop
                  </code>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        'sudo dnf groupinstall sugar-desktop',
                      );
                    }}
                  >
                    Copy
                  </button>
                </li>
                <div className="flex flex-col gap-3 items-center">
                  <li className="text-center text-3xl font-medium flex justify-center">
                    Restart your system:
                  </li>
                  <div className="text-center flex items-center gap-2.5">
                    <pre className="text-center">
                      <code className="font-mono bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">
                        sudo reboot
                      </code>
                    </pre>{' '}
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      onClick={() => {
                        navigator.clipboard.writeText('sudo reboot');
                      }}
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <li className="text-center text-3xl font-medium ">
                  On the login screen, select the <strong>Sugar Desktop</strong>{' '}
                  session.
                </li>
              </ol>
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
                Step 3
              </h3>
              <h2 className="text-center text-4xl font-medium">
                Using Sugar Inside GNOME
              </h2>
              <ol className="flex flex-col gap-4">
                <li className="text-center text-3xl">
                  Select GNOME on Xorg or GNOME Classic at login.
                </li>
                <li className="text-center">
                  <span className="text-center text-2xl font-medium">
                    Open Terminal and run:
                  </span>
                  <pre className="flex flex-col text-xl gap-1.5">
                    <code className="font-mono bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">
                      sudo dnf groupinstall sugar-desktop
                    </code>
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          'sudo dnf groupinstall sugar-desktop',
                        );
                      }}
                    >
                      Copy
                    </button>
                    <code className="font-mono bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">
                      sudo dnf install sugar-runner
                    </code>
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          'sudo dnf install sugar-runner',
                        );
                      }}
                    >
                      Copy
                    </button>
                  </pre>
                </li>
                <li className="text-center text-xl font-medium">
                  Start Sugar:
                  <pre>
                    <code className="font-mono bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">
                      sugar-runner
                    </code>
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      onClick={() => {
                        navigator.clipboard.writeText('sugar-runner');
                      }}
                    >
                      Copy
                    </button>
                  </pre>
                </li>
                <li>
                  <strong>Logout from Sugar to return to GNOME.</strong>
                </li>
              </ol>
            </div>
          </motion.section>
        </motion.article>
      </main>
    </>
  );
}

export default Fedora;
