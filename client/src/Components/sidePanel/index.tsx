//packages

import React, { useEffect, useRef, useState } from 'react'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import { motion } from "framer-motion";

//utils
import useDisplay, { useDisplayI } from '../../hooks/useDisplay';

//components
import FindUser from './FindUser';
import MyProfile from '../myProfile';
import MyFriends from './MyFriends';
import GoBack from '../../Components/AuthPage/components/GoBack';
import SettingPage from './SettingPage';






const FriendsPannel = (props: any) => { 
    
    const { socket } = props

    //hooks
    const Dispaly: useDisplayI = useDisplay()

    const profile = useRef<HTMLDivElement>(null)
    const friends = useRef<HTMLDivElement>(null)
    const addFriend = useRef<HTMLDivElement>(null)
    const settings = useRef<HTMLDivElement>(null)
    const index = useRef<HTMLDivElement>(null)

    
    //states
    const [openSiderState, setopenSiderState] = useState<string>("friends")
    const [leftGap, setleftGap] = useState<number>(70)
 

    //active class
    function setActiveClass(active: any, ...deactive: any) {

        active.current?.classList.add("active")
        active.current?.classList.remove("deactive")

        for (let i = 0; i < deactive.length; i++) {
            const element = deactive[i];
            element.current?.classList.remove("active")
            element.current?.classList.add("deactive")
        }

    }

    //set button state
    useEffect(() => {

        switch (openSiderState) {
            case "addFriend":
                setActiveClass(addFriend, friends, profile, settings, index)
                break;
            case "profile":
                setActiveClass(profile, friends, addFriend, settings, index)
                break;
            case "friends":
                setActiveClass(friends, addFriend, profile, settings, index)
                break;
            case "settings":
                setActiveClass(settings, friends, addFriend, profile, index)
                break;
            case "index":
                setActiveClass(index, addFriend, profile, settings, friends)
                break;
            default:


                break;
        }

    }, [openSiderState])



    

    useEffect(() => {

        if (Dispaly.getScreenWidth() <= 650) {
            setleftGap(0)
        } else {
            setleftGap(70)
        }

    }, [window.innerWidth])



    return (
        <>


        
            {// user profile comp
                openSiderState === "profile" && <motion.div className="addFriendDiv"
                    initial={{ opacity: 0, x: -400 }}
                    animate={{ opacity: 1, x: leftGap }}
                    transition={{
                        duration: 0.2,

                    }}   >
                    <MyProfile goBack={setopenSiderState} icon=""></MyProfile>
                </motion.div>
            }

            {// all my friends component
                openSiderState === "friends" && <motion.div className="addFriendDiv"
                    initial={{ opacity: 0, x: -400 }}
                    animate={{ opacity: 1, x: leftGap }}
                    transition={{
                        duration: 0.2,

                    }}
                >
                    <MyFriends socket={socket} goBack={setopenSiderState}  icon=""></MyFriends>
                </motion.div>
            }

            {// find user comp
                openSiderState === "addFriend" && <motion.div className="addFriendDiv"
                    initial={{ opacity: 0, x: -400 }}
                    animate={{ opacity: 1, x: leftGap }}
                    transition={{
                        duration: 0.2,

                    }}
                >
                    <FindUser goBack={setopenSiderState}></FindUser>
                </motion.div>
            }

            {// setting page comp
                openSiderState === "settings" && <motion.div className="addFriendDiv"
                    initial={{ opacity: 0, x: -400 }}
                    animate={{ opacity: 1, x: leftGap }}
                    transition={{
                        duration: 0.2,

                    }}
                >
                    <SettingPage goBack={setopenSiderState}></SettingPage>
                </motion.div>
            }





            {/* buttons */}
            <div className="grid-item">
                <div className="sidepanle">
                    <div className='sidepanle_btns'>
                        <div ref={profile} className='zIndex2' onClick={() => setopenSiderState("profile")}><PersonIcon></PersonIcon></div>
                        <div ref={friends} className='zIndex2' onClick={() => setopenSiderState("friends")}><PeopleIcon></PeopleIcon></div>
                        {
                            Dispaly.getScreenWidth() < 1000 && <div ref={index} className='zIndex2' onClick={() => setopenSiderState("index")}><GoBack goBack={setopenSiderState} icon="message"></GoBack></div>
                        }
                        <div ref={addFriend} className='zIndex2' onClick={() => setopenSiderState("addFriend")} ><PersonAddIcon></PersonAddIcon></div>
                        <div ref={settings} className='zIndex2' onClick={() => setopenSiderState("settings")}><SettingsIcon></SettingsIcon></div>

                    </div>

                </div>
            </div>
        </>

    )
}

export default FriendsPannel 