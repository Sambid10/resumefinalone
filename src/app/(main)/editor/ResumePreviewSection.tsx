"use client"
import ClassicResumePreview from '@/app/components/ResumePreview/ResumePreview'
import { ResumeValues } from '@/lib/validation'
import React from 'react'
import ColorPicker from './forms/ColorPicker'
import BorderStyleButton from './forms/BorderStyleButton'
import ModernResumePreview from '@/app/components/ResumePreview/ModernResume'
import LayoutStyleButton from '@/app/components/ResumePreview/LayoutStyleButton'
import { useLayoutStore } from '@/zustand/layoutstore'
interface Props{
    resumeData:ResumeValues,
    setResumeData:(data:ResumeValues)=>void
}


export default function ResumePreviewSection({resumeData,setResumeData}:Props) {
  const {layouts,setLayout}=useLayoutStore()
  const currentLayout=layouts[resumeData.id!] || "Modern"
  return (
    <div className='flex w-full h-fit justify-center bg-[#121212] p-2 relative border-stone-400 border'>
        <div className='absolute right-4 top-4 flex items-center gap-2'>
          <ColorPicker color={resumeData.colorHex} onChange={(color)=>setResumeData({...resumeData,colorHex:color.hex})}/>
          <BorderStyleButton borderStyle={resumeData.borderStyle} changeborderStyle={(borderstyle)=>setResumeData({...resumeData,borderStyle:borderstyle})}/>
          <LayoutStyleButton resume={resumeData}/>
        </div>
        
    
        {currentLayout === "Classic" ?  <ClassicResumePreview resumeData={resumeData} className='max-w-2xl shadow-md'/> : <ModernResumePreview resumeData={resumeData} className='max-w-2xl shadow-md'/>}
       
    </div>
  )
}
