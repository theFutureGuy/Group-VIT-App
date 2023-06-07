import React from 'react'

function SidebarTab({onclick,isActive,children}) {
  return (
    <div onClick={onclick} className={`${isActive ? "sidebar__menu--selected":""}`}> {children}</div>
  )
}

export default SidebarTab