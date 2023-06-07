import Home from '@/pages'
import { Add, ExitToApp, HomeMiniOutlined, Message, PeopleAlt, SearchOutlined } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import React, { useState } from 'react'
import SidebarTab from './SidebarTab'
const options = [
    {
        id:1,
        icon:<HomeMiniOutlined/>
    },
    {
        id:2,
        icon:<Message />
    },
    {
        id:3,
        icon:<PeopleAlt />
    },


]


function Sidebar({user}) {
    const [menu,setMenu] = useState(1)
    const data = [{
        id:1,
        name:"hgfgh",
        photURL:"nbjhg",
    }]
  return (
    <div className='sidebar'>
        <div className='sidebar__header--left'> 
            <Avatar src={user?.photURL} alt={user?.displayName} />
            <h4>{user?.displayName}</h4>
        </div>
        <div className='sidebar__header--right'>
            <IconButton>
                <ExitToApp />
            </IconButton>
        </div> 
        <div className='sidebar__search'>
            <form className='sidebar__search--container'>
                <SearchOutlined />
                <input
                    type="text"
                    id="search"
                    placeholder='Saech user here'
                />
            </form>
        </div>
        <div className='sidebar__menu'>
            {
                options.map(option => (
                    <SidebarTab key={option.id}
                     onClick={() => setMenu(tab.id)}
                     isActive={option.id===menu}
                    >
                        <div className='sidebar__menu--home'>
                            {option.icon}
                            <div className='sidebar__menu--line' />
                        </div>
                    </SidebarTab>

                ))
            }
        </div>
        <div className="sidebar__chat--addRoom">
            <IconButton>
                <Add />
            </IconButton>
        </div>
    </div>

  )
}

export default Sidebar