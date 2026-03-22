import { useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { clients } = useDatabase();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState('');

  const onLogin = () => {
    if(selectedId) {
      localStorage.setItem('sisturnos_active_client', selectedId);
      navigate('/client/panel');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '0.5rem' }}>Portal de Clientes</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Selecciona tu perfil para ingresar</p>
        
        {clients.length === 0 ? (
          <p style={{ color: 'var(--danger)' }}>No hay clientes registrados. El admin debe agregar clientes primero.</p>
        ) : (
          <>
            <div className="form-group" style={{ textAlign: 'left' }}>
              <label className="form-label">Usuario</label>
              <select className="form-input" value={selectedId} onChange={e => setSelectedId(e.target.value)}>
                <option value="">-- Seleccionar --</option>
                {clients.map(c => (
                  <option key={c.id} value={c.id}>{c.name} {c.lastName}</option>
                ))}
              </select>
            </div>
            <button 
              className="btn-primary" 
              style={{ width: '100%', marginTop: '1rem' }}
              onClick={onLogin}
              disabled={!selectedId}
            >
              Ingresar al Panel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
