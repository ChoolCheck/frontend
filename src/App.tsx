import React from "react";
import AppRouter from "./router/AppRouter";
import { QueryClient, QueryClientProvider } from "react-query";
import Navigation from "./components/common/Navigation";

function App() {
  const queryClient = new QueryClient();

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        {window.location.href == "/" && <Navigation />}
        <AppRouter />
      </QueryClientProvider>
    </div>
  );
}

export default App;
