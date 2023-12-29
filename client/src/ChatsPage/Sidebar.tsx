import UserSearchDisplay from "./UserSearchDisplay";
import { User } from "../Interfaces/user";
import { useEffect, useState } from "react";
import gql from "graphql-tag";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { userList } from "../actions/userActions";


const FIND_USER = gql`
query SearchFriend($userName: String!) {
  searchFriend(userName: $userName) {
    profileImageURL
    userName
  }
}

`


const Sidebar = () => {



  // const { setUser } = useContext(Context);
  const Dispatch: any = useDispatch()

  const [UserList, setUserList] = useState([{
  }])
  const [userName, setuserName] = useState("")

  const [searchFriend, { data, error, loading }] = useLazyQuery(FIND_USER, {
    variables: {
      userName: userName
    },
   
  })




  useEffect(() => {

    console.log(userName);
      searchFriend()

  }, [userName])
  

  useEffect(() => {
    console.log(UserList);
    Dispatch(userList(UserList))
  }, [UserList])





  return (
    <div >
      <div className="user-profile">
        <img src="https://api.multiavatar.com/Binx Bond.svg" alt="User Avatar" className="avatar" />
        <p className="username">John Doe</p>
      </div>
      <div className="friends-list">
        <h2>Friends</h2>
        <ul>
          <UserSearchDisplay  ></UserSearchDisplay>
        </ul>
      </div>
      <div  >
        <input type="text" name="userName" value={userName} id="" onChange={(e) => setuserName(e.target.value)} placeholder="enter you friends email" />

      </div>
    </div>
  );
};

export default Sidebar;
