import React, { useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';

export default function Config() {
  const { config, addValidCbu, removeValidCbu } = useDatabase();
  const [newCbu, setNewCbu] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if(newCbu.trim()){
      addValidCbu(newCbu.trim());
      setNewCbu('');
    }
  };

  return (
    <div>
      <h2 className="page-title">Configuración CBU</h2>
      <div className="card" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleAdd} className="form-group flex-between gap-4">
          <div style={{flex: 1}}>
            <label className="form-label">Agregar CBU Destino Válido (para OCR)</label>
            <input className="form-input" value={newCbu} onChange={(e)=>setNewCbu(e.target.value)} placeholder="00000031..." />
          </div>
          <button type="submit" className="btn-primary" style={{marginTop: '1.5rem'}}>Agregar</button>
        </form>

        <div style={{ marginTop: '2rem' }}>
          <label className="form-label">CBUs Autorizados</label>
          {config.validCbus.length === 0 && <p style={{color: 'var(--text-muted)'}}>No hay un CBU configurado aún.</p>}
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {config.validCbus.map(cbu => (
              <li key={cbu} style={{ background: 'var(--bg-color)', padding: '1rem', borderRadius: '8px', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '1.1rem'}}>{cbu}</span>
                <button onClick={() => removeValidCbu(cbu)} style={{ color: 'var(--danger)', fontWeight: 600 }}>Eliminar</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
