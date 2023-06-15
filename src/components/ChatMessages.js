import { CircularProgress } from "@mui/material"
import AudioPlayer from "./AudioPlayer"

export default function ChatMessages({messages,user,groupId}){

    if(!messages){ return null}
    return messages.map(message => {
        const isSender = message.uid === user.uid
        return (
            <div key={message.id} className= {`chat__message${isSender ? "chat__message--sender" : ""}`}>
                <span className="chat__name">{message.name}</span>
                {message.imageUrl == "uploading" ? (
                    <div className="image--container--loader">
                        <CircularProgress style={{width:40, height:40}} />

                    </div>
                ):message.imageUrl ? (
                    <div className="image-container">
                        <img src={message.imageUrl} alt={message.name} />

                    </div>
                ) : null
            }
            {message.audioname ? (
                <div></div>
            ):(<span className="chat__message--message">{message.message}</span>)}

            <span className="chat__timestamp">{message.time}</span>
            </div>
        )
    })
}