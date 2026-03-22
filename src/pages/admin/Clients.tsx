import React, { useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';

export default function Clients() {
  const { clients, addClient } = useDatabase();
  const [form, setForm] = useState({ name: '', lastName: '', phone: '', email: '' });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(form.name && form.lastName){
      addClient(form);
      setForm({ name: '', lastName: '', phone: '', email: '' });
    }
  };

  return (
    <div>
      <h2 className="page-title">Directorio de Clientes</h2>
      
      <div className="grid-2">
        <div className="card">
          <h3 style={{marginBottom: '1rem'}}>Registrar Cliente</h3>
          <form onSubmit={onSubmit}>
            <div className="grid-2" style={{gap: '1rem'}}>
              <div className="form-group">
                <label className="form-label">Nombre</label>
                <input required className="form-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Apellido</label>
                <input required className="form-input" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Teléfono</label>
              <input className="form-input" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="form-input" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
            <button className="btn-primary" style={{width: '100%', marginTop: '1rem'}}>Guardar Cliente</button>
          </form>
        </div>

        <div>
          <h3 style={{marginBottom: '1rem'}}>Clientes Registrados</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>
            {clients.map(c => (
              <div key={c.id} className="card" style={{padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                  <div style={{fontWeight: 600}}>{c.name} {c.lastName}</div>
                  <div style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>{c.email} | {c.phone}</div>
                </div>
                <div style={{textAlign: 'right'}}>
                  <div style={{color: 'var(--success)', fontWeight: 'bold'}}>{c.availableSpots} Spots</div>
                </div>
              </div>
            ))}
            {clients.length === 0 && <p style={{color: 'var(--text-muted)'}}>Sin clientes registrados.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
