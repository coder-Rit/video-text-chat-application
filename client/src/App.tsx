

import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect } from "react";
import Cookies from "js-cookie";


import "./app.css";
import { useDispatch } from "react-redux";
import { loadUser } from "./actions/userActions";
import { LOAD_USER } from "./graphQL/user/query";


import Main from "./Components/main";
import AuthPage from "./Components/AuthPage";
import { toast } from "sonner";
import { Alert } from "@mui/material";



function App() {

  const [loadUserQ, { loading, data, error }] = useLazyQuery(LOAD_USER, {
    variables: {
      token: Cookies.get('authToken')
    }
  })
  const Dispatch: any = useDispatch()


  useEffect(() => {
    if (data) {
      Dispatch(loadUser(data.loadUser, true));

    }
  }, [data])

  useEffect(() => {
    loadUserQ()
    if (!sessionStorage.getItem("count")) {
      toast(
        <Alert severity="info">Preparing server,<b> plaease wait for 50 sec</b></Alert>
      )
    }
  }, [])


  return (
    <Router>

      <Routes>
        <Route index element={<AuthPage />} />
        <Route path="chatt" element={<Main />} />
      </Routes>
    </Router>
  )


}

export default App;
