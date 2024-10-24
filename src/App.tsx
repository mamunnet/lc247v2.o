import { Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/public/Home";
import AdminLogin from "./pages/admin/Login";
import AgentList from "./pages/AgentList";
import AdminAgentList from "./pages/admin/AgentList";
import ReportList from "./pages/admin/ReportList";
import NoticeManager from "./pages/admin/NoticeManager";
import { useAuth } from "./contexts/AuthContext";
import SupportButton from "./components/SupportButton";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <AdminLogin />;
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="company-head" element={<AgentList type="company-head" />} />
          <Route path="admin" element={<AgentList type="admin" />} />
          <Route path="ss-admin" element={<AgentList type="ss-admin" />} />
          <Route path="sub-admin" element={<AgentList type="sub-admin" />} />
          <Route path="super-agent" element={<AgentList type="super-agent" />} />
          <Route path="master-agent" element={<AgentList type="master-agent" />} />
        </Route>
        
        <Route path="/adminpanel" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminAgentList type="all" />} />
          <Route path="reports" element={<ReportList />} />
          <Route path="notices" element={<NoticeManager />} />
          <Route path="company-head" element={<AdminAgentList type="company-head" />} />
          <Route path="admin" element={<AdminAgentList type="admin" />} />
          <Route path="ss-admin" element={<AdminAgentList type="ss-admin" />} />
          <Route path="sub-admin" element={<AdminAgentList type="sub-admin" />} />
          <Route path="super-agent" element={<AdminAgentList type="super-agent" />} />
          <Route path="master-agent" element={<AdminAgentList type="master-agent" />} />
        </Route>
      </Routes>

      <SupportButton />
    </>
  );
}

export default App;