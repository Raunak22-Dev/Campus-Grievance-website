import React from 'react';
import { FooterIcons } from '../../content'; // Ensure correct naming

const Footer = () => {
  const renderIcons = () => {
    return FooterIcons.map((icon) => (
      <a
        href={icon.href}
        key={icon.title}
        className="text-gray-500 hover:text-gray-900 dark:hover:text-white mx-2"
      >
        <img
          src={icon.image}
          alt={icon.title}
          title={icon.title}
          width={20}
          height={20}
        />
      </a>
    ));
  };

  return (
    <div>
      <footer className="bg-white dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="/" className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" class="bi bi-universal-access" viewBox="0 0 16 16">
  <path d="M9.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M6 5.5l-4.535-.442A.531.531 0 0 1 1.531 4H14.47a.531.531 0 0 1 .066 1.058L10 5.5V9l.452 6.42a.535.535 0 0 1-1.053.174L8.243 9.97c-.064-.252-.422-.252-.486 0l-1.156 5.624a.535.535 0 0 1-1.053-.174L6 9z"/>
</svg>


                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Grievance
                </span>
              </a>
              <span className="text-sm sm:text-base text-white text-wrap">
  Our Grievance System helps individuals to express their concerns, complaints,
  <br/>
   and issues effectively. 
  <br />
  We ensure a fair and swift process for resolution.
</span>

            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Follow us
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a
                      href="https://github.com/Raunak22-Dev"
                      className="hover:underline"
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/raunak-gangwal-76b487283/"
                      className="hover:underline"
                    >
                      Linkedin
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Legal
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Terms &amp; Conditions
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              &copy; 2025{" "}
              <a href="/home" className="hover:underline">
                Grievance System
              </a>{" "}
              | All Rights Reserved.
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0">
              {renderIcons()}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
