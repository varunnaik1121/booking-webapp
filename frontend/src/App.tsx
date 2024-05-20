import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './Layouts/layout';
import Error from './components/Error';
import Register from './pages/Register';
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
    path: '*',
    element: (
      <Layout>
        <Error />
      </Layout>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
