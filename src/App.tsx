import React from "react";
import AppRouter from "./router/AppRouter";
import AxiosNavigation from "./router/AxiosNavigation";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <AxiosNavigation />

        <AppRouter />
      </QueryClientProvider>
    </div>
  );
}

export default App;
