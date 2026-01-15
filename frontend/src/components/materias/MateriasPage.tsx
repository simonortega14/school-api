import React, { useState } from 'react';
import { MateriasList } from './MateriasList';
import { MateriaForm } from './MateriaForm';
import type { Materia } from '../../types';

export const MateriasPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [materiaToEdit, setMateriaToEdit] = useState<Materia | null>(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (materia: Materia) => {
    setMateriaToEdit(materia);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setMateriaToEdit(null);
    setRefresh(!refresh);
  };

  const handleCancel = () => {
    setShowForm(false);
    setMateriaToEdit(null);
  };

  return (
    <div>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Gestión de Materias</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            style={styles.createButton}
          >
            + Crear Materia
          </button>
        )}
      </div>

      {showForm && (
        <MateriaForm
          materiaToEdit={materiaToEdit}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      )}

      <MateriasList onEdit={handleEdit} refresh={refresh} />
    </div>
  );
};

const styles = {
  createButton: {
    backgroundColor: '#9b59b6',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold' as const,
  },
};