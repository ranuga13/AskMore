import React from "react";
import { accordions } from "../../../Data";
import Accordion from "./Accordion";
const Teacher = () => {
  return (
    <div className="section" id="teacher">
      <div className="sm:text-4xl text-2xl font-bold mb-10 text-center">
        Explore the{" "}
        <span className=" text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-500 ">
          solutions
        </span>
      </div>
      <div className="grid sm:grid-cols-2 place-items-center gap-8">
        {/* Feature 1 */}
        <div className="pl-5">
          <div className="font-bold sm:text-[1.875rem] text-[1.5rem] mb-5">
            ML-based Question{" "}
            <span className=" text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-500 ">
              Classification
            </span>
          </div>
          <p className="text-md leading-7 text-gray mb-5">
            Effortlessly categorize questions with our ML-based classification
            feature. Streamline organization and enhance efficiency, ensuring
            relevant responses and a focused learning experience for all users
          </p>
        </div>
        {/* <div className="p-4 md:w-3/4 sm:row-start-1">
          <img src={teacher1} alt="" />
        </div> */}
        {/* Feature 2 */}
        <div className="pl-5">
          <div className="font-bold sm:text-[1.875rem] text-[1.5rem] mb-5">
            Automatic Content <br />{" "}
            <span className=" text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-500 ">
              Moderation
            </span>
          </div>
          <p className="text-md leading-7 text-gray mb-5">
            Ensure a safe and productive environment with our Automatic Content
            Moderation feature. Effortlessly filter out inappropriate content,
            fostering a positive and respectful space for meaningful discussions
          </p>
        </div>
        {/* <div className="p-4 md:w-3/4">
          <img src={teacher2} alt="" />
        </div> */}
        {/* Feature 3 */}
        {/* <div className="p-4 md:w-3/4">
          <img src={teacher1} alt="" />
        </div> */}
        <div className="pl-5">
          <div className="font-bold sm:text-[1.875rem] text-[1.5rem] mb-5">
            Repetitive Question <br />{" "}
            <span className=" text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-500 ">
              Grouping
            </span>
          </div>
          <p className="text-md leading-7 text-gray mb-5">
            Streamline discussions by automatically grouping repetitive
            questions. Reduce redundancy and maintain focus, ensuring cohesive
            and efficient exchanges of ideas on our platform.
          </p>
        </div>
        {/* Feature 4 */}
        <div className="pl-5">
          <div className="font-bold sm:text-[1.875rem] text-[1.5rem] mb-5">
            Mark Responded <br />{" "}
            <span className=" text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-500 ">
              Questions
            </span>
          </div>
          <p className="text-md leading-7 text-gray mb-5">
            Simplify question tracking. Enhance organization and streamline
            communication between users, ensuring a seamless and productive
            learning experience on our platform
          </p>
        </div>
        {/* <div className="p-4 md:w-3/4">
          <img src={teacher2} alt="" />
        </div> */}
      </div>

      <div className="text-center my-8 font-bold sm:text-[1.875rem] text-[1.5rem]">
        Frequently{" "}
        <span className=" text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-500 ">
          Asked Questions
        </span>
      </div>
      <div className="mt-12 max-w-[700px] mx-auto">
        {accordions.map((accordion) => {
          return <Accordion key={accordion.id} {...accordion} />;
        })}
      </div>
    </div>
  );
};

export default Teacher;
