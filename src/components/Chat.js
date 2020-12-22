import React, { useEffect, useState } from 'react'
import './Chat.css'
import {AddCircle} from '@material-ui/icons'
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import ChatHeader from './ChatHeader'
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { selectChannelId, selectChannelName } from '../features/appSlice';
import db from '../Firebase';
import firebase from 'firebase'

function Chat() {

    const user = useSelector(selectUser)
    const channelId = useSelector(selectChannelId)
    const channelName = useSelector(selectChannelName)
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])
    let i = 1;
    useEffect(() => {
        if(channelId) {
            db.collection("channels").doc(channelId).collection("messages")
            .orderBy('timeStamp', 'desc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }
    }, [channelId])

    const sendMessage = e => {
        e.preventDefault()

        db.collection("channels").doc(channelId).collection("messages").add(
            {
                message: input,
                user : user,
                timeStamp : firebase.firestore.FieldValue.serverTimestamp()
            }
        )

        setInput("")
    }

    return (

        <div className = "chat">
            <ChatHeader channelName = {channelName}/>
            <div className="chatMessages">
                {
                    messages.map((message) => (
                        <Message 
                            key = {i++}
                            timeStamp = {message.timeStamp}
                            message = {message.message}
                            user = {message.user}
                         />
                    ))
                }
            </div>

            <div className="chatInput">
                <AddCircle fontSize = "large"/>
                <form>
                    <input placeholder = {`Type Message...`} disabled = {!channelId} value = {input} onChange = {(e) => setInput(e.target.value)}/>
                    <button className = "chatInputButton" disabled = {!channelId} onClick = {sendMessage} type = "submit"> Send Message</button>
                </form>

                <div className="chatInputIcons">
                    <CardGiftcardIcon />
                    <GifIcon/>
                    <EmojiEmotionsIcon />
                </div>
            </div>
        </div>
    )
}

export default Chat
