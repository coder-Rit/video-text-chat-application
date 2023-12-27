import { useContext, useEffect, useState } from "react";

import axios from "axios";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

import { useIsMobile } from "../functions/isMobile";
import { Context } from "../functions/context";
import { privateKey } from "../functions/constants";

import TextInput from "./components/TextInput";
import PhotoInput from "./components/PhotoInput";
import Button from "./components/Button";
import Link from "./components/Link";

interface SignUpFormProps {
  onHasAccount: () => void;
}
interface PersonObject {
  userName: string;
  password: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  
}

const CREATE_USER = gql`
  mutation CreateUser(
    $userName: String
    $firstName: String!
    $lastName: String
    $email: String!
    $password: String!
  ) {
    createUser(
      userName: $userName
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      email
      firstName
      id
      lastName
      userName
      token 
    }
  }
`;



const SignUpForm = (props: SignUpFormProps) => {
  // State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImageUrl, setprofileImageUrl] = useState("//");
  // Hooks
  const { setUser } = useContext(Context);
  const isMobile: boolean = useIsMobile();
  const [createUser, { loading, error, data }] = useMutation(CREATE_USER, {
    variables: {
      userName,
      firstName,
      lastName,
      email,
      password
    }
  });
 


  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userJson: PersonObject = {
      userName: email,
      firstName: firstName,
      lastName: lastName,
      email: email, 
      password: password,
      // is_online: true,
    };

    console.log(userJson);
    
    await createUser()

  };


  useEffect(() => {
    console.log(data);
    console.log(error);
    
  }, [ data ,error])
  
  return (
    <div>
      <div className="form-title">Create an account</div>

      <div className="form-subtitle">
        Already a member?{" "}
        <Link onClick={() => props.onHasAccount()}>Log in</Link>
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

        <PhotoInput
          label="Profile picture"
          name="avatar"
          id="avatar-picker"
          style={{ width: isMobile ? "100%" : "calc(50% - 6px)" }}
          onChange={(e) => {
            if (e.target.files !== null) {
              setprofileImageUrl("");
            }
          }}
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
