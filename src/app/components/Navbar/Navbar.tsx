import React from "react";
import AuthButton from "./AuthButton";
import Image from "next/image";
import Link from "next/link";
export default function Navbar() {
  return (
    <header className="h-18 border-b border-slate-500  w-full  sticky top-0 bg-transparent z-30">
      <div className="mx-auto px-6 xl:px-0 max-w-7xl flex items-center justify-between h-full">
        <Link 
        href={"/"}
        className="flex items-center gap-2 ">
          <div>
          <Image
              src={"/lol.svg"}
              alt="logo"
              height={30}
              width={30}
            />
          </div>
           
            <div>
            <h1 
          
            className="font-bebas  tracking-widest text-xl md:text-2xl">Resume Builder</h1>
            </div>
            
        </Link>
        <div>
            <AuthButton/>
        </div>
      </div>
    </header>
  );
}
