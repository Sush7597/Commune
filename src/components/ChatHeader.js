import NotificationsIcon from '@material-ui/icons/Notifications';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import React from 'react'
import "./ChatHeader.css"
import { HelpRounded, SearchRounded, SendRounded} from '@material-ui/icons';


function ChatHeader({channelName}) {

    return (
        <div className = "chatHeader">
            <div className="chatHeader__left">
                <h3>
                    <span className = "chatHeader__hash">
                        #
                    </span>
                    {channelName}
                </h3>
            </div>

            <div className = "chatHeader__right">
                <NotificationsIcon />
                <EditLocationIcon />
                <PeopleAltIcon />
            

                <div className="chatHeader__search">
                    <input placeholder = "Search" />
                    <SearchRounded />
                </div>

                <SendRounded />
                <HelpRounded />
            </div>
        </div>
    )
}

export default ChatHeader
