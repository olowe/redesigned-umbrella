import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { OrderbookPage } from "../../pages";

const router = createBrowserRouter([{ path: "/", Component: OrderbookPage }]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
