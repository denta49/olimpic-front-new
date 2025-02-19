import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import StudentPage from "./pages/StudentPage";
import CoordinatorPage from "./pages/CoordinatorPage";
import AdminPage from "./pages/AdminPage";
import RequireAuth from "./components/RequireAuth";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import NewPasswordPage from "./pages/NewPasswordPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route path="new-password" element={<NewPasswordPage />} />

        <Route element={<RequireAuth allowedRole="student" />}>
          <Route path="student" element={<StudentPage />} />
        </Route>

        <Route element={<RequireAuth allowedRole="coordinator" />}>
          <Route path="coordinator" element={<CoordinatorPage />} />
        </Route>

        <Route element={<RequireAuth allowedRole="admin" />}>
          <Route path="admin" element={<AdminPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
