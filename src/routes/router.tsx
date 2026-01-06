import { createBrowserRouter } from "react-router-dom";
import SearchPage from "../pages/SearchPage";
import SearchResultsPage from "../pages/SearchResultsPage";
import SupplementDetailPage from "../pages/SupplementDetailPage";
import FavoritesPage from "../pages/FavoritesPage";
import NotFoundPage from "../pages/NotFoundPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchPage/>,
  },
  {
    path: "/search",
    element: <SearchResultsPage/>,
  },
  {
    path: "/supplement/:id",
    element: <SupplementDetailPage/>,
  },
  {
    path: "/favorites",
    element: <FavoritesPage/>,
  },
  {
    path: "*",
    element: <NotFoundPage/>
  },
]);
