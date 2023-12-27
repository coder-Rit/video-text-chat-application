import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";

import "./assets/VisbyRoundCF-Regular.woff";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Replace with your GraphQL server endpoint
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)