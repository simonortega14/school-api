import React, { useState } from 'react';
import { AlumnosList } from './AlumnosList';
import { AlumnoForm } from './AlumnoForm';
import type { Alumno } from '../../types';

export const AlumnosPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [alumnoToEdit, setAlumnoToEdit] = useState<Alumno | null>(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (alumno: Alumno) => {
    setAlumnoToEdit(alumno);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setAlumnoToEdit(null);
    setRefresh(!refresh);
  };

  const handleCancel = () => {
    setShowForm(false);
    setAlumnoToEdit(null);
  };

  return (
    <div>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Gestión de Alumnos</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            style={styles.createButton}
          >
            + Crear Alumno
          </button>
        )}
      </div>

      {showForm && (
        <AlumnoForm
          alumnoToEdit={alumnoToEdit}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      )}

      <AlumnosList onEdit={handleEdit} refresh={refresh} />
    </div>
  );
};

const styles = {
  createButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold' as const,
  },
};