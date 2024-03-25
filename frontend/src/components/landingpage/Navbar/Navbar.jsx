import React from "react";
import Logo from "../../../assets/logo-mobile.svg";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";

const Navbar = () => {
  const handleSignUpClick = () => {
    // Redirect to web app
    window.location.href = "/app";
  };

  const handleLogInClick = () => {
    // Redirect to web app
    window.location.href = "/app";
  };

  return (
    <div className="shadow-lg bg-Solitude fixed w-full top-0 left-0 z-20">
      <div className="container mx-auto flex items-center justify-between px-2 py-4">
        <div className="flex items-center gap-4">
          <img src={Logo} alt=" Logo " className=" h-8 w-8" />
          <div className="text-3xl text-black font-sans tracking-wide font-bold pb-2">
            askmore
          </div>
        </div>
        <div>
          <SignInButton className="py-3 px-6 mr-4 font-bold text-sm border border-solid rounded-lg border-gray">
            Sign In
          </SignInButton>
          <SignUpButton className="py-3 px-6 font-bold text-sm border border-solid rounded-lg border-gray">
            Sign Up
          </SignUpButton>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
