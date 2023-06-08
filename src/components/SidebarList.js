import { CircularProgress } from '@mui/material'
import React from 'react'
import SidebarItem from './SidebarItem'
import { CancelOutlined, SearchOutlined } from '@mui/icons-material';

if (!data){
return (
    <div className='loader__container sidebar__loader'><CircularProgress /></div>
)
}
function SidebarList({title,data}) {
  return (
    <div className='sidebar__chat--container'>
        <h2>{title}</h2>
        {data.map(i => (
            <SidebarItem key={i.id} item={i} />
        )) }
    </div>
  );
  if(!data.length && title === "Search Results"){
    return(
        <div className='no-result'>
            <div>
                <SearchOutlined />
                <div className='cancel-root'>
                    <CancelOutlined />
                </div>
            </div>
            <h2>{title} not found</h2>
        </div>
    )
  }
}

export default SidebarList