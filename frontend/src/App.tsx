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
import MyHotels from './pages/MyHotels';
import EditHotel from './pages/EditHotel';
import Search from './pages/Search';
function App() {
  const { isLoggedIn } = useAppContext();
  const router = createBrowserRouter([
    { path: '/', element: <Layout>{<span>Home Page</span>}</Layout> },
    { path: '/search', element: <Layout>{<Search></Search>}</Layout> },
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
      path: '/my-hotels',
      element: isLoggedIn ? (
        <Layout>
          <MyHotels />
        </Layout>
      ) : (
        <Navigate to={'/'}></Navigate>
      ),
    },
    {
      path: '/edit-hotel/:hotelId',
      element: isLoggedIn ? (
        <Layout>
          <EditHotel />
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
