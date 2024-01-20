import React, { useEffect } from 'react'
import GoBack from './components/GoBack'
import LogoutIcon from '@mui/icons-material/Logout';
import cookies from "js-cookie";
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../actions/userActions';
const SettingPage = (props: any) => {

    let navigate = useNavigate();
    const Dispatch: any = useDispatch()



    const log_out_user = () => {
        cookies.remove("authToken")
        sessionStorage.setItem("login", "false")
        Dispatch(logOut())
        navigate("/")

    }


    




    return (
        <div>  <GoBack goBack={props.goBack} icon="goBack"></GoBack>

            <div>
                <h2 className='sidepanle_heading'>SETTINGS</h2>
            </div>

            <div className='settingDiv'>
                <div>
                    <p>Log out</p>
                    <button
                        onClick={log_out_user}
                    ><LogoutIcon className='mui-icone-default'></LogoutIcon></button>
                </div>

            </div>
        </div>
    )
}

export default SettingPage