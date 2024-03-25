import React from "react";
import { motion } from "framer-motion";
const Contact = () => {
  return (
    <div className="section" id="contact">
      <div className="text-center max-w-[600px] mx-auto">
        <div className="sm:text-3xl text-2xl font-bold mb-5">
          Want to{" "}
          <span className=" text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-500 ">
            get in touch?
          </span>
        </div>
        <p className="text-md leading-7 text-gray">
          Have questions or suggestions? Contact our dedicated team for
          assistance and collaborative opportunities. Connect with us!
        </p>
        <motion.p
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-5 text-lg font-bold "
        >
          infor.askmore@gmail.com
        </motion.p>
      </div>
    </div>
  );
};

export default Contact;
