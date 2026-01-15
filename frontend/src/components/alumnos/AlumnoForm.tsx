import React, { useState, useEffect } from 'react';
import { alumnoService } from '../../services/alumnoService';
import type { Alumno } from '../../types';

interface AlumnoFormProps {
  alumnoToEdit: Alumno | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const AlumnoForm: React.FC<AlumnoFormProps> = ({ 
  alumnoToEdit, 
  onSuccess, 
  onCancel 
}) => {
  const [formData, setFormData] = useState<Alumno>({
    nombre: '',
    apellido: '',
    email: '',
    fechaNacimiento: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (alumnoToEdit) {
      setFormData(alumnoToEdit);
    } else {
      setFormData({
        nombre: '',
        apellido: '',
        email: '',
        fechaNacimiento: '',
      });
    }
  }, [alumnoToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (alumnoToEdit && alumnoToEdit.id) {
        await alumnoService.update(alumnoToEdit.id, formData);
      } else {
        await alumnoService.create(formData);
      }
      onSuccess();
    } catch (err) {
      alert('Error al guardar el alumno');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h3>{alumnoToEdit ? 'Editar Alumno' : 'Crear Alumno'}</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Apellido:</label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Fecha de Nacimiento:</label>
          <input
            type="date"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.buttonGroup}>
          <button 
            type="submit" 
            disabled={loading} 
            style={styles.submitButton}
          >
            {loading ? 'Guardando...' : alumnoToEdit ? 'Actualizar' : 'Crear'}
          </button>
          <button 
            type="button" 
            onClick={onCancel} 
            style={styles.cancelButton}
          >
            Cancelar
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
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
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
  cancelButton: {
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};