import React, { useState } from 'react'
import { useRouter } from 'next/router';
import useGroup from '@/hooks/useGroup';
import { Avatar, CircularProgress, IconButton, Menu, MenuItem } from '@mui/material';
import { AddAPhoto, AddPhotoAlternate, MoreVert } from '@mui/icons-material';
import MediaPreview from './MediaPreview';
import ChatFooter from './ChatFooter';
import { nanoid } from 'nanoid';
import { addDoc, collection, deleteDoc, doc, getDocs, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import Compressor from 'compressorjs';
import { db, storage } from '@/utils/firebase';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import useChatMessages from '@/hooks/useChatMessages';
import ChatMessages from './ChatMessages';

function Chat({user}) {
  const router = useRouter()
  const groupId = router.query.groupId ?? "";
  const userId = user.uid;
  const group = useGroup(groupId,userId)
  const[image,setImage] = useState(null);
  const[src,setSrc] = useState('');
  const[audioId,setAudioId] = useState('');
  const[input,setInput] = useState('')
  const [openMenu,setOpenMenu] = useState(null)
  const[isDeleting,setDeleting] = useState(false)
  const messages = useChatMessages(groupId)



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
    setSrc("")
    setImage(null)
  }

async function sendMessage(e){
      e.preventDefault()
      setInput('')
      if(image) closePreview()
      const imgName = nanoid()
      const newMsg = {
        name:user.displayName,
        message:input,
        uid:user.uid,
        timestamp:serverTimestamp(),
        time: new Date().toUTCString(),
        ...(image ? {imgUrl:"uploading", imgName}:{})
      }
      
      
      await setDoc(doc(db,`users/${userId}/chats/${groupId}`),{
        name:group.name,
        photoURL:group.photoURL || null,
        timestamp:serverTimestamp()
      });

      const newDoc = await addDoc(collection(db,`groups/${groupId}/messages`),newMsg);
      if(image) {
        new Compressor(image,{
          quality:0.8,
          maxWidth:1920,
          async success(result){
            setSrc('')
            setImage(null)
            await uploadBytes(ref(storage,`images/${imgName}`),result)
           const url = await getDownloadURL(ref(storage,`images/${imgName}`)) 
          //  by docs for storage.

          await updateDoc(doc(db,`groups/${groupId}/messages/${newDoc.id}`),{
            imgUrl:url
          });
          }

        })
      }
  }

  async function deleteGroup(){
    setOpenMenu(null)
    setDeleting(true)
    try{
      const userChatsRef = doc(db,`user/${userId}/chats/${groupId}`)
      const groupRef = doc(db,`groups/${groupId}`)
      const groupMessagesRef = collection(db,`groups/${groupId}/messages`)
      const groupMessages = await getDocs(query(groupMessagesRef))
      const audioFiles = []
      const imageFiles = []

      groupMessages?.docs.forEach(doc => {
        if(doc.data().audioName()){
          audioFiles.push(doc.data().audioName)
        }
        else if (doc.data().audioName){
          imageFiles.push(doc.data().imageName)
        }
      })

      await Promise.all([
        deleteDoc(userChatsRef),
        deleteDoc(groupRef),
        ...groupMessages.docs.map( doc => deleteDoc(doc.ref)),
        ...imageFiles.map(img => deleteObject(ref(storage,`images/${img}`))),
        ...audioFiles.map(aud => deleteObject(ref(storage,`audio/${aud}`))),
      ])

    }catch(e){console.log("Deletion error...",e.message)}
    finally{
      setDeleting(false)
    }
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
            
            
            <IconButton  onClick={event => setOpenMenu(event.currentTarget)}>
              <MoreVert />
            </IconButton>
            <Menu id='menu' anchorEl={openMenu} open={!!openMenu}  onClose ={() => {setOpenMenu(null)}} keepMounted>
              <MenuItem onClick={deleteGroup}>Delete group</MenuItem>
            </Menu>

        </div>
      </div>

      <div className='chat__body--container'>
        <div className='chat__body'>
          <ChatMessages messages={messages} user={user} groupId={groupId} audioId={audioId} setAudioId={setAudioId} />

        </div>
      </div>

        <MediaPreview src={src} closePreview = {closePreview} />
        <ChatFooter input={input} onChange={e => setInput(e.target.value)} image= {image} user={user} group = {group} groupId={groupId} sendMessage={sendMessage} setAudioId={setAudioId} />

        {isDeleting && (
          <div className='chat__deleting'>
            <CircularProgress />
          </div>
        )}
    </div>
  );
}

export default Chat