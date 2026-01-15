package com.example.school.service;

import com.example.school.model.Alumno;
import com.example.school.model.Materia;
import com.example.school.model.Nota;
import com.example.school.repository.AlumnoRepository;
import com.example.school.repository.MateriaRepository;
import com.example.school.repository.NotaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class NotaService {

    private final NotaRepository notaRepository;
    private final AlumnoRepository alumnoRepository;
    private final MateriaRepository materiaRepository;

    public NotaService(NotaRepository notaRepository,
                       AlumnoRepository alumnoRepository,
                       MateriaRepository materiaRepository) {
        this.notaRepository = notaRepository;
        this.alumnoRepository = alumnoRepository;
        this.materiaRepository = materiaRepository;
    }

    public Nota registrarNota(Long alumnoId, Long materiaId, Double valor) {

        Alumno alumno = alumnoRepository.findById(alumnoId)
                .orElseThrow(() -> new RuntimeException("Alumno no encontrado"));

        Materia materia = materiaRepository.findById(materiaId)
                .orElseThrow(() -> new RuntimeException("Materia no encontrada"));

        Nota nota = new Nota();
        nota.setAlumno(alumno);
        nota.setMateria(materia);
        nota.setValor(valor);
        nota.setFechaRegistro(LocalDate.now());

        return notaRepository.save(nota);
    }

    public List<Nota> listarNotasPorAlumno(Long alumnoId) {
        return notaRepository.findByAlumnoId(alumnoId);
    }
}
