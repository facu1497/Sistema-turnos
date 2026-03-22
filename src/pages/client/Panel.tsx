import { useEffect, useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import type { Client } from '../../context/DatabaseContext';
import { useNavigate } from 'react-router-dom';

export default function Panel() {
  const { clients, activities, updateClientSpots } = useDatabase();
  const navigate = useNavigate();
  const [user, setUser] = useState<Client | null>(null);

  useEffect(() => {
    const id = localStorage.getItem('sisturnos_active_client');
    if(!id) {
      navigate('/client/login');
      return;
    }
    const found = clients.find(c => c.id === id);
    if(found) setUser(found);
    else navigate('/client/login');
  }, [clients, navigate]);

  if(!user) return null;

  const handleReserve = () => {
    if(user.availableSpots > 0) {
      updateClientSpots(user.id, -1);
      alert('¡Turno reservado exitosamente!');
    }
  };

  return (
    <div>
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <h2 className="page-title" style={{margin: 0}}>Hola, {user.name}</h2>
        <div style={{ background: 'var(--primary)', color: 'white', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 'bold' }}>
          Tus Spots: {user.availableSpots}
        </div>
      </div>

      <h3 style={{ marginBottom: '1rem' }}>Actividades Disponibles</h3>
      {activities.length === 0 ? (
        <p style={{color: 'var(--text-muted)'}}>No hay actividades programadas por el momento.</p>
      ) : (
        <div className="grid-2">
          {activities.map(a => (
            <div key={a.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>{a.name}</h4>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Precio Sugerido: ${a.price} <br/>
                  Cupos totales: {a.capacity}
                </p>
              </div>
              <button 
                className="btn-primary" 
                disabled={user.availableSpots < 1}
                onClick={handleReserve}
                style={{ opacity: user.availableSpots < 1 ? 0.5 : 1, cursor: user.availableSpots < 1 ? 'not-allowed' : 'pointer'}}
              >
                {user.availableSpots >= 1 ? 'Reservar Lugar (Usa 1 spot)' : 'No tienes spots suficientes'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
