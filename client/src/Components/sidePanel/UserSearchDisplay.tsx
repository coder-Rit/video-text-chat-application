
//packages
import { User as userinterf } from '../../Interfaces/user'

//components
import User from './components/User';



const UserSearchDisplay = (props: any) => {

 

  return (
    < >
      {props.friendList &&
        props.friendList.map((data: userinterf,index:number) => {
          return (
            <User index={index} user={data} goBack= {props.goBack} usedFor ={props.usedFor}></User>
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