import { SignedIn, SignedOut, SignInButton, UserButton, UserProfile } from "@clerk/nextjs";
import { User2Icon } from "lucide-react";
import React from "react";

export default function AuthButton() {
  return (
    <>
      <SignedIn>
        <UserButton
          
        />
      </SignedIn>
      <SignedOut>
        <SignInButton >
        <button className="group h-10 text-sm font-semibold border-blue-400 rounded-full px-6 border flex items-center gap-2 hover:bg-[#121212] transition-all duration-200 ease-in cursor-pointer">
            
            <User2Icon className="h-4 w-4 group-hover:text-blue-400  transition-all duration-200 ease-in"/>
            <h1 className="group-hover:text-blue-400  transition-all duration-200 ease-in">Sign in</h1>
        </button>
        </SignInButton>
      
      </SignedOut>
    </>
  );
}
