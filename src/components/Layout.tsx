import { Outlet, Link, useLocation } from 'react-router-dom';
import { Calendar, Users, FileText, Settings } from 'lucide-react';

export const AdminLayout = () => {
  const location = useLocation();
  const navItems = [
    { name: 'Actividades', path: '/admin/actividades', icon: <Calendar size={20} /> },
    { name: 'Clientes', path: '/admin/clientes', icon: <Users size={20} /> },
    { name: 'Pagos', path: '/admin/pagos', icon: <FileText size={20} /> },
    { name: 'Configuración', path: '/admin/config', icon: <Settings size={20} /> },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <header style={{ background: 'var(--surface)', padding: '1rem 2rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: '1.2rem', fontWeight: 600 }}>T-Admin</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {navItems.map(item => (
            <Link key={item.path} to={item.path} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none',
              color: location.pathname.includes(item.path) ? 'var(--primary)' : 'var(--text-muted)'
            }}>
              {item.icon} <span style={{display: 'none', '@media(minWidth:768px)': {display: 'inline'} } as unknown as any}>{item.name}</span>
            </Link>
          ))}
          <Link to="/client/login" style={{ color: 'var(--text-muted)', textDecoration: 'none', marginLeft: '2rem' }}>[Ver Cliente]</Link>
        </div>
      </header>
      <main className="premium-container" style={{ flex: 1, width: '100%' }}>
        <Outlet />
      </main>
    </div>
  );
};

export const ClientLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <header style={{ background: 'var(--surface)', padding: '1rem 2rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Mi Actividad</h1>
        <Link to="/admin/actividades" style={{ color: 'var(--text-muted)', textDecoration: 'none'}}>[Ir a Admin]</Link>
      </header>
      <main className="premium-container" style={{ flex: 1, width: '100%' }}>
        <Outlet />
      </main>
    </div>
  );
};
