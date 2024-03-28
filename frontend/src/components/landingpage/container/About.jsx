import React from "react";
import about from "../../../assets/About.jpg";

const About = () => {
  return (
    <div className="section" id="about">
      <div className="grid md:grid-cols-2 gap-8 place-items-center">
        <div className="border-[3px] border-solid border-teal-500 rounded-lg">
          <img src={about} alt="" className="p-4" />
        </div>
        <div>
          <div className="font-bold sm:text-[1.875rem] text-[1.5rem] mb-5">
            We offer top-tier
            <br /> interactive{" "}
            <span className=" text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-500 ">
              learning experiences
            </span>
          </div>
          <p className="text-lg text-gray leading-7 mb-4">
            Experience unparalleled interactive learning with askmore. Elevate
            engagement, foster collaboration, and deepen understanding
            seamlessly. Revolutionize the way you learn and interact, setting
            new standards in discussions.
          </p>
          <button className="py-3 px-6 text-sm border border-solid border-gray rounded-lg font-bold">
            Know More
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
