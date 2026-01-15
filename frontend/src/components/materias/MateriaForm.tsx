import React, { useState, useEffect } from 'react';
import { materiaService } from '../../services/materiaService';
import type { Materia } from '../../types';

interface MateriaFormProps {
  materiaToEdit: Materia | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const MateriaForm: React.FC<MateriaFormProps> = ({ 
  materiaToEdit, 
  onSuccess, 
  onCancel 
}) => {
  const [formData, setFormData] = useState<Materia>({
    nombre: '',
    codigo: '',
    creditos: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (materiaToEdit) {
      setFormData(materiaToEdit);
    } else {
      setFormData({
        nombre: '',
        codigo: '',
        creditos: 0,
      });
    }
  }, [materiaToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'creditos' ? parseInt(value) || 0 : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (materiaToEdit && materiaToEdit.id) {
        await materiaService.update(materiaToEdit.id, formData);
      } else {
        await materiaService.create(formData);
      }
      onSuccess();
    } catch (err) {
      alert('Error al guardar la materia');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h3>{materiaToEdit ? 'Editar Materia' : 'Crear Materia'}</h3>
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
          <label style={styles.label}>Código:</label>
          <input
            type="text"
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Créditos:</label>
          <input
            type="number"
            name="creditos"
            value={formData.creditos}
            onChange={handleChange}
            required
            min="1"
            style={styles.input}
          />
        </div>

        <div style={styles.buttonGroup}>
          <button 
            type="submit" 
            disabled={loading} 
            style={styles.submitButton}
          >
            {loading ? 'Guardando...' : materiaToEdit ? 'Actualizar' : 'Crear'}
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