import React, { useState } from 'react';
import { NotaForm } from './NotaForm';
import { NotasList } from './NotasList';

export const NotasPage: React.FC = () => {
  const [refresh, setRefresh] = useState(false);

  const handleSuccess = () => {
    setRefresh(!refresh);
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Gestión de Notas</h2>
      
      <NotaForm onSuccess={handleSuccess} />
      
      <NotasList refresh={refresh} />
    </div>
  );
};