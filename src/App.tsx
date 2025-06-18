
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { AuthGuard } from "./components/auth/AuthGuard";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import ClientPortal from "./pages/ClientPortal";
import AdminPortal from "./pages/AdminPortal";
import PendingApproval from "./pages/PendingApproval";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={
              <AuthGuard requireAuth={false}>
                <AuthPage />
              </AuthGuard>
            } />
            <Route path="/pending-approval" element={
              <AuthGuard>
                <PendingApproval />
              </AuthGuard>
            } />
            <Route path="/dashboard" element={
              <AuthGuard allowedRoles={['client']}>
                <Dashboard />
              </AuthGuard>
            } />
            <Route path="/client/*" element={
              <AuthGuard allowedRoles={['client']}>
                <ClientPortal />
              </AuthGuard>
            } />
            <Route path="/admin/*" element={
              <AuthGuard allowedRoles={['admin']}>
                <AdminPortal />
              </AuthGuard>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
