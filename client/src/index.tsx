import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";

import "./assets/VisbyRoundCF-Regular.woff";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import store from './store';
import { Provider } from 'react-redux';
import   {createUploadLink} from "apollo-upload-client";

const client = new ApolloClient({
  link:createUploadLink({
    uri: 'http://localhost:4000/graphql', // Replace with your GraphQL server endpoint
  }),
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
 