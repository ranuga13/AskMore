import React from "react";
import { useCopyToClipboard } from 'react-use';
import { useState } from 'react';

function ShareModal({ setIsShareModalOpen}) {
    const [copied, setCopied] = useState(false);
    const [_, copyToClipboard] = useCopyToClipboard();

    const handleCopy = () => {
        copyToClipboard(window.location.href);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
            setIsShareModalOpen(false);
        }, 2000);
    };

    return(
        //Modal Container
        <div
        className="fixed right-0 bottom-0 left-0 top-0 px-2 py-4 
        overflow-scroll scrollbar-hide z-50 justify-center items-center 
        flex bg-[#00000080]"

        onClick={(e) => {
            if (e.target !== e.currentTarget) {
              return;
            }
            setIsShareModalOpen(false);
          }}

        >

            {/*Share Modal*/}

                <div className="scrollbar-hide overflow-y-scroll 
                max-w-md max-h-[95vh] my-auto bg-white 
                dark:bg-[#2b2c37] text-black 
                dark:text-white w-full px-8 py-8 rounded-xl"
                >
                    
                    <h3
                    className="font-bold text-black text-xl dark:bg-[#2b2c37] dark:text-white"
                    >
                       Share This Session
                    </h3>

                    <div
                    className="flex w-full mt-4 items-center justify-center 
                    space-x-4"
                    >
                        <button
                        onClick={handleCopy}
                        className="w-full items-center text-white dark:text-white
                        hover:opacity-85 font-bold bg-[#50ccc8] dark:bg-[#50ccc8]
                        py-2 rounded-full"
                        >
                            Click to Copy Link
                        </button>

                        {copied && <span className="ml-2 text-black dark:text-white">Copied!</span>}

                    </div>


                </div>
            
        </div>
    )
}

export default ShareModal