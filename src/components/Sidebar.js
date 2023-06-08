import Home from '@/pages'
import { Add, ExitToApp, HomeMiniOutlined, Message, PeopleAlt, SearchOutlined } from '@mui/icons-material'
import { Avatar, IconButton,Dialog,DialogContent,TextField,DialogContentText,DialogTitle,DialogActions ,Button} from '@mui/material'
import React, { useState } from 'react'
import SidebarTab from './SidebarTab'
import SidebarList from './SidebarList'
import { addDoc, collection, getDocs, query, serverTimestamp } from 'firebase/firestore'
import { db,auth } from '@/utils/firebase'
import { useRouter } from 'next/router'
import useGroups from '@/hooks/useGroups'
import useUsers from '@/hooks/useUsers'
import useChats from '@/hooks/useChats'
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
    const [isCreatingGroup,setCreatingGroup] = useState(false)
    const [groupName,setgroupName] = useState('')
    const router = useRouter()
    const groups = useGroups()
    const users = useUsers(user)
    const chats = useChats(user)
    // const data = [{
    //     id:1,
    //     name:"hgfgh",
    //     photoURL:"",
    // }]
    const [searchResults,setSearchResults] = useState([])
    async function createGroup(){
        if (groupName?.trim()){
            const groupref = collection(db,'groups')
            const newDoc = await addDoc(groupref,{name: groupName, timestamp:serverTimestamp()})
        }
        setCreatingGroup(false)
        setgroupName('')
        setMenu(2)
        router.push(`/?roomId=${newDoc.id}`)

    }

    async function searchUsersGrups(e){
        e.preventDefault()
       const searchValue = e.target.elements.search.value;
       const userQuery = query(collection(db,'users'),where("name","==",searchValue));
       const useGroupQuery = query(collection(db,'groups'),where("name","==",searchValue));
       const userSnapshot = await getDocs(userQuery);
       const groupSnapshot = await getDocs(useGroupQuery);
      const userResults = userSnapshot?.docs.map((doc) => {
        const id = 
            doc.id > user.uid ? `${doc.id}${user.uid}`: `${user.uid}${doc.id}`;
        return (id, doc.data);
    }); 
    const groupresults = groupSnapshot?.docs.map((doc) => ({
        id:doc.id,
        ...doc.data(),
    })); 
    const searchResults = [...userResults,...groupresults]
    setMenu(4)
    setSearchResults(searchResults)
    }   

  return (
    <div className='sidebar'>
        <div className='sidebar__header--left'> 
            <Avatar src={user?.photURL} alt={user?.displayName} />
            <h4>{user?.displayName}</h4>
        </div>
        <div className='sidebar__header--right'>
            <IconButton onClick={() => auth.signOut()}>
                <ExitToApp />
            </IconButton>
        </div> 
        <div className='sidebar__search'>
            <form onSubmit={searchUsersGrups} className='sidebar__search--container'>
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
        {menu === 1 ? (
            <SidebarList title="Chats" data = {chats} />) :
           menu === 2 ? (<SidebarList title="Rooms" data={groups}/> ): 
           menu === 3?  (<SidebarList title="Users" data={users}/>) : 
           menu === 4 ? (<SidebarList title="Search results" data={searchResults}/>): null }
        <div className="sidebar__chat--addRoom">
            <IconButton onClick={() => {setCreatingGroup(true)}}>
                <Add />
            </IconButton>
        </div>
        <Dialog maxWidth="sm" open={isCreatingGroup}>
        <DialogTitle>Create New Group</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Search your public room, Every user will be able to join here..
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            onChange={(e) => setgroupName(e.target.value)}
            value={groupName}
            id="name"
            label="Group Name"
            type="text"
            fullWidth
            variant="filled"
            style={{
                marginTop:20
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={setCreatingGroup(false
            )}>Cancel</Button>
          <Button color="success" onClick={createGroup()}>Enter</Button>
        </DialogActions>
      </Dialog>
    </div>

  )
}

export default Sidebar