"use client"
import { ResumeValues } from "@/lib/validation"
import { useEffect, useState } from "react"
import { useDebounce } from "./useDebounce"
import { useSearchParams } from "next/navigation"
import { saveResume } from "@/app/(main)/editor/action"
import { toast } from "sonner"
import { FileReplacer } from "@/lib/utils"

export function useAutoSaveResume(resumevalues:ResumeValues){
    const searchParmas=useSearchParams()
    const [resumeId,setResumeId]=useState(resumevalues.id)
    const debouncedresumeValues=useDebounce(resumevalues,10000)
    const [isSaving,setisSaving]=useState(false)
    const [error,setError]=useState(false)
    const [lastsavedData,setlastsavedData]=useState(structuredClone(resumevalues))
    
    useEffect(()=>{

        setError(false)
    },[debouncedresumeValues])

    useEffect(()=>{
        async function save(){
           try{
            setisSaving(true)
            setError(false)
            const ndata=structuredClone(debouncedresumeValues)
            const updatedResume=await saveResume({
                ...ndata,
                ...(JSON.stringify(lastsavedData.photo,FileReplacer)=== JSON.stringify(ndata.photo,FileReplacer) && {
                    photo:undefined
                }),
                id:resumeId
            })
            setResumeId(updatedResume.id)
            setlastsavedData(ndata)
            
            if(searchParmas.get("resumeId") !== updatedResume.id){
                const nsearchParams=new URLSearchParams(searchParmas)
                nsearchParams.set("resumeId",updatedResume.id)
                window.history.replaceState(null,"",`?${nsearchParams.toString()}`)
            }
           }catch(err){
                setError(true)
                console.error(err)
                toast.error("something went wrong")
           }finally {
            setisSaving(false)
           }
        }
        console.log(debouncedresumeValues,"Debounce")
        console.log(lastsavedData,"LAST")
        const hasunsavedChanges=JSON.stringify(debouncedresumeValues,FileReplacer) !== JSON.stringify(lastsavedData,FileReplacer)
        if(hasunsavedChanges && debouncedresumeValues && !isSaving){
            save()
        }
    },[debouncedresumeValues,isSaving,lastsavedData,searchParmas,resumeId,error])
    return {isSaving,hasunsavedChange:JSON.stringify(resumevalues) !== JSON.stringify(lastsavedData)}
}