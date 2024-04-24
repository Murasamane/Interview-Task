import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TableProvider from "./components/TodoTable";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <TableProvider />
    </QueryClientProvider>
  );
}

export default App;
