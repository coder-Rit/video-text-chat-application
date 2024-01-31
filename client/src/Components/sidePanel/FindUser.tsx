//packages
import { useEffect, useRef, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import SearchIcon from '@mui/icons-material/Search';

//utils
import { userList } from "../../actions/userActions";
import { FIND_USER } from "../../graphQL/chats/query";

//components
import GoBack from "../../Components/AuthPage/components/GoBack";
import UserSearchDisplay from "./UserSearchDisplay";
import { sidePanle_I } from "../../Interfaces/common";


const SCROLL_THRESHOLD = 100;


const FindUser = (props: sidePanle_I) => {
    const { goBack } = props 

    // hooks
    const Dispatch: any = useDispatch()
    
    const friendList_element = useRef<HTMLDivElement>(null)


    // stats
    const [UserList, setUserList] = useState([{ }])
    const [userName, setuserName] = useState("")
    const [load, setload] = useState(8)


    // querys
    const [searchFriend, { data, error, loading }] = useLazyQuery(FIND_USER, {
        onCompleted: (data) => {
            setUserList(data.searchFriend)
        }
    })

 


    // Debounce utility function
    function debounce(func: Function, delay: number) {
        let timeoutId: NodeJS.Timeout;

        return function (this: any, ...args: any[]) {
            const context = this;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(context, args);
            }, delay);
        };
    }


    // api caller on ragex
    useEffect(() => {
        if (userName !== "" || !userName) {

            const timeoutId = setTimeout(() => {
                searchFriend({
                    variables: {
                        userName: userName,
                        load: load
                    },
                });
            }, 500);
            return () => clearTimeout(timeoutId);
        }

    }, [userName, load])

    useEffect(() => {
        Dispatch(userList(UserList))
    }, [UserList])



    // scroll to load new users
    useEffect(() => {
        const handleScroll = () => {
            if (!friendList_element.current) {
                return;
            }

            const targetDiv = friendList_element.current;
            const scrollPosition = window.innerHeight + window.scrollY;
            const divBottom = targetDiv.offsetTop + targetDiv.clientHeight;

            // Check if the user has scrolled close to the bottom with a threshold
            if (scrollPosition >= divBottom - SCROLL_THRESHOLD) {
                setload((prevLoad) => prevLoad + 10);
            }
        };

        const debouncedHandleScroll = debounce(handleScroll, 200); // Adjust debounce time as needed

        if (friendList_element.current) {
            friendList_element.current.addEventListener('scroll', debouncedHandleScroll);
        }

        return () => {
            if (friendList_element.current) {
                friendList_element.current.removeEventListener('scroll', debouncedHandleScroll);
            }
        };
    }, [load]);


    return (

        < >
            <GoBack goBack={goBack} icon="backIcon"></GoBack>

            <div className="searchUserheader" >
                <h2 className='sidepanle_heading'>ADD FRIENDS</h2>
                <div className="searchGrp">
                    <SearchIcon sx={{ opacity: "0.5", width: "25px", marginTop: "5px" }}></SearchIcon>
                    <input type="text"  className="userNameInput" value={userName}  autoComplete="new-user" onChange={(e) => setuserName(e.target.value)} placeholder="Search username" />
                </div>
            </div>
            <div className="user-list" ref={friendList_element} >
                <UserSearchDisplay friendList={UserList} loading={loading} usedFor="findUser"   ></UserSearchDisplay>
            </div>
        </ >
    )
}

export default FindUser 