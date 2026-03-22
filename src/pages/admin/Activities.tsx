import React, { useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';

export default function Activities() {
  const { activities, addActivity } = useDatabase();
  const [act, setAct] = useState({ name: '', capacity: 0, price: 0 });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if(act.name && act.capacity > 0 && act.price > 0){
      addActivity(act);
      setAct({ name: '', capacity: 0, price: 0 });
    }
  };

  return (
    <div>
      <h2 className="page-title">Gestión de Actividades</h2>
      
      <div className="grid-2">
        <div className="card">
          <h3 style={{marginBottom: '1rem'}}>Crear Actividad</h3>
          <form onSubmit={handleAdd}>
            <div className="form-group">
              <label className="form-label">Nombre de Actividad</label>
              <input required className="form-input" value={act.name} onChange={e => setAct({...act, name: e.target.value})} placeholder="Ej. Clase de Yoga" />
            </div>
            <div className="grid-2" style={{gap: '1rem'}}>
              <div className="form-group">
                <label className="form-label">Cupos (Spots)</label>
                <input required type="number" min="1" className="form-input" value={act.capacity || ''} onChange={e => setAct({...act, capacity: Number(e.target.value)})} />
              </div>
              <div className="form-group">
                <label className="form-label">Precio ($)</label>
                <input required type="number" min="1" className="form-input" value={act.price || ''} onChange={e => setAct({...act, price: Number(e.target.value)})} />
              </div>
            </div>
            <button type="submit" className="btn-primary" style={{width: '100%', marginTop: '1rem'}}>Crear Actividad</button>
          </form>
        </div>

        <div>
          <h3 style={{marginBottom: '1rem'}}>Actividades Existentes</h3>
          {activities.length === 0 ? (
            <p style={{color: 'var(--text-muted)'}}>No hay actividades creadas.</p>
          ) : (
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              {activities.map(a => (
                <div key={a.id} className="card" style={{padding: '1rem'}}>
                  <h4 style={{fontSize: '1.2rem', color: 'var(--primary)'}}>{a.name}</h4>
                  <div className="flex-between" style={{marginTop: '0.5rem', color: 'var(--text-muted)'}}>
                    <span>💰 ${a.price}</span>
                    <span>👥 {a.capacity} cupos</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
