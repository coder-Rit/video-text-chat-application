
//packages
import { CSSProperties, useEffect, useState } from "react";
import { userInterface } from "../../Interfaces/user";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import VisibilityIcon from '@mui/icons-material/Visibility';
//utils
import valley from "../../assets/valley.jpeg";
import { rootState } from "../../Interfaces";

//components
import DummyUser from "./DummyUser";
import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";
import SocialMedia from "./components/SocialMedia";
import axios from "axios";
import { Alert } from "@mui/material";

let counted = false

const AuthPage = () => {
  const [hasAccount, setHasAccount] = useState(false);
  const [PageCount, setPageCount] = useState(0);
  let navigate = useNavigate();

  const { isAuthenticated } = useSelector<rootState, userInterface>(
    (state) => state.user
  );

  const DemoUserData = [
    {
      url: "/",
      email: "john.doe@example.com",
      password: "123",
      username: "johndoe",
    },
    {
      url: "/",
      email: "catherine.brown@example.com",
      password: "123",
      username: "catherinebrown",
    },
  ];

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/chatt");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (sessionStorage.getItem("login") === "false") {
      toast.success("Log Out Successful");
      sessionStorage.setItem("login", "");

    }



  }, []);


  useEffect(() => {

    if (!sessionStorage.getItem("count")) {
      axios.get(`${process.env.REACT_APP_SERVER_API}/api/v1/pagedViewed`)
        .then(res => {
          setPageCount(res.data.count as number);
          sessionStorage.setItem("count", `${res.data.count as number}`)
          toast(<Alert severity="success">Server is ready, plaease login</Alert>)
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      setPageCount(JSON.parse(sessionStorage.getItem("count") as string));
    }
  }, [counted])





  const backgroundImage = {
    backgroundImage: `url(${valley})`, // Here due to variable
  } as CSSProperties;

  return (
    <div className="background-image" style={backgroundImage}>
      <Toaster richColors position="top-center" />

      <div className="background-gradient-dark">
        <div className="nameAndSocialMedia">
          <div style={styles.titleStyle}>Charler</div>
          <div>

          </div>
          <SocialMedia></SocialMedia>
        </div>
        <div className="form-users-div">
          <div style={styles.formContainerStyle}>
            {hasAccount ? (
              <LogInForm onHasNoAccount={() => setHasAccount(false)} />
            ) : (
              <SignUpForm onHasNoAccount={() => setHasAccount(true)} />
            )}
          </div>
          <div className="hrLine"></div>
          <div className="dummyUserDiv">
            <div className="form-title">Direct Login</div>
            <div className="form-subtitle">Test demo accounts</div>
            <div className="dummyUsers">
              {DemoUserData.map((user) => (
                <DummyUser user={user}></DummyUser>
              ))}
            </div>
          </div>
        </div>

        <div className="pageViewDiv">


          {PageCount}

          <VisibilityIcon></VisibilityIcon>
        </div>

      </div>
    </div>
  );
};

const styles = {
  formContainerStyle: {
    width: "100%",
    maxWidth: "650px",
  } as CSSProperties,
  titleStyle: {
    fontSize: "24px",
    fontFamily: "VisbyRoundCF-Heavy",
    letterSpacing: "0.5px",
    color: "white",
  } as CSSProperties,
};

export default AuthPage;
