import { Navigate, Route, Routes } from "react-router";
import  Layout  from './layouts/Layout';
import HomePage from "./pages/HomePage";
import AuthCallBackPage from "./pages/AuthCallBackPage";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./api/queryClient";
import UserProfilePage from "./pages/UserProfilePage"
import ProtectedRoute from "./auth/ProtectedRoute";

const AppRoutes = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <Routes>
      {/* Rutas publicas */}
      <Route path="/" element={
        <Layout showHero={true}>
            <HomePage />
        </Layout>
      }/>
      <Route path="/auth-callback" element={<AuthCallBackPage/>} />
      {/*Rutas privadas */}
      <Route element={<ProtectedRoute/>}>
      <Route path="/user-profile" element={<Layout><UserProfilePage/></Layout>} />
      </Route>
      <Route path="*" element={<Navigate to="/"/>} />
    </Routes>
    </QueryClientProvider>
  )
} //fin de approutes

export default AppRoutes;