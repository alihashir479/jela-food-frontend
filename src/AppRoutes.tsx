import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import UserProfilePage from "./pages/UserProfile";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageResturantPage from "./pages/ManageResturantPage";
import SearchResturantPage from "./pages/SearchResturantPage";
import ResturantDetail from "./pages/ResturantDetail";
import OrderStatusPage from "./pages/OrderStatusPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      />
      <Route element={<ProtectedRoute />}>
      <Route
          path="/order-status"
          element={
            <Layout>
              <OrderStatusPage />
            </Layout>
          }
        />
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
        <Route
          path="/manage-resturant"
          element={
            <Layout>
              <ManageResturantPage />{" "}
            </Layout>
          }
        />
      </Route>
      <Route
        path="/search/:city"
        element={
          <Layout>
            <SearchResturantPage />
          </Layout>
        }
      />
      <Route path="/resturant/detail/:id" element={<Layout> <ResturantDetail /> </Layout> } />
      <Route path="/auth-callback" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
