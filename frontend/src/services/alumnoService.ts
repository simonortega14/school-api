import { api } from './api';
import type { Alumno } from '../types';

export const alumnoService = {
  getAll: async (): Promise<Alumno[]> => {
    const response = await api.get('/alumnos');
    return response.data;
  },

  getById: async (id: number): Promise<Alumno> => {
    const response = await api.get(`/alumnos/${id}`);
    return response.data;
  },

  create: async (alumno: Alumno): Promise<Alumno> => {
    const response = await api.post('/alumnos', alumno);
    return response.data;
  },

  update: async (id: number, alumno: Alumno): Promise<Alumno> => {
    const response = await api.put(`/alumnos/${id}`, alumno);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/alumnos/${id}`);
  },
};