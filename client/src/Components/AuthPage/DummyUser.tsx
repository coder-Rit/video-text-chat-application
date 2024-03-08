//packages
import React, { useEffect } from 'react'
import LoginIcon from '@mui/icons-material/Login';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./index.css";

//utils
import useDisplay from '../../hooks/useDisplay';
import { LoginAction } from '../../actions/userActions';

//components
import ProfileImage from './components/ProfileImage';
import { toast } from 'sonner';

const LOGIN = gql`
query UserLogin($email: String!, $password: String!) {
  userLogin(email: $email, password: $password) {
    id
    userName
    firstName
    lastName
    email
    profileImageURL
    token
    friendList {
      id
      userName
      firstName
      lastName
      profileImageURL
      lastSeen
    }
  }
}

`


const DummyUser = (props: any) => {
    const { email, password, username, url } = props.user

    const Display = useDisplay().getScreenWidth()
    let navigate = useNavigate();
    const Dispatch: any = useDispatch()
 

    const [loginUser, { loading, error, data }] = useLazyQuery(LOGIN, {
        variables: {
            email,
            password,
        }
    });



    const directLogin = () => {
        toast.promise(loginUser, {
            loading: 'Loading...',
            success: (data) => {
                return `Loin succesfull`;
            },
            error: 'Error',
        });
    }

    useEffect(() => {
        if (data) {
            Dispatch(LoginAction(data.userLogin, true))
            sessionStorage.setItem("login", "true")
            navigate('chatt')
        }
    }, [data])

    return (
        <div className="login-form-container">
            <div>
                <div className='imageNname'>
                    <ProfileImage url={url} className="login-logo" username={username}  ></ProfileImage>
                    <h3>{username}</h3>
                </div>


            </div>
            <div className="login-div">
                <button className="login-button" onClick={directLogin}>{Display >= 1000 ? "Direct Login" : <LoginIcon></LoginIcon>}</button>
            </div>
        </div>
    )
}

export default DummyUser