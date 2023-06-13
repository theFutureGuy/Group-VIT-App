import React, { useState } from 'react'
import { useRouter } from 'next/router';
import useGroup from '@/hooks/useGroup';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { AddAPhoto, AddPhotoAlternate, MoreVert } from '@mui/icons-material';
import MediaPreview from './MediaPreview';
import ChatFooter from './ChatFooter';

function Chat({user}) {
  const router = useRouter()
  const groupId = router.query.groupId ?? "";
  const userId = user.uid;
  const group = useGroup(groupId,userId)
  const[image,setImage] = useState(null);
  const[src,setSrc] = useState('');
  const[] = useState(null)

  function showPreview(event){
    const file = event.target.files[0]
    if (file){
      setImage(file)
      const freader = new FileReader()
      freader.readAsDataURL(file)
      freader.onload = () =>{
        setSrc(freader.result)
      }
    }
  }

  function closePreview() {
    setSrc('')
    setImage(null)
  }

  if (!group) return null
  return (
    <div className='chat'>
      <div className='chat__background' />
      <div className='chat__header'>
        <div className='avatar__container'>
          <Avatar src = {group.photoURL} alt={group.name} /> 
        </div>
        <div className='chat__header--info'>
          <h2>{group.name}</h2>
        </div>

        <div className='chat__header--right'>
            <input id='img' style={{display:'none',}} accept='image/*' type='file' onChange={showPreview}/>
            <IconButton>
              <label style={{cursor:'pointer',height:24}} htmlFor='image'>
                <AddPhotoAlternate />
              </label>
            </IconButton>
            <IconButton>
              <MoreVert />
            </IconButton>
 
            <Menu id='menu' keepMounted>
              <MenuItem>Delete group</MenuItem>
            </Menu>
        </div>
      </div>
        <MediaPreview src={src} closePreview = {closePreview} />
        <ChatFooter />
    </div>
  );
}

export default Chat