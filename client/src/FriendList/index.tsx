import React, { useState } from 'react'
import User from "./User";
import FindUser from './FindUser';
import MyFriends from './MyFriends';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
const FriendsPannel = (props:any) => {

    const [openSider, setopenSider] = useState(false)





    return (
        <>
            <div className="addFriendDiv" id="addFriendDiv" style={{ left: !openSider ? "-450px" : "0px" }}   >
                
                <span onClick={() => setopenSider(false)}>
                <ArrowBackIcon sx={{cursor:"pointer"}}></ArrowBackIcon>
                </span>


                <FindUser></FindUser>


            </div>


            <div className="sidepanle">
                <div>
                    <span onClick={() => setopenSider(true)}><PersonAddIcon></PersonAddIcon></span>
                    <span><PersonIcon></PersonIcon></span>
                    
                </div>

                <div>

                    <MyFriends socket={props.socket}></MyFriends>
                </div>
            </div>
        </>

    )
}

export default FriendsPannel