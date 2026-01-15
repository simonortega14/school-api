import { api } from './api';
import type { Materia } from '../types';

export const materiaService = {
  getAll: async (): Promise<Materia[]> => {
    const response = await api.get('/materias');
    return response.data;
  },

  getById: async (id: number): Promise<Materia> => {
    const response = await api.get(`/materias/${id}`);
    return response.data;
  },

  create: async (materia: Materia): Promise<Materia> => {
    const response = await api.post('/materias', materia);
    return response.data;
  },

  update: async (id: number, materia: Materia): Promise<Materia> => {
    const response = await api.put(`/materias/${id}`, materia);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/materias/${id}`);
  },
};