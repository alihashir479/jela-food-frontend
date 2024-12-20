import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layouts/layout"
import HomePage from "./pages/HomePage"
import AuthPage from "./pages/AuthPage"
import UserProfilePage from "./pages/UserProfile"
import ProtectedRoute from "./auth/ProtectedRoute"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout showHero><HomePage /></Layout>}  />
      <Route element={<ProtectedRoute />}>
        <Route path="/user-profile" element={<Layout><UserProfilePage /> </Layout>} />
      </Route>
      <Route path="/auth-callback" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes