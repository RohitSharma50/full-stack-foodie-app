import React from "react";
import heartt from "../Images/heartt.png";
import { FaLinkedin, FaGithub, FaPaperPlane, FaGlobe } from "react-icons/fa";
import Contact from "./Contact";
import { Link } from "react-router-dom";
import playStore from "../Images/play-store.svg";

import appstore from "../Images/app-store.svg";
const Footer = () => {
  return (
    <footer className="bg-black text-white pt-10 pb-6 px-6 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* App Links */}
        <div>
          <h2 className="text-2xl font-bold text-green-500">
            Food<span className="text-white">Ordering App</span>
          </h2>
          <div className="flex space-x-4 mt-4">
            <img src={appstore} alt="App Store" className="h-10" />
            <img src={playStore} alt="Google Play" className="h-10" />
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col space-y-2 text-sm">
          <h3 className="font-semibold text-lg text-green-400">Explore</h3>
          <Link href="/about" className="hover:text-green-500">
            About foodie
          </Link>
        </div>

        {/* Support */}
        <div className="flex flex-col space-y-2 text-sm">
          <h3 className="font-semibold text-lg text-green-400">Get Help</h3>

          <a href="tel:+918930040813" className="hover:text-green-500">
            Contact Us
          </a>
        </div>
      </div>

      <hr className="my-6 border-gray-700" />

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-center">
        <div className="flex items-center space-x-2">
          <strong className="text-white text-lg">Foodie</strong>
          <span>Created By</span>
          <a
            href="https://www.linkedin.com/in/rohit-sharma50/"
            target="_blank"
            rel="noreferrer"
            className="text-red-300 font-semibold hover:text-purple-600"
          >
            Rohit Sharma
          </a>
          <span>with</span>
          <img src={heartt} alt="heart" className="w-5 h-5" />
          <a
            href="https://react.dev/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 font-semibold hover:text-purple-600"
          >
            React
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0 text-xl">
          <a
            href="https://www.linkedin.com/in/rohit-sharma50/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/RohitSharma50"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
            title="GitHub"
          >
            <FaGithub />
          </a>

          {/* Contact Page (Internal Route) */}
          <Link
            to="/contact"
            className="hover:text-green-400"
            title="Contact Me"
          >
            <FaPaperPlane />
          </Link>

          {/* Portfolio Website */}
          <a
            href="https://rohit-sharma-portfolio.netlify.app/" // replace with your real portfolio link
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400"
            title="Portfolio"
          >
            <FaGlobe />
          </a>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 mt-4">
        © {new Date().getFullYear()} Foodie Apps. All rights reserved.
      </div>
    </footer>
  );
};
export default Footer;
