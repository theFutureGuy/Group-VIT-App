import { db, storage } from '@/utils/firebase';
import recordAudio from '@/utils/recordAudio';
import { CancelRounded, CheckCircleRounded, MicRounded, Send } from '@mui/icons-material';
import { addDoc, collection, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { nanoid } from 'nanoid';
import React, { useEffect, useRef, useState } from 'react'

function ChatFooter({input,onChange,image,user,group,groupId,sendMessage,setAudioId }) {
    const record = useRef()
    const [duration,setDuration] = useState('00:00')
    const timerInterval = useRef()
    const canRecord = !!navigator.mediaDevices.getUserMedia && !!window.MediaRecorder;
    const [isRecording,setRecording] = useState(false);
    const canSendMessage = input.trim() || (input === "" && image)
    const recordIcon = (
        <>
            <Send style={{width:20, height:20, color:'whitesmoke' }} />
            <MicRounded style={{width:24, height:24, color:'whitesmoke' }} />
        </>
    );

    useEffect(() => {
        if(isRecording){
            record.current.start();
            startTimer()
        }
    },[isRecording])

function pad(val){
    return String(val).length < 2 ? `0${val}`:val ;
}

    function startTimer(){
        const start = Date.now()
        timerInterval.current = setInterval(setTime,100)
        function setTime(){
          const timebtw = Date.now() - start;
          const totalS = Math.floor(timebtw/1000)
          const minutes = pad(parseInt(totalS/60))
          const seconds = pad(parseInt(totalS%s60))
          const duration = `${minutes} : ${seconds}`;
          setDuration(duration)
        }
    }
    

    async function startRecording(e) {
        e.preventDefault()
        record.current = await recordAudio() //found in github
        setRecording(true)
        setAudioId('')
    }

    async function stopRecording() {
       clearInterval(timerInterval.current);
       setRecording(false);
       const audio = await record.current.stop();
       setDuration('00:00');
       return audio
    }

    async function finishRecording(){
        const audio = await stopRecording()
        const {audioFile,audioName} = await audio;
        //console.log(audioFile,audioName)
        sendAudio(audioFile,audioName)
    }

    async function sendAudio(audioFile,audioName){
        await setDoc(doc(db,`users/${user.uid}/chats/${groupId}`),{
            name: group.name,
            photoURL:group.photoURL,
            timestamp:serverTimestamp()
        })
        const newDoc = await addDoc(collection(db,`groups/${groupId}/messages`),{
            name: user.displayName,
            uid:user.uid,
            timestamp:serverTimestamp(),
            time:new Date().toUTCString(),
            audioUrl : "uploading",
            audioName
        })
        await uploadBytes(ref(storage,`audio/${audioName}`),audioFile)
        const url = await getDownloadURL(ref(storage,`audio/${audioName}`))
        await updateDoc(doc(db,`groups/${groupId}/messages/${newDoc.id}`),{
           audioUrl:url 
        })
    }

    function audioInputChange(event){
        const audioFile = event.target.files[0];
        const audioName = nanoid()

        if(audioFile){
            setAudioId('')
            sendAudio(audioFile,audioName)
        }
    }

  return (
    <div className='chat__footer'>
        <form>
            <input placeholder='Type message here...' style={{width: isRecording ? "calc(100% -20px)" : "calc(100% -112px)"}} value={input} onChange={onChange} />
            {canRecord ? (
                <button onClick={canSendMessage ? sendMessage : startRecording} type='submit' className='send__btn'>{recordIcon}</button>
            )
        :(
            <>
            <label htmlFor='capture' className='send__btn' >{recordIcon}</label>
            <input style={{display:'none'}} type='"file'id='capture' accept='audio/*' capture onChange={audioInputChange} />
            </>
        )
        }
        </form>

        {
            isRecording && (
                <div className='record'>
                    <div>
                        <CancelRounded onClick={stopRecording} style={{width:30,height:30, color:'#f20519'}} />
                        <div className='record__redcircle' />
                        <div className='record__duration'>{duration}</div>
                    </div>
                    <CheckCircleRounded onChange={finishRecording} style={{width:30,height:30,color:"#41bf49"}} />
                </div>
            )
        }

    </div>
  )
}

export default ChatFooter