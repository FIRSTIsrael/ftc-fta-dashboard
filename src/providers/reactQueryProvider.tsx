"use client";

import { type ReactNode } from "react";
import { REACT_QUERY_CLIENT_CONFIG } from "@/constants";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient(REACT_QUERY_CLIENT_CONFIG);

const ReactQuery = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools buttonPosition="bottom-left" />
  </QueryClientProvider>
);

export default ReactQuery;
