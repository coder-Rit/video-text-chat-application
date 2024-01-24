
//packages
import { CSSProperties, useEffect, useState } from "react";
import { userInterface } from "../../Interfaces/user";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

//utils
import valley from "../../assets/valley.jpeg";
import { rootState } from "../../Interfaces";

//components
import DummyUser from "./DummyUser";
import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";

const AuthPage = () => {
  const [hasAccount, setHasAccount] = useState(false);
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

  const backgroundImage = {
    backgroundImage: `url(${valley})`, // Here due to variable
  } as CSSProperties;

  return (
    <div className="background-image" style={backgroundImage}>
      <Toaster richColors position="top-center" />

      <div className="background-gradient-dark">
        <div style={styles.titleStyle}>Pretty</div>
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
    paddingBottom: "4vw",
  } as CSSProperties,
};

export default AuthPage;
