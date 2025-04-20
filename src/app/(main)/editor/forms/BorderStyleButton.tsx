import React from 'react'
import { Button } from '@/components/ui/button'
import { Circle, Square, Squircle } from 'lucide-react'
interface BorderStyleProps{
    borderStyle:string | undefined
    changeborderStyle:(borderStyle:string)=>void
}
export const BorderStyles={
    SQUARE:"square",
    CIRCLE:"circle",
    SQUIRCLE:"squircle"
}
const borderStyles=Object.values(BorderStyles)
export default function BorderStyleButton({borderStyle,changeborderStyle}:BorderStyleProps) {
    function HandleClick(){
       const currentIndex=borderStyle ? borderStyles.indexOf(borderStyle) : 0
       const nextIndex=(currentIndex + 1)%borderStyles?.length
       changeborderStyle(borderStyles[nextIndex])
    }
    const Icon=borderStyle === "square" ? Square : borderStyle === "circle" ? Circle : Squircle
  
    return (
    <Button 
    title='Change Border Radius'
    size={"icon"}
    onClick={(HandleClick)}
   
    className="bg-[#121212] border border-stone-400 text-gray hover:bg-black">
        <Icon className='size-5'/>
    </Button>
  )
}
