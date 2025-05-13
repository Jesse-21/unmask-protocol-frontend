
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Index from './pages/Index';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import UnauthorizedPage from './pages/UnauthorizedPage';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load non-critical pages to improve initial load performance
const RugIdSearchPage = lazy(() => import('./pages/RugIdSearchPage'));
const ReportingPage = lazy(() => import('./pages/ReportingPage'));
const ProjectRegistrationPage = lazy(() => import('./pages/ProjectRegistrationPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ApiKeyRequestPage = lazy(() => import('./pages/ApiKeyRequestPage'));
const ApiInfoPage = lazy(() => import('./pages/ApiInfoPage'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const AgentInvestigationPage = lazy(() => import('./pages/AgentInvestigationPage'));
const TrustAgreementPage = lazy(() => import('./pages/TrustAgreementPage'));

// Loading fallback
const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={
                <ErrorBoundary>
                  <Header />
                  <Index />
                </ErrorBoundary>
              } />
              
              <Route path="/login" element={
                <ErrorBoundary>
                  <LoginPage />
                </ErrorBoundary>
              } />
              
              <Route path="/rugid" element={
                <ErrorBoundary>
                  <Header />
                  <Suspense fallback={<LoadingFallback />}>
                    <RugIdSearchPage />
                  </Suspense>
                </ErrorBoundary>
              } />
              
              <Route path="/report" element={
                <ErrorBoundary>
                  <Header />
                  <Suspense fallback={<LoadingFallback />}>
                    <ReportingPage />
                  </Suspense>
                </ErrorBoundary>
              } />
              
              <Route path="/register" element={
                <ErrorBoundary>
                  <Header />
                  <Suspense fallback={<LoadingFallback />}>
                    <ProjectRegistrationPage />
                  </Suspense>
                </ErrorBoundary>
              } />
              
              <Route path="/api" element={
                <ErrorBoundary>
                  <Suspense fallback={<LoadingFallback />}>
                    <ApiKeyRequestPage />
                  </Suspense>
                </ErrorBoundary>
              } />
              
              <Route path="/api-info" element={
                <ErrorBoundary>
                  <Header />
                  <Suspense fallback={<LoadingFallback />}>
                    <ApiInfoPage />
                  </Suspense>
                </ErrorBoundary>
              } />
              
              <Route path="/trust-agreement" element={
                <ErrorBoundary>
                  <Suspense fallback={<LoadingFallback />}>
                    <TrustAgreementPage />
                  </Suspense>
                </ErrorBoundary>
              } />
              
              <Route path="/unauthorized" element={
                <ErrorBoundary>
                  <Header />
                  <UnauthorizedPage />
                </ErrorBoundary>
              } />
              
              <Route path="/about" element={
                <ErrorBoundary>
                  <Header />
                  <Suspense fallback={<LoadingFallback />}>
                    <AboutPage />
                  </Suspense>
                </ErrorBoundary>
              } />
              
              {/* Protected Admin Route */}
              <Route path="/admin/*" element={
                <ErrorBoundary>
                  <ProtectedRoute requiredRole="admin">
                    <Suspense fallback={<LoadingFallback />}>
                      <AdminPanel />
                    </Suspense>
                  </ProtectedRoute>
                </ErrorBoundary>
              } />
              
              {/* Protected Agent Route */}
              <Route path="/investigations/*" element={
                <ErrorBoundary>
                  <ProtectedRoute requiredRole="agent">
                    <Suspense fallback={<LoadingFallback />}>
                      <AgentInvestigationPage />
                    </Suspense>
                  </ProtectedRoute>
                </ErrorBoundary>
              } />
              
              {/* Default redirect for authenticated users */}
              <Route path="/auth-redirect" element={
                <ErrorBoundary>
                  <ProtectedRoute>
                    {({ user }) => {
                      if (user?.role === 'admin') return <Navigate to="/admin" replace />;
                      if (user?.role === 'agent') return <Navigate to="/investigations" replace />;
                      return <Navigate to="/" replace />;
                    }}
                  </ProtectedRoute>
                </ErrorBoundary>
              } />
              
              {/* 404 Route - must be last */}
              <Route path="*" element={
                <ErrorBoundary>
                  <Header />
                  <div className="py-20 text-center">
                    <h1 className="text-3xl font-bold">Page Not Found</h1>
                    <p className="mt-4">The page you are looking for does not exist.</p>
                  </div>
                </ErrorBoundary>
              } />
            </Routes>
          </div>
          <Footer />
        </div>
        <Toaster position="top-center" />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
