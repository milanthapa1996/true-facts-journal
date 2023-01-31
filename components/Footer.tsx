import React from "react";

const Footer = () => {
  return (
    <footer className="p-4 md:py-8 ">
      <hr className="my-6 border-gray-400 lg:my-8 text-gray-800 dark:text-gray-200" />
      <span className="block text-md text-center dark:text-gray-200">
        &copy; {new Date().getFullYear()}{" "}
        <a href="/" className="hover:underline">
          AD Performance Blog
        </a>
      </span>
    </footer>
  );
};

export default Footer;