import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import ConditionalQuery from "./ConditionalQuery";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { persistQueryClient, persistQueryClientSave } from "@tanstack/react-query-persist-client";

const queryClient = new QueryClient();

const localStoragePersister = createSyncStoragePersister({ storage: window.localStorage })

persistQueryClient({
  queryClient,
  persister: localStoragePersister,
  maxAge: 1000 * 60 * 60 * 24, // 24 hours
  buster: '',
  hydrateOptions: undefined,
  dehydrateOptions: {
    shouldDehydrateQuery: ({ queryKey }) => {
      console.log(queryKey)
      return queryKey.length === 1 && queryKey[0] === 'todos'
    }
  },
})

persistQueryClientSave({
  queryClient,
  persister: localStoragePersister,
  buster: '',
  dehydrateOptions: {
    shouldDehydrateQuery: ({ queryKey }) => {
      console.log(queryKey)
      return queryKey.length === 1 && queryKey[0] === 'todos'
    }
  },
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
