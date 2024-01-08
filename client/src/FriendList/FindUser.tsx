import { User } from "../Interfaces/user";
import { useEffect, useRef, useState } from "react";
import gql from "graphql-tag";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { userList } from "../actions/userActions";
import UserSearchDisplay from "./UserSearchDisplay";
import SearchIcon from '@mui/icons-material/Search';
import GoBack from "../AuthPage/components/GoBack";

const FIND_USER = gql`
 
 query SearchFriend($userName: String!, $load: Int) {
  searchFriend(userName: $userName, load: $load) {
    userName
    profileImageURL
    id
    lastName
      firstName
  }
}

`


const FindUser = (props: any) => {
    const { goBack } = props


    // const { setUser } = useContext(Context);
    const Dispatch: any = useDispatch()

    const friendList_element = useRef<HTMLInputElement>(null)

    const [UserList, setUserList] = useState([{
    }])
    const [userName, setuserName] = useState("")
    const [load, setload] = useState(8)

    const [searchFriend, { data, error, loading }] = useLazyQuery(FIND_USER, {
        variables: {
            userName: userName,
            load: load
        },
        onCompleted: (data) => {
            setUserList(data.searchFriend)
        }

    })



    useEffect(() => {

        console.log(userName);
        if (userName !== "" || !userName) {
            searchFriend()
        }

    }, [userName])


    useEffect(() => {
        Dispatch(userList(UserList))
    }, [UserList])



    useEffect(() => {
        console.log(load);

        const handleScroll = () => {
            if (!friendList_element.current) {
                return;
            }

            // Check if the user has scrolled to the bottom of the target div
            const targetDiv = friendList_element.current;
            const scrollPosition = window.innerHeight + window.scrollY;
            const divBottom = targetDiv.offsetTop + targetDiv.clientHeight;

            if (scrollPosition >= divBottom) {
                setload(load + 10);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [load]);


    return (

        < >
            <GoBack goBack={props.goBack} icon="goBack"></GoBack>

            <div className="searchUserheader" >
                <h2 className='sidepanle_heading'>ADD FRIENDS</h2>
                <div className="searchGrp">
                    <SearchIcon sx={{ opacity: "0.5", width: "25px", marginTop: "5px" }}></SearchIcon>
                    <input type="text" name="userName" className="userNameInput" value={userName} id="" onChange={(e) => setuserName(e.target.value)} placeholder="Search username" />
                </div>
            </div>
            <div className="user-list" ref={friendList_element} >
                <UserSearchDisplay friendList={UserList} loading={loading} usedFor="findUser"></UserSearchDisplay>
            </div>
        </ >
    )
}

export default FindUser 