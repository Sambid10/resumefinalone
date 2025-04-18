"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { easeIn, easeInOut, motion, useAnimate } from "framer-motion";
import Pointer from "./Pointer";
import Link from "next/link";
export default function HeroSection() {
  const [leftscope, leftanimate] = useAnimate();
  const [leftpointerscope, leftpointeranimate] = useAnimate();

  const [rightscope, rightanimate] = useAnimate();
  const [rightpointerscope, rightpointeranimate] = useAnimate();
 

  useEffect(() => {
    leftanimate([
      // Step 1: Fade in
      [leftscope.current, { opacity: [0, 1] }, { duration: 0.5 }],
      // Step 2: Move to x: 0, y: 0
      [leftscope.current, { x: 0, y: 0 }, { duration: 0.5 }],
    ]);
    leftpointeranimate([
      [leftpointerscope.current, { opacity: [0, 1] }, { duration: 0.5 }],
      [leftpointerscope.current, { y: 0, x: -100 }, { duration: 0.5 }],
      [leftpointerscope.current,{y:[0,16,0],x:0},{duration:0.5,ease:easeInOut}]
    ]);

    rightanimate([
        [rightscope.current,{opacity:[0,1]},{duration:0.5,delay:1.5}],
        [rightscope.current,{y:0,x:0},{duration:0.5}]
        
    ])

    rightpointeranimate([
        [rightpointerscope.current,{opacity:[0,1]},{duration:0.5,delay:1.5}],
        [rightpointerscope.current,{y:0,x:50},{duration:0.5}],
        [rightpointerscope.current,{y:[0,16,0],x:-20},{duration:0.5,ease:easeInOut}]
    ])
  }, []);
  return (
    <div className="h-[calc(100dvh-72px)] z-30 relative w-full overflow-x-visible flex items-center justify-center">
    
      {/* left design*/}
      <motion.div
        ref={leftscope}
        
        initial={{ opacity: 0, y: 100, x: -100 }}
        className="absolute z-20 -left-32 top-10 hidden xl:block "
      >
        <div className="relative h-[300px] w-[450px]">
          <Image
            src={"/classic.png"}
            fill
            draggable="false"
            alt="pic1"
            className="brightness-95 border object-cover border-blue-800 shadow-lg shadow-slate-800"
          />
        </div>
        <div className="absolute -top-[2px] -left-[2px] w-2 h-2 rounded-lg bg-blue-400"></div>
        <div className="absolute -top-[2px] -right-[2px] w-2 h-2 rounded-lg bg-blue-400"></div>
        <div className="absolute -bottom-[2px] -left-[2px] w-2 h-2 rounded-lg bg-blue-400"></div>
        <div className="absolute -bottom-[2px] -right-[2px] w-2 h-2 rounded-lg bg-blue-400"></div>
      </motion.div>
      <motion.div
        ref={leftpointerscope}
       
        initial={{ opacity: 0, y: 100, x: -200 }}
        className="absolute left-[22%] z-20 top-[25%] hidden xl:block"
      >
        <Pointer text={"Sambid"} className="absolute top-5 left-5 "/>
      </motion.div>

      {/* right design*/}
      <motion.div
        ref={rightpointerscope}
        initial={{ opacity: 0,y:-200,x:240 }}
        className="absolute right-[19%] bottom-[27%] z-30 hidden xl:block"
      >
        <Pointer text={"Hannni"} className="bg-red-400 absolute top-5 right-5 rounded-tr-none rounded-tl-2xl" />
      </motion.div>
      <motion.div
        ref={rightscope}
  
        initial={{opacity:0,y:-100,x:100}}
        className="absolute -right-24 bottom-12 hidden xl:block"
      >
        <div className="relative h-[500px] w-[390px]">
          <Image
          draggable="false"
            src={"/modern.png"}
            fill
            alt="pic1"
            unoptimized
            className="border object-cover border-blue-800 shadow-lg shadow-slate-800"
          />
        </div>
        <div className="absolute -top-[2px] -left-[2px] w-2 h-2 rounded-lg bg-blue-400"></div>
        <div className="absolute -top-[2px] -right-[2px] w-2 h-2 rounded-lg bg-blue-400"></div>
        <div className="absolute -bottom-[2px] -left-[2px] w-2 h-2 rounded-lg bg-blue-400"></div>
        <div className="absolute -bottom-[2px] -right-[2px] w-2 h-2 rounded-lg bg-blue-400"></div>
      </motion.div>
      <span className="flex flex-col items-center gap-4 ">
        <h1
          className="max-w-4xl mx-auto font-bold flex flex-col items-center gap-1 text-center 
  text-4xl leading-8
  capitalize
  md:text-5xl md:leading-11 
  lg:text-7xl lg:leading-14"
        >
          <span>
            Create a&nbsp;
            <span className="bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent">
              Perfect Resume
            </span>
          </span>
          <span>in Minutes</span>
        </h1>

        <span className="max-w-xl mx-auto">
          <h1 
         
          className="text-sm md:text-lg italic  text-gray-400 font-light tracking-wide text-center">
            Our Resume Builder helps you create a professional resume <br/>— no experience or expertise needed.
          </h1>
        </span>
        <span className="mt-2">
          <Link 
          href={"/resume"}
          className="bg-slate-700 no-underline group cursor-pointer relative shadow-3xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            </span>
            <div className="relative flex space-x-2 items-center z-10 rounded-full hover:bg-gray-950 transition-colors ease-in duration-200 bg-slate-900 py-[6px] px-4 md:py-2 md:px-6 ring-1 ring-white/10 ">
              <span className="text-base md:text-xl">Get Started</span>
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M10.75 8.75L14.25 12L10.75 15.25"
                ></path>
              </svg>
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-red-200/0 via-red-400/90 to-red-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
          </Link>
        </span>
      </span>
    </div>
  );
}
