import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './Layouts/layout';
import Error from './components/Error';
const router = createBrowserRouter([
  { path: '/', element: <Layout>{<span>Children</span>}</Layout> },
  { path: '/search', element: <Layout>{<div>Search page</div>}</Layout> },
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
