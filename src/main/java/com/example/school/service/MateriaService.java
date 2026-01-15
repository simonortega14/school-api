package com.example.school.service;

import com.example.school.model.Materia;
import com.example.school.repository.MateriaRepository;
import org.springframework.stereotype.Service;
import com.example.school.exception.ResourceNotFoundException;


import java.util.List;

@Service
public class MateriaService {

    private final MateriaRepository materiaRepository;

    public MateriaService(MateriaRepository materiaRepository) {
        this.materiaRepository = materiaRepository;
    }

    public Materia crearMateria(Materia materia) {
        return materiaRepository.save(materia);
    }

    public List<Materia> listarMaterias() {
        return materiaRepository.findAll();
    }

    public Materia obtenerMateriaPorId(Long id) {
    return materiaRepository.findById(id)
            .orElseThrow(() ->
                    new ResourceNotFoundException("Materia no encontrada con id " + id)
            );
}


    public Materia actualizarMateria(Long id, Materia materiaActualizada) {
        Materia materia = materiaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Materia no encontrada"));

        materia.setNombre(materiaActualizada.getNombre());
        materia.setCodigo(materiaActualizada.getCodigo());
        materia.setCreditos(materiaActualizada.getCreditos());

        return materiaRepository.save(materia);
    }

    public void eliminarMateria(Long id) {
        Materia materia = materiaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Materia no encontrada"));
        materiaRepository.delete(materia);
    }
}

