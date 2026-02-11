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

// Layout component that includes ScrollToTop
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
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
        routeMetadata: {
          pageIdentifier: 'dashboard',
        },
      },
      {
        path: "ai-chat",
        element: <AIChatPage />,
        routeMetadata: {
          pageIdentifier: 'ai-chat',
        },
      },
      {
        path: "doctors",
        element: <DoctorsPage />,
        routeMetadata: {
          pageIdentifier: 'doctors',
        },
      },
      {
        path: "features",
        element: <FeaturesPage />,
        routeMetadata: {
          pageIdentifier: 'features',
        },
      },
      {
        path: "resources",
        element: <ResourcesPage />,
        routeMetadata: {
          pageIdentifier: 'resources',
        },
      },
      {
        path: "contact",
        element: <ContactPage />,
        routeMetadata: {
          pageIdentifier: 'contact',
        },
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
