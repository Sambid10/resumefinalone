import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
export default function Pointer({text,className}:{
    text?:string,
    className?:string
}) {
  return (
    <div className='relative '>
        <Image
        height={18}
        width={18}
        unoptimized
        alt='pointer'
        src={"/pointer.png"}
        className={cn("text-white")}
        />
        <div className={cn('bg-blue-400  text-base font-normal border border-stone-700 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl  px-3 py-[2px]',className)}>
            {text}
        </div>
    </div>
  )
}
