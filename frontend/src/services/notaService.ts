import { api } from './api';
import type { Nota, NotaCreate } from '../types';

export const notaService = {
  create: async (data: NotaCreate): Promise<Nota> => {
    const response = await api.post('/notas', null, {
      params: {
        alumnoId: data.alumnoId,
        materiaId: data.materiaId,
        valor: data.valor,
      },
    });
    return response.data;
  },

  getByAlumno: async (alumnoId: number): Promise<Nota[]> => {
    const response = await api.get(`/notas/alumno/${alumnoId}`);
    return response.data;
  },
};
