
//packages
import { User as userinterf } from '../../Interfaces/user'

//components
import { UsersComp } from './components/User';



const UserSearchDisplay = (props: any) => {

 
 
  return (
    < >
      {props.friendList &&
        props.friendList.map((data: userinterf,index:number) => {
          return (
            <UsersComp index={index} user={data} goBack= {props.goBack}  ></UsersComp>
          )
        })
      }

        {!props.loading && <div className="laoderClass" id="laoderClass">
          <span className="loaderPersonal"></span>
          <span> Loading...</span>
        </div>}
    </ >
  )
}

export default UserSearchDisplay