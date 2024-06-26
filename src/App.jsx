import "./App.css";
import { AnimatePresence } from "framer-motion";
import { DashboardPage, LoginPage, NotFoundPage, ProductsPage } from "./pages";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Routes, Route, useLocation } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  const location = useLocation();
  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard/*" element={<DashboardPage />}>
              <Route path="" element={<ProductsPage />} />
              <Route
                path="*"
                element={<NotFoundPage error="404 - Page Not Found" />}
              />
            </Route>
          </Route>
          <Route
            path="*"
            element={<NotFoundPage error={"404 - Page Not Found"} />}
          />
        </Routes>
      </AnimatePresence>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
