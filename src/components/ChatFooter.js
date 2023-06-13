import { MicRounded, Send } from '@mui/icons-material';
import React from 'react'

function ChatFooter() {
    const canRecord = true;
    const recordIcon = (
        <>
            <Send style={{width:20, height:20, color:'whitesmoke' }} />
            <MicRounded style={{width:24, height:24, color:'whitesmoke' }} />
        </>
    )
  return (
    <div className='chat__footer'>
        <form>
            <input placeholder='Type message here...' />
            {canRecord ? (
                <button type='submit' className='send__btn'>{recordIcon}</button>
            )
        :(
            <>
            <label htmlFor='capture' className='send__btn' >{recordIcon}</label>
            <input style={{display:'none'}} type='"file'id='capture' accept='audio/*' capture />
            </>
        )
        }
        </form>

    </div>
  )
}

export default ChatFooter