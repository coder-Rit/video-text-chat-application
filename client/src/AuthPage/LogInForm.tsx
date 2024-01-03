import { useState, useContext, useEffect } from "react";


import TextInput from "./components/TextInput";
import Button from "./components/Button";
import Link from "./components/Link";

import { projectId } from "../functions/constants";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginAction } from "../actions/userActions";


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



interface LogInFormProps {
  onHasNoAccount: () => void;
}

const LogInForm = (props: LogInFormProps) => {
  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Hooks
  let navigate = useNavigate();

  // const { setUser } = useContext(Context);
   const Dispatch: any = useDispatch()

  const [loginUser, { loading, error, data }] = useLazyQuery(LOGIN, {
    variables: {
      email,
      password, 
    }
  });

  


  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginUser()
  };


  useEffect(() => {
    if (data) {
       Dispatch(LoginAction(data.userLogin,true))
       navigate('chatt')
    }
  }, [data ])
  

  return (
    <div>
      <div className="form-title">Welcome Back</div>

      <div className="form-subtitle">
        New here? <Link onClick={() => props.onHasNoAccount()}>Sign Up</Link>
      </div>

      <form onSubmit={onSubmit}>
        <TextInput
          label="Email"
          name="email"
          placeholder="adam@lamorre.co"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextInput
          label="Password"
          name="password"
          placeholder="********"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit">Log In</Button>
      </form>
    </div>
  );
};

export default LogInForm;
