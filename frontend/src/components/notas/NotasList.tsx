import React, { useState, useEffect } from 'react';
import { notaService } from '../../services/notaService';
import { alumnoService } from '../../services/alumnoService';
import type { Nota, Alumno } from '../../types';

interface NotasListProps {
  refresh: boolean;
}

export const NotasList: React.FC<NotasListProps> = ({ refresh }) => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [selectedAlumnoId, setSelectedAlumnoId] = useState<number>(0);
  const [notas, setNotas] = useState<Nota[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAlumnos();
  }, []);

  useEffect(() => {
    if (selectedAlumnoId > 0) {
      loadNotas(selectedAlumnoId);
    }
  }, [refresh, selectedAlumnoId]);

  const loadAlumnos = async () => {
    try {
      const data = await alumnoService.getAll();
      setAlumnos(data);
    } catch (err) {
      console.error('Error al cargar alumnos:', err);
    }
  };

  const loadNotas = async (alumnoId: number) => {
    try {
      setLoading(true);
      const data = await notaService.getByAlumno(alumnoId);
      setNotas(data);
    } catch (err) {
      console.error('Error al cargar notas:', err);
      setNotas([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAlumnoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const alumnoId = parseInt(e.target.value);
    setSelectedAlumnoId(alumnoId);
    if (alumnoId === 0) {
      setNotas([]);
    }
  };

  return (
    <div style={styles.container}>
      <h3>Consultar Notas por Alumno</h3>
      
      <div style={styles.selectContainer}>
        <label style={styles.label}>Seleccione un alumno:</label>
        <select
          value={selectedAlumnoId}
          onChange={handleAlumnoChange}
          style={styles.select}
        >
          <option value={0}>-- Seleccione un alumno --</option>
          {alumnos.map((alumno) => (
            <option key={alumno.id} value={alumno.id}>
              {alumno.nombre} {alumno.apellido}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Cargando notas...</p>}

      {!loading && selectedAlumnoId > 0 && (
        <div style={styles.tableContainer}>
          {notas.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
              Este alumno no tiene notas registradas
            </p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Materia</th>
                  <th style={styles.th}>Código</th>
                  <th style={styles.th}>Nota</th>
                  <th style={styles.th}>Fecha Registro</th>
                </tr>
              </thead>
              <tbody>
                {notas.map((nota) => (
                  <tr key={nota.id}>
                    <td style={styles.td}>{nota.id}</td>
                    <td style={styles.td}>{nota.materia.nombre}</td>
                    <td style={styles.td}>{nota.materia.codigo}</td>
                    <td style={styles.td}>
                      <span style={nota.valor >= 3 ? styles.aprobado : styles.reprobado}>
                        {nota.valor.toFixed(1)}
                      </span>
                    </td>
                    <td style={styles.td}>{nota.fechaRegistro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  selectContainer: {
    marginTop: '1rem',
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 'bold' as const,
    color: '#333',
  },
  select: {
    width: '100%',
    padding: '0.5rem',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    color: '#333',
    backgroundColor: 'white',
  },
  tableContainer: {
    overflowX: 'auto' as const,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
  },
  th: {
    backgroundColor: '#e67e22',
    color: 'white',
    padding: '0.75rem',
    textAlign: 'left' as const,
    fontWeight: 'bold' as const,
  },
  td: {
    padding: '0.75rem',
    borderBottom: '1px solid #ddd',
    color: '#333',
  },
  aprobado: {
    color: '#27ae60',
    fontWeight: 'bold' as const,
  },
  reprobado: {
    color: '#e74c3c',
    fontWeight: 'bold' as const,
  },
};