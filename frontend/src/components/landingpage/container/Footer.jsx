import React from "react";
import { BsGithub } from "react-icons/bs";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <>
      <div className="separator"></div>
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height: "auto" }}
        transition={{ duration: 1 }}
        className="p-10"
      >
        <div className="flex justify-between items-center text-gray">
          <div className="text-sm pl-4">© AskMore. All rights reserved.</div>
          <div className="pr-4">
            <a href="" className="hover:scale-110 text-xl">
              <BsGithub />
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Footer;
