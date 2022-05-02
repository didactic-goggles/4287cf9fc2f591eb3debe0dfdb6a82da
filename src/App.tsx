import type { RouteObject } from 'react-router-dom';
import { Outlet, useRoutes } from 'react-router-dom';
import Products from './features/products/Products';
import ProductDetails from './features/product-details/ProductDetails';
import NoMatch from './features/NoMatch';
function App() {
  let routes: RouteObject[] = [
    {
      path: '/',
      children: [
        { index: true, element: <Products /> },
        { path: '/product/:productId', element: <ProductDetails /> },
      ],
    },
    { path: '*', element: <NoMatch /> },
  ];
  const element = useRoutes(routes);
  return (
    <div className="container">
      {element}
      <Outlet />
    </div>
  );
}

export default App;
