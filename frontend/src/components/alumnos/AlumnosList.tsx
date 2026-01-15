import React, { useEffect, useState } from 'react';
import { alumnoService } from '../../services/alumnoService';
import type { Alumno } from '../../types';

interface AlumnosListProps {
  onEdit: (alumno: Alumno) => void;
  refresh: boolean;
}

export const AlumnosList: React.FC<AlumnosListProps> = ({ onEdit, refresh }) => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAlumnos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await alumnoService.getAll();
      setAlumnos(data);
    } catch (err) {
      setError('Error al cargar los alumnos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlumnos();
  }, [refresh]);

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de eliminar este alumno?')) return;

    try {
      await alumnoService.delete(id);
      loadAlumnos();
    } catch (err) {
      alert('Error al eliminar el alumno');
      console.error(err);
    }
  };

  if (loading) return <p>Cargando alumnos...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>Apellido</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Fecha Nacimiento</th>
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                No hay alumnos registrados
              </td>
            </tr>
          ) : (
            alumnos.map((alumno) => (
              <tr key={alumno.id}>
                <td style={styles.td}>{alumno.id}</td>
                <td style={styles.td}>{alumno.nombre}</td>
                <td style={styles.td}>{alumno.apellido}</td>
                <td style={styles.td}>{alumno.email}</td>
                <td style={styles.td}>{alumno.fechaNacimiento}</td>
                <td style={styles.td}>
                  <button
                    style={styles.editButton}
                    onClick={() => onEdit(alumno)}
                  >
                    Editar
                  </button>
                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDelete(alumno.id!)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    overflowX: 'auto' as const,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
  },
  th: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '0.75rem',
    textAlign: 'left' as const,
    fontWeight: 'bold' as const,
  },
  td: {
    padding: '0.75rem',
    borderBottom: '1px solid #ddd',
  },
  editButton: {
    backgroundColor: '#f39c12',
    color: 'white',
    border: 'none',
    padding: '0.4rem 0.8rem',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '0.5rem',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.4rem 0.8rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};