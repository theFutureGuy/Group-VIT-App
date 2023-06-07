import { CircularProgress } from '@mui/material'
import React from 'react'

if (!data){
return (
    <div className='loader__container sidebar__loader'><CircularProgress /></div>
)
}
function SidebarList({title,data}) {
  return (
    <div className='sidebar__chat--container'>
        <h2>{title}</h2>
    </div>
  )
}

export default SidebarList