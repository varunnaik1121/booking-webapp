import {
  createBrowserRouter,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Layout from './Layouts/layout';
import Error from './components/Error';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import { useAppContext } from './context/AppContext';
import AddHotel from './pages/AddHotel';

function App() {
  const { isLoggedIn } = useAppContext();
  const router = createBrowserRouter([
    { path: '/', element: <Layout>{<span>Home Page</span>}</Layout> },
    { path: '/search', element: <Layout>{<div>Search page</div>}</Layout> },
    {
      path: '/register',
      element: (
        <Layout>
          <Register></Register>
        </Layout>
      ),
    },
    {
      path: '/sign-in',
      element: (
        <Layout>
          <SignIn></SignIn>
        </Layout>
      ),
    },
    {
      path: '/add-hotel',
      element: isLoggedIn ? (
        <Layout>
          <AddHotel />
        </Layout>
      ) : (
        <Navigate to={'/'}></Navigate>
      ),
    },
    {
      path: '*',
      element: <Navigate to={'/'}></Navigate>,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
