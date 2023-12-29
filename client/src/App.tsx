

import AuthPage from "./AuthPage";
import ChatsPage from "./ChatsPage";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";


import "./app.css";
import gql from "graphql-tag";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { validate } from "graphql";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { loadUser, register } from "./actions/userActions";

const LOAD_USER = gql`

query Query($token: String!) {
  loadUser(token: $token) {
    userName
    profileImageURL
    lastName
    firstName
    id
    email
  }
}

`


function App() {

   const { loading, data, error } = useQuery(LOAD_USER, {
    variables: {
      token: Cookies.get('authToken')
    }
  })
  const Dispatch: any = useDispatch()


  useEffect(() => {
    if (data) {
      Dispatch(loadUser(data.createUser, true));
      
    }
  }, [data])
 

  return (
    <Router>

      <Routes>
        <Route index element={<AuthPage />} />
        <Route path="chatt" element={<ChatsPage />} />

      </Routes>
    </Router>
  )


}

export default App;
