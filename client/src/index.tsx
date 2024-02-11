import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import "./assets/VisbyRoundCF-Regular.woff";
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import store from './store';
import { Provider } from 'react-redux';
import cookies from "js-cookie";
 

const httpLink = new HttpLink({ uri: `${process.env.REACT_APP_SERVER_API}/graphql` });


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

      {/* @ts-ignore */}
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
);
