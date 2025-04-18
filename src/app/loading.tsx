import { Loader2 } from 'lucide-react'
import React from 'react'
import Image from 'next/image'
export default function loading() {
  return (
    <div className='min-h-screen flex items-center justify-center w-full '>
        <Image
                     src={"/lol.svg"}
                     alt="logo"
                     height={80}
                     width={80}
                     className='animate-pulse duration-200 ease-in transition-all'
                   />
                 </div>


  )
}
