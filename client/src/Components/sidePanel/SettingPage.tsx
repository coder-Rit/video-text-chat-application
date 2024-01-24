//packages

import LogoutIcon from '@mui/icons-material/Logout';
import cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

//utils
import { logOut } from '../../actions/userActions';

//components
import GoBack from '../AuthPage/components/GoBack'


const SettingPage = (props: any) => {

    //hooks
    let navigate = useNavigate();
    const Dispatch: any = useDispatch()


    // functions
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