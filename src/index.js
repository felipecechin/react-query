import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Cookies from 'js-cookie'
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import ConditionalQuery from "./ConditionalQuery";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { decryptData, encryptData } from "./encryptAndDecryptData";

const queryClient = new QueryClient();

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
  serialize: encryptData,
  deserialize: decryptData,
  key: 'react-query-persist'
})

persistQueryClient({
  queryClient,
  persister: localStoragePersister,
  maxAge: 1000 * 60 * 60 * 24, // 24 hours
  buster: Cookies.get('auth-token') ?? 'no-auth-token',
  hydrateOptions: {
    defaultOptions: {
      queries: {
        cacheTime: Infinity
      }
    }
  },
  dehydrateOptions: {
    shouldDehydrateQuery: ({ queryKey }) => {
      console.log(queryKey)
      return queryKey.length === 1 && queryKey[0] === 'todos'
    }
  }
})


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider
      client={queryClient}
    >
      <ConditionalQuery />
      <ReactQueryDevtools
        initialIsOpen={false}
        position='bottom-right'
      />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
