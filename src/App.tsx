import { Routes, Route } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import StudentPage from "@/pages/StudentPage";
import AdminPanel from "@/pages/AdminPanel";
import UnauthorizedPage from "@/pages/UnauthorizedPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import NewPasswordPage from "@/pages/NewPasswordPage";
import RegisterPage from "@/pages/RegisterPage";
import { RequireAuth } from "@/components/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/new-password" element={<NewPasswordPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<RequireAuth allowedRole="student" />}>
        <Route path="/student" element={<StudentPage />} />
      </Route>

      <Route element={<RequireAuth allowedRole={["admin", "coordinator"]} />}>
        <Route path="/admin" element={<AdminPanel />} />
      </Route>
    </Routes>
  );
}

export default App;
