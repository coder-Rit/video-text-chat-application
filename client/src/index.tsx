import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";

import "./assets/VisbyRoundCF-Regular.woff";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import store from './store';
import { Provider } from 'react-redux';
 import cookies from "js-cookie";
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Replace with your GraphQL server endpoint
  cache: new InMemoryCache(),
  headers:{
    authorization:cookies.get('authToken')||""
  }
});



const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
);
