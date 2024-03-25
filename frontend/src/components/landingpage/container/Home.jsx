import React from "react";
import hero from "../../../assets/home-page.png";
import { logos } from "../../../Data";
import { motion } from "framer-motion";
import { SignUpButton } from "@clerk/clerk-react";
const Home = () => {
  const container = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const handleDiscoverClick = () => {
    const teacherSection = document.getElementById("teacher");
    teacherSection.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="section" id="home">
      <div className="md:flex items-center justify-center text-center">
        <div>
          <div className="sm:text-[3.5rem] text-[1.825rem] font-bold">
            Make your Q&A experiece <br />{" "}
            <span className=" text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-teal-500 ">
              wonderful
            </span>
          </div>
          <p className="text-lg leading-7 text-gray max-w-sm md:max-w-lg mx-auto">
            Revolutionize Q&A with our ML-driven platform! Effortlessly
            organize, moderate, and engage in dynamic discussions. Elevate your
            learning experience today!
          </p>
          <div className="mt-6">
            <SignUpButton className="px-6 py-3 font-bold text-white bg-[#50ccc8] rounded-3xl mr-4 text-sm">
              Get Started
            </SignUpButton>
            <button
              onClick={handleDiscoverClick}
              className="px-6 py-3 font-bold border border-solid border-gray rounded-3xl text-sm"
            >
              Discover
            </button>
          </div>
        </div>
      </div>

      <div className="drop-shadow-2xl  mx-auto md:w-[60%] py-10 flex justify-center items-center">
        <img src={hero} alt="" className="rounded-2xl" />
      </div>

      <div>
        <div className="sm:text-4xl text-2xl font-bold mb-5 mt-10 text-center">
          Technologies{" "}
          <span className=" text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-500 ">
            used
          </span>
        </div>
        <p className="text-center text-lg max-w-sm md:max-w-2xl mx-auto pb-3">
          Crafted using MERN stack, Tailwind CSS, Redux, and ML powerhouses like
          spaCy, NLTK, and Hugging Face for unparalleled innovation.
        </p>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          className="flex items-center justify-center flex-wrap gap-8 p-2"
        >
          {logos.map((logo, index) => (
            <motion.div variants={item} className="w-12" key={index}>
              <img src={logo} alt="" className="w-full object-cover" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
