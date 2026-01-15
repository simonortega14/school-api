import React, { useEffect, useState } from 'react';
import { materiaService } from '../../services/materiaService';
import type { Materia } from '../../types';

interface MateriasListProps {
  onEdit: (materia: Materia) => void;
  refresh: boolean;
}

export const MateriasList: React.FC<MateriasListProps> = ({ onEdit, refresh }) => {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMaterias = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await materiaService.getAll();
      setMaterias(data);
    } catch (err) {
      setError('Error al cargar las materias');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMaterias();
  }, [refresh]);

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de eliminar esta materia?')) return;

    try {
      await materiaService.delete(id);
      loadMaterias();
    } catch (err) {
      alert('Error al eliminar la materia');
      console.error(err);
    }
  };

  if (loading) return <p>Cargando materias...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>Código</th>
            <th style={styles.th}>Créditos</th>
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {materias.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>
                No hay materias registradas
              </td>
            </tr>
          ) : (
            materias.map((materia) => (
              <tr key={materia.id}>
                <td style={styles.td}>{materia.id}</td>
                <td style={styles.td}>{materia.nombre}</td>
                <td style={styles.td}>{materia.codigo}</td>
                <td style={styles.td}>{materia.creditos}</td>
                <td style={styles.td}>
                  <button
                    style={styles.editButton}
                    onClick={() => onEdit(materia)}
                  >
                    Editar
                  </button>
                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDelete(materia.id!)}
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
    backgroundColor: '#9b59b6',
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