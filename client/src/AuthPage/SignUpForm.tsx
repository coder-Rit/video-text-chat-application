import { useContext, useEffect, useState } from "react";

import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

import { useIsMobile } from "../functions/isMobile";
// import { Context } from "../functions/context";
import { privateKey } from "../functions/constants";
import Cookies from "js-cookie";

import TextInput from "./components/TextInput";
import PhotoInput from "./components/PhotoInput";
import Button from "./components/Button";
import Link from "./components/Link";
import { User,  userInterface } from "../Interfaces/user";
import { } from "../functions/context";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../actions/userActions";
import { useSelector } from "react-redux";






const CREATE_USER = gql`
 
 mutation CreateUser($firstName: String!, $email: String!, $password: String!, $profileImageURL: String!, $lastName: String, $userName: String) {
  createUser(firstName: $firstName, email: $email, password: $password, profileImageURL: $profileImageURL, lastName: $lastName, userName: $userName) {
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
`;

interface LogInFormProps {
  onHasNoAccount: () => void;
}

const SignUpForm = (props: LogInFormProps) => {
  // State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImageURL, setprofileImageURL] = useState("//");
  // Hooks
  let navigate = useNavigate();

  // const { setUser } = useContext(Context);
   const Dispatch: any = useDispatch()


  const isMobile: boolean = useIsMobile();
  const [createUser, { loading, error, data }] = useMutation(CREATE_USER );



  const onSubmit =   (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userJson = {
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      profileImageURL: profileImageURL,
      lastSeen:new Date().toISOString,
     };
 
     

      createUser({
        variables:userJson
      })
 
  };

  useEffect(() => {
    console.log(data);

    if (data) {
      sessionStorage.setItem("login", "true")
      Dispatch(register(data.createUser,true));
      navigate("chatt")
    }

  }, [data])

  return (
    <div>
      <div className="form-title">Create an account</div>

      <div className="form-subtitle">
        Already a member?{" "}
        <Link onClick={() => props.onHasNoAccount()}>Log in</Link>
      </div>

      <form onSubmit={onSubmit}>
        <TextInput
          label="First name"
          name="firstName"
          placeholder="Adam"
          style={{ width: isMobile ? "100%" : "calc(50% - 6px)" }}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <TextInput
          label="Last name"
          name="lastName"
          placeholder="La Morre"
          style={{
            width: isMobile ? "100%" : "calc(50% - 6px)",
            float: "right",
          }}
          onChange={(e) => setLastName(e.target.value)}
        />

        <TextInput
          label="Email"
          name="email"
          placeholder="adam@lamorre.co"
          style={{ width: isMobile ? "100%" : "calc(50% - 6px)" }}
          onChange={(e) => setEmail(e.target.value)}
        />



        <TextInput
          label="Password"
          name="password"
          placeholder="********"
          type="password"
          style={{
            width: isMobile ? "100%" : "calc(50% - 6px)",
            float: "right",
          }}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* <PhotoInput
          label="Profile picture"
          name="avatar"
          id="avatar-picker"
          style={{ width: isMobile ? "100%" : "calc(50% - 6px)" }}
          onChange={(e) => {
            if (e.target.files !== null) {
              setprofileImageURL("");
            }
          }}
        /> */}
        <TextInput
          label="User Name"
          name="userName"
          placeholder="cavin456"
          style={{ width: isMobile ? "100%" : "calc(50% - 6px)" }}
          onChange={(e) => setuserName(e.target.value)}
        />

        <Button
          type="submit"
          style={{
            width: isMobile ? "100%" : "calc(50% - 6px)",
            float: "right",
          }}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
