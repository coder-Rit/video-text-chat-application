import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";

import "./assets/VisbyRoundCF-Regular.woff";
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import store from './store';
import { Provider } from 'react-redux';
import cookies from "js-cookie";
import { GET_USER_STATUS } from './graphQL/chats/query';


const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });


const authLink = new ApolloLink((operation, forward) => {
  // Get the latest authorization token from cookies when the request is made
  operation.setContext({
    headers: {
      authorization: cookies.get('authToken') || '',
    },
  });

  return forward(operation);
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
   
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
