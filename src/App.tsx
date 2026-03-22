import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DatabaseProvider } from './context/DatabaseContext';

import { AdminLayout, ClientLayout } from './components/Layout';

// Admin Pages
import AdminActivities from './pages/admin/Activities';
import AdminClients from './pages/admin/Clients';
import AdminPayments from './pages/admin/Payments';
import AdminConfig from './pages/admin/Config';

// Client Pages
import ClientLogin from './pages/client/Login';
import ClientPanel from './pages/client/Panel';

function App() {
  return (
    <DatabaseProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/client/login" />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="actividades" />} />
            <Route path="actividades" element={<AdminActivities />} />
            <Route path="clientes" element={<AdminClients />} />
            <Route path="pagos" element={<AdminPayments />} />
            <Route path="config" element={<AdminConfig />} />
          </Route>
          
          {/* Client Routes */}
          <Route path="/client" element={<ClientLayout />}>
            <Route index element={<Navigate to="login" />} />
            <Route path="login" element={<ClientLogin />} />
            <Route path="panel" element={<ClientPanel />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DatabaseProvider>
  );
}

export default App;
