import { SignIn } from '@clerk/nextjs'
import React from 'react'

export default function page() {
  return (
    <div className='flex items-center justify-center min-h-[100dvh] relative z-30'>
        <SignIn/>
    </div>
  )
}
