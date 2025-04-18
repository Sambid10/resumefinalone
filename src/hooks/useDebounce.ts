import { useEffect, useState } from "react";

export function useDebounce<T>(value:T,delay:number=250){
    const [debouncedValue,setdebouncedValue]=useState<T>(value)
    useEffect(()=>{
        const handler= setTimeout(()=>{
            setdebouncedValue(value)
        },delay)
        return ()=> clearTimeout(handler)
    },[value,delay])
    return debouncedValue
}