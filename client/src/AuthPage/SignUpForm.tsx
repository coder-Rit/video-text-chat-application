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
import { User, userInterface } from "../Interfaces/user";
import { } from "../functions/context";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../actions/userActions";
import { useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../Firebase/Firebase";
import { toast } from "sonner";
import { CREATE_USER } from "../graphQL/user/query";








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
  const [profileImageURL, setprofileImageURL] = useState("");
  const [ProfileImgFile, setProfileImgFile] = useState<File | undefined>(
    undefined
  );
  const [progresspercent, setProgresspercent] = useState(0);



  // Hooks
  let navigate = useNavigate();

  // const { setUser } = useContext(Context);
  const Dispatch: any = useDispatch()


  const isMobile: boolean = useIsMobile();
  const [createUser, { loading, error, data }] = useMutation(CREATE_USER);



  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      toast.error("Please provide complete details")
      return;
    }



    const userJson = {
      userName: firstName + lastName,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      profileImageURL: profileImageURL,
      lastSeen: new Date().toISOString,
    };



    createUser({
      variables: userJson
    })

  };

  const uploadFiles = (file: File) => {

    if (!file) return;

    const storageRef = ref(storage, `ProfilesImages/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setprofileImageURL(downloadURL)
          console.log(downloadURL);

        });
      }
    );

  }





  useEffect(() => {
    console.log(data);

    if (data) {
      sessionStorage.setItem("login", "true")
      Dispatch(register(data.createUser, true));
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

        <PhotoInput
          label="Profile picture"
          name="avatar"
          id="avatar-picker"

          style={{ width: isMobile ? "100%" : "calc(50% - 6px)" }}
          onChange={(e) => {
            if (e.target.files !== null) {
              setprofileImageURL("/");
              console.log(e.target.files[0]);

              uploadFiles(e.target.files[0])
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
