import React from 'react'
import Navbar from '../../components/Navbar/Navbar'

export default function layout({children}:{
    children:React.ReactNode
}) {
  return (
    <div className=''>
        <Navbar/>
        {children}
    </div>
  )
}
