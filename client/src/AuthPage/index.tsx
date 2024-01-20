import { CSSProperties, useEffect, useState } from "react";


import valley from "../assets/valley.jpeg";
import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";
import { userInterface } from "../Interfaces/user";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { rootState } from "../Interfaces";
import { Toaster, toast } from "sonner";

import cookies from "js-cookie";

const AuthPage = () => {
  const [hasAccount, setHasAccount] = useState(false);
  let navigate = useNavigate();

  const { isAuthenticated } = useSelector<rootState, userInterface>((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/chatt")
    }
  }, [isAuthenticated])

  
  useEffect(() => { 
    if (sessionStorage.getItem('login')==="false") {
      toast.success("Log Out Successful") 
    } 
  }, [ ])
  


  const backgroundImage = {
    backgroundImage: `url(${valley})`, // Here due to variable
  } as CSSProperties;

  return (
    <div className="background-image" style={backgroundImage}>
      <Toaster richColors position="top-center" />
      
      <div className="background-gradient-dark">
        <div style={styles.formContainerStyle}>
          <div style={styles.titleStyle}>Pretty</div>

          {hasAccount ? (
            <LogInForm onHasNoAccount={() => setHasAccount(false)} />
          ) : (
            <SignUpForm onHasNoAccount={() => setHasAccount(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  formContainerStyle: {
    width: "100%",
    maxWidth: "650px",
    padding: "36px 72px",
  } as CSSProperties,
  titleStyle: {
    fontSize: "24px",
    fontFamily: "VisbyRoundCF-Heavy",
    letterSpacing: "0.5px",
    color: "white",
    paddingBottom: "11vw",
  } as CSSProperties,
};

export default AuthPage;
