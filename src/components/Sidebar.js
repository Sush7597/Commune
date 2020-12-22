import {React, useState, useEffect} from 'react'
import "./Sidebar.css"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CallIcon from '@material-ui/icons/Call';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import SidebarChannel from './SidebarChannel';
import { Avatar } from '@material-ui/core';
import {useSelector} from 'react-redux'
import {selectUser} from '../features/userSlice'
import db, { auth } from '../Firebase';

function Sidebar() {
    const user = useSelector(selectUser)
    const [channels, setChannels] = useState([])

    useEffect(() => {
        db.collection("channels").onSnapshot(snapshot => (
            setChannels(snapshot.docs.map((doc) => ({
                id : doc.id,
                channel : doc.data()
            })))
        ))
    }, [setChannels])


    const handleAddChannel = () => {
            const channelName = prompt("Enter a channel name.")
            if(channelName) {
                db.collection('channels').add({
                    channelName
                })
            }
    }

    return (
        <div className = "sidebar">
            <div className="sidebar__top">
                <h3>Sush7597</h3>
                <ExpandMoreIcon />
            </div>

            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <ExpandMoreIcon />
                        <h4> Add Channels </h4>
                    </div>

                    <AddIcon className = "sidebar__addchannel" onClick = {handleAddChannel}/>
                </div>

                <div className="sidebar__channelList">
                {
                    channels.map( ({id, channel}) => (
                        <SidebarChannel 
                        key = {id}
                        id = {id} 
                        channelName = {channel.channelName} />
                    ))
                }
            </div>

            </div>  

            <div className="sidebar__voice">
                <SignalCellularAltIcon 
                className = "sidebar__voiceIcon"
                fontSize = "large"
                />
                <div className="sidebar__voiceInfo">
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>
                <div className="sidebar__voiceIcons">
                    <InfoOutlinedIcon />
                    <CallIcon />
                </div>
            </div>

            <div className="sidebar__profile">
                <Avatar onClick = {() => auth.signOut()} src = {user.photo}/>
                <div className="sidebar__profileInfo">
                    <h3>{user.displayName}</h3>
                    <p>#{user.email.split("@")[0]}</p>
                </div>
                <div className="sidebar__profileIcons">
                    <MicIcon />
                    <HeadsetIcon />
                    <SettingsIcon />
                </div>
            </div>

        </div>
    )
}

export default Sidebar
