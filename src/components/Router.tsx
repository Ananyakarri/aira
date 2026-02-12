import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';

import HomePage from '@/components/pages/HomePage';
import DashboardPage from '@/components/pages/DashboardPage';
import AIChatPage from '@/components/pages/AIChatPage';
import DoctorsPage from '@/components/pages/DoctorsPage';
import FeaturesPage from '@/components/pages/FeaturesPage';
import ResourcesPage from '@/components/pages/ResourcesPage';
import ContactPage from '@/components/pages/ContactPage';

import RegisterPage from '@/components/pages/RegisterPage';
import LoginPage from '@/components/pages/LoginPage';
import ProtectedRoute from '@/components/ProtectedRoute';

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
  {
    index: true,
    element: <HomePage />,
  },

  {
    path: "register",
    element: <RegisterPage />,
  },

  {
    path: "login",
    element: <LoginPage />,
  },

  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },

  {
    path: "ai-chat",
    element: <AIChatPage />,
  },
  {
    path: "doctors",
    element: <DoctorsPage />,
  },
  {
    path: "features",
    element: <FeaturesPage />,
  },
  {
    path: "resources",
    element: <ResourcesPage />,
  },
  {
    path: "contact",
    element: <ContactPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
