import React, { useState, useEffect } from 'react';
import { notaService } from '../../services/notaService';
import { alumnoService } from '../../services/alumnoService';
import { materiaService } from '../../services/materiaService';
import type { Alumno, Materia, NotaCreate } from '../../types';

interface NotaFormProps {
  onSuccess: () => void;
}

export const NotaForm: React.FC<NotaFormProps> = ({ onSuccess }) => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [formData, setFormData] = useState<NotaCreate>({
    alumnoId: 0,
    materiaId: 0,
    valor: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [alumnosData, materiasData] = await Promise.all([
        alumnoService.getAll(),
        materiaService.getAll(),
      ]);
      setAlumnos(alumnosData);
      setMaterias(materiasData);
    } catch (err) {
      alert('Error al cargar datos');
      console.error(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'valor' ? parseFloat(value) : parseInt(value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.alumnoId === 0 || formData.materiaId === 0) {
      alert('Debes seleccionar un alumno y una materia');
      return;
    }

    if (formData.valor < 0 || formData.valor > 5) {
      alert('La nota debe estar entre 0 y 5');
      return;
    }

    setLoading(true);

    try {
      await notaService.create(formData);
      setFormData({ alumnoId: 0, materiaId: 0, valor: 0 });
      onSuccess();
      alert('Nota registrada exitosamente');
    } catch (err) {
      alert('Error al registrar la nota');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h3>Registrar Nota</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Alumno:</label>
          <select
            name="alumnoId"
            value={formData.alumnoId}
            onChange={handleChange}
            required
            style={styles.select}
          >
            <option value={0}>Seleccione un alumno</option>
            {alumnos.map((alumno) => (
              <option key={alumno.id} value={alumno.id}>
                {alumno.nombre} {alumno.apellido}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Materia:</label>
          <select
            name="materiaId"
            value={formData.materiaId}
            onChange={handleChange}
            required
            style={styles.select}
          >
            <option value={0}>Seleccione una materia</option>
            {materias.map((materia) => (
              <option key={materia.id} value={materia.id}>
                {materia.nombre} ({materia.codigo})
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Nota (0-5):</label>
          <input
            type="number"
            name="valor"
            value={formData.valor}
            onChange={handleChange}
            required
            min="0"
            max="5"
            step="0.1"
            style={styles.input}
          />
        </div>

        <div style={styles.buttonGroup}>
          <button 
            type="submit" 
            disabled={loading} 
            style={styles.submitButton}
          >
            {loading ? 'Registrando...' : 'Registrar Nota'}
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '1.5rem',
  },
  form: {
    marginTop: '1rem',
  },
  formGroup: {
    marginBottom: '1rem',
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
  input: {
    width: '100%',
    padding: '0.5rem',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    color: '#333',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1.5rem',
  },
  submitButton: {
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};